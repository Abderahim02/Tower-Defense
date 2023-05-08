//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        BEGIN            /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import { ActorsTypeList, actor, position, world } from "./defineType.js";
import { AvailablePosition } from "./movements.js";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        TOWER            /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



export const CreateMagicTower=(i:number, j:number, world:world):world=>{
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
};

export const CreateSimpleTower=(i:number, j:number, world:world):world=>{
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
};

export const EnemiesInAttackRange=(i: number,j: number,world: world):any[]=>{
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
};




export const TowersAttacks = (world: world): world => {
    function TowerAttack(i: number, j: number, world: world): world {
      const enemies: any = EnemiesInAttackRange(i, j, world);
      if (enemies.length !== 0) {
        const rand: number = Math.floor(Math.random() * enemies.length);
        world.Matrix[enemies[rand].x][enemies[rand].y].AnActor.HitPoints -=
          world.Matrix[i][j].AnActor.Damage;
        if (world.Matrix[enemies[rand].x][enemies[rand].y].AnActor.HitPoints <= 0) {
          world.Matrix[enemies[rand].x][enemies[rand].y].AnActor = ActorsTypeList.Road;
          world=killActor(world, enemies[rand].x, enemies[rand].y);
          console.log(world.Score);
          world.Score++;
        }
      }
      return world;
    }
    for (let k = 0; k < world.Towers.length; k++) {
      const i = world.Towers[k].Pos.x;
      const j = world.Towers[k].Pos.y;
      TowerAttack(i, j, world);
    }
    return world;
  };

export function killActor(world: world, x:number, y:number): world{
    for(let i=0; i<world.Actors.length; i++){
        if(world.Actors[i].Pos.x===x && world.Actors[i].Pos.y===y){
            world.Actors.splice(i);
            return world;
        }
    }
    return world;
}

export const TowersPlacement=(world:world):world=>{
    const max = 10;
    let count=0;
    const floor = ActorsTypeList.Floor.Type;
    const road = ActorsTypeList.Road.Type;
    for(let i=5; i<world.Height-5; i++){
        for(let j=5; j<world.Width-5; j++){
            if((world.Matrix[i][j].AnActor.Type===floor && world.Matrix[i][j+1].AnActor.Type===road && world.Matrix[i+1][j+1].AnActor.Type===road && world.Matrix[i-1][j+1].AnActor.Type===road )){
                if(Math.floor(Math.random()*2)===0){
                    world=CreateMagicTower(i,j,world);
                    world.Towers.push({
                        Pos : {x : i, y: j},
                        AnActor : ActorsTypeList.MagicTower
                    }); 
                }
                else{
                    world=CreateSimpleTower(i,j,world);
                    world.Towers.push({
                        Pos : {x : i, y: j},
                        AnActor : ActorsTypeList.SimpleTower
                    });
                }
                count++;
            }
            if(max===count){
                return world;
            }
        }
    }
    return world;
};


export const updatetower=(world: world, i: number, j: number): world=>{
    const rand: number = Math.floor(Math.random()*2);
    if(rand===1){
        if(world.Matrix[i][j].AnActor.Type==="SimpleTower"){
            world.Matrix[i][j]={
                Pos:     { x: i, y: j },
                AnActor:ActorsTypeList.SimpleTowerII
            };
        }
        else if(world.Matrix[i][j].AnActor.Type==="SimpleTowerII"){
            world.Matrix[i][j]={
                Pos:     { x: i, y: j },
                AnActor:ActorsTypeList.SimpleTowerIII
            };
        }
        if(world.Matrix[i][j].AnActor.Type==="MagicTower"){
            world.Matrix[i][j]={
                Pos:     { x: i, y: j },
                AnActor:ActorsTypeList.MagicTowerII
            };
        }
        else if(world.Matrix[i][j].AnActor.Type==="MagicTowerII"){
            world.Matrix[i][j]={
                Pos:     { x: i, y: j },
                AnActor:ActorsTypeList.MagicTowerIII
            };
        }
    }

    return world;
};



export function addActorsToWorld(w:world,actr:actor,xPosition: number):position[]{
   
   return  w.Actors.concat({Pos:  { x: Math.floor(w.Height/2), y: 0 },
                             AnActor : actr}
                             );
}

//export{TowerAttacks, CreateMagicTower, CreateSimpleTower, EnemiesInAttackRange};




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////           END           /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////