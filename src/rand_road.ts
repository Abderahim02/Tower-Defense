import { ActorsTypeList, world } from "./defineType.js";

// creat a matrix with i*WIDTH+j in the position(i,j) 
export const createMatrix=(Width:number,Height:number) :number[][]=> {
  const matrix: number[][] = Array.from({ length: Height }, () => Array.from({ length: Width }, () => 0));
  return matrix.map((x,i)=>{
    return x.map((y,j)=>{
     return i*Width+j;
             });
       });
};

// return the path between start and end 
export const randomPath=(world:world, matrix:number[][],start:number, end:number)=> {
  // to take a copy of matrix and save the origin matrix
  const copyMatrix:number[][] = matrix.slice();
  // visited to take cells visited with dfs
  const visited:number[] = [start];
  const path:number[]| null = dfs(world, start, visited, copyMatrix, end);
  
return path;
};



export const dfs=(world:world, currentPosition:number, visited: number[], matrix:number[][],end:number):number[] | null=> {
  // if we find the end postion
  if (currentPosition === end) {

    return [currentPosition];
  }

  // to take all neighbors of currentPosition
  const neighbors: number[] = getNeighbors(currentPosition, world.Width, world.Height);

  // Shuffle neighboring positions to get a random order
  shuffleArray(neighbors);

  //to visite all neighbors
  for (const neighbor of neighbors) {
    let isVisited = false;
    // to check if the neighbor was visited  or no
    for (let i = 0; i < visited.length; i++) {
      if (visited[i] === neighbor) {
        isVisited = true;
        break;
      }
    }

    if (!isVisited) {
      // we add neighbor to visited table
      visited.push(neighbor);
      // dfs to neighbor
      const path: number[] | null = dfs(world, neighbor, visited, matrix,end);
      if (path !== null) {
        // add currentPosition to the begining of the path
        path.unshift(currentPosition);
       
        return path;
      }
    }
  }

// return null if there is no path 
  return null;
};


export const getNeighbors=(position:number, Width:number, Height:number) =>{
  const i:number = Math.floor(position / Width);
  const j:number = position % Width;

  const availableNeighbors:number[]= [
    i > 0 ? position - Width : -2, // up
    j > 0 ? position - 1 : -2, // left
    i < Height-1 ? position + Width : -2, // down
    j < Width-1 ? position + 1 : -2 // right
  ];
  const neighbors = availableNeighbors.filter(neighbor => neighbor !== -2);

  return neighbors;
};



export const shuffleArray=(array: number[]): void=> {
  for (let i = array.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};



export const Road = (world: world, start:number, end: number) : world=>{
  const t:number[] | null=randomPath(world, createMatrix(world.Width, world.Height), start, end);
  if(t !== null){
    for(let i=0; i<t.length ;i++){
      const [x,y]: [number,number]=[Math.floor(t[i]/world.Width), t[i]%world.Width];
      world.Matrix[x][y].AnActor = ActorsTypeList.Road;
    }
  }
  world.Matrix[Math.floor(end/world.Width)][end%world.Width].AnActor = ActorsTypeList.Road;
  return world;
};
/////////////////////////////////////           END           /////////////////////////////////////////////////////
