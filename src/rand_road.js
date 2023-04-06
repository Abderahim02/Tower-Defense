import { ActorsTypeList } from "./world.js";

// creat a matrix with i*WIDTH+j in the position(i,j) 
function createMatrix(Width,Height) {
  const matrix = [];

  for (let i = 0; i < Height; i++) {
    const row = [];
    for (let j = 0; j < Width; j++) {
      const value = i * Width + j;
      row.push(value);
    }
    matrix.push(row);
  }

  return matrix;
}

// return the path between start and end 
function randomPath(world, matrix,start, end) {
let last=start;
  // Créer une copie de la matrice pour garder l'originale intacte
  const copyMatrix = matrix.slice();
  // visited for cells visited with dfs
  const visited = new Set();
  //adding the first element 
  visited.add(start);
  let path = dfs(world,start, visited, copyMatrix,end);
  
return path;
}

function dfs(world, currentPosition, visited, matrix,end) {
  // Si on atteint la position finale, retourner le chemin
  if (currentPosition === end) {

    return [currentPosition];
  }

  // Obtenir les positions voisines
  const neighbors = getNeighbors(currentPosition, world.Width, world.Height);

  // Mélanger les positions voisines pour obtenir un ordre aléatoire
  shuffleArray(neighbors);

  // Parcourir les positions voisines
  for (const neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      // Marquer la position voisine comme visitée
      visited.add(neighbor);
      // Appeler récursivement l'algorithme DFS pour la position voisine
      
       
      let path= dfs(world, neighbor, visited, matrix,end);
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

function getNeighbors(position, Width, Height) {
  const i = Math.floor(position / Width);
  const j = position % Width;
  const neighbors = [];

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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export {
   shuffleArray, getNeighbors, dfs, randomPath, createMatrix, Road

}


function Road(world,start,end){
  let t=randomPath(world, createMatrix(world.Width, world.Height),start, end);
  //console.log(t)
  if(t.length!=0){
  for(let i=0;i<t.length;i++){
    let[x,y]=[Math.floor(t[i]/world.Width),t[i]%world.Width];
  //console.log(x,y)
    world.Matrix[x][y].typeActor=ActorsTypeList.Road;
  }
  }
  return world;
}
