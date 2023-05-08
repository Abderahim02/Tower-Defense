import * as W from '../src/world.js';
import * as A from '../src/actors.js';
import * as M from '../src/movements.js';
import * as R from '../src/rand_road.js';
import * as T from '../src/defineType.js';


//all world creatiion functions are to be modified after ts transformation 

// describe('world test suite', () => {

//     test('world elements test', () => {
//         let w=W.CreateWorld(15, 10);
//         w = W.initializeWorld(w);
//         for(let i=0; i<10; i++){
//             for(let j=0;j<15; j++){  
//                 //    expect(w.Matrix[i][j].Pos ).toBe({ x: i, y: j });
//                     //console.log(T.ActorsTypeList.Floor);
//                     expect(w.Matrix[i][j].AnActor).toBe(T.ActorsTypeList.Floor);
//             }
//         }     
//     });
//     test('raise error if position not avaliable', () => {
//         let w=W.CreateWorld(15, 10);
//         w = W.initializeWorld(w);
//         expect(M.AvailablePosition([0,1],w)).toBe(false);

//     });
// });
describe('AvailablePosition function', () => {
  let world=W.CreateWorld(5, 5);
  world = W.initializeWorld(world);

  beforeEach(() => {
    world = {
      Matrix: [
        [
          { Pos: { x: 0, y: 0 }, AnActor: T.ActorsTypeList.Road },
          { Pos: { x: 0, y: 1 }, AnActor: T.ActorsTypeList.Floor },
          { Pos: { x: 0, y: 2 }, AnActor: T.ActorsTypeList.River },
          { Pos: { x: 0, y: 3 }, AnActor: T.ActorsTypeList.Tree },
          { Pos: { x: 0, y: 4 }, AnActor: T.ActorsTypeList.Fire },

          
        ],
      ],
        Actors: [],
        Width: 5,
        Height: 5,
        Score: 0,
        Towers: [],
        
    };
  });
  // const world = {
  //   Height: 5,
  //   Width: 5,
  //   Matrix: [
  //     [
  //       { AnActor: { Type: 'Road' }, Pos: { x: 0, y: 0 } },
  //       { AnActor: { Type: 'Floor' }, Pos: { x: 0, y: 1 } },
  //       { AnActor: { Type: 'River' }, Pos: { x: 0, y: 2 } },
  //       { AnActor: { Type: 'Tree' }, Pos: { x: 0, y: 3 } },
  //       { AnActor: { Type: 'Fire' }, Pos: { x: 0, y: 4 } },
  //     ],
  //     // ... more rows ...
  //   ],
  // };

  test('should return true if move is available', () => {
    expect(M.AvailablePosition([1, 0], world)).toBeTruthy(); // Road
    expect(M.AvailablePosition([1, 1], world)).toBeFalsy(); // Floor
    expect(M.AvailablePosition([1, 2], world)).toBeFalsy(); // River
    expect(M.AvailablePosition([1, 3], world)).toBeFalsy(); // Tree
    expect(M.AvailablePosition([1, 4], world)).toBeFalsy(); // Fire
  });

  test('should return false if move is out of bounds', () => {
    expect(M.AvailablePosition([-1, 0], world)).toBeFalsy(); // out of bounds
    expect(M.AvailablePosition([5, 0], world)).toBeFalsy(); // out of bounds
    expect(M.AvailablePosition([1, -1], world)).toBeFalsy(); // out of bounds
    expect(M.AvailablePosition([1, 5], world)).toBeFalsy(); // out of bounds
  });
});

describe('Actors test suite', () => {
    test('magic tower existance', () => {
        let w=W.CreateWorld(15, 10);
        w = W.initializeWorld(w);
        expect(A.CreateMagicTower(1,2,w).Matrix[1][2].AnActor).toBe(T.ActorsTypeList.MagicTower);
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
            console.log(T.ActorsTypeList.BigMonster.Type);
            // console.log(M.SimpleMove(w.Matrix[1][2],w,T.ActorsTypeList.BigMonster.Type));
        expect(M.SimpleMove(w.Matrix[1][2],w,T.ActorsTypeList.BigMonster.Type)).toStrictEqual([1,2]);
    });
});

// describe('mouvement test suite', () => {
//     test('avaliabale position ', () => {
//         let w=W.CreateWorld(15, 10);
//         w = W.initializeWorld(w);
//         expect(A.CreateMagicTower(1,2,w).Matrix[1][2].Pos).toBe({ x: 1, y: 2 });
//         expect(A.CreateMagicTower(1,2,w).Matrix[1][2].AnActor).toBe(T.ActorsTypeList.MagicTower);
//     });
//     test('mouvements of enemies ', () => {
//         let w=W.CreateWorld(15, 10);
//         w = W.initializeWorld(w);
//         expect(A.CreateMagicTower(1,2,w).Matrix[1][2].Pos).toBe({ x: 1, y: 2 });
//         expect(A.CreateMagicTower(1,2,w).Matrix[1][2].AnActor).toBe(T.ActorsTypeList.MagicTower);
//     });
// });

