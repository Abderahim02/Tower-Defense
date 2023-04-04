const W = require('../src/world');
const A = require('../src/actors');
const M = require('../src/movements'); 
const R = require('../src/rand_road');

//all world creatiion functions are to be modified after ts trandformation 

describe('world test suite', () => {

    test('world elements test', () => {
        let w={
            actors:[],
            Width:15,
            Height :10 ,
            score:0,
            Matrix:{}
        };
        w = W.initializeWorld(w);
        for(let i=0; i<world.Height; i++){
            for(let j=0;j<world.Width; j++){                    
                    expect(w.Matrix[i][j]).toBe({ x: i, y: j },
                         W.ActorsTypeList.Floor
                        );
            }
        }     
    });
    test('raise error if position not avaliable', () => {
        let w={
            actors:[],
            Width:15,
            Height :10 ,
            score:0,
            Matrix:{}
        };
        w = W.initializeWorld(w);
        expect(() => {
            M.available_position([0,1],w);
        }).toBe(true)

    });
});

describe('Actors test suite', () => {
    test('magic tower existance', () => {
        let w={
            actors:[],
            Width:15,
            Height :10 ,
            score:0,
            Matrix:{}
        };
        w = W.initializeWorld(w);
        expect(A.create_magic_tower(1,2,w)).toBe({ x: 1, y: 2 },
            W.ActorsTypeList.MagicTower
           );
    });
});


describe('mouvement test suite', () => {
    test('avaliabale position ', () => {
        let w={
            actors:[],
            Width:15,
            Height :10 ,
            score:0,
            Matrix:{}
        };
        w = W.initializeWorld(w);
        expect(A.create_magic_tower(1,2,w)).toBe({ x: 1, y: 2 },
            W.ActorsTypeList.MagicTower
           );
    });
    test('mouvements of enemies ', () => {
        let w={
            actors:[],
            Width:15,
            Height :10 ,
            score:0,
            Matrix:{}
        };
        w = W.initializeWorld(w);
        expect(A.create_magic_tower(1,2,w)).toBe({ x: 1, y: 2 },
            W.ActorsTypeList.MagicTower
           );
    });
});

describe('Tower atacks test ', () => {
    test('retruns error if actor not in range', () => {
        let w={
            actors:[],
            Width:15,
            Height :10 ,
            score:0,
            Matrix:{}
        };
        w = W.initializeWorld(w);
        let actor = 
        expect(A.create_magic_tower(1,2,w)).toBe({ x: 1, y: 2 },
            W.ActorsTypeList.MagicTower
           );
    });
    test('tower dammaging enemies', () => {
        let w={
            actors:[],
            Width:15,
            Height :10 ,
            score:0,
            Matrix:{}
        };
        w = W.initializeWorld(w);
        expect(A.create_magic_tower()).toBe({ x: 1, y: 2 },
            W.ActorsTypeList.MagicTower
           );
    });
});