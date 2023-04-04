import { ActorsTypeList, display, initializeWorld, world } from "./world.ts";

import { Road } from "./rand_road.js";

import { CreateSimpleTower, CreateMagicTower, TowerAttacks } from "./actors.ts"; 




function loop(){
    
    let world : world;

let start: number = Math.floor(world.Height/2)*world.Width;
let end: number = start-1;
    world=Road(initializeWorld(world),start,end);

    world=CreateSimpleTower(Math.floor(world.Height/2)+2,11,world);
    for(let i:number=0;i<20;i++){
        if(i%6==0){
            
             world.Actors.push({
                Pos:     { x: Math.floor(world.Height/2), y: 0 },
                Type:ActorsTypeList.BigMonster

            });
            world.Matrix[Math.floor(world.Height/2)][0].AnActor.Type=ActorsTypeList.BigMonster;
        }
        if(i%6==3){
            {
            
                world.Actors.push({
                   Pos:     { x: Math.floor(world.Height/2)+1, y: 0 },
                   Type:ActorsTypeList.SimpleMonster
   
               });
               world.Matrix[Math.floor(world.Height/2)+1][0].ActorsTypeList=ActorsTypeList.SimpleMonster;
           }
        }
    
        
    display(world);
    console.log()
	
	for(let j=0;j<world.actors.length;j++){
            var actor=world.actors[j]
            let t=actor.AnActor.Movement(actor,world,actor.Type);
            let [a,b]=t
            world.Matrix[world.actors[j].pos.x][world.actors[j].pos.y].typeActor=ActorsTypeList.Road;
            world.Matrix[a][b].Type=world.actors[j].typeActor;
            world.actors[j].pos={x:a,y:b};
	}
	
    }
}
 loop();