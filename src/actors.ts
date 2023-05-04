import { ActorsTypeList, actor, position, world, point } from "./defineType.js";
import { AvailablePosition } from "./movements.js";
import {ConstructNeighbors, GetActorType} from "./optimal_road.js";




//this function puts an actor  in the position {i,j} 
export const CreateActor=(p: point, act : actor ,w:world):world=>{
    if(!AvailablePosition(p, w)){
        w.Matrix[p.x][p.y]={
            Pos:   p,
            AnActor:act
        };
        return w;
    }
    return w;
};

function IsGoodTreePlacement(p: point, w: world): boolean {
    const IsRoad: (p: point) => boolean = (p: point) => {
        return GetActorType(w, p) === "Road";
    };
    const t: point[] = ConstructNeighbors(w, p).filter(IsRoad);
    return t.length > 3;
  }

export const TreesPlacement = (w: world): world=> {
    const IsFloor: (p: point) => boolean = (p: point) => {
        return GetActorType(w, p) === "Floor";
      };
    const treePositions: point[] = w.Matrix.flatMap((row, y) =>
      row.map((_, x) => ({ x, y })).filter((p) => IsGoodTreePlacement(p, w))
    ).filter(IsFloor);
    //on ajoute la moitié 
    for(let i : number = 0 ; i<treePositions.length; i+=2 ){
        CreateActor(treePositions[i], ActorsTypeList.Tree, w);
    }
    return w;
  };

//this function creates a magic tower in the position {i,j} 
export const CreateMagicTower=(i:number, j:number, w:world):world=>{
    const m : point = {x : i, y : j};
    if(!AvailablePosition(m, w)){
        w.Matrix[i][j]={
            Pos:     { x: i,y: j },
            AnActor:ActorsTypeList.MagicTower
        };
        return w;
    }
    return w;
};
//this function creates a simple tower in the position {i,j} 
export const CreateSimpleTower=(i:number, j:number, w:world) : world => {
    const move : point = {x : i, y : j};
    if(!AvailablePosition(move, w)){
        w.Matrix[i][j]={
            Pos:     { x: i, y: j },
            AnActor:ActorsTypeList.SimpleTower
        };
        return w;
    }
    return w;
};

export const EnemiesInAttackRange=(i: number,j: number,w: world) : point[]=>{
    const enemies: point[] =[];
    const range: number = w.Matrix[i][j].AnActor.AttackRange;
    for(let k: number =i-range; k<i+range; k++){
        for(let l:number =j-range; l<j+range; l++){
            if(w.Matrix[k][l].AnActor.Type === ActorsTypeList.BigMonster.Type){
                enemies.push({x:w.Matrix[k][l].Pos.x, y:w.Matrix[k][l].Pos.y});
            }
        }
    }
    return enemies;
};




export const TowersAttacks = (w: world): world => {
    function TowerAttack(i: number, j: number, w: world): world {
      const enemies: point[] = EnemiesInAttackRange(i, j, w);
      if (enemies.length !== 0) {
        const rand: number = Math.floor(Math.random() * enemies.length);
        w.Matrix[enemies[rand].x][enemies[rand].y].AnActor.HitPoints -=
          w.Matrix[i][j].AnActor.Damage;
        if (w.Matrix[enemies[rand].x][enemies[rand].y].AnActor.HitPoints <= 0) {
        //   w.Matrix[enemies[rand].x][enemies[rand].y].AnActor = ActorsTypeList.Road;
          w=killActor(w, enemies[rand]);
          w.Score++;
        }
      }
      return w;
    }
    for (let k = 0; k < w.Towers.length; k++) {
      const i = w.Towers[k].Pos.x;
      const j = w.Towers[k].Pos.y;
      TowerAttack(i, j, w);
    }
    return w;
  };

export function killActor(w: world, p:point): world{
    console.log("killed monster in position :"+`x :${p.x} y: ${p.y}`);
    for(let i=0; i<w.Actors.length; i++){
        if(w.Actors[i].Pos.x===p.x && w.Actors[i].Pos.y===p.y){
            w.Actors.splice(i, 1);
            w.Matrix[p.x][p.y].AnActor = ActorsTypeList.Road;
            return w;
        }
    }
    return w;
}

export const TowersPlacement=(w:world):world=>{
    const max = 10;
    let count=0;
    const floor = ActorsTypeList.Floor.Type;
    const road = ActorsTypeList.Road.Type;
    for(let i=5; i<w.Height-5; i++){
        for(let j=5; j<w.Width-5; j++){
            if((w.Matrix[i][j].AnActor.Type===floor && w.Matrix[i][j+1].AnActor.Type===road && w.Matrix[i+1][j+1].AnActor.Type===road && w.Matrix[i-1][j+1].AnActor.Type===road )){
                if(Math.floor(Math.random()*2)===0){
                    w=CreateMagicTower(i,j,w);
                    w.Towers.push({
                        Pos : {x : i, y: j},
                        AnActor : ActorsTypeList.MagicTower
                    }); 
                }
                else{
                    w=CreateSimpleTower(i,j,w);
                    w.Towers.push({
                        Pos : {x : i, y: j},
                        AnActor : ActorsTypeList.SimpleTower
                    });
                }
                count++;
            }
            if(max===count){
                return w;
            }
        }
    }
    return w;
};


export const updatetower=(w: world, i: number, j: number): world=>{
    const rand: number = Math.floor(Math.random()*2);
    if(rand===1){
        if(w.Matrix[i][j].AnActor.Type==="SimpleTower"){
            w.Matrix[i][j]={
                Pos:     { x: i, y: j },
                AnActor:ActorsTypeList.SimpleTowerII
            };
        }
        else if(w.Matrix[i][j].AnActor.Type==="SimpleTowerII"){
            w.Matrix[i][j]={
                Pos:     { x: i, y: j },
                AnActor:ActorsTypeList.SimpleTowerIII
            };
        }
        if(w.Matrix[i][j].AnActor.Type==="MagicTower"){
            w.Matrix[i][j]={
                Pos:     { x: i, y: j },
                AnActor:ActorsTypeList.MagicTowerII
            };
        }
        else if(w.Matrix[i][j].AnActor.Type==="MagicTowerII"){
            w.Matrix[i][j]={
                Pos:     { x: i, y: j },
                AnActor:ActorsTypeList.MagicTowerIII
            };
        }
    }

    return w;
};



export function addActorsToWorld(w : world, actr : actor, xPosition: number):world{
    if(AvailablePosition({ x: xPosition, y: 0 } , w)){
        w.Matrix[xPosition][0].AnActor = actr;
        w.Actors = w.Actors.concat({Pos:  { x: xPosition, y: 0 },
                                 AnActor : actr}
                                 );
    }
   return w;
}

/////////////////////////////////////           END           /////////////////////////////////////////////////////
