let world={
    Width:50,
    Height :25 ,
    Matrix:{}
};

const ActorsTypeList = {
    SimpleMonster : {dx : 3, dy : 3, type : "Monster"},
    BigMonster : {dx : 1, dy : 1, type : "Monster"},
    SimpleTower : {dx : 0, dy : 0, type : "Tower"},
    MagicTower : {dx : 0, dy : 0, type : "Tower"},
    Floor : {dx : 0, dy : 0, type : "Floor"},
    River : {dx : 0, dy : 0, type : "River" },
    Road : {dx : 0, dy : 0, type : "Road" },

};

function initializeWorld(){
    world.Matrix = Array(world.Height);
    for(let i=0;i<world.Height;i++){
	world.Matrix[i]=Array(world.Width);
    }
    for(let i=0; i<world.Height; i++){
        for(let j=0;j<world.Width ;j++){
            world.Matrix[i][j]={
                pos:     { x: i, y: j },
                typeActor:ActorsTypeList.Floor
            };
        }
    }
    return world;
}

//console.log(initializeWorld().Matrix[1][1].actions.move(1,1)[0]);

function Road(world){
    for(let i=0;i<=world.Height;i++){
        for(let j=0;j<world.Width  ;j++){
           if((j<=world.Width/4 || j>=3*world.Width/4) && (i<=world.Height/2+1 && i>=world.Height/2-1)){
            world.Matrix[i][j].typeActor=ActorsTypeList.Road;
           }
           else if(((i<=world.Height/3+1 && i>=world.Height/3-1 || i<=(2/3)*world.Height+1 && i>=(2/3)*world.Height-1) && !(j<=world.Width/4 || j>=3*world.Width/4))){
            world.Matrix[i][j].typeActor=ActorsTypeList.Road;
           }
           if(((j>=world.Width/4-1 && j<=world.Width/4+1) || (j>=3*world.Width/4-1 && j<=3*world.Width/4+1) ) && (i>=world.Height/3-1 && i<=(2/3)*world.Height+1)){
            world.Matrix[i][j].typeActor=ActorsTypeList.Road;
           }
        }
    }
    return world;

}
//console.log(initializeWorld().Matrix);
    

function display(world){
    for(let i=0; i<world.Height ;i++){
        let s=""
        for(let j=0;j<world.Width;j++){
           if(world.Matrix[i][j].typeActor.type=="Road") s+="\x1b[47m  \x1b[0m";
            else s+="\x1b[42m  \x1b[0m";
        }
        console.log(s)
        
    }

}
//display(initializeWorld())
display(Road(initializeWorld()));

function ConsActor(_pos, _actions, _type) { return { pos: _pos, actions: _actions, type : _type}; }


function ActorTypeGen(pos, _dx, _dy, _type){
    return ConsActor( pos, (anActor, aWorld) => [_dx, _dy], _type);
}

// const ActorsList = {
//     SimpleMonster : ActorTypeGen({x : 11, y : 1}, 3, 3, "Monster"),
//     BigMonster : ActorTypeGen({x : 5, y : 7}, 2, 1, "Monster"),
//     SimpleTower : ActorTypeGen({x : 10, y : 1}, 0, 0, "Tower"),
//     MagicTower : ActorTypeGen({x : 5, y : 4}, 0, 0, "Tower"),
// };



// const MapTexture = {
//     Floor : ActorTypeGen({x : 11, y : 1}, 3, 3, "Monster"),
    
// }
/* function SimpleMove(anActor, aWorld){
    let x = anActor.pos.x, y = anActor.pos.y;
    if (isEmptyPosition(aWorld[x])){

    }
} */
//console.log(ActorsList.SimpleMonster);
