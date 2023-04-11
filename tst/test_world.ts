import * as W from '../src/world.js';
import * as A from '../src/actors.js';
import * as M from '../src/movements.js';
import * as R from '../src/rand_road.js';

//all world creatiion functions are to be modified after ts trandformation 

describe('world test suite', () => {

    test('world elements test', () => {
        let w=W.CreateWorld(15, 10);
        w = W.initializeWorld(w);
        for(let i=0; i<15; i++){
            for(let j=0;j<10; j++){                    
                    expect(w.Matrix[i][j].Pos).toBe({ x: i, y: j });
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