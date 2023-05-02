import {display, initializeWorld, CreateWorld} from "./world.js";
import { Road } from "./rand_road.js";
import{ActorsTypeList, world,  point, position} from "./defineType.js";
import {TowersPlacement} from "./actors.js"; 
import { Graph , Astar, Vertex} from "./Astar.js";


//this function returns the type of the actor in position p in the grid
export function GetActorType(w: world, p:point) : string{
    return w.Matrix[p.x][p.y].AnActor.Type;
}


//this function returns a list of positions in the grid that are with type road
function GetRoadInWorld(w : world): point[]{
    const Roads : point[] = [];
    for(let i=0; i<w.Height; ++i){
        for(let j=0; j<w.Width; ++j){
            if (GetActorType(w, w.Matrix[i][j].Pos) === "Road" ){
                Roads.push(w.Matrix[i][j].Pos);
            }
        }
    }
    // console.log(Roads);
    return Roads;
}

//this function test if the position p belongs to the grid
function isValidPosition(w : world, p : point){
    return  p.x < w.Height && p.y < w.Width && p.x >= 0 && p.y >= 0; //p!== undefined &&
}

//this function construct a list of neighbors of the position p
function ConstructNeighbors(w: world, p : point) : point[]{
    const neighbors : point[] = [];
    if(isValidPosition(w, p)){
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
    return neighbors.filter((p:point)=> isValidPosition(w, p) );
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
function ConvertRoadsToGraph( Roads : point[], w : world): Graph{
    // const Roads: point[] = GetRoadInWorld(w);//we collect the road positions 
    // Roads.push(s); // we add the starting position to consiedr it as road
    const l : number = Roads.length;
    const G : Graph = {mat : InitializedMatrix(l), size : l }; //we create an empty graph
    for(let i=0; i<l; ++i){ //we explore all the roads
        //for each road we see all its neighbors that are with type road
        const neighbors : point[] = ConstructNeighbors(w, Roads[i]);
        for(let v = 0; v<neighbors.length; ++v){
            // console.log(`${neighbors[v].x}` + `\t ${neighbors[v].y}\n`);
            if(GetActorType(w, neighbors[v]) === "Road" ){
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

//this function returns a possible exit position for monsters
function GetAnExitPosition(w: world) : point{
    for(let i = 0; i<w.Height; ++i){
        if(GetActorType(w, {x : i, y : w.Width - 1}) === "Road"){
            return w.Matrix[i][w.Width - 1].Pos;
        }
    }
    return {x : -1, y : -1};
}

//this function returns the best road for a monster to exit the map and win
export function OptimalRoad( p : point , w : world, end : point ) : point[]{
    const Roads: point[] = GetRoadInWorld(w);
    Roads.push(p); // we add the starting position to consiedr it as road
    const G : Graph = ConvertRoadsToGraph( Roads, w); // we construct the graph
    // console.log(   DisplayGraph(G));
    //the starting / ending vertexes of the road
    const EndVertex : Vertex = {s : SearchForVertex(Roads, end) } ;
    const StartVertex : Vertex = {s : Roads.length - 1 };
    const tab : [number[], number[]] = Astar(StartVertex, EndVertex , G);
    // console.log(tab);
    const Chemin : point [] = [];
    //cette function contruit le chemin d'apres l'arborescence (parents) retourne par Astar
    function ConstructRoad(t : number[], curseur : number) : point[]{
        // console.log(curseur);
        if (curseur === t.length - 1 || curseur < 0 ) {
            return Chemin;
        } else {
            Chemin.push(Roads[curseur]);
            curseur = t[curseur];
            return ConstructRoad(t, curseur);
        }
    }
    return ConstructRoad(tab[1], EndVertex.s).concat(p);
}



export function NextOptimalMove(p: point, w : world, OptimalRoad : point[] ) : point {
    const ActorIndex : number = SearchForVertex(OptimalRoad, p );
    if (ActorIndex === 0) return OptimalRoad[0];
    const m : point = OptimalRoad[ActorIndex - 1];
    // console.log(ActorIndex);
    // console.log("p = {"+ `${p.x},${p.y}` + "} m = {"+`${m.x}, ${m.y}`+"}");
    if ( isValidPosition(w, m) && GetActorType(w, m) === "Road" ) {
        // console.log("khkhkhkhkh");
        return m;
    }
    return p;
}



//this is a test function for the convertion algorithm
function TestOptimalRoad(){
    // let w : world = CreateWorld(10,15);
    // const start : number = Math.floor(w.Height/2)*w.Width;
    // const end : number = start-1;
    // w = Road(initializeWorld(w),start,end);
    // //display(w);
    // w=TowersPlacement(w);
    // for(let i : number = 0 ; i < 50 ; i++ ){
    //     if(i%6===0){   
    //          w.Actors.push({
    //             Pos:  { x: Math.floor(w.Height/2), y: 0 },
    //             AnActor : ActorsTypeList.BigMonster
    //         });
    //         w.Matrix[Math.floor(w.Height/2)][0].AnActor =ActorsTypeList.BigMonster;
    //     }
    //     if(i%6===3){
    //         {
    //             w.Actors.push({
    //                Pos:     { x: Math.floor(w.Height/2), y: 0 },
    //                AnActor : ActorsTypeList.SimpleMonster
    //            });
    //            w.Matrix[Math.floor(w.Height/2)][0].AnActor =ActorsTypeList.SimpleMonster;
    //        }
    //     }
        
    // }
    // // w=gameMotor(gamePhase(w),w);
    // display(w, end);
    // const startPoint : point = {x : Math.floor(start/w.Width), y : start%w.Width};
    // const endPoint : point = {x : Math.floor(end/w.Width) , y:  end%w.Width}
    // const AstarRoad : point[] = OptimalRoad(startPoint, w, endPoint);
    // console.log(startPoint);
    // console.log(endPoint);
    // // const AstarRoad : point[] = OptimalRoad({x : 5, y : 0}, w, endPoint);

    // console.log(AstarRoad);
    // console.log(NextOptimalMove(startPoint,w, AstarRoad));
}
//TestOptimalRoad();

export {
    TestOptimalRoad
};