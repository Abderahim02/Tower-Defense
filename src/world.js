"use strict";
exports.__esModule = true;
exports.CreateWorld = exports.initializeWorld = exports.display = exports.ActorsTypeList = void 0;
var movements_ts_1 = require("./movements.ts");
// let actor : number = 5;
//This is a list of all types of actors
// const ActorsTypeList = {
//     SimpleMonster : {Movement:SimpleMove, type : "SimpleMonster", Color : "\x1b[37m  \x1b[0m", HitPoints : 3},
//     BigMonster : {Movement:SimpleMove, type : "BigMonster", Color : "\x1b[37m🦌\x1b[0m",  : 3},
//     SimpleTower : {dx : 0, dy : 0, type : "SimpleTower", Color : "\x1b[48;2;34;139;34m🏯\x1b[0m", cost : 1000, Damage: 5, AttackRange : 5},
//     MagicTower : {dx : 0, dy : 0, type : "MagicTower", Color : "\x1b[37m⛪\x1b[0m", cost : 1500, Damage: 5, AttackRange : 10},
//     Floor : {dx : 0, dy : 0, type : "Floor", Color : "\x1b[48;2;34;139;34m ▒\x1b[0m"},
//     River : {dx : 0, dy : 0, type : "River" , Color : "\x1b[37m  \x1b[0m"},
//     Road : {dx : 0, dy : 0, type : "Road" , Color : "\x1b[48;2;76;70;50m  \x1b[0m"},
//     Tree : {dx : 0, dy : 0, type : "Tree", Color : "\x1b[48;2;34;139;34m 🎄\x1b[0m"},
//     Fire : {dx : 0, dy : 0, type : "Fire", Color : "\x1b[48;2;34;139;34m 🔥\x1b[0m"},
// };
var ActorsTypeList = {
    SimpleMonster: { Move: movements_ts_1.SimpleMove, Type: "SimpleMonster", Color: "\x1b[37m  \x1b[0m", HitPoints: 3, Cost: 0, Damage: 0, AttackRange: 0 },
    BigMonster: { Move: movements_ts_1.SimpleMove, Type: "BigMonster", Color: "\x1b[37m🦌\x1b[0m", HitPoints: 3, Cost: 0, Damage: 0, AttackRange: 0 },
    SimpleTower: { Move: noMove, Type: "SimpleTower", Color: "\x1b[48;2;34;139;34m🏯\x1b[0m", HitPoints: 0, Cost: 1000, Damage: 5, AttackRange: 5 },
    MagicTower: { Move: noMove, Type: "MagicTower", Color: "\x1b[37m⛪\x1b[0m", Cost: 1500, HitPoints: 0, Damage: 5, AttackRange: 10 },
    Floor: { Move: noMove, Type: "Floor", Color: "\x1b[48;2;34;139;34m ▒\x1b[0m", Cost: 0, HitPoints: 0, Damage: 0, AttackRange: 0 },
    River: { Move: noMove, Type: "River", Color: "\x1b[37m  \x1b[0m", HitPoints: 0, Cost: 0, Damage: 0, AttackRange: 0 },
    Road: { Move: noMove, Type: "Road", Color: "\x1b[48;2;76;70;50m  \x1b[0m", HitPoints: 0, Cost: 0, Damage: 0, AttackRange: 0 },
    Tree: { Move: noMove, Type: "Tree", Color: "\x1b[48;2;34;139;34m 🎄\x1b[0m", HitPoints: 0, Cost: 0, Damage: 0, AttackRange: 0 },
    Fire: { Move: noMove, Type: "Fire", Color: "\x1b[48;2;34;139;34m 🔥\x1b[0m", HitPoints: 0, Cost: 0, Damage: 0, AttackRange: 0 }
};
exports.ActorsTypeList = ActorsTypeList;
function noMove(anActor, aWorld, type) {
    return;
}
// function ActorGen( type : string){
//     switch (type){
//     }
// }
function CreateEmptyMatrix(width, height) {
    var tmp = [];
    var b = ActorsTypeList.Floor;
    var p = { x: 0, y: 0 };
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; ++j) {
            tmp[i][j].AnActor = b;
            // p.x = i;
            // p.y=j;
            tmp[i][j].Pos = { x: i, y: j };
        }
    }
    return tmp;
}
function CreateWorld(width, height) {
    var emptyWorld = { Matrix: CreateEmptyMatrix(width, height), Width: width, Height: height, Score: 0, Actors: [] };
    return emptyWorld;
}
exports.CreateWorld = CreateWorld;
function initializeWorld(world) {
    world.Matrix = CreateEmptyMatrix(world.Width, world.Height);
    return world;
}
exports.initializeWorld = initializeWorld;
// function initializeWorld(world : world) : world {
//     world.Matrix = CreateEmptyMatrix(world.Width , world.Height);
//     for(let i=0;i<world.Height;i++){
// 	world.Matrix[i]=Array(world.Width);
//     }
//     for(let i=0; i<world.Height; i++){
//         for(let j=0;j<world.Width; j++){
//             world.Matrix[i][j]={
//                 pos:     { x: i, y: j },
//                 typeActor:ActorsTypeList.Floor
//             };
//         }
//     }
//     return world;
// }
/*
*/
function display(world) {
    var s2 = "";
    var count = 0;
    for (var i = 0; i < world.Height + 19; i++) {
        if (i < world.Height / 2 + 15 && i > world.Height / 2 + 5 && count === 0) {
            s2 += " Score : ";
            s2 += world.Score;
            s2 += " 💀 ";
            count++;
        }
        else {
            s2 += "🕸️ ";
        }
    }
    console.log(s2);
    for (var i = 0; i < world.Height; i++) {
        var s = "";
        for (var j = 0; j < world.Width; j++) {
            switch (world.Matrix[i][j].AnActor.Type) {
                case 'SimpleMonster':
                    s += ActorsTypeList.SimpleMonster.Color;
                    break;
                case 'BigMonster':
                    s += ActorsTypeList.BigMonster.Color;
                    break;
                case 'SimpleTower':
                    s += ActorsTypeList.SimpleTower.Color;
                    break;
                case 'MagicTower':
                    s += ActorsTypeList.MagicTower.Color;
                    break;
                case 'Floor':
                    s += ActorsTypeList.Floor.Color;
                    break;
                case 'River':
                    s += ActorsTypeList.River.Color;
                    break;
                case 'Tree':
                    s += ActorsTypeList.Tree.Color;
                    break;
                case 'Fire':
                    s += ActorsTypeList.Fire.Color;
                    break;
                case 'Road':
                    s += ActorsTypeList.Road.Color;
                    break;
            }
        }
        console.log(s);
    }
}
exports.display = display;
/////////////////////////////////////           END           /////////////////////////////////////////////////////
