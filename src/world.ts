
import {SimpleMove } from './movements.js';
import {action, world, position, actor, ActorsTypeList , point} from './defineType.js';
import { NextOptimalMove, GetActorType } from "./optimal_road.js";

//this function create an empty matrix
export const CreateEmptyMatrix = (width : number, height : number) : position[][]=> {
    //let tmp: position[][] = [...Array(height)].fill(0);
    const b : actor = ActorsTypeList.Floor;
    const tmp: number[][] = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
   return tmp.map((x,i)=>{
        return x.map((y,j)=>{
            return {AnActor : ActorsTypeList.Floor, Pos : {x : i, y : j}};
        });
    });

    
};

//this function create the world with no actors , towers and no road
export const CreateWorld=(width : number, height : number): world =>{
    const emptyWorld : world = {Matrix : CreateEmptyMatrix(width, height), Width : width, Height : height, Score : 0, Actors : [], Towers : []};
    return emptyWorld;
};
export const initializeWorld = (world : world) : world=> {
    const {Matrix:m, ...other}:world=world;
    const w:world={Matrix:CreateEmptyMatrix(world.Width , world.Height), ...other};
    return w;
   
};


//this a function that displays the world
export const display=(world : world,end: number): void=> {
    let s2 : string ="";
    let count : number =0;
    for(let i : number =0; i<world.Height+19; i++){
        if(i<world.Height/2 +15 && i >world.Height/2+5 && count===0){
            s2+=" Score : ";
            s2+=world.Score;
            s2+=" 💀 "; 
            count ++;
        }
        else{
            s2+= "🕸️ ";
        }
    }
    console.log(s2);
    for(let i: number =0; i<world.Height ;i++){
        let s: string ="";
        for(let j : number =0;j<world.Width;j++){
            switch(world.Matrix[i][j].AnActor.Type){
                case 'SimpleMonster':
                    s+=ActorsTypeList.SimpleMonster.Color;
                    break;
                case 'BigMonster':
                    s+=ActorsTypeList.BigMonster.Color;
                    break;
                case 'SimpleTower':
                    s+=ActorsTypeList.SimpleTower.Color;
                    break;
                case 'MagicTower':
                    s+=ActorsTypeList.MagicTower.Color;
                    break;
                case 'SimpleTowerII':
                    s+=ActorsTypeList.SimpleTower.Color;
                    break;
                case 'MagicTowerII':
                    s+=ActorsTypeList.MagicTower.Color;
                    break;
                case 'SimpleTowerIII':
                    s+=ActorsTypeList.SimpleTower.Color;
                    break;
                case 'MagicTowerIII':
                    s+=ActorsTypeList.MagicTower.Color;
                    break;
                case 'Floor':
                    s+=ActorsTypeList.Floor.Color;
                    break;
                case 'River':
                    s+=ActorsTypeList.River.Color;
                    break;
                case 'Tree':
                    s+=ActorsTypeList.Tree.Color;
                    break;
                case 'Fire':
                    s+=ActorsTypeList.Fire.Color;
                    break;
                case 'Road':
                    if(Math.floor(end/world.Width)===i && end%world.Width===j)
                     s+="\x1b[48;2;76;70;50m💀\x1b[0m";
                        // s+="\x1b[48;2;76;70;50m* \x1b[0m";
                    else{
                     s+=ActorsTypeList.Road.Color;
                    }
                    break;
            }
        }
        console.log(`${s}`+`${i}`);
    }
};

// //this function returns the type of the actor in position p in the grid
// export function GetActorType(w: world, p:point) : string{
//     return w.Matrix[p.x][p.y].AnActor.Type;
// }


/*this function create a phase of the game, we see all possible moves for all actors
and we return a list of actions */
export function gamePhase(aWorld : world, OptimalRoad : point[]) : action[] {
    const Phase : action[] = [];

    for (let i : number = 0; i < aWorld.Actors.length; ++i ){
        //Simple monsters move with simple moves 
        if(GetActorType(aWorld, aWorld.Actors[i].Pos) === "SimpleMonster"){
            const basicMove : point = SimpleMove(aWorld.Actors[i], aWorld, aWorld.Actors[i].AnActor.Type );
            const sm : action = {  AnActorInfos : aWorld.Actors[i] , aMove : {ExPos : aWorld.Actors[i].Pos , NewPos : {x : basicMove.x, y : basicMove.y} }};
            Phase.push(sm);
        }
        //Big monsters use the Astar road to reach the end
        else if(GetActorType(aWorld, aWorld.Actors[i].Pos) === "BigMonster"){
            const bestMove : point = NextOptimalMove( aWorld.Actors[i].Pos, aWorld,OptimalRoad);
                const m : action = {  AnActorInfos : aWorld.Actors[i] , aMove : {ExPos : aWorld.Actors[i].Pos , NewPos : {x : bestMove.x, y : bestMove.y} }};    
                Phase.push(m);
        }
    }
    return Phase;
}

