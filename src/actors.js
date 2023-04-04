//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        BEGIN            /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import { ActorsTypeList } from "./world.js";
import { AvailablePosition } from "./movements.js";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        TOWER            /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function CreateMagicTower(i, j, world){
    let move = Array(2);
    move = [i,j]
    if(!available_position(move, world)){
        world.Matrix[i][j]={
            pos:     { x: i, y: j },
            typeActor:ActorsTypeList.MagicTower
        };
        return world;
    }
    return world;
}

function CreateSimpleTower(i, j, world){
    let move = Array(2);
    move = [i,j]
    if(!AvailablePosition(move, world)){
        world.Matrix[i][j]={
            pos:     { x: i, y: j },
            typeActor:ActorsTypeList.SimpleTower
        };
        return world;
    }
    return world;
}

function EnemiesInAttackRange(i,j,world){
    // if(world.Matrix[i][j].typeActor.type != "Tower"){
    //     console.log("Select a Tower");
    // }
    let enemies=[];

    let range = world.Matrix[i][j].typeActor.attack_range;
    for(let k=i-range; k<i+range; k++){
        for(let l=j-range; l<j+range; l++){
            if(world.Matrix[k][l].typeActor.type === ActorsTypeList.BigMonster.type){
                enemies.push({x:world.Matrix[k][l].pos.x, y:world.Matrix[k][l].pos.y})
                
                
            }
        }
    }
    
    return enemies;
}


function TowerAttacks(i,j,world){
    let enemies = EnemiesInAttackRange(i,j,world);
    if(enemies.length!=0){
        let rand  = Math.floor(Math.random()*enemies.length);
        //console.log(enemies[0].x)
        world.Matrix[enemies[rand].x][enemies[rand].y].typeActor.hit_points-=world.Matrix[i][j].typeActor.damage;
        if(world.Matrix[enemies[rand].x][enemies[rand].y].typeActor.hit_points <= 0){
            world.Matrix[enemies[rand].x][enemies[rand].y].typeActor=ActorsTypeList.Road;
            world.score ++;
        }
    }
    return world;
}

export{TowerAttacks, CreateMagicTower, CreateSimpleTower, EnemiesInAttackRange}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////           END           /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////