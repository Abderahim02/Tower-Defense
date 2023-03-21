
function ConsActor(_pos, _actions, _type) { return { pos: _pos, actions: _actions, type : _type}; }
function ConsActor(_pos,, _type) { return { pos: _pos, actions: _actions, type : _type}; }

// const anActor = {
//     pos:     { x: 5, y: 7 },
//     actions: {
//         move : (anActor, aWorld) => { 1,  0 },
//     },
// };

// const MonsterType = {
//     pos:     { x: 5, y: 7 },
//     actions: {
//         // move: (anActor, aWorld) => { dx: 1, dy: 0 },
//         move: (anActor, aWorld) => { 1, 0 },
//     }, 
// };


function ActorTypeGen(pos, _dx, _dy, _type){
    return ConsActor( pos, (anActor, aWorld) => [_dx, _dy], _type);
}

const ActorsList = {
    SimpleMonster : ActorTypeGen({x : 11, y : 1}, 3, 3, "Monster"),
    BigMonster : ActorTypeGen({x : 5, y : 7}, 2, 1, "Monster"),
    SimpleTower : ActorTypeGen({x : 10, y : 1}, 0, 0, "Tower"),
    MagicTower : ActorTypeGen({x : 5, y : 4}, 0, 0, "Tower"),
};

// const MapTexture = {
//     Floor : ActorTypeGen({x : 11, y : 1}, 3, 3, "Monster"),
    
// }
function SimpleMove(anActor, aWorld){
    let [x,y] = [anActor.pos.x, anActor.pos.y]; 
    if()
}
console.log(ActorsList.SimpleMonster);