"use strict";
exports.__esModule = true;
var world_js_1 = require("./world.js");
var rand_road_js_1 = require("./rand_road.js");
var actors_js_1 = require("./actors.js");
function loop() {
    var world = (0, world_js_1.CreateWorld)(15, 10);
    var start = Math.floor(world.Height / 2) * world.Width;
    var end = start - 1;
    world = (0, rand_road_js_1.Road)((0, world_js_1.initializeWorld)(world), start, end);
    world = (0, actors_js_1.CreateSimpleTower)(Math.floor(world.Height / 2) + 2, 11, world);
    for (var i = 0; i < 60; i++) {
        if (i % 6 == 0) {
            world.Actors.push({
                Pos: { x: Math.floor(world.Height / 2), y: 0 },
                AnActor: world_js_1.ActorsTypeList.BigMonster
            });
            world.Matrix[Math.floor(world.Height / 2)][0].AnActor = world_js_1.ActorsTypeList.BigMonster;
        }
        if (i % 6 == 3) {
            {
                world.Actors.push({
                    Pos: { x: Math.floor(world.Height / 2) + 1, y: 0 },
                    AnActor: world_js_1.ActorsTypeList.SimpleMonster
                });
                world.Matrix[Math.floor(world.Height / 2) + 1][0].AnActor = world_js_1.ActorsTypeList.SimpleMonster;
            }
        }
        (0, world_js_1.display)(world);
        console.log();
        for (var j = 0; j < world.Actors.length; j++) {
            var actor = world.Actors[j];
            var t = actor.AnActor.Move(actor, world, actor.AnActor.Type);
            var a = t[0], b = t[1];
            world.Matrix[world.Actors[j].Pos.x][world.Actors[j].Pos.y].AnActor = world_js_1.ActorsTypeList.Road;
            world.Matrix[a][b].AnActor = world.Actors[j].AnActor;
            world.Actors[j].Pos = { x: a, y: b };
        }
    }
}
// function loop(){
//     let world={
//         actors:[],
//         Width:15,
//         Height :10 ,
//         score:0,
//         Matrix:{}
//     };
// let start = Math.floor(world.Height/2)*world.Width;
// let end = start-1;
//     world=Road(initializeWorld(world),start,end);
//     world=CreateSimpleTower(Math.floor(world.Height/2)+2,11,world);
//     for(let i=0;i<60;i++){
//         if(i%6==0){
//              world.actors.push({
//                 pos:     { x: Math.floor(world.Height/2), y: 0 },
//                 typeActor:ActorsTypeList.BigMonster
//             });
//             world.Matrix[Math.floor(world.Height/2)][0].ActorsTypeList=ActorsTypeList.BigMonster;
//         }
//         if(i%6==3){
//             {
//                 world.actors.push({
//                    pos:     { x: Math.floor(world.Height/2)+1, y: 0 },
//                    typeActor:ActorsTypeList.SimpleMonster
//                });
//                world.Matrix[Math.floor(world.Height/2)+1][0].ActorsTypeList=ActorsTypeList.SimpleMonster;
//            }
//         }
//     display(world);
//     console.log()
// 	for(let j=0;j<world.actors.length;j++){
//             var actor=world.actors[j]
//             let t=actor.typeActor.Movement(actor,world,actor.type);
//             let [a,b]=t
//             world.Matrix[world.actors[j].pos.x][world.actors[j].pos.y].typeActor=ActorsTypeList.Road;
//             world.Matrix[a][b].typeActor=world.actors[j].typeActor;
//             world.actors[j].pos={x:a,y:b};
// 	}
//     }
// }
loop();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////           END           /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
