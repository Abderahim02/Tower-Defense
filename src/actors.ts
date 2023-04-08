//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        BEGIN            /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import { ActorsTypeList, world } from "./world.js";
import { AvailablePosition } from "./movements.js";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        TOWER            /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function CreateMagicTower(i:number, j:number, world:world){
    let move:any = Array(2);
    move = [i,j];
    if(!AvailablePosition(move, world)){
        world.Matrix[i][j]={
            Pos:     { x: i,y: j },
            AnActor:ActorsTypeList.MagicTower
        };
        return world;
    }
    return world;
}

function CreateSimpleTower(i:number, j:number, world:world){
    let move = Array(2);
    move = [i,j];
    if(!AvailablePosition(move, world)){
        world.Matrix[i][j]={
            Pos:     { x: i, y: j },
            AnActor:ActorsTypeList.SimpleTower
        };
        return world;
    }
    return world;
}

function EnemiesInAttackRange(i: number,j: number,world: world){
    // if(world.Matrix[i][j].typeActor.type != "Tower"){
    //     console.log("Select a Tower");
    // }
    const enemies: any =[];

    const range: number = world.Matrix[i][j].AnActor.AttackRange;
    for(let k: number =i-range; k<i+range; k++){
        for(let l:number =j-range; l<j+range; l++){
            if(world.Matrix[k][l].AnActor.Type === ActorsTypeList.BigMonster.Type){
                enemies.push({x:world.Matrix[k][l].Pos.x, y:world.Matrix[k][l].Pos.y});
                
                
            }
        }
    }
    
    return enemies;
}

 
function TowerAttacks(i: number,j: number,world: world){
    const enemies:any = EnemiesInAttackRange(i,j,world);
    if(enemies.length!==0){
        const rand: number  = Math.floor(Math.random()*enemies.length);
        //console.log(enemies[0].x)
        world.Matrix[enemies[rand].x][enemies[rand].y].AnActor.HitPoints-=world.Matrix[i][j].AnActor.Damage;
        if(world.Matrix[enemies[rand].x][enemies[rand].y].AnActor.HitPoints <= 0){
            world.Matrix[enemies[rand].x][enemies[rand].y].AnActor=ActorsTypeList.Road;
            world.Score ++;
        }
    }
    return world;
}

export{TowerAttacks, CreateMagicTower, CreateSimpleTower, EnemiesInAttackRange};




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////           END           /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////