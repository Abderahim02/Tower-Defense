
import { AvailablePosition, SimpleMove } from './movements.js';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//the type that defines the world 
export type actor = {
    Move:(pos: position, world:world, type:string) => number[]  ;
    Type : string;
    Color : string;
    HitPoints : number;
    Cost : number;
    Damage : number;
    AttackRange : number;
}

export type point = {
    x : number;
    y : number;
}
export type position = {
    Pos: point;
    AnActor : actor;
}

export type world = {
    Matrix : position[][] ;
    Width : number;
    Height : number;
    Score : number;
    Actors : position[];
    Towers : position[];
}

// let actor : number = 5;
//This is a list of all types of actors
// const ActorsTypeList = {
//     SimpleMonster : {Movement:SimpleMove, type : "SimpleMonster", Color : "\x1b[37m  \x1b[0m", HitPoints : 3},
//     BigMonster : {Movement:SimpleMove, type : "BigMonster", Color : "\x1b[37m🦌\x1b[0m",  : 3},
//     SimpleTower : {dx : 0, dy : 0, type : "SimpleTower", Color : "\x1b[48;2;34;139;34m🏯\x1b[0m", cost : 1000, Damage: 5, AttackRange : 5},
//     MagicTower : {dx : 0, dy : 0, type : "MagicTower", Color : "\x1b[37m⛪\x1b[0m", cost : 1500, Damage: 5, AttackRange : 10},
//     Floor : {dx : 0, dy : 0, type : "Floor", Color : "\x1b[48;2;34;139;34m ▒\x1b[0m"},
//     River : {dx : 0, dy : 0, type : "River" , Color : "\x1b[37m  \x1b[0m"},
//     Road : {dx : 0, dy : 0, type : "Road" , Color : "\x1b[48;2;76;70;50m  \x1b[0m"},
//     Tree : {dx : 0, dy : 0, type : "Tree", Color : "\x1b[48;2;34;139;34m 🎄\x1b[0m"},
//     Fire : {dx : 0, dy : 0, type : "Fire", Color : "\x1b[48;2;34;139;34m 🔥\x1b[0m"},
// };

export const noMove=(pos: position, aWorld: world, type: string) : any =>{
    return ;
};


export const ActorsTypeList = {
    SimpleMonster : {Move: SimpleMove, Type : "SimpleMonster", Color : "\x1b[37m  \x1b[0m", HitPoints : 3, Cost : 0, Damage: 0, AttackRange : 0},
    BigMonster : {Move : SimpleMove, Type : "BigMonster", Color : "\x1b[37m🦌\x1b[0m", HitPoints : 3, Cost : 0, Damage: 0, AttackRange : 0},
    SimpleTower : {Move: noMove, Type : "SimpleTower", Color : "\x1b[48;2;34;139;34m🏯\x1b[0m", HitPoints : 0, Cost : 1000, Damage: 5, AttackRange : 5},
    MagicTower : {Move: noMove, Type : "MagicTower", Color : "\x1b[37m⛪\x1b[0m", HitPoints : 0, Cost : 1500, Damage: 5, AttackRange : 4},
    Floor : {Move: noMove, Type : "Floor", Color : "\x1b[48;2;34;139;34m ▒\x1b[0m", Cost : 0, HitPoints : 0, Damage: 0, AttackRange : 0},
    River : {Move: noMove, Type : "River" , Color : "\x1b[37m  \x1b[0m", HitPoints : 0, Cost : 0, Damage: 0, AttackRange : 0},
    Road : {Move: noMove, Type : "Road" , Color : "\x1b[48;2;76;70;50m  \x1b[0m", HitPoints : 0, Cost : 0, Damage: 0, AttackRange : 0},
    Tree : {Move: noMove, Type : "Tree", Color : "\x1b[48;2;34;139;34m 🎄\x1b[0m", HitPoints : 0, Cost : 0, Damage: 0, AttackRange : 0},
    Fire : {Move: noMove, Type : "Fire", Color : "\x1b[48;2;34;139;34m 🔥\x1b[0m", HitPoints : 0, Cost : 0, Damage: 0, AttackRange : 0},
};


// function ActorGen( type : string){
//     switch (type){

//     }
// }
export const CreateEmptyMatrix=(width : number, height : number): position[][]=>{
    const tmp: position[][] =new Array(height);
    const b : actor = ActorsTypeList.Floor;
    //const p : point = {x : 0, y : 0};
    for (let i = 0; i < height; i++) {
        tmp[i] = new Array(width);
      }

    for (let i = 0; i < height; i++) {
        for(let j = 0; j< width; ++j){
            tmp[i][j]={
                AnActor:b,
            // p.x = i;
            // p.y=j;
            Pos: {x : i, y : j}
        };
    }
    }
    return tmp;
};

export const CreateWorld=(width : number, height : number): world =>{
    const emptyWorld : world = {Matrix : CreateEmptyMatrix(width, height), Width : width, Height : height, Score : 0, Actors : [], Towers : []};
    return emptyWorld;
};

export const initializeWorld=(world : world) : world=> {
    world.Matrix = CreateEmptyMatrix(world.Width , world.Height);
    return world;
};

// function initializeWorld(world : world) : world {
//     world.Matrix = CreateEmptyMatrix(world.Width , world.Height);
//     for(let i=0;i<world.Height;i++){
// 	world.Matrix[i]=Array(world.Width);
//     }
//     for(let i=0; i<world.Height; i++){
//         for(let j=0;j<world.Width; j++){
//             world.Matrix[i][j]={
//                 pos:     { x: i, y: j },
//                 typeActor:ActorsTypeList.Floor
//             };
//         }
//     }
//     return world;
// }
/*
*/

    
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
        console.log(s);
    }
};

    /////////////////////////////////////        MONSTERS         /////////////////////////////////////////////////////

// function gamePhase(aWorld : world): {
//     let Phase=[];
//     for (let i=0; i<aWorld.actors.length; ++i ){
//         let tmp = SimpleMove(aWorld.actors[i], aWorld);
//         Phase.push({index :i ,type : aWorld.actors[i].typeActor ,exPos : aWorld.actors[i].pos, newPos : {x : tmp[0], y :tmp[1]}}) ;
//     }
//     return Phase;
// }

// function GameMotor(aPhase, aWorld){
//     for(let i=0; i<aPhase.length; ++i){
//         let [index,type,ex_pos,new_pos]=aPhase[i];
//         aWorld.Matrix[new_pos.x][new_pos.y].typeActor = type ;
//         aWorld.Matrix[ex_pos.x][ex_pos.y].typeActor = ActorsTypeList.Road;
//         aWorld.actors[index].x = new_pos.x;
//         aWorld.actors[index].y = new_pos.y;
//     }
// }
//export {ActorsTypeList, display, initializeWorld, CreateWorld};


/////////////////////////////////////           END           /////////////////////////////////////////////////////
