

/*this is the type vertex, the vertex are named as numbers , we will 
define the heuristic later*/
export type Vertex = {
    s : number; 
  }
  
  /*the type graph it contains the adjacence matrix and the size
  which is the  number of vertexs */
  export type Graph = {
    mat: number[][];
    size : number;
  };
  
  /* the type arc, with its 3 attribute */ 
  export type Arc = {
    from: Vertex;
    to: Vertex;
    weight: number;
  };
  
  /* the main function that returns two arrays parents : decribing the tree form that 
  leads to the distances found and distances which are distances from the source s, the 
  order and names of vertexes follows the indexation of the array*/
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
  
  //this is the relax of arcs function 
  function Relax(e: Arc, G: Graph, d: number[], parent: number[], GRIS: Set<Vertex>, NOIR: Set<Vertex>) {
    const [x, y] = [e.from, e.to];
    if (d[x.s] + e.weight < d[y.s]) {
      d[y.s] = d[x.s] + e.weight;
      parent[y.s] = x.s;
      ColorNodeGray(y, GRIS, NOIR);
    }
  }
  
  //colors a vertex in gray
  function ColorNodeGray(y: Vertex, GRIS: Set<Vertex>, NOIR: Set<Vertex>) {
    if (NOIR.has(y)) {
      NOIR.delete(y);
      GRIS.add(y);
    } else if (!GRIS.has(y)) {
      GRIS.add(y);
    }
  }
  
  //colors a vertex in black
  function ColorNodeBlack(x: Vertex, GRIS: Set<Vertex>, NOIR: Set<Vertex>) {
    NOIR.add(x);
    GRIS.delete(x);
  }
  
  
  //initializes two arrays distances with  +oo and parents with -1
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
  
  //calculate d + h minimal 
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
  
  //returns a list of outgoing arcs from the vertex x
  function GetOutgoingArcs(x: Vertex, G: Graph): Arc[] {
    const arcs: Arc[] = [];
    for (let i = 0; i < G.mat[x.s].length; i++) {
      // console.log(`x.s = ${x.s}, i = ${i}`);
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
  
  //the heuristic function
  function Heuristic(v: Vertex, G: Graph): number {
    // implementation of the Heuristic function goes here
    if(v.s < Math.floor(Math.sqrt(G.size)/2)) return 2;
    return 1;
  }
  
  export {
    Astar
  };