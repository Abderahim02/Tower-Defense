import { ActorsTypeList, display, initializeWorld, world, CreateWorld, point, position} from "./world.js";
import { Road } from "./rand_road.js";
import { CreateSimpleTower, CreateMagicTower, TowersPlacement, TowersAttacks } from "./actors.js"; 
import { Graph , Astar} from "./A*.js";
import { actor } from "./world.js";
import {AvailablePosition} from "./movements.js";

//this function returns the type of the actor in position p in the grid
function GetActorType(world: world, p:point) : string{
    return world.Matrix[p.x][p.y].AnActor.Type;
}

//this function returns a list of positions in the grid that are with type road
function GetRoadInWorld(world : world): point[]{
    const Roads : point[] = [];
    for(let i=0; i<world.Height; ++i){
        for(let j=0; j<world.Width; ++j){
            if (GetActorType(world, world.Matrix[i][j].Pos) === "Road" ){
                Roads.push(world.Matrix[i][j].Pos);
            }
        }
    }
    return Roads;
}

//this function test if the position p belongs to the grid
function isValidPosition(world : world, p : point){
    return p.x < world.Width && p.y < world.Height && p.x >= 0 && p.y >= 0;
}

//this function construct a list of neighbors of the position p
function ConstructNeighbors(world: world, p : point) : point[]{
    const neighbors : point[] = [];
    if(isValidPosition(world, p)){
    //we add all the neighbors even if they arent in the grid 
    neighbors.push({x : p.x  , y : p.y + 1});
    neighbors.push({x : p.x , y : p.y - 1});
    neighbors.push({x : p.x + 1 , y : p.y - 1});
    neighbors.push({x : p.x + 1, y : p.y +1 });
    neighbors.push({x : p.x +1 , y : p.y });
    neighbors.push({x : p.x - 1, y : p.y });
    neighbors.push({x : p.x - 1, y : p.y - 1});
    neighbors.push({x : p.x - 1, y : p.y + 1});
    }
    //we remove the non valid positions
    return neighbors.filter((p:point)=> isValidPosition(world, p) );
}

//this function look for the position p in the list of positions R
function SearchForVertex(R : point[], p : point) : number{
    for(let i=0; i<R.length; ++i){
        if(R[i].x === p.x && R[i].y === p.y){
            return i;
        }
    }
    return -1;
}


//this function returns an empty matrix of size n*n
function InitializedMatrix(n : number) : number[][]{
    const matrix:number [][]= [];
    for (let i:number = 0; i < n; i++) {
      matrix[i]= new Array(n);
    }
    for (let i:number = 0; i < n; i++) {
        for (let j:number = 0; j < n; j++) {
            matrix[i][j] = 0;
          }
      }
    return matrix;
}


/*this id the main function that converts a world to a graph, in the graph we put only 
positions with type road indexed by the order we found theme: from the first to the last 
one we found, its size is M*M Where M is the number of these positions */
// function ConvertRoadsToGraph(world : world): Graph{
//     const Roads: point[] = GetRoadInWorld(world); //we collect the road positions 
//     const l : number = Roads.length;
//     const G : Graph = {mat : InitializedMatrix(l), size : l  }; //we create an empty graph
//     for(let i=0; i<l; ++i){ //we explore all the roads
//         //for each road we see all its neighbors that are with type road
//         const neighbors : point[] = ConstructNeighbors(world, Roads[i]); 
//         for(let v = 0; v<neighbors.length; ++v){
//             if(GetActorType(world,neighbors[v]) === "Road"){
//                 //we make an arc between the two vertexes
//                 const index : number = SearchForVertex(Roads, neighbors[v]); 
//                 G.mat[i][index] = 1;  //we set all arcs to the value 1
//                 // console.log(`i = ${i}, j = ${index}\t`);
//             }
//         }
//     }
//     return G;
// }

function ConvertRoadsToGraph(s : point, world : world): Graph{
    const Roads: point[] = GetRoadInWorld(world);//we collect the road positions 
    Roads.push(s); // we add the starting position to consiedr it as road
    let l : number = Roads.length;
    const G : Graph = {mat : InitializedMatrix(l), size : l  }; //we create an empty graph
    for(let i=0; i<l; ++i){ //we explore all the roads
        //for each road we see all its neighbors that are with type road
        const neighbors : point[] = ConstructNeighbors(world, Roads[i]); 
        for(let v = 0; v<neighbors.length; ++v){
            if(GetActorType(world, neighbors[v]) === "Road" ){
                //we make an arc between the two vertexes
                const index : number = SearchForVertex(Roads, neighbors[v]); 
                if(index !== -1){
                    G.mat[i][index] = 1;  //we set all arcs to the value 1
                }
            }
        }
    }
    return G;
}

//this function diplays the graph G as a 2D matrix
function DisplayGraph(G : Graph) : string {
    let gridStr : string = "";
    for (let i = 0; i < G.size; i++) {
      let rowStr = "[";
      for (let j = 0; j < G.size; j++) {
        rowStr += G.mat[i][j];
        if (j < G.size - 1) {
          rowStr += ", ";
        }
      }
      rowStr += "]\n";
      gridStr += rowStr;
    }
    return gridStr;
  }

function GetAnExitPosition(world: world) : point{
    for(let i = 0; i<world.Height; ++i){
        if(GetActorType(world, {x : i, y : world.Width - 1}) === "Road"){
            return world.Matrix[i][world.Width - 1].Pos;
        }
    }
    return {x : -1, y : -1};
}
  
function OptimalRoad( p : point , world : world){
    const Roads: point[] = GetRoadInWorld(world);
    const G : Graph = ConvertRoadsToGraph( p, world);
    const tab : [number[], number[]] = Astar({s : Roads.length }, {s : 0 }, G);
    console.log(tab);
}

//this is a test function for the convertion algorithm
function TestOptimalRoad(){
    let world : world = CreateWorld(6,6);
    const start : number = Math.floor(world.Height/2)*world.Width;
    const end : number = start-1;
    world = Road(initializeWorld(world),start,end);
    display(world);
    world=TowersPlacement(world);
    for(let i : number = 0 ; i < 50 ; i++ ){
        if(i%6===0){   
             world.Actors.push({
                Pos:  { x: Math.floor(world.Height/2), y: 0 },
                AnActor : ActorsTypeList.BigMonster
            });
            world.Matrix[Math.floor(world.Height/2)][0].AnActor =ActorsTypeList.BigMonster;
        }
        if(i%6===3){
            {
                world.Actors.push({
                   Pos:     { x: Math.floor(world.Height/2)+1, y: 0 },
                   AnActor : ActorsTypeList.SimpleMonster
               });
               world.Matrix[Math.floor(world.Height/2)+1][0].AnActor =ActorsTypeList.SimpleMonster;
           }
        }
        
    }
    display(world);
    console.log(GetAnExitPosition(world));
    console.log(OptimalRoad({x : 3, y : 0},world));
}
TestOptimalRoad();