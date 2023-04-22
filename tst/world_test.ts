import * as W from '../src/world';
import * as A from '../src/actors';
import * as M from '../src/movements';
import * as R from '../src/rand_road';

//all world creatiion functions are to be modified after ts trandformation 

describe('world test suite', () => {

    test('world elements test', () => {
        let w=W.CreateWorld(15, 10);
        w = W.initializeWorld(w);
        for(let i=0; i<w.Height; i++){
            for(let j=0;j<w.Width; j++){                    
                    expect(w.Matrix[i][j].Pos).toBe({ x: i, y: j });
                    expect(w.Matrix[i][j].AnActor).toBe(W.ActorsTypeList.Floor);
            }
        }     
    });
    test('raise error if position not avaliable', () => {
        let w=W.CreateWorld(15, 10);
        w = W.initializeWorld(w);
        expect(M.AvailablePosition([0,1],w)).toBe(true);

    });
});

describe('Actors test suite', () => {
    test('magic tower existance', () => {
        let w=W.CreateWorld(15, 10);
        w = W.initializeWorld(w);
        expect(A.CreateMagicTower(1,2,w).Matrix[1][2].Pos).toBe({ x: 1, y: 2 });
        expect(A.CreateMagicTower(1,2,w).Matrix[1][2].AnActor).toBe(W.ActorsTypeList.MagicTower);
    });
});


describe('mouvement test suite', () => {
    test('avaliabale position ', () => {
        let w=W.CreateWorld(15, 10);
        w = W.initializeWorld(w);
        expect(A.CreateMagicTower(1,2,w).Matrix[1][2].Pos).toBe({ x: 1, y: 2 });
        expect(A.CreateMagicTower(1,2,w).Matrix[1][2].AnActor).toBe(W.ActorsTypeList.MagicTower);
    });
    test('mouvements of enemies ', () => {
        let w=W.CreateWorld(15, 10);
        w = W.initializeWorld(w);
        expect(A.CreateMagicTower(1,2,w).Matrix[1][2].Pos).toBe({ x: 1, y: 2 });
        expect(A.CreateMagicTower(1,2,w).Matrix[1][2].AnActor).toBe(W.ActorsTypeList.MagicTower);
    });
});

describe('Tower atacks test ', () => {
    test('retruns error if actor not in range', () => {
        let w=W.CreateWorld(15, 10);
        w = W.initializeWorld(w);
        expect(A.CreateMagicTower(1,2,w).Matrix[1][2].Pos).toBe({ x: 1, y: 2 });
        expect(A.CreateMagicTower(1,2,w).Matrix[1][2].AnActor).toBe(W.ActorsTypeList.MagicTower);
    });
    test('tower dammaging enemies', () => {
        let w=W.CreateWorld(15, 10);
        w = W.initializeWorld(w);
        expect(A.CreateMagicTower(1,2,w).Matrix[1][2].Pos).toBe({ x: 1, y: 2 });
        expect(A.CreateMagicTower(1,2,w).Matrix[1][2].AnActor).toBe(W.ActorsTypeList.MagicTower);
    });
});