"use strict";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        BEGIN            /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.__esModule = true;
exports.EnemiesInAttackRange = exports.CreateSimpleTower = exports.CreateMagicTower = exports.TowerAttacks = void 0;
var world_ts_1 = require("./world.ts");
var movements_ts_1 = require("./movements.ts");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        TOWER            /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CreateMagicTower(i, j, world) {
    var move = Array(2);
    move = [i, j];
    if (!(0, movements_ts_1.AvailablePosition)(move, world)) {
        world.Matrix[i][j] = {
            Pos: { x: i, y: j },
            AnActor: world_ts_1.ActorsTypeList.MagicTower
        };
        return world;
    }
    return world;
}
exports.CreateMagicTower = CreateMagicTower;
function CreateSimpleTower(i, j, world) {
    var move = Array(2);
    move = [i, j];
    if (!(0, movements_ts_1.AvailablePosition)(move, world)) {
        world.Matrix[i][j] = {
            Pos: { x: i, y: j },
            AnActor: world_ts_1.ActorsTypeList.SimpleTower
        };
        return world;
    }
    return world;
}
exports.CreateSimpleTower = CreateSimpleTower;
function EnemiesInAttackRange(i, j, world) {
    // if(world.Matrix[i][j].typeActor.type != "Tower"){
    //     console.log("Select a Tower");
    // }
    var enemies = [];
    var range = world.Matrix[i][j].AnActor.AttackRange;
    for (var k = i - range; k < i + range; k++) {
        for (var l = j - range; l < j + range; l++) {
            if (world.Matrix[k][l].AnActor.Type === world_ts_1.ActorsTypeList.BigMonster.Type) {
                enemies.push({ x: world.Matrix[k][l].Pos.x, y: world.Matrix[k][l].Pos.y });
            }
        }
    }
    return enemies;
}
exports.EnemiesInAttackRange = EnemiesInAttackRange;
function TowerAttacks(i, j, world) {
    var enemies = EnemiesInAttackRange(i, j, world);
    if (enemies.length != 0) {
        var rand = Math.floor(Math.random() * enemies.length);
        //console.log(enemies[0].x)
        world.Matrix[enemies[rand].x][enemies[rand].y].AnActor.HitPoints -= world.Matrix[i][j].AnActor.Damage;
        if (world.Matrix[enemies[rand].x][enemies[rand].y].AnActor.HitPoints <= 0) {
            world.Matrix[enemies[rand].x][enemies[rand].y].AnActor = world_ts_1.ActorsTypeList.Road;
            world.Score++;
        }
    }
    return world;
}
exports.TowerAttacks = TowerAttacks;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////           END           /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
