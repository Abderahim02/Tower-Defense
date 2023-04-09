import { ActorsTypeList, display, initializeWorld, world, CreateWorld, point, position} from "../src/world";
import { Road } from "../src/rand_road";
import { CreateSimpleTower, CreateMagicTower } from "../src/actors"; 




function loop() : void {
    let world : world = CreateWorld(15,10);
    const start : number = Math.floor(world.Height/2)*world.Width;
    const end : number = start-1;
    world = Road(initializeWorld(world),start,end);
    world = CreateSimpleTower(Math.floor(world.Height/2)+2,11,world);
    for(let i : number = 0 ; i < 60 ; i++ ){
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

 loop();

/////////////////////////////////////           END           /////////////////////////////////////////////////////