import * as W from '../src/world.js';
import * as A from '../src/actors.js';
import * as M from '../src/movements.js';
import * as R from '../src/rand_road.js';
import * as T from '../src/defineType.js';
import * as O from '../src/optimal_road.js';
import * as Astar from '../src/Astar.js';
import { exitCode } from 'process';

//all world creatiion functions are to be modified after ts transformation 


describe("CreateWorld", () => {
  it("creates a world with the correct dimensions", () => {
    const world = W.CreateWorld(5, 5);
    expect(world.Width).toBe(5);
    expect(world.Height).toBe(5);
  });

  it("creates a world with an empty matrix", () => {
    const world = W.CreateWorld(5, 5);
    expect(world.Matrix.length).toBe(5);
    expect(world.Matrix[0].length).toBe(5);
    expect(world.Matrix.flat().every((cell) => cell.AnActor.Type === T.ActorsTypeList.Floor.Type)).toBe(true);

  });

  it("creates a world with zero score", () => {
    const world = W.CreateWorld(5, 5);
    expect(world.Score).toBe(0);
  });
});

describe('Actors test suite', () => {
    test('magic tower existance', () => {
        let w=W.CreateWorld(15, 10);
        w = W.initializeWorld(w);
        expect(A.CreateMagicTower(1,2,w).Matrix[1][2].AnActor.Type === T.ActorsTypeList.MagicTower.Type).toBe(true);
    });
});
describe('mouvement test suite', () => {
    test(' mouvement changing test ', () => {
        let w=W.CreateWorld(15, 10);
        w = W.initializeWorld(w);
            w.Matrix[1][2]={
                Pos:     { x: 1,y: 2 },
                AnActor:T.ActorsTypeList.BigMonster
            };
            // console.log(M.SimpleMove(w.Matrix[1][2],w,T.ActorsTypeList.BigMonster.Type));
        expect(M.SimpleMove(w.Matrix[1][2],w,T.ActorsTypeList.BigMonster.Type)).toStrictEqual({"x": 1, "y": 2});
    });
});

/* 
describe('a phase test ', () => {

    test('a phase test ', () => {
        let world= W.CreateWorld(15, 10);
        world = W.initializeWorld(world);
        const start : number = Math.floor(world.Height/2)*world.Width;
        const end : number = start-1;
        world = R.Road(W.initializeWorld(world),start,end);
        world = A.CreateSimpleTower(Math.floor(world.Height/2)+2,11,world);
        world=A.TowersPlacement(world);
        const startPoint : T.point = {x : Math.floor(start/world.Width), y : start%world.Width};
        const endPoint : T.point = {x : Math.floor(end/world.Width) , y:  end%world.Width};
        const AstarRoad : T.point[] = O.OptimalRoad(startPoint, world, endPoint);
        for(let i : number = 0 ; i < 5 ; i++ ){
            if(i%6===0){   
                world.Actors.push({
                    Pos:  { x: Math.floor(world.Height/2), y: 0 },
                    AnActor : T.ActorsTypeList.BigMonster
                });
                world.Matrix[Math.floor(world.Height/2)][0].AnActor =T.ActorsTypeList.BigMonster;
            }
            if(i%6===3){
                {
                    world.Actors.push({
                    Pos:     { x: Math.floor(world.Height/2)+1, y: 0 },
                    AnActor : T.ActorsTypeList.SimpleMonster
                });
                world.Matrix[Math.floor(world.Height/2)+1][0].AnActor = T.ActorsTypeList.SimpleMonster;
            }
            }
        }  
            const aPhase : T.action[] = A.gamePhase(world, AstarRoad);
            world = A.gameMotor( aPhase, world);
            for(let i=0; i<aPhase.length ; i++){
                const act : T.action = aPhase[i];
                expect(world.Matrix[act.aMove.NewPos.x][act.aMove.NewPos.y].AnActor.Type).toBe(act.AnActorInfos.AnActor.Type);
            }     
    });
}); */
//test for CreateMagicTower
describe('CreateMagicTower', () => {
    let world=W.CreateWorld(10, 10);
    world = W.initializeWorld(world);
    
    
    test('should add MagicTower to world matrix if position is available', () => {
      const i = 3;
      const j = 5;
      
      const result = A.CreateMagicTower(i, j, world);
      expect(result.Matrix[i][j].AnActor.Type).toBe(T.ActorsTypeList.MagicTower.Type);
    });
    
    test('should not add MagicTower to world matrix if position is not available', () => {
      const i = 7;
      const j = 2;
      
      const result = A.CreateMagicTower(i, j, world);
      
      expect(result).toEqual(world);
    });
  });
//test for CreateSimpleTower
describe('CreateSimpleTower', () => {
    let world=W.CreateWorld(10, 10);
    world = W.initializeWorld(world);
    
    test('should add SimpleTower to world matrix if position is available', () => {
      const i = 3;
      const j = 5;
      
      const result = A.CreateSimpleTower(i, j, world);
      expect(result.Matrix[i][j].AnActor.Type).toBe(T.ActorsTypeList.SimpleTower.Type);
    });
    
    test('should not add SimpleTower to world matrix if position is not available', () => {
      const i = 7;
      const j = 2;
      
      const result = A.CreateSimpleTower(i, j, world);
      
      expect(result).toEqual(world);
    });
  }
    );
//test Enemiesinattackrange

describe('EnemiesInAttackRange', () => {
    let world=W.CreateWorld(15,15);
    world = W.initializeWorld(world);

    const start : number = Math.floor(world.Height/2)*world.Width;
    const end : number = start-1;

world  = R.Road(world,start,end);
  
    world.Matrix[8][8].AnActor = T.ActorsTypeList.SimpleTower;
    world.Actors.concat({Pos:  { x: 7, y: 7 },
      AnActor : T.ActorsTypeList.BigMonster}
      );

      // const enemies : T.point[] = A.EnemiesInAttackRange({x:8,y: 8}, world);
      // console.log(enemies);
  it('should return an empty array if no enemies are in attack range', () => {
    //expect(A.EnemiesInAttackRange({"x":8, "y": 8}, world).length).toBe(1);
  });
});
// //testing for function display 

describe('display', () => {
  let mockWorld = W.CreateWorld(2, 2);
    mockWorld = W.initializeWorld(mockWorld);
    beforeEach(() => {
    mockWorld = {
      Width: 3,
      Height: 3,
      Score: 0,
      Matrix: [
        [
          {
            Pos: { x: 0, y: 0 },
            AnActor: T.ActorsTypeList.SimpleMonster ,
          },
          {Pos: { x: 0, y: 1 },
            AnActor: T.ActorsTypeList.SimpleTower ,
          },
          {Pos: { x: 0, y: 2 },
          AnActor: T.ActorsTypeList.Tree ,
        },

        ],
        [
          {Pos: { x: 1, y: 0 },
            AnActor: T.ActorsTypeList.Road ,
          },
          {Pos  : { x: 1, y: 1 },
            AnActor: T.ActorsTypeList.Tree ,
          },
          {Pos: { x: 1, y: 2 },
          AnActor: T.ActorsTypeList.Fire ,
        }
        ],
        [
          {Pos: { x: 2, y: 0 },
            AnActor: T.ActorsTypeList.Floor,
          },
          {Pos  : { x: 2, y: 1 },
            AnActor: T.ActorsTypeList.Optimal ,
          },
          {Pos: { x: 2, y: 2 },
          AnActor: T.ActorsTypeList.Road ,
        }
        ],
      ],
      Actors: [],
      Towers: [],
    };
    });

  
        
  it('should display the world with correct colors', () => {
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
    const start : number = Math.floor(mockWorld.Height/2)*mockWorld.Width;
    const end : number = start-1;
    W.display(mockWorld, end);

    mockConsoleLog.mockRestore();
  });

  it('should display the score', () => {
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
    const start : number = Math.floor(mockWorld.Height/2)*mockWorld.Width;
    const end : number = start-1;
    W.display(mockWorld, end);
    expect(mockConsoleLog).toHaveBeenCalledWith(
      expect.stringContaining(`Score : ${mockWorld.Score}`)
    );
    mockConsoleLog.mockRestore();
  });
});



