// import * as W from '../src/world.js';

export type Vertex = {
  s : number; 
}

export type Graph = {
  mat: number[][];
  size : number;
};

export type Arc = {
  from: Vertex;
  to: Vertex;
  weight: number;
};


function Astar(s: Vertex, t: Vertex, G: Graph): [number[], number[]] {
  const [distances, parents] = Initialization(s, G);
  const GRIS = new Set([s]);
  const NOIR = new Set<Vertex>();
  const b : number = 1;
  while (b !== 0) {
    if (GRIS.size === 0) {
      return [distances, parents];
    }
    const x = CalculateDplusHmin(GRIS, distances, G);
    if (x === t) {
      return [distances, parents];
    }
    const L = GetOutgoingArcs(x, G);
    for (let i = 0; i < L.length; i++) {
      Relax(L[i], G, distances, parents, GRIS, NOIR);
    }
    ColorNodeBlack(x, GRIS, NOIR);
  }
  return [distances, parents];
}

function Relax(e: Arc, G: Graph, d: number[], parent: number[], GRIS: Set<Vertex>, NOIR: Set<Vertex>) {
  const [x, y] = [e.from, e.to];
  if (d[x.s] + e.weight < d[y.s]) {
    d[y.s] = d[x.s] + e.weight;
    parent[y.s] = x.s;
    ColorNodeGray(y, GRIS, NOIR);
  }
}

function ColorNodeGray(y: Vertex, GRIS: Set<Vertex>, NOIR: Set<Vertex>) {
  if (NOIR.has(y)) {
    NOIR.delete(y);
    GRIS.add(y);
  } else if (!GRIS.has(y)) {
    GRIS.add(y);
  }
}

function ColorNodeBlack(x: Vertex, GRIS: Set<Vertex>, NOIR: Set<Vertex>) {
  NOIR.add(x);
  GRIS.delete(x);
}

function Initialization(s: Vertex, G: Graph): [number[], number[]] {
  const d : number[] = new Array(G.size);
  const parent : number[] = new Array(G.size);
  for (let v = 0; v < G.size; ++v) {
    d[v] = Infinity;
    parent[v] = -1;
  }
  d[s.s] = 0;
  return [d, parent];
}

// function CalculateDplusHmin(GRIS: Set<Vertex>, d: number[], G: Graph): Vertex {
//     let x: Vertex | null = null;
//     let min_val = Infinity;
//     for (let v of GRIS) {
//       if (d[v.s] + Heuristic(v, G) < min_val) {
//         x = v;
//         min_val = d[v.s] + Heuristic(v, G);
//       }
//     }
//     return x!;
//   }
function CalculateDplusHmin(GRIS: Set<Vertex>, d: number[], G: Graph): Vertex {
  let x: Vertex | null = null;
  let min_val = Infinity;
  for (let iter = GRIS.values(), val = iter.next(); !val.done; val = iter.next()) {
      const v = val.value;
      if (d[v.s] + Heuristic(v, G) < min_val) {
          x = v;
          min_val = d[v.s] + Heuristic(v, G);
      }
  }
  return x!;
}

function GetOutgoingArcs(x: Vertex, G: Graph): Arc[] {
  const arcs: Arc[] = [];
  for (let i = 0; i < G.mat[x.s].length; i++) {
    if (G.mat[x.s][i] !== 0) {
      arcs.push({
        from: x,
        to: { s: i },
        weight: G.mat[x.s][i],
      });
    }
  }
  return arcs;
}

function get_weight(e: Arc, G: Graph): number {
  return G.mat[e.from.s][e.to.s];
}

function Heuristic(v: Vertex, G: Graph): number {
  // implementation of the Heuristic function goes here
  return 0.5;
}

function TestAstar(){
  const G: Graph = {
      mat: [
        [0, 2, 0, 0, 5],
        [2, 0, 1, 0, 0],
        [0, 1, 0, 4, 0],
        [0, 0, 4, 0, 3],
        [5, 0, 0, 3, 0],
      ],
      size: 5,
    };
    
    const s: Vertex = { s: 0 };
    const t: Vertex = { s: 4 };
    
    const [distances, parents] = Astar(s, t, G);
    
    console.log(distances); // output: [0, 2, 3, 7, 5]
    console.log(parents); // output: [-1, 0, 1, 2, 0]
}
TestAstar();
