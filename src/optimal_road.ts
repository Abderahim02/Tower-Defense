import{ world,  point} from "./defineType.js";
import { Graph , Astar, Vertex} from "./Astar.js";


//this function returns the type of the actor in position p in the grid
export function GetActorType(w: world, p:point) : string{
    return w.Matrix[p.x][p.y].AnActor.Type;
}


//this function returns a list of positions in the grid that are with type road
export function GetRoadInWorld(w : world): point[] {
    return w.Matrix.flatMap(row =>
      row.filter(cell => GetActorType(w, cell.Pos) === "Road").map(cell => cell.Pos)
    );
  }

//this function test if the position p belongs to the grid
export function isValidPosition(w : world, p : point){
    return  p!== undefined && p.x < w.Height && p.y < w.Width && p.x >= 0 && p.y >= 0; //
}

//this function construct a list of neighbors of the position p
export function ConstructNeighbors(w: world, p : point) : point[]{
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
export function SearchForVertex(R : point[], p : point) : number{
    const index = R.findIndex(vertex => vertex.x === p.x && vertex.y === p.y);
    return index !== -1 ? index : -1;
  }


//this function returns an empty matrix of size n*n
function InitializedMatrix(n : number) : number[][]{
    const matrix = Array.from({ length: n }, () => new Array(n).fill(0));
    return matrix;
  }


/*this id the main function that converts a world to a graph, in the graph we put only 
positions with type road indexed by the order we found theme: from the first to the last 
one we found, its size is M*M Where M is the number of these positions */
function ConvertRoadsToGraph( Roads : point[], w : world): Graph{
    const l : number = Roads.length;
    const G : Graph = {mat : InitializedMatrix(l), size : l }; //we create an empty graph
    for(let i=0; i<l; ++i){ //we explore all the roads
        //for each road we see all its neighbors that are with type road
        const neighbors : point[] = ConstructNeighbors(w, Roads[i]);
        for(let v = 0; v<neighbors.length; ++v){
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

/*  this function returns the best road for a monster to exit the map and win
    p : the begining position (=== the source) 
    end : is the ending point of the road (the position where we want to go)
*/
export function OptimalRoad( p : point , w : world, end : point ) : point[]{
    const Roads: point[] = GetRoadInWorld(w);
    Roads.push(p); // we add the starting position to consiedr it as road
    const G : Graph = ConvertRoadsToGraph( Roads, w); // we construct the graph
    //the starting / ending vertexes of the road
    const EndVertex : Vertex = {s : SearchForVertex(Roads, end) } ;
    const StartVertex : Vertex = {s : Roads.length - 1 };
    const tab : [number[], number[]] = Astar(StartVertex, EndVertex , G);
    const Chemin : point [] = [];
    //This function constructs the path based on the hierarchy (parents) returned by Astar.
    function ConstructRoad(t : number[], curseur : number) : point[]{
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


/*  this function returns the next move for an actor using Astar road,
    if the position is not empty(!== road) the actor stays in his place with no move.
    p: is the actual position of the actor
    OptimalRoad : is an array of points of the Astar road
*/
export function NextOptimalMove(p: point, w : world, OptimalRoad : point[] ) : point {
    const ActorIndex : number = SearchForVertex(OptimalRoad, p );
    if (ActorIndex === 0) return OptimalRoad[0];
    const m : point = OptimalRoad[ActorIndex - 1];
    if ( isValidPosition(w, m) && GetActorType(w, m) === "Road" ) {
        return m;
    }
    return p;
}

/////////////////////////////////////           END           /////////////////////////////////////////////////////

