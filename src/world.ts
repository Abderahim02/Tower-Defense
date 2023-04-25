
import { AvailablePosition, SimpleMove } from './movements.js';
import {Road} from './rand_road.js';
import { CreateSimpleTower, CreateMagicTower, TowersPlacement } from "./actors.js"; 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*this is a type that defines an actor ,we suppose that floor and road are also 
    actors but with  no power
*/
export type actor = {
    Move:(pos: position, world:world, type:string) => number[]  ;
    Type : string;
    Color : string;
    HitPoints : number;
    Cost : number;
    gain : number;
    Damage : number;
    AttackRange : number;
}
//thsi is the point type : a position x,y in the grid
export type point = {
    x : number;
    y : number;
}
//a position is defined by two coordinates and an actor occupying that position
export type position = {
    Pos: point;
    AnActor : actor;
}

//the type that defines the world 
export type world = {
    Matrix : position[][] ;
    Width : number;
    Height : number;
    Score : number;
    Actors : position[];
    Towers : position[];
}

//the type defining a move, from ex_pos to new_pos
export type move = {
    NewPos : point;
    ExPos : point;
}

/* a type defining an acyion in the grid, its useful for the gamePhase,
 which gonna be a list of actions, its defined as move with an actor that has 
 AnActorInfos as data and  AnActorIndex as index in the array world.Actors */
export type action = {
    AnActorInfos : position ;
    AnActorIndex : number;
    aMove : move ;
}

//this function caracterizes the inactive actors in the world, floor and road
export const noMove=(pos: position, aWorld: world, type: string) : any =>{
    return ;
};


/*this is the list of actors types that exists in the world, we use a different 
sticker for each actor, and different powers */
export const ActorsTypeList = {
    SimpleMonster : {Move: SimpleMove, Type : "SimpleMonster", Color : "\x1b[37m  \x1b[0m", HitPoints : 3, Cost : 0, gain: 0, Damage: 0, AttackRange : 0},
    BigMonster : {Move : SimpleMove, Type : "BigMonster", Color : "\x1b[37m🦌\x1b[0m", HitPoints : 3, Cost : 0, gain : 0, Damage: 0, AttackRange : 0},
    SimpleTower : {Move: noMove, Type : "SimpleTower", Color : "\x1b[48;2;34;139;34m🏯\x1b[0m", HitPoints : 0, Cost : 1000,gain : 0, Damage: 1, AttackRange : 3},
    SimpleTowerII : {Move: noMove, Type : "SimpleTowerII", Color : "\x1b[48;2;34;139;34m🏯\x1b[0m", HitPoints : 0, Cost : 1500, gain : 0,Damage: 3, AttackRange : 5},
    SimpleTowerIII : {Move: noMove, Type : "SimpleTowerIII", Color : "\x1b[48;2;34;139;34m🏯\x1b[0m", HitPoints : 0, Cost : 2000, gain : 0,Damage: 5, AttackRange : 7},
    MagicTower : {Move: noMove, Type : "MagicTower", Color : "\x1b[37m⛪\x1b[0m", HitPoints : 0, Cost : 1000, gain : 0,Damage: 1, AttackRange : 3},
    MagicTowerII : {Move: noMove, Type : "MagicTowerII", Color : "\x1b[37m⛪\x1b[0m", HitPoints : 0, Cost : 1500, gain : 0,Damage: 3, AttackRange : 5},
    MagicTowerIII : {Move: noMove, Type : "MagicTowerIII", Color : "\x1b[37m⛪\x1b[0m", HitPoints : 0, Cost : 2000, gain : 0,Damage: 5, AttackRange : 7},
    Floor : {Move: noMove, Type : "Floor", Color : "\x1b[48;2;34;139;34m ▒\x1b[0m", Cost : 0, HitPoints : 0, gain : 0,Damage: 0, AttackRange : 0},
    River : {Move: noMove, Type : "River" , Color : "\x1b[37m  \x1b[0m", HitPoints : 0, Cost : 0, gain : 0,Damage: 0, AttackRange : 0},
    Road : {Move: noMove, Type : "Road" , Color : "\x1b[48;2;76;70;50m  \x1b[0m", HitPoints : 0, Cost : 0, gain : 0,Damage: 0, AttackRange : 0},
    Tree : {Move: noMove, Type : "Tree", Color : "\x1b[48;2;34;139;34m 🎄\x1b[0m", HitPoints : 0, Cost : 0, gain : 0,Damage: 0, AttackRange : 0},
    Fire : {Move: noMove, Type : "Fire", Color : "\x1b[48;2;34;139;34m 🔥\x1b[0m", HitPoints : 0, Cost : 0, gain : 0,Damage: 0, AttackRange : 0},
};

//this function create an empty matrix
export const CreateEmptyMatrix = (width : number, height : number) : position[][]=> {
    let tmp: position[][] = Array(height).fill(0);
    const b : actor = ActorsTypeList.Floor;
    tmp=tmp.map((x)=> Array(width).fill(0));
    
   return tmp.map((x,i)=>{
        return x.map((y,j)=>{
            return {AnActor : ActorsTypeList.Floor, Pos : {x : i, y : j}};
        });
    });

    // for (let i : number = 0; i < height; i++) {
    //     for(let j : number= 0; j< width; ++j){
    //         tmp[i][j] = {AnActor : ActorsTypeList.Floor, Pos : {x : i, y : j}};
    //     }
    // }
    
    
};

//this function create the world with no actors , towers and no road
export const CreateWorld=(width : number, height : number): world =>{
    const emptyWorld : world = {Matrix : CreateEmptyMatrix(width, height), Width : width, Height : height, Score : 0, Actors : [], Towers : []};
    return emptyWorld;
};

export const initializeWorld = (world : world) : world=> {
    world.Matrix = CreateEmptyMatrix(world.Width , world.Height);
    return world;
};


//this a function that displays the world
export const display=(world : world): void=> {
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
                    s+=ActorsTypeList.Road.Color;
                    break;
            }
        }
        console.log(`${s}`+`${i}`);
    }
};

/*this function create a phase of the game, we see all possible moves for all actors
and we return a list of actions */
export function gamePhase(aWorld : world) : action[] {
    const Phase : action[] = [];
    for (let i : number = 0; i < aWorld.Actors.length; ++i ){
        const tmp : number[] = SimpleMove(aWorld.Actors[i], aWorld, aWorld.Actors[i].AnActor.Type );
        const mv : action = { AnActorIndex : i,  AnActorInfos : aWorld.Actors[i] , aMove : {ExPos : aWorld.Actors[i].Pos , NewPos : {x : tmp[0], y : tmp[1]} }};
        Phase.push(mv);
    }
    return Phase;
}

export function gameMotor(aPhase : action[] , aWorld : world) : world {
    for(let i : number =0; i < aPhase.length; ++i){
        const act : action = aPhase[i];
        aWorld.Matrix[act.aMove.ExPos.x][act.aMove.ExPos.y].AnActor = ActorsTypeList.Road;
        aWorld.Matrix[act.aMove.NewPos.x][act.aMove.NewPos.y].AnActor = act.AnActorInfos.AnActor;
        aWorld.Actors[act.AnActorIndex].Pos.x = act.aMove.NewPos.x ;
        aWorld.Actors[act.AnActorIndex].Pos.y = act.aMove.NewPos.y ;
    }
    return aWorld;
}


export function gameover(world: world): number{
    for(let j=0; j<world.Actors.length; j++){
        if(world.Actors[j].Pos.x===world.Width){
            return 1;
        }
    }
    
    return 0;
}


/////////////////////////////////////           END           /////////////////////////////////////////////////////
