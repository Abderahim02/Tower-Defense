import {display, initializeWorld, CreateWorld, gameover, gamePhase, gameMotor, FilterActions} from "./world.js";
import { Road } from "./rand_road.js";
import { CreateSimpleTower, TowersPlacement, TowersAttacks, addActorsToWorld , TreesPlacement} from "./actors.js"; 
import {ActorsTypeList, world, point, action} from "./defineType.js";
import {OptimalRoad, GetActorType} from "./optimal_road.js";

//The main loop of the game 
function loop() : void {
    let w : world = CreateWorld(15,13);
    const start : number = Math.floor(w.Height/2)*w.Width;
    const end : number = start-1;
    w = Road(initializeWorld(w),start,end);
    display(w,end);
    w = CreateSimpleTower(Math.floor(w.Height/2)+2,11,w);
    w=TowersPlacement(w);
    w =TreesPlacement(w);
    const startPoint : point = {x : Math.floor(start/w.Width), y : start%w.Width};
    const endPoint : point = {x : Math.floor(end/w.Width) , y:  end%w.Width};
    const AstarRoad : point[] = OptimalRoad(startPoint, w, endPoint);
    // console.log(AstarRoad);
    for(let i : number = 0 ; i < 40 ; i++ ){
        display(w,end);
        //to add bigMonstres in the begining of Road
        if(i%6===0){   
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
            break;
        }
        w=gameMotor(gamePhase(w, AstarRoad),w);        
    }
}


// loop();
/////////////////////////////////////           END           /////////////////////////////////////////////////////