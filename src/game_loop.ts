import {display, initializeWorld, CreateWorld, gameover, gamePhase, gameMotor} from "./world.js";
import { Road } from "./rand_road.js";
import { CreateSimpleTower, TowersPlacement, TowersAttacks, addActorsToWorld } from "./actors.js"; 
import {ActorsTypeList, world} from "./defineType.js";



function loop() : void {
    let world : world = CreateWorld(15,13);
    const start : number = Math.floor(world.Height/2)*world.Width;
    const end : number = start-1;
    world = Road(initializeWorld(world),start,end);
    display(world,end);
    world = CreateSimpleTower(Math.floor(world.Height/2)+2,11,world);
    world=TowersPlacement(world);
    display(world,end);
    for(let i : number = 0 ; i < 100 ; i++ ){
        //to add bigMonstres in the begining of Road
        if(i%6===0){   
            world.Actors=addActorsToWorld(world,ActorsTypeList.BigMonster, Math.floor(world.Height/2));
        }
        //to add simpleMonstres in the begining of Road
        if(i%6===3){
            world.Actors=addActorsToWorld(world,ActorsTypeList.SimpleMonster, Math.floor(world.Height/2));
        }
        world=TowersAttacks(world);
        display(world,end);
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