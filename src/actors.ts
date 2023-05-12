import { ActorsTypeList, actor, position, world, point , action} from "./defineType.js";
import { AvailablePosition , SimpleMove} from "./movements.js";
import {ConstructNeighbors, GetActorType, NextOptimalMove} from "./optimal_road.js";




//this function puts an actor  in the position {i,j} 
export const CreateActor = (p: point, act : actor ,w:world):world=>{
    if( !AvailablePosition(p, w)){
        w.Matrix[p.x][p.y]={
            Pos:   p,
            AnActor:act
        };
        return w;
    }
    return w;
};

export function IsGoodTreePlacement(p: point, w: world): boolean {
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
    return CreateActor({x:i, y:j}, ActorsTypeList.MagicTower, w);
};
//this function creates a simple tower in the position {i,j} 
export const CreateSimpleTower=(i:number, j:number, w:world) : world => {
    return CreateActor({x:i, y:j}, ActorsTypeList.SimpleTower, w);
};

//this function creates a flame tower in the position {i,j} 
export const CreateFlameTower=(i:number, j:number, w:world) : world => {
    return CreateActor({x:i, y:j}, ActorsTypeList.FlameTower, w);
};

//this function test if the position p belongs to the grid
export function isValidPosition(w : world, p : point){
    return  p!== undefined && p.x < w.Height && p.y < w.Width && p.x >= 0 && p.y >= 0; //
}
export const EnemiesInAttackRange=(p: point ,w: world) : point[]=>{
    const enemies: point[] =[];
    const range: number = w.Matrix[p.x][p.y].AnActor.AttackRange;
    for(let k: number =p.x-range; k<p.x+range; k++){
        for(let l:number =p.y-range; l<p.y+range; l++){
              if( isValidPosition(w, {x : k, y :l }) && (GetActorType(w,{x : k, y : l}) === "BigMonster" || GetActorType(w,{x : k, y : l}) === "SimpleMonster" ) ){
                enemies.push({x:w.Matrix[k][l].Pos.x, y:w.Matrix[k][l].Pos.y});
            }
        }
    }
    return enemies;
};

export const TowersAttackRange=(p: point ,w: world) : point[]=>{
    const enemies: point[] =[];
    const range: number = w.Matrix[p.x][p.y].AnActor.AttackRange;
    for(let k: number =p.x-range; k<= p.x+range; k++){
        for(let l:number =p.y-range; l<= p.y+range; l++){
            if( isValidPosition(w, {x : k, y :l }) ){
                enemies.push({x:w.Matrix[k][l].Pos.x, y:w.Matrix[k][l].Pos.y});
            }
        }
    }
    return enemies;
};

// function FlameTowerAttack(p : point, w: world): world {
//     const enemies: point[] = EnemiesInAttackRange(p, w);
//     if (enemies.length !== 0) {
//        for(let j : number = 0; j<enemies.length; ++j){
//         w.Matrix[enemies[j].x][enemies[j].y].AnActor.HitPoints -=
//         w.Matrix[p.x][p.y].AnActor.Damage;
//         if (w.Matrix[enemies[j].x][enemies[j].y].AnActor.HitPoints <= 0) {
//             w=killActor(w, enemies[j]);
//             w.Score+=2;
//         }
//        }
//     }
//     return w;
// }


export const TowersAttacks = (w: world): world => {
    function TowerAttack(p : point, w: world): world {
        const enemies: point[] = EnemiesInAttackRange(p, w);
        if (enemies.length !== 0) {
            // const rand: number = Math.floor(Math.random() * enemies.length);
            // w.Matrix[enemies[rand].x][enemies[rand].y].AnActor.HitPoints -=
            //     w.Matrix[p.x][p.y].AnActor.Damage;
            //     if (w.Matrix[enemies[rand].x][enemies[rand].y].AnActor.HitPoints <= 0) {
            //         w=killActor(w, enemies[rand]);
            //         w.Score+=2;
            //     }
           for(let j : number = 0; j<enemies.length; ++j){
            w.Matrix[enemies[j].x][enemies[j].y].AnActor.HitPoints -=
            w.Matrix[p.x][p.y].AnActor.Damage;
            if (w.Matrix[enemies[j].x][enemies[j].y].AnActor.HitPoints <= 0) {
                w=killActor(w, enemies[j]);
                w.Score+=2;
            }
           }
        }
        return w;
        }
    for (let k = 0; k < w.Towers.length; k++) {
        TowerAttack( w.Towers[k].Pos, w);
    }
    return w;
  };

export function killActor(w: world, p:point): world{
    // console.log("killed monster in position :"+`x :${p.x} y: ${p.y}`);
    for(let i=0; i<w.Actors.length; i++){
        if(w.Actors[i].Pos.x===p.x && w.Actors[i].Pos.y===p.y){
            w.Actors.splice(i, 1);
            w.Matrix[p.x][p.y].AnActor = ActorsTypeList.Road;
            return w;
        }
    }
    return w;
}