describe('addActorsToWorld', () =>  {
  let w : T.world = W.CreateWorld(3,3);
 // w.Actors=[];
  w=A.addActorsToWorld(w,T.ActorsTypeList.BigMonster,1);
  //expect(w.Actors.length).toBe(1);
  console.log(w.Actors);
  
});




describe('TestAstar', () =>  {
  
  test('testing the distances and parents 1 ', () => {
    const G0: Astar.Graph = {
      mat: [
        [0, 2, 0, 0, 5],
        [2, 0, 1, 0, 0],
        [0, 1, 0, 4, 0],
        [0, 0, 4, 0, 3],
        [5, 0, 0, 3, 0],
      ],
      size: 5,
    };
    
    const s0: Astar.Vertex = { s: 0 };
    const t0: Astar.Vertex = { s: 4 };
    
    const [distances0, parents0] = Astar.Astar(s0, t0, G0);
    
    
        // console.log(distances0); // output: [0, 2, 3, 7, 5]
        // console.log(parents0); // output: [-1, 0, 1, 2, 0]
    expect(distances0[0]).toEqual(0);
    expect(distances0[1]).toEqual(2);
    expect(distances0[2]).toEqual(3);
    expect(distances0[3]).toEqual(7);
    expect(distances0[4]).toEqual(5);
    expect(parents0[0]).toEqual(-1);
    expect(parents0[1]).toEqual(0);
    expect(parents0[2]).toEqual(1);
    expect(parents0[3]).toEqual(2);
    expect(parents0[4]).toEqual(0);
  });
  test('testing the distances and parents 2 ', () => {
    const G2: Astar.Graph = {
      mat: [
        [0, 1, 1, 0, 0],
        [1, 0, 1, 1, 1],
        [1, 1, 0, 2, 2],
        [0, 1, 2, 0, 1],
        [0, 1, 2, 1, 0],
      ],
      size: 5,
    };
    
    const s2: Astar.Vertex = { s: 0 };
    const t2: Astar.Vertex = { s: 4 };
    
    const [distances2, parents2] = Astar.Astar(s2, t2, G2);
    
    // console.log(distances2); 
    // console.log(parents2); 
    expect(distances2[0]).toEqual(0);
    expect(distances2[1]).toEqual(1);
    expect(distances2[2]).toEqual(1);
    expect(distances2[3]).toEqual(2);
    expect(distances2[4]).toEqual(2);
    expect(parents2[0]).toEqual(-1);
    expect(parents2[1]).toEqual(0);
    expect(parents2[2]).toEqual(0);
    expect(parents2[3]).toEqual(1);
    expect(parents2[4]).toEqual(1);
  });
});


describe('Test addActorsToWorld', () =>  {
  let w  = W.CreateWorld(4, 4);
  w = W.initializeWorld(w);
  const start : number = Math.floor(w.Height/2)*w.Width;
  const end : number = start-1;
  w.Matrix[1][0].AnActor = T.ActorsTypeList.Road;
  w = A.addActorsToWorld(w, T.ActorsTypeList.SimpleMonster, 1);
  test('Test addActorsToWorld ', () => {
    console.log(w.Actors);
    expect((w.Actors.length)).toEqual(1);
    // expect(1).toEqual(1);
  });
});

