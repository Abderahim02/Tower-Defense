
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


const ActorsTypeList = {
    SimpleMonster : {dx : 3, dy : 3, type : "Monster"},
    BigMonster : {dx : 1, dy : 1, type : "Monster"},
    SimpleTower : {dx : 0, dy : 0, type : "Tower"},
    MagicTower : {dx : 0, dy : 0, type : "Tower"},
    Floor : {dx : 0, dy : 0, type : "Floor"},
    River : {dx : 0, dy : 0, type : "River" },
};
// const MapTexture = {
//     Floor : ActorTypeGen({x : 11, y : 1}, 3, 3, "Monster"),
    
// }
/* function SimpleMove(anActor, aWorld){
    let x = anActor.pos.x, y = anActor.pos.y;
    if (isEmptyPosition(aWorld[x])){

    }
} */
console.log(ActorsList.SimpleMonster);