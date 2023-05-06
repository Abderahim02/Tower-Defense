import {display, initializeWorld, CreateWorld} from "./world.js";
import { Road } from "./rand_road.js";
import {  gameover, gamePhase, gameMotor, TowersPlacement, TowersAttacks, addActorsToWorld , TreesPlacement} from "./actors.js"; 
import {ActorsTypeList, world, point} from "./defineType.js";
import {OptimalRoad, GetActorType} from "./optimal_road.js";

//The main loop of the game 
function loop() : number {
    let w : world = CreateWorld(20,15);
    const start : number = Math.floor(w.Height/2)*w.Width;
    const end : number = start-1;
    w = Road(initializeWorld(w),start,end);
    display(w,end);
    w=TowersPlacement(w);
    w =TreesPlacement(w);
    const startPoint : point = {x : Math.floor(start/w.Width), y : start%w.Width};
    const endPoint : point = {x : Math.floor(end/w.Width) , y:  end%w.Width};
    const AstarRoad : point[] = OptimalRoad(startPoint, w, endPoint);
    // console.log(AstarRoad);
    const MaxTurns : number = 100;
    for(let i : number = 0 ; i < MaxTurns ; i++ ){
        display(w,end);
        //to add bigMonstres in the begining of Road, in the second part of the game 
        if(i%6===0  ){    //
            w = addActorsToWorld(w,ActorsTypeList.BigMonster, Math.floor(w.Height/2));
        }
        //to add simpleMonstres in the begining of Road
        else if(i%6===3){
            w = addActorsToWorld(w,ActorsTypeList.SimpleMonster, Math.floor(w.Height/2));
        }
        console.log("list of actors" );
        console.log(w.Actors.map(elem => elem.Pos));
        w=TowersAttacks(w);
        //to check if any monster reach end position
        if(gameover(w,end) === 1){
            console.log("####### GAME OVER MONSTERS WIN ########");
            w=gameMotor(gamePhase(w, AstarRoad),w);
            return 0;
        }
        w=gameMotor(gamePhase(w, AstarRoad),w);        
    }
    console.log("####### GAME OVER : CONGRATULATIONS YOU WON ########");
    return 1;
}


loop();
/////////////////////////////////////           END           /////////////////////////////////////////////////////