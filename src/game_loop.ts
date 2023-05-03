import {display, initializeWorld, CreateWorld, gameover, gamePhase, gameMotor} from "./world.js";
import { Road } from "./rand_road.js";
import { CreateSimpleTower, TowersPlacement, TowersAttacks, addActorsToWorld } from "./actors.js"; 
import {ActorsTypeList, world, point} from "./defineType.js";
import {OptimalRoad} from "./optimal_road.js";

//The main loop of the game 
function loop() : void {
    let w : world = CreateWorld(15,13);
    const start : number = Math.floor(w.Height/2)*w.Width;
    const end : number = start-1;
    w = Road(initializeWorld(w),start,end);
    display(w,end);
    w = CreateSimpleTower(Math.floor(w.Height/2)+2,11,w);
    w=TowersPlacement(w);
    const startPoint : point = {x : Math.floor(start/w.Width), y : start%w.Width};
    const endPoint : point = {x : Math.floor(end/w.Width) , y:  end%w.Width};
    const AstarRoad : point[] = OptimalRoad(startPoint, w, endPoint);
    display(w,end);
    console.log(AstarRoad);

    for(let i : number = 0 ; i < 40 ; i++ ){
        //to add bigMonstres in the begining of Road
        if(i%6===0){   
            w = addActorsToWorld(w,ActorsTypeList.BigMonster, Math.floor(w.Height/2));
        }
        //to add simpleMonstres in the begining of Road
        if(i%6===3){
            w = addActorsToWorld(w,ActorsTypeList.SimpleMonster, Math.floor(w.Height/2));
        }
        console.log("before tower attack " );
        console.log(w.Actors.map(elem => elem.Pos));
        // w=TowersAttacks(w);
        //to check if any monster reach end position
        if(gameover(w,end) === 1){
            console.log("####### GAME OVER MONSTERS WIN ########");
            w=gameMotor(gamePhase(w, AstarRoad),w);
            break;
        }
        console.log(gamePhase(w, AstarRoad).map(elem => elem.aMove));
        w=gameMotor(gamePhase(w, AstarRoad),w);
        console.log("After tower attack " );
        console.log(w.Actors.map(elem => elem.Pos));
        display(w,end);
    }
}

// loop();
/////////////////////////////////////           END           /////////////////////////////////////////////////////