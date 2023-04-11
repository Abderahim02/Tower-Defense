import { ActorsTypeList, display, initializeWorld, world, CreateWorld, point, position} from "./world.js";
import { Road } from "./rand_road.js";
import { CreateSimpleTower, CreateMagicTower, TowersPlacement } from "./actors.js"; 




function loop() : void {
    let world : world = CreateWorld(25,15);
    const start : number = Math.floor(world.Height/2)*world.Width;
    const end : number = start-1;
    world = Road(initializeWorld(world),start,end);
    display(world);
    world = CreateSimpleTower(Math.floor(world.Height/2)+2,11,world);
    world=TowersPlacement(world);
    for(let i : number = 0 ; i < 50 ; i++ ){
        if(i%6===0){   
             world.Actors.push({
                Pos:  { x: Math.floor(world.Height/2), y: 0 },
                AnActor : ActorsTypeList.BigMonster
            });
            world.Matrix[Math.floor(world.Height/2)][0].AnActor =ActorsTypeList.BigMonster;
        }
        if(i%6===3){
            {
                world.Actors.push({
                   Pos:     { x: Math.floor(world.Height/2)+1, y: 0 },
                   AnActor : ActorsTypeList.SimpleMonster
               });
               world.Matrix[Math.floor(world.Height/2)+1][0].AnActor =ActorsTypeList.SimpleMonster;
           }
        }
        
    display(world);
    console.log();
	
	for(let j=0;j<world.Actors.length;j++){
            const actor=world.Actors[j];
            const t = actor.AnActor.Move(actor,world, actor.AnActor.Type);
            const [a,b]=t;
            world.Matrix[world.Actors[j].Pos.x][world.Actors[j].Pos.y].AnActor = ActorsTypeList.Road;
            world.Matrix[a][b].AnActor = world.Actors[j].AnActor;
            world.Actors[j].Pos={x:a,y:b};
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
//     for(let i=0;i<16;i++){
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