// export function gameMotor(aPhase : action[] , aWorld : world) : world {
//     const predicate = (value : action) => value.AnActorInfos.AnActor.Type === "BigMonster";
//     /*we filter the moves of the phase, if there will be a conflict between two actors going to
//     same new position*/
//     aPhase  = aPhase.filter((value, index, arr) => {
//       return arr.indexOf(value) === index && (index === arr.lastIndexOf(value) || predicate(value));
//     });
//     for(let i : number =0; i < aPhase.length; ++i){
//         const act : action = aPhase[i];
//         aWorld.Matrix[act.aMove.ExPos.x][act.aMove.ExPos.y].AnActor = ActorsTypeList.Road;
//         aWorld.Matrix[act.aMove.NewPos.x][act.aMove.NewPos.y].AnActor = act.AnActorInfos.AnActor;
//         aWorld.Actors[i].Pos.x = act.aMove.NewPos.x ;
//         aWorld.Actors[i].Pos.y = act.aMove.NewPos.y ;
//     }
//     return aWorld;
// }
//NE PAS SUPPRIMER 

// function compareActions(action1: action, action2: action): boolean {
//     const t : boolean = action1.AnActorInfos.AnActor === action2.AnActorInfos.AnActor &&
//     action1.aMove.ExPos.x === action2.aMove.ExPos.x &&
//     action1.aMove.ExPos.y === action2.aMove.ExPos.y &&
//     action1.aMove.NewPos.x === action2.aMove.NewPos.x &&
//     action1.aMove.NewPos.y === action2.aMove.NewPos.y ;
//     if(t === true) console.log("oooooooooooo");
//     return t;
//   }
function compareActions(action1: action, action2: action): boolean {
    const t : boolean = 
    action1.aMove.NewPos.x === action2.aMove.NewPos.x &&
    action1.aMove.NewPos.y === action2.aMove.NewPos.y ;
    // if(t === true) console.log("oooooooooooo");
    return t;
  }
// export function FilterActions(aPhase : action[]) : action[]{
//     let filteredActions: action[] = [];
//     for (const action of aPhase) {
//         const index = filteredActions.findIndex((filteredAction) =>
//           compareActions(action, filteredAction)
//         );
//         if (index !== -1) {
//           if (action.AnActorInfos.AnActor.Type === "BigMonster") {
//             filteredActions[index] = action;
//           }
//         } else {
//           filteredActions.push(action);
//         }
//       }
//     return filteredActions;
//   }

export function FilterActions(aPhase : action[]) : action[]{
    const filteredActions: action[] = [];
    for (const action of aPhase) {
        const index = filteredActions.findIndex((filteredAction) =>
          compareActions(action, filteredAction)
        );
        if (index !== -1) {
          if (action.AnActorInfos.AnActor.Type === "BigMonster") {
            filteredActions[index] = action;
          }
        } 
        else {
          filteredActions.push(action);
        }
      }
    return filteredActions;
  }

export function gameMotor(aPhase: action[], aWorld: world): world {
    const filteredActions: action[] = FilterActions(aPhase);
    // console.log(filteredActions.map(elt =>elt.aMove));
    for(let i : number =0; i < filteredActions.length; ++i){
        const act : action = filteredActions[i];
        aWorld.Matrix[act.aMove.ExPos.x][act.aMove.ExPos.y].AnActor = ActorsTypeList.Road;
        aWorld.Matrix[act.aMove.NewPos.x][act.aMove.NewPos.y].AnActor = act.AnActorInfos.AnActor;
        aWorld.Actors[i].Pos.x = act.aMove.NewPos.x ;
        aWorld.Actors[i].Pos.y = act.aMove.NewPos.y ;
    }
    return aWorld;
  } 

// recursive terminal gameover
export function gameover(world: world,end:number): number{
    function rec(ac:position[]):number{
        if(ac.length===0) return 0;
        if(ac[0].Pos.x===Math.floor(end/world.Width) && ac[0].Pos.y===end%world.Width) 
            return 1;
        return rec(ac.slice(1));
    }   
     return rec(world.Actors);
}


/////////////////////////////////////           END           /////////////////////////////////////////////////////
