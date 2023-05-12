import {display, initializeWorld, CreateWorld} from "./world.js";
import { Road } from "./rand_road.js";
import {  gameover, gamePhase, gameMotor, TowersPlacement, TowersAttacks, addActorsToWorld ,TowersAttackRange, TreesPlacement, CreateActor} from "./actors.js"; 
import {ActorsTypeList, world, point} from "./defineType.js";
import {OptimalRoad, GetActorType} from "./optimal_road.js";

function DrawOptimalRoad(wCopy : world, Astar : point[]) : world{
    // let wCopy : world = w;
    for(let i : number = 0; i<Astar.length ; ++i){
        //wCopy = CreateActor(Astar[i], ActorsTypeList.MagicTowerII, wCopy);
        wCopy.Matrix[Astar[i].x][Astar[i].y].AnActor = ActorsTypeList.Optimal;
    }
    // display(wCopy, );
    return wCopy;
}

function DrawAttackRange(){
    let w : world = CreateWorld(20,12);
    const start : number = Math.floor(w.Height/2)*w.Width;
    const end : number = start-1;

    w = Road(initializeWorld(w),start,end);
    // w=TowersPlacement(w);
    // w =TreesPlacement(w);
    display(w,end);
    w=TowersPlacement(w, 10);
    w =TreesPlacement(w);
    const startPoint : point = {x : Math.floor(start/w.Width), y : start%w.Width};
    const endPoint : point = {x : Math.floor(end/w.Width) , y:  end%w.Width};
    const AstarRoad : point[] = OptimalRoad(startPoint, w, endPoint);
    // console.log(AstarRoad);
    w.Matrix[5][4].AnActor = ActorsTypeList.MagicTower;
    const TowersRange : point[] = TowersAttackRange({x : 5, y : 4}, w);
    display(w, end);
    console.log(TowersRange);
    // wCopy = TowersPlacement(wCopy);    
    for(let i : number = 0; i<TowersRange.length ; ++i){
        if(TowersRange[i].x !== 5 || TowersRange[i].y !== 4){
            // w = CreateActor(TowersRange[i], ActorsTypeList.Optimal, w);
            w.Matrix[TowersRange[i].x][TowersRange[i].y].AnActor = ActorsTypeList.Optimal;
        }
    }
    display(w, end);
    // return wCopy;
}
//The main loop of the game 
function loop() : number {
    let w : world = CreateWorld(30,15);
    const start : number = Math.floor(w.Height/2)*w.Width;
    const end : number = start-1;
    w = Road(initializeWorld(w),start,end);
    w=TowersPlacement(w, 4);
    w =TreesPlacement(w);
    display(w,end);
    const startPoint : point = {x : Math.floor(start/w.Width), y : start%w.Width};
    const endPoint : point = {x : Math.floor(end/w.Width) , y:  end%w.Width};
    const AstarRoad : point[] = OptimalRoad(startPoint, w, endPoint);
    // console.log(AstarRoad);
    // w = DrawOptimalRoad(w, AstarRoad);
    display(w,end);

    const MaxTurns : number = 50;
    for(let i : number = 0 ; i < MaxTurns ; i++ ){
        //to add bigMonstres in the begining of Road, in the second part of the game 
        if(i%4===0 ){    //
            w = addActorsToWorld(w,ActorsTypeList.BigMonster, Math.floor(w.Height/2));

        }
        //to add simpleMonstres in the begining of Road
        else if(i%4===2){
            w = addActorsToWorld(w,ActorsTypeList.SimpleMonster, Math.floor(w.Height/2));
        }
        w=TowersAttacks(w);
        //to check if any monster reach end position
        w=gameMotor(gamePhase(w, AstarRoad),w);
       
        if(gameover(w,end) === 1){
            display(w,end);
            console.log("####### GAME OVER MONSTERS WIN ########");
            i=MaxTurns+3;
           
            return 0;
        }
        display(w,end);
    }
    console.log("####### GAME OVER : CONGRATULATIONS YOU WON ########");
    return 1;
}

// DrawAttackRange();
loop();
/////////////////////////////////////           END           /////////////////////////////////////////////////////