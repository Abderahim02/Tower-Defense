import { ActorsTypeList, actor, point, position, world } from "./world.js";

// creat a matrix with i*WIDTH+j in the position(i,j) 
export const createMatrix=(Width:number,Height:number) :number[][]=> {
  const matrix:number [][]=Array(Height).fill(0);
  
  return matrix.map((x)=>Array(Height).fill(0)).map((x,i)=>{
    return x.map((y,j)=>{
     return i*Width+j;
             });
       });
};

// return the path between start and end 
export const randomPath=(world:world, matrix:number[][],start:number, end:number)=> {
  // Créer une copie de la matrice pour garder l'originale intacte
  const copyMatrix:number[][] = matrix.slice();
  // visited to take cells visited with dfs
  const visited:number[] = [start];
  const path:number[]| null = dfs(world, start, visited, copyMatrix, end);
  
return path;
};



export const dfs=(world:world, currentPosition:number, visited: number[], matrix:number[][],end:number):number[] | null=> {
  // Si on atteint la position finale, retourner le chemin
  if (currentPosition === end) {

    return [currentPosition];
  }

  // Obtenir les positions voisines
  const neighbors: number[] = getNeighbors(currentPosition, world.Width, world.Height);

  // Mélanger les positions voisines pour obtenir un ordre aléatoire
  shuffleArray(neighbors);

  // Parcourir les positions voisines
  for (const neighbor of neighbors) {
    let isVisited = false;
    for (let i = 0; i < visited.length; i++) {
      if (visited[i] === neighbor) {
        isVisited = true;
        break;
      }
    }
    if (!isVisited) {
      // Marquer la position voisine comme visitée
      visited.push(neighbor);
      // Appeler récursivement l'algorithme DFS pour la position voisine
      
       
      const path: number[] | null = dfs(world, neighbor, visited, matrix,end);
      if (path !== null) {
        // Ajouter la position courante au début du chemin trouvé
       //console.log(path);
        path.unshift(currentPosition);
       
        return path;
      }
    }
  }

  // Si aucun chemin n'a été trouvé, retourner null
  return null;
};


export const getNeighbors=(position:number, Width:number, Height:number) =>{
  const i:number = Math.floor(position / Width);
  const j:number = position % Width;
  const neighbors:number[] = [];

  // Ajouter les positions voisines valides
  if (i > 0) {
    neighbors.push(position - Width); // Haut
  }
  if (j > 0) {
    neighbors.push(position - 1); // Gauche
  }
  if (i < Height-1) {
    neighbors.push(position + Width); // Bas
  }
  if (j < Width-1) {
    neighbors.push(position + 1); // Droite
  }
  /*if (j < 9 && i<world.Height-1) {
    neighbors.push(position + 1+world.Width); // Droite
  }
  if (j < world.Width-1 && i<0) {
    neighbors.push(position -world.Width+ 1); // Droite
  }
  if (j > 0 && i>0 ) {
    neighbors.push(position -world.Width- 1); // Droite
  }
  if (j>0 && i<world.Height-1) {
    neighbors.push(position +world.Width-1); // Droite
  }*/

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
  return world;
};