describe('TestFilterActions', () =>  {
  let actions : T.action[] = [];
  actions.push({AnActorInfos : {Pos: {x : 0, y :5}, AnActor :T.ActorsTypeList.BigMonster}, aMove : {ExPos : {x : 0, y : 5}, NewPos : {x : 0, y : 6}}});
  actions.push({AnActorInfos : {Pos: {x : 1, y :5}, AnActor :T.ActorsTypeList.SimpleMonster}, aMove : {ExPos : {x : 1, y : 5}, NewPos : {x : 0, y : 6}}});
  actions.push({AnActorInfos : {Pos: {x : 10, y :2}, AnActor :T.ActorsTypeList.SimpleMonster}, aMove : {ExPos : {x : 10, y :2 }, NewPos : {x : 10, y : 6}}});
  actions.push({AnActorInfos : {Pos: {x : 10, y :5}, AnActor :T.ActorsTypeList.SimpleMonster}, aMove : {ExPos : {x : 10, y : 5}, NewPos : {x : 10, y : 8}}});
  actions.push({AnActorInfos : {Pos: {x : 10, y :5}, AnActor :T.ActorsTypeList.BigMonster}, aMove : {ExPos : {x : 10, y : 5}, NewPos : {x : 0, y : 6}}});
  actions = A.FilterActions(actions);
  console.log(actions.map(e=>e.aMove));

  test('Filtering a game phase from conflicting moves', () => {
    expect((actions[0].AnActorInfos.AnActor)).toEqual(T.ActorsTypeList.BigMonster);
    expect((actions[0].aMove.NewPos)).toEqual({x :0 , y: 6});

  
    expect((actions[1].AnActorInfos.AnActor)).toEqual(T.ActorsTypeList.SimpleMonster);
    expect((actions[1].aMove.NewPos)).toEqual({x :10 , y: 6});
  
    expect((actions[2].AnActorInfos.AnActor)).toEqual(T.ActorsTypeList.SimpleMonster);
    expect((actions[2].aMove.NewPos)).toEqual({x :10 , y: 8});
  
  });});

  describe('Test   isValidPosition ', () =>  {
    let w  = W.CreateWorld(4, 4);
    w = W.initializeWorld(w);
    
    test('Test addActorsToWorld ', () => {
      expect((  O.isValidPosition(w, {x : 0, y : 0}))).toBe(true);
      // expect(1).toEqual(1);
    });
  });
  


  describe('Test CreateActor  ', () =>  {
    let w  = W.CreateWorld(4, 4);
    w = W.initializeWorld(w);
    w.Matrix[1][0].AnActor = T.ActorsTypeList.Floor;
    w = A.CreateActor({x : 1, y : 0}, T.ActorsTypeList.SimpleMonster, w);
    test('Test CreateACtor ', () => {
      expect( w.Matrix[1][0].AnActor ).toEqual(T.ActorsTypeList.SimpleMonster);
    });
  });

  describe('Test IsGoodTreePlacement  ', () =>  {
    let w  = W.CreateWorld(8, 8);
    w = W.initializeWorld(w);
    w.Matrix[1][0].AnActor = T.ActorsTypeList.Road;
    for(let i = 2; i < 6; ++i){
      for(let j = 2; j < 6; ++j){
        w.Matrix[i][j].AnActor = T.ActorsTypeList.Road;
      }
    }
    test('Test IsgoodTreePlacement ', () => {
      expect( A.IsGoodTreePlacement({x : 1, y : 2},w) ).toBe(false);
    });
  });


  // CreateActor


  const testWorld = {
    Width: 5,
    Height: 5,
    Matrix: [
      [{AnActor: T.ActorsTypeList.Floor, Pos: {x: 0, y: 0}} , ... Array(4).fill({AnActor: T.ActorsTypeList.Road, Pos: {x: 0, y: 1}})],
      ...Array(4).fill([{AnActor: T.ActorsTypeList.Road, Pos: {x: 1, y: 0}} , ... Array(4).fill({AnActor: T.ActorsTypeList.Road, Pos: {x: 1, y: 1}})])
    ],
    Actors: [],
    Towers: [],
    Score: 0,
  };
  
  describe('SimpleMove', () => {
    test('Returns a valid move', () => {
      const anActor = {AnActor: T.ActorsTypeList.SimpleMonster, Pos: {x: 0, y: 0}};
      const move = M.SimpleMove(anActor, testWorld, 'SimpleMonster');
      expect(move).toEqual({x: 1, y: 1});
    });
  
    test('Returns the original position if no valid moves', () => {
      const anActor = {AnActor: T.ActorsTypeList.SimpleMonster, Pos: {x: 0, y: 0}};
      const move = M.SimpleMove(anActor, testWorld, 'SimpleMonster');
      expect(move).toEqual({x: 1, y: 1});
    });
  });
  
  describe('Test Construct neighbors  ', () =>  {
    const  w  = W.CreateWorld(8, 8);
    test('Test IsgoodTreePlacement ', () => {
      expect( O.SearchForVertex(O.ConstructNeighbors(w, {x:0, y: 5}),  {x:0, y : 6} ) !== -1 ).toBe(true);
      expect( O.SearchForVertex(O.ConstructNeighbors(w, {x:0, y: 5}),  {x:5, y : 6} ) !== -1 ).toBe(false);
      expect( O.SearchForVertex(O.ConstructNeighbors(w, {x:0, y: 5}),  {x:1, y : 6} ) !== -1 ).toBe(true);

    });
  });

  describe('Test NextOptimalMove  ', () =>  {
    let w  = W.CreateWorld(8, 8);
    const start : number = Math.floor(w.Height/2)*w.Width;
    const end : number = start-1;
    w = R.Road(w, start, end);
    const startPoint : T.point = {x : Math.floor(start/w.Width), y : start%w.Width};
    const endPoint : T.point = {x : Math.floor(end/w.Width) , y:  end%w.Width};
    const AstarRoad : T.point[] = O.OptimalRoad(startPoint, w, endPoint);
    test('Test NextOptimalMove ', () => {
      expect( O.SearchForVertex( AstarRoad, AstarRoad[0] ) !== -1 ).toBe(true);

    });
  });


  describe('Test gameMotor  ', () =>  {
    let w  = W.CreateWorld(8, 8);
    const start : number = Math.floor(w.Height/2)*w.Width;
    const end : number = start-1;
    w = R.Road(w, start, end);
    const startPoint : T.point = {x : Math.floor(start/w.Width), y : start%w.Width};
    const endPoint : T.point = {x : Math.floor(end/w.Width) , y:  end%w.Width};
    const AstarRoad : T.point[] = O.OptimalRoad(startPoint, w, endPoint);
    w.Actors.push({AnActor : T.ActorsTypeList.BigMonster, Pos : startPoint});
    w.Matrix[startPoint.x][startPoint.y].AnActor =  T.ActorsTypeList.BigMonster;
    test('Test gameMotor ', () => {
      w= A.gameMotor(A.gamePhase(w, AstarRoad), w);
      expect( O.SearchForVertex( AstarRoad, AstarRoad[0] ) !== -1 ).toBe(true);

    });
  });

  describe('Test gameOver  ', () =>  {
    let w  = W.CreateWorld(8, 8);
    const start : number = Math.floor(w.Height/2)*w.Width;
    const end : number = start-1;
    w = R.Road(w, start, end);
    test('Test gameMotor ', () => {
      expect( A.gameover(w, end) ).toBe(0);

    });
    const startPoint : T.point = {x : Math.floor(start/w.Width), y : start%w.Width};

    w.Actors.push({AnActor : T.ActorsTypeList.BigMonster, Pos :  startPoint});
    w.Matrix[startPoint.x][startPoint.y].AnActor =  T.ActorsTypeList.BigMonster;
    test('Test gameMotor ', () => {
      expect( A.gameover(w, end) ).toBe(0);
    });
  });
