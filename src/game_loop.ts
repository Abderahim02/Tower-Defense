import { display, initializeWorld, world, CreateWorld, point, position, gameover, gameMotor, gamePhase} from "./world.js";
import { Road } from "./rand_road.js";
import { CreateSimpleTower, CreateMagicTower, TowersPlacement, TowersAttacks } from "./actors.js"; 
import { ActorsTypeList } from "./typeactors.js";



function loop() : void {
    let world : world = CreateWorld(15,13);
    const start : number = Math.floor(world.Height/2)*world.Width;
    const end : number = start-1;
    world = Road(initializeWorld(world),start,end);
    display(world);
    world = CreateSimpleTower(Math.floor(world.Height/2)+2,11,world);
    world=TowersPlacement(world);
    display(world);
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
                   Pos:     { x: Math.floor(world.Height/2), y: 0 },
                   AnActor : ActorsTypeList.SimpleMonster
               });
               world.Matrix[Math.floor(world.Height/2)][0].AnActor =ActorsTypeList.SimpleMonster;
           }
        }
        
        world=TowersAttacks(world);
        display(world);
        //to check if any monster reach end position
        if(gameover(world,end)===1){
            console.log("####### GAME OVER MONSTERS WIN ########");
            break;
        }
        console.log();
        world=gameMotor(gamePhase(world),world);
    }
    console.log(world.Actors.length);
}

loop();

/////////////////////////////////////           END           /////////////////////////////////////////////////////