function IsGoodTowerPlacement(p: point, w : world){
    return p.y > Math.floor(w.Width/4) ;
}
export const TowersPlacement=(w:world, numberoftowers: number):world=>{
    const IsFloor: (p: point) => boolean = (p: point) => {
        return GetActorType(w, p) === "Floor";
      };
    const TowersPositions: point[] = w.Matrix.flatMap((row, y) =>
      row.map((_, x) => ({ x, y })).filter((p) => IsGoodTreePlacement(p, w))
    ).filter(IsFloor);
    let i:number =0;
    let count : number =0;
    while( i<numberoftowers && count < 4 ){
        const rand_f: number = Math.floor(Math.random()*TowersPositions.length);
        const rand = Math.floor(Math.random()*2);
        if(rand===0){
            if(rand_f!== undefined && IsGoodTowerPlacement(TowersPositions[rand_f], w)){
                CreateActor(TowersPositions[rand_f], ActorsTypeList.MagicTower, w);
                w.Towers.push({
                    Pos : TowersPositions[rand_f] ,
                    AnActor : ActorsTypeList.MagicTower
                });
                count++;
            }
        }
        else{
            if(rand_f!== undefined && IsGoodTowerPlacement(TowersPositions[rand_f], w) ){
                CreateActor(TowersPositions[rand_f], ActorsTypeList.SimpleTower, w);
                w.Towers.push({
                    Pos : TowersPositions[rand_f] ,
                    AnActor : ActorsTypeList.SimpleTower
                });
                count++;
            }
        }
        ++i;
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
        w.Actors.push({Pos:  { x: xPosition, y: 0 },
                                 AnActor : actr});
    }
   return w;
}

export function in_astar(x: point, y: point): number{
    if(x.x===y.x && x.y===y.y){
        return 1;
    }
    return 0;
}




/*this function create a phase of the game, we see all possible moves for all actors
and we return a list of actions */
export function gamePhase(aWorld : world, OptimalRoad : point[]) : action[] {
    const Phase : action[] = [];

    for (let i : number = 0; i < aWorld.Actors.length; ++i ){
        //Simple monsters move with simple moves 
        if(GetActorType(aWorld, aWorld.Actors[i].Pos) === "SimpleMonster"){
            const basicMove : point = SimpleMove(aWorld.Actors[i], aWorld, aWorld.Actors[i].AnActor.Type );
            const sm : action = {  AnActorInfos : aWorld.Actors[i] , aMove : {ExPos : aWorld.Actors[i].Pos , NewPos : {x : basicMove.x, y : basicMove.y} }};
            Phase.push(sm);
        }
        //Big monsters use the Astar road to reach the end
        else if(GetActorType(aWorld, aWorld.Actors[i].Pos) === "BigMonster"){
            const bestMove : point = NextOptimalMove( aWorld.Actors[i].Pos, aWorld,OptimalRoad);
                const m : action = {  AnActorInfos : aWorld.Actors[i] , aMove : {ExPos : aWorld.Actors[i].Pos , NewPos : {x : bestMove.x, y : bestMove.y} }};    
                Phase.push(m);
        }
    }
    return Phase;
}

/**
 * 
 * @param action1 an action 
 * @param action2 an action
 * @returns if both actions have the same directions
 */
function compareActions(action1: action, action2: action): boolean {
    const t : boolean = 
    action1.aMove.NewPos.x === action2.aMove.NewPos.x &&
    action1.aMove.NewPos.y === action2.aMove.NewPos.y ;
    return t;
  }

/*we filter the moves of the phase, if there will be a conflict between two actors going to
    same new position*/
export function FilterActions(aPhase : action[]) : action[]{
    const filteredActions: action[] = [];
    for (const action of aPhase) {
        const index = filteredActions.findIndex((filteredAction) =>
          compareActions(action, filteredAction)
        );
        if (index !== -1) {
          if (action.AnActorInfos.AnActor.Type === "BigMonster") {
            filteredActions[index] = action;
          }
        } 
        else {
          filteredActions.push(action);
        }
      }
    return filteredActions;
  }

/**
 * 
 * @param aPhase a phase in the game
 * @param aWorld the world
 * @returns execute all modifications needed by the pahe in the world
 */
export function gameMotor(aPhase: action[], aWorld: world): world {
    const filteredActions: action[] = FilterActions(aPhase);
    for(let i : number =0; i < filteredActions.length; ++i){
        const act : action = filteredActions[i];
        aWorld.Matrix[act.aMove.ExPos.x][act.aMove.ExPos.y].AnActor = ActorsTypeList.Road;
        aWorld.Matrix[act.aMove.NewPos.x][act.aMove.NewPos.y].AnActor = act.AnActorInfos.AnActor;
        aWorld.Actors[i].Pos.x = act.aMove.NewPos.x ;
        aWorld.Actors[i].Pos.y = act.aMove.NewPos.y ;
    }
    return aWorld;
  } 

//recursive terminal gameover
export function gameover(world: world,end:number): number{
    function rec(ac:position[]):number{
        if(ac.length===0) return 0;
        if(ac[0].Pos.x===Math.floor(end/world.Width) && ac[0].Pos.y===end%world.Width) 
            return 1;
        return rec(ac.slice(1));
    }   
     return rec(world.Actors);
}


/////////////////////////////////////           END           /////////////////////////////////////////////////////
