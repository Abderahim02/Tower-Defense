import { SimpleMove } from "./movements.js";

/*this is a type that defines an actor ,we suppose that floor and road are also
    actors but with  no power
*/
export type actor = {
    Move(pos: position, world:world, type:string): point;
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
    aMove : move ;
}

//this function caracterizes the inactive actors in the world, floor and road
export const noMove=(pos: position, aWorld: world, type: string) : any =>{
    return ;
};


export const ActorsTypeList = {
    SimpleMonster : {Move: SimpleMove, Type : "SimpleMonster", Color : "\x1b[37m👾\x1b[0m", HitPoints : 4, Cost : 0, gain: 0, Damage: 0, AttackRange : 0},
    BigMonster : {Move : SimpleMove, Type : "BigMonster", Color : "\x1b[37m🦌\x1b[0m", HitPoints : 8, Cost : 0, gain : 0, Damage: 0, AttackRange : 0},
    SimpleTower : {Move: noMove, Type : "SimpleTower", Color : "\x1b[48;2;34;139;34m🏯\x1b[0m", HitPoints : 0, Cost : 1000,gain : 0, Damage: 1, AttackRange : 3},
    SimpleTowerII : {Move: noMove, Type : "SimpleTowerII", Color : "\x1b[48;2;34;139;34m🏯\x1b[0m", HitPoints : 0, Cost : 1500, gain : 0,Damage: 3, AttackRange : 5},
    SimpleTowerIII : {Move: noMove, Type : "SimpleTowerIII", Color : "\x1b[48;2;34;139;34m🏯\x1b[0m", HitPoints : 0, Cost : 2000, gain : 0,Damage: 3, AttackRange : 7},
    MagicTower : {Move: noMove, Type : "MagicTower", Color : "\x1b[37m⛪\x1b[0m", HitPoints : 0, Cost : 1000, gain : 0,Damage: 1, AttackRange : 3},
    MagicTowerII : {Move: noMove, Type : "MagicTowerII", Color : "\x1b[37m⛪\x1b[0m", HitPoints : 0, Cost : 1500, gain : 0,Damage: 3, AttackRange : 5},
    MagicTowerIII : {Move: noMove, Type : "MagicTowerIII", Color : "\x1b[37m⛪\x1b[0m", HitPoints : 0, Cost : 2000, gain : 0,Damage: 5, AttackRange : 7},
    FlameTower : {Move: noMove, Type : "FlameTower", Color : "\x1b[48;2;34;139;34m🔥\x1b[0m", HitPoints : 0, Cost : 2000,gain : 0, Damage: 5, AttackRange : 3},
    Floor : {Move: noMove, Type : "Floor", Color : "\x1b[48;2;34;139;34m ▒\x1b[0m", Cost : 0, HitPoints : 0, gain : 0,Damage: 0, AttackRange : 0},
    River : {Move: noMove, Type : "River" , Color : "\x1b[37m  \x1b[0m", HitPoints : 0, Cost : 0, gain : 0,Damage: 0, AttackRange : 0},
    Road : {Move: noMove, Type : "Road" , Color : "\x1b[48;2;76;70;50m  \x1b[0m", HitPoints : 0, Cost : 0, gain : 0,Damage: 0, AttackRange : 0},
    Tree : {Move: noMove, Type : "Tree", Color : "\x1b[48;2;34;139;34m🍁\x1b[0m", HitPoints : 0, Cost : 0, gain : 0,Damage: 0, AttackRange : 0},
    Fire : {Move: noMove, Type : "Fire", Color : "\x1b[48;2;34;139;34m 🔥\x1b[0m", HitPoints : 0, Cost : 0, gain : 0,Damage: 0, AttackRange : 0},
    Portal : {Move: noMove, Type : "Portal", Color : "\x1b[48;2;34;139;34m 🧿\x1b[0m", HitPoints : 0, Cost : 0, gain : 0,Damage: 0, AttackRange : 0},
    //Just to display the optimal road for the report
    Optimal : {Move: noMove, Type : "Optimal" , Color : "🎯", HitPoints : 0, Cost : 0, gain : 0,Damage: 0, AttackRange : 0},

};
/////////////////////////////////////           END           /////////////////////////////////////////////////////
//