// describe('Tower atacks test ', () => {
//     test('retruns error if actor not in range', () => {
//         let w=W.CreateWorld(15, 10);
//         w = W.initializeWorld(w);
//         expect(A.CreateMagicTower(1,2,w).Matrix[1][2].Pos).toBe({ x: 1, y: 2 });
//         expect(A.CreateMagicTower(1,2,w).Matrix[1][2].AnActor).toBe(T.ActorsTypeList.MagicTower);
//     });
//     test('tower dammaging enemies', () => {
//         let w=W.CreateWorld(15, 10);
//         w = W.initializeWorld(w);
//         expect(A.CreateMagicTower(1,2,w).Matrix[1][2].Pos).toBe({ x: 1, y: 2 });
//         expect(A.CreateMagicTower(1,2,w).Matrix[1][2].AnActor).toBe(T.ActorsTypeList.MagicTower);
//     });
// });

describe('a phase test ', () => {

    test('a phase test ', () => {
        let world= W.CreateWorld(15, 10);
        world = W.initializeWorld(world);
        const start : number = Math.floor(world.Height/2)*world.Width;
        const end : number = start-1;
        world = R.Road(W.initializeWorld(world),start,end);
        world = A.CreateSimpleTower(Math.floor(world.Height/2)+2,11,world);
        world=A.TowersPlacement(world);
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
            const aPhase : T.action[] = W.gamePhase(world);
            world = W.gameMotor( aPhase, world);
            for(let i=0; i<aPhase.length ; i++){
                const act : T.action = aPhase[i];
                expect(world.Matrix[act.aMove.NewPos.x][act.aMove.NewPos.y].AnActor.Type).toBe(act.AnActorInfos.AnActor.Type);
            }     
    });
});
//test for CreateMagicTower
describe('CreateMagicTower', () => {
    let world=W.CreateWorld(10, 10);
    world = W.initializeWorld(world);
    
    
    test('should add MagicTower to world matrix if position is available', () => {
      const i = 3;
      const j = 5;
      
      const result = A.CreateMagicTower(i, j, world);
      
      expect(result.Matrix[i][j]).toEqual({
        Pos: { x: i, y: j },
        AnActor: T.ActorsTypeList.MagicTower,
      });
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
      
      expect(result.Matrix[i][j]).toEqual({
        Pos: { x: i, y: j },
        AnActor: T.ActorsTypeList.SimpleTower,
      });
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
    let world=W.CreateWorld(3, 3);
    world = W.initializeWorld(world);

  beforeEach(() => {
    world = {
      Matrix: [
        [
          { Pos: { x: 0, y: 0 }, AnActor: T.ActorsTypeList.Floor },
          { Pos: { x: 0, y: 1 }, AnActor: T.ActorsTypeList.Floor },
          { Pos: { x: 0, y: 2 }, AnActor: T.ActorsTypeList.Floor },
        ],
        [
          { Pos: { x: 1, y: 0 }, AnActor: T.ActorsTypeList.Floor },
          { Pos: { x: 1, y: 1 }, AnActor: T.ActorsTypeList.BigMonster },
          { Pos: { x: 1, y: 2 }, AnActor:{Move: T.noMove, Type : "SimpleTower", Color : "\x1b[48;2;34;139;34m🏯\x1b[0m", HitPoints : 0, Cost : 1000,gain : 0, Damage: 1, AttackRange : 1}, },
        ],
        [
          { Pos: { x: 2, y: 0 }, AnActor: T.ActorsTypeList.Floor },
          { Pos: { x: 2, y: 1 }, AnActor: T.ActorsTypeList.Floor },
          { Pos: { x: 2, y: 2 }, AnActor: T.ActorsTypeList.Floor },
        ],
      ],
        Actors: [],
        Width: 3,
        Height: 3,
        Score: 0,
        Towers: [],
        
    };
  });

  it('should return an empty array if no enemies are in attack range', () => {
    const i = 0;
    const j = 0;
    const result = A.EnemiesInAttackRange(i, j, world);
    expect(result).toEqual([]);
  });

  it('should return an array of enemies in attack range', () => {
    const i = 1;
    const j = 2;
    const result = A.EnemiesInAttackRange(i, j, world);
    expect(result).toEqual([{ x: 1, y: 1 }]);
  });

  it('should handle attack range greater than 1', () => {
    const i = 1;
    const j = 2;
    world.Matrix[0][0].AnActor.Type =  T.ActorsTypeList.BigMonster.Type ;
    world.Matrix[2][2].AnActor.Type = T.ActorsTypeList.BigMonster.Type ;
    const result = A.EnemiesInAttackRange(i, j, world);
    console.log(result);
    expect(result).toEqual([{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }]);
  });
});
//test for TowerAttacks
describe('TowerAttacks', () => {
    let world=W.CreateWorld(10, 10);
    world = W.initializeWorld(world);

  test('should damage an enemy within range and increase the score', () => {
    const tower = {
      Pos: { x: 3, y: 3 },
      AnActor: T.ActorsTypeList.MagicTower,
    };
    const enemy = {
      Pos: { x: 5, y: 5 },
      AnActor: T.ActorsTypeList.BigMonster,
    };
    world.Matrix[tower.Pos.x][tower.Pos.y] = tower;
    world.Matrix[enemy.Pos.x][enemy.Pos.y] = enemy;

    jest.spyOn(global.Math, 'floor').mockReturnValue(0);

    world = A.TowersAttacks(world);

    expect(world.Matrix[enemy.Pos.x][enemy.Pos.y].AnActor.HitPoints).toBe(90);
    expect(world.Score).toBe(1);

   // global.Math.floor.mockRestore();
  });

  test('should not damage any enemy if none are within range', () => {
    const tower = {
      Pos: { x: 3, y: 3 },
      AnActor: T.ActorsTypeList.MagicTower,
    };
    world.Matrix[tower.Pos.x][tower.Pos.y] = tower;

   // jest.spyOn(A.EnemiesInAttackRange, 'mockReturnValue').mockReturnValue([]);

    world = A.TowersAttacks(world);

    expect(world.Score).toBe(0);

   // EnemiesInAttackRange.mockRestore();
  });
});

//testing for function display 

// describe('display', () => {
//   let mockWorld = W.CreateWorld(2, 2);
//     mockWorld = W.initializeWorld(mockWorld);
//     beforeEach(() => {
//     mockWorld = {
//       Width: 2,
//       Height: 2,
//       Score: 0,
//       Matrix: [
//         [
//           {
//             Pos: { x: 0, y: 0 },
//             AnActor: T.ActorsTypeList.SimpleMonster ,
//           },
//           {Pos: { x: 0, y: 1 },
//             AnActor: T.ActorsTypeList.SimpleTower ,
//           },
//         ],
//         [
//           {Pos: { x: 1, y: 0 },
//             AnActor: T.ActorsTypeList.Road ,
//           },
//           {Pos  : { x: 1, y: 1 },
//             AnActor: T.ActorsTypeList.Tree ,
//           },
//         ],
//       ],
//       Actors: [],
//       Towers: [],
//     };
//     });
        
//   it('should display the world with correct colors', () => {
//     const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
//     const start : number = Math.floor(mockWorld.Height/2)*mockWorld.Width;
//     const end : number = start-1;
//     W.display(mockWorld, end);
//     expect(mockConsoleLog).toHaveBeenCalledWith(
//       expect.stringContaining(T.ActorsTypeList.SimpleMonster.Color)
//     );
//     expect(mockConsoleLog).toHaveBeenCalledWith(
//       expect.stringContaining(T.ActorsTypeList.SimpleTower.Color)
//     );
//     expect(mockConsoleLog).toHaveBeenCalledWith(
//       expect.stringContaining(T.ActorsTypeList.Road.Color)
//     );
//     expect(mockConsoleLog).toHaveBeenCalledWith(
//       expect.stringContaining(T.ActorsTypeList.Tree.Color)
//     );
//     mockConsoleLog.mockRestore();
//   });

//   it('should display the score', () => {
//     const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
//     const start : number = Math.floor(mockWorld.Height/2)*mockWorld.Width;
//     const end : number = start-1;
//     W.display(mockWorld, end);
//     expect(mockConsoleLog).toHaveBeenCalledWith(
//       expect.stringContaining(`Score : ${mockWorld.Score}`)
//     );
//     mockConsoleLog.mockRestore();
//   });
// });


describe('display function', () => {
  test('should print the world with the correct colors and score', () => {
    const world = W.CreateWorld(5, 5);
    world.Matrix[2][2].AnActor = T.ActorsTypeList.SimpleTower;
    world.Matrix[3][3].AnActor = T.ActorsTypeList.MagicTower;
    world.Matrix[1][1].AnActor = T.ActorsTypeList.SimpleMonster;
    world.Matrix[4][4].AnActor = T.ActorsTypeList.BigMonster;
    world.Score = 10;
    const expectedOutput = "🕸️ 🕸️ 🕸️ 🕸️ 🕸️ 🕸️ 🕸️ 🕸️  Score : 10 💀 🕸️ 🕸️ 🕸️ 🕸️ 🕸️ 🕸️ 🕸️ 🕸️ 🕸️ 🕸️ 🕸️ 🕸️ 🕸️ 🕸️ 🕸️ "
    // " ▒ ▒ ▒ ▒ ▒"
    // " ▒   ▒ ▒ ▒"
;
    const spy = jest.spyOn(console, 'log').mockImplementation();
    W.display(world, 4);
    expect(spy).toHaveBeenCalledWith(expectedOutput);
    spy.mockRestore();
  });
});
