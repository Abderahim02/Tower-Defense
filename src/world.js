
// function ConsActor(_pos, _actions, _type) { return { pos: _pos, actions: _actions, type : _type}; }


// function ActorTypeGen(pos, _dx, _dy, _type){
//     return ConsActor( pos, (anActor, aWorld) => [_dx, _dy], _type);
// }

//This is a list of all types of actors
const ActorsTypeList = {
    SimpleMonster : {dx : 3, dy : 3, type : "Monster"},
    BigMonster : {dx : 1, dy : 1, type : "Monster"},
    SimpleTower : {dx : 0, dy : 0, type : "Tower"},
    MagicTower : {dx : 0, dy : 0, type : "Tower"},
    Floor : {dx : 0, dy : 0, type : "Floor"},
    River : {dx : 0, dy : 0, type : "River" },
    Road : {dx : 0, dy : 0, type : "Road" },
};

const Actor = {
    pos : {},
    typeActor : {},
};
// const MapTexture = {
//     Floor : ActorTypeGen({x : 11, y : 1}, 3, 3, "Monster"),
    
// }
//This function return a possible place to move for the actor 
function SimpleMove(anActor, aWorld){
    let x = anActor.pos.x, y = anActor.pos.y;
    let dx = anActor.typeActor.dx , dy = anActor.typeActor.dy ;
    if (isEmptyPosition(aWorld[x + dx ][y])) return [x + dx,y];
    if (isEmptyPosition(aWorld[x + dx ][y + dy])) return [x + dx,y + dy];
    if (isEmptyPosition(aWorld[x + dx ][y - dy])) return [x + dx,y - dy];
    if (isEmptyPosition(aWorld[x ][y + dy])) return [x ,y + dy];
    if (isEmptyPosition(aWorld[x ][y - dy])) return [x ,y - dy];
}
console.log(ActorsList.SimpleMonster);