import { ActorsTypeList, actor, point, position, world } from "./world";

// creat a matrix with i*WIDTH+j in the position(i,j) 
function createMatrix(Width:number,Height:number) :number[][] {
  const matrix:number [][]= [];

  for (let i:number = 0; i < Height; i++) {
    const row :number[] = new Array(Width);
    for (let j = 0; j < Width; j++) {
      const value:number = i * Width + j;
      row[j]=value;
    }
    matrix[i]=row;
  }
  return matrix;
}

// return the path between start and end 
function randomPath(world:world, matrix:number[][],start:number, end:number) {
  // Créer une copie de la matrice pour garder l'originale intacte
  const copyMatrix:number[][] = matrix.slice();
  // visited for cells visited with dfs
  const visited:number[] = new Array();
  //adding the first element 
  visited.push(start);
  const path:number[]| null = dfs(world, start, visited, copyMatrix, end);
  
return path;
}

// function dfs(world:world, currentPosition:number, visited: number[], matrix:number[][],end:number):number[] | null {
//   // Si on atteint la position finale, retourner le chemin
//   if (currentPosition === end) {

//     return [currentPosition];
//   }

//   // Obtenir les positions voisines
//   const neighbors: number[] = getNeighbors(currentPosition, world.Width, world.Height);

//   // Mélanger les positions voisines pour obtenir un ordre aléatoire
//   shuffleArray(neighbors);

//   // Parcourir les positions voisines
//   for (const neighbor of neighbors) {
//     if (!visited.includes(neighbor)) {
//       // Marquer la position voisine comme visitée
//       visited.push(neighbor);
//       // Appeler récursivement l'algorithme DFS pour la position voisine
      
       
//       const path: number[] | null = dfs(world, neighbor, visited, matrix,end);
//       if (path !== null) {
//         // Ajouter la position courante au début du chemin trouvé
//        //console.log(path);
//         path.unshift(currentPosition);
       
//         return path;
//       }
//     }
//   }

//   // Si aucun chemin n'a été trouvé, retourner null
//   return null;
// }

function dfs(world:world, currentPosition:number, visited: number[], matrix:number[][],end:number):number[] | null {
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
}


function getNeighbors(position:number, Width:number, Height:number) {
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
}

function shuffleArray(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}



function Road(world: world,start:number,end: number){
  
  const t:number[] | null=randomPath(world, createMatrix(world.Width, world.Height),start, end);
  //console.log(t)
  if(t!==null){
  for(let i=0;i<t.length;i++){
    const [x,y]: [number,number]=[Math.floor(t[i]/world.Width),t[i]%world.Width];
  //console.log(x,y)
    world.Matrix[x][y].AnActor=ActorsTypeList.Road;
  }
  }
  return world;
}

export {
  shuffleArray, getNeighbors, dfs, randomPath, createMatrix, Road

};


