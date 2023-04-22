import * as W from '../src/world.js';
import * as A from '../src/actors.js';
import * as M from '../src/movements.js';
import * as R from '../src/rand_road.js';

//all world creatiion functions are to be modified after ts trandformation 

describe('world test suite', () => {

    test('world elements test', () => {
        let w=W.CreateWorld(15, 10);
        w = W.initializeWorld(w);
        for(let i=0; i<10; i++){
            for(let j=0;j<15; j++){  
                //    expect(w.Matrix[i][j].Pos ).toBe({ x: i, y: j });
                    //console.log(W.ActorsTypeList.Floor);
                    expect(w.Matrix[i][j].AnActor).toBe(W.ActorsTypeList.Floor);
            }
        }     
    });
    test('raise error if position not avaliable', () => {
        let w=W.CreateWorld(15, 10);
        w = W.initializeWorld(w);
        expect(M.AvailablePosition([0,1],w)).toBe(false);

    });
});

describe('Actors test suite', () => {
    test('magic tower existance', () => {
        let w=W.CreateWorld(15, 10);
        w = W.initializeWorld(w);
        expect(A.CreateMagicTower(1,2,w).Matrix[1][2].AnActor).toBe(W.ActorsTypeList.MagicTower);
    });
});
describe('mouvement test suite', () => {
    test(' mouvement changing test ', () => {
        let w=W.CreateWorld(15, 10);
        w = W.initializeWorld(w);
            w.Matrix[1][2]={
                Pos:     { x: 1,y: 2 },
                AnActor:W.ActorsTypeList.BigMonster
            };
            console.log(W.ActorsTypeList.BigMonster.Type);
            // console.log(M.SimpleMove(w.Matrix[1][2],w,W.ActorsTypeList.BigMonster.Type));
        expect(M.SimpleMove(w.Matrix[1][2],w,W.ActorsTypeList.BigMonster.Type)).toBe([1,2]);
    });
});

// describe('mouvement test suite', () => {
//     test('avaliabale position ', () => {
//         let w=W.CreateWorld(15, 10);
//         w = W.initializeWorld(w);
//         expect(A.CreateMagicTower(1,2,w).Matrix[1][2].Pos).toBe({ x: 1, y: 2 });
//         expect(A.CreateMagicTower(1,2,w).Matrix[1][2].AnActor).toBe(W.ActorsTypeList.MagicTower);
//     });
//     test('mouvements of enemies ', () => {
//         let w=W.CreateWorld(15, 10);
//         w = W.initializeWorld(w);
//         expect(A.CreateMagicTower(1,2,w).Matrix[1][2].Pos).toBe({ x: 1, y: 2 });
//         expect(A.CreateMagicTower(1,2,w).Matrix[1][2].AnActor).toBe(W.ActorsTypeList.MagicTower);
//     });
// });

// describe('Tower atacks test ', () => {
//     test('retruns error if actor not in range', () => {
//         let w=W.CreateWorld(15, 10);
//         w = W.initializeWorld(w);
//         expect(A.CreateMagicTower(1,2,w).Matrix[1][2].Pos).toBe({ x: 1, y: 2 });
//         expect(A.CreateMagicTower(1,2,w).Matrix[1][2].AnActor).toBe(W.ActorsTypeList.MagicTower);
//     });
//     test('tower dammaging enemies', () => {
//         let w=W.CreateWorld(15, 10);
//         w = W.initializeWorld(w);
//         expect(A.CreateMagicTower(1,2,w).Matrix[1][2].Pos).toBe({ x: 1, y: 2 });
//         expect(A.CreateMagicTower(1,2,w).Matrix[1][2].AnActor).toBe(W.ActorsTypeList.MagicTower);
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
                    AnActor : W.ActorsTypeList.BigMonster
                });
                world.Matrix[Math.floor(world.Height/2)][0].AnActor =W.ActorsTypeList.BigMonster;
            }
            if(i%6===3){
                {
                    world.Actors.push({
                    Pos:     { x: Math.floor(world.Height/2)+1, y: 0 },
                    AnActor : W.ActorsTypeList.SimpleMonster
                });
                world.Matrix[Math.floor(world.Height/2)+1][0].AnActor = W.ActorsTypeList.SimpleMonster;
            }
            }
        }  
            const aPhase : W.action[] = W.gamePhase(world);
            world = W.gameMotor( aPhase, world);
            for(let i=0; i<aPhase.length ; i++){
                const act : W.action = aPhase[i];
                expect(world.Matrix[act.aMove.NewPos.x][act.aMove.NewPos.y].AnActor.Type).toBe(act.AnActorInfos.AnActor.Type);
            }     
    });
});