import { ActorsTypeList, display, initializeWorld, world, CreateWorld, point, position, gameover} from "./world.js";
import { Road } from "./rand_road.js";
import { CreateSimpleTower, CreateMagicTower, TowersPlacement, TowersAttacks } from "./actors.js"; 




function loop() : void {
    let world : world = CreateWorld(30,15);
    const start : number = Math.floor(world.Height/2)*world.Width;
    const end : number = start-1;
    world = Road(initializeWorld(world),start,end);
    display(world);
    world = CreateSimpleTower(Math.floor(world.Height/2)+2,11,world);
    world=TowersPlacement(world);
    display(world);
    for(let i : number = 0 ; i < 2000 ; i++ ){
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
        
        world=TowersAttacks(world);
        display(world);
        if(gameover(world)==1){
            return console.log("####### GAME OVER MONSTERS WIN ########");
        }
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
    console.log(world.Actors.length);
}

loop();

/////////////////////////////////////           END           /////////////////////////////////////////////////////