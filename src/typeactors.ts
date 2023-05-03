import { SimpleMove, noMove } from './movements.js';
/*this is the list of actors types that exists in the world, we use a different 
sticker for each actor, and different powers */

// export const ActorsTypeList = {
//     SimpleMonster : {Move: SimpleMove, Type : "SimpleMonster", Color : "\x1b[37m  \x1b[0m", HitPoints : 3, Cost : 0, gain: 0, Damage: 0, AttackRange : 0},
//     BigMonster : {Move : SimpleMove, Type : "BigMonster", Color : "\x1b[37m🦌\x1b[0m", HitPoints : 3, Cost : 0, gain : 0, Damage: 0, AttackRange : 0},
//     SimpleTower : {Move: noMove, Type : "SimpleTower", Color : "\x1b[48;2;34;139;34m🏯\x1b[0m", HitPoints : 0, Cost : 1000,gain : 0, Damage: 1, AttackRange : 3},
//     SimpleTowerII : {Move: noMove, Type : "SimpleTowerII", Color : "\x1b[48;2;34;139;34m🏯\x1b[0m", HitPoints : 0, Cost : 1500, gain : 0,Damage: 3, AttackRange : 5},
//     SimpleTowerIII : {Move: noMove, Type : "SimpleTowerIII", Color : "\x1b[48;2;34;139;34m🏯\x1b[0m", HitPoints : 0, Cost : 2000, gain : 0,Damage: 5, AttackRange : 7},
//     MagicTower : {Move: noMove, Type : "MagicTower", Color : "\x1b[37m⛪\x1b[0m", HitPoints : 0, Cost : 1000, gain : 0,Damage: 1, AttackRange : 3},
//     MagicTowerII : {Move: noMove, Type : "MagicTowerII", Color : "\x1b[37m⛪\x1b[0m", HitPoints : 0, Cost : 1500, gain : 0,Damage: 3, AttackRange : 5},
//     MagicTowerIII : {Move: noMove, Type : "MagicTowerIII", Color : "\x1b[37m⛪\x1b[0m", HitPoints : 0, Cost : 2000, gain : 0,Damage: 5, AttackRange : 7},
//     Floor : {Move: noMove, Type : "Floor", Color : "\x1b[48;2;34;139;34m ▒\x1b[0m", Cost : 0, HitPoints : 0, gain : 0,Damage: 0, AttackRange : 0},
//     River : {Move: noMove, Type : "River" , Color : "\x1b[37m  \x1b[0m", HitPoints : 0, Cost : 0, gain : 0,Damage: 0, AttackRange : 0},
//     Road : {Move: noMove, Type : "Road" , Color : "\x1b[48;2;76;70;50m  \x1b[0m", HitPoints : 0, Cost : 0, gain : 0,Damage: 0, AttackRange : 0},
//     Tree : {Move: noMove, Type : "Tree", Color : "\x1b[48;2;34;139;34m 🎄\x1b[0m", HitPoints : 0, Cost : 0, gain : 0,Damage: 0, AttackRange : 0},
//     Fire : {Move: noMove, Type : "Fire", Color : "\x1b[48;2;34;139;34m 🔥\x1b[0m", HitPoints : 0, Cost : 0, gain : 0,Damage: 0, AttackRange : 0},
// };