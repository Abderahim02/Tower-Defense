import { ActorsTypeList, actor, position, world, point , action} from "./defineType.js";
import { AvailablePosition , SimpleMove} from "./movements.js";
import {ConstructNeighbors, GetActorType, NextOptimalMove} from "./optimal_road.js";




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

//this function creates a flame tower in the position {i,j} 
export const CreateFlameTower=(i:number, j:number, w:world) : world => {
    const move : point = {x : i, y : j};
    if(!AvailablePosition(move, w)){
        w.Matrix[i][j]={
            Pos:     { x: i, y: j },
            AnActor:ActorsTypeList.FlameTower
        };
        return w;
    }
    return w;
};

//this function test if the position p belongs to the grid
function isValidPosition(w : world, p : point){
    return  p!== undefined && p.x < w.Height && p.y < w.Width && p.x >= 0 && p.y >= 0; //
}
export const EnemiesInAttackRange=(p: point ,w: world) : point[]=>{
    const enemies: point[] =[];
    const range: number = w.Matrix[p.x][p.y].AnActor.AttackRange;
    for(let k: number =p.x-range; k<p.x+range; k++){
        for(let l:number =p.y-range; l<p.y+range; l++){
            if( isValidPosition(w, {x : k, y :l }) && w.Matrix[k][l].AnActor.Type === ActorsTypeList.BigMonster.Type){
                enemies.push({x:w.Matrix[k][l].Pos.x, y:w.Matrix[k][l].Pos.y});
            }
        }
    }
    return enemies;
};

function putFlames(w: world, pe: point): world{

    return w;
}

function FlameTowerAttack(p : point, w: world): world {
    const enemies: point[] = EnemiesInAttackRange(p, w);
    if (enemies.length !== 0) {
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

export function MagicPortal(w: world): world{
    let i: number =0;
    let j: number =0;
    const pos1: point={x:0, y:0};
    while(i<w.Height){
        const rand=1;
        while(j<w.Width/3){
            if(rand===1 && w.Matrix[i][j].AnActor.Type!==undefined && w.Matrix[i][j].AnActor.Type===ActorsTypeList.Floor.Type){
                pos1.x=i;
                pos1.y=j;
                j=w.Width/3;
                i=w.Height;
            }
            j++;
        }
        i++;
    }
    i=0;
    j=(2*w.Width)/3;
    const pos2: point={x:0, y:0};
    while(i<w.Height){
        const rand2=1;
        while(j<w.Width){
            if(rand2===1 && w.Matrix[i][j].AnActor.Type!==undefined && w.Matrix[i][j].AnActor.Type===ActorsTypeList.Floor.Type){
                pos2.x=i;
                pos2.y=j;
                j=w.Width;
                i=w.Height;
            }
            j++;
        }
        i++;
    }
    w.Matrix[pos1.x][pos1.y].AnActor=ActorsTypeList.Portal;
    w.Matrix[pos2.x][pos2.y].AnActor=ActorsTypeList.Portal;
    return w;
}


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

// export const TowersPlacement=(w:world):world=>{
//     const max = 10;
//     let count=0;
//     const floor = ActorsTypeList.Floor.Type;
//     const road = ActorsTypeList.Road.Type;
//     for(let i=5; i<w.Height-5; i++){
//         for(let j=5; j<w.Width-5; j++){
//             if((w.Matrix[i][j].AnActor.Type===floor && w.Matrix[i][j+1].AnActor.Type===road && w.Matrix[i+1][j+1].AnActor.Type===road && w.Matrix[i-1][j+1].AnActor.Type===road )){
//                 if(Math.floor(Math.random()*2)===0){
//                     w=CreateMagicTower(i,j,w);
//                     w.Towers.push({
//                         Pos : {x : i, y: j},
//                         AnActor : ActorsTypeList.MagicTower
//                     }); 
//                 }
//                 else{
//                     w=CreateSimpleTower(i,j,w);
//                     w.Towers.push({
//                         Pos : {x : i, y: j},
//                         AnActor : ActorsTypeList.SimpleTower
//                     });
//                 }
//                 count++;
//             }
//             if(max===count){
//                 return w;
//             }
//         }
//     }
//     return w;
// };

export const TowersPlacement=(w:world, numberoftowers: number):world=>{
    const IsFloor: (p: point) => boolean = (p: point) => {
        return GetActorType(w, p) === "Floor";
      };
    const TowersPositions: point[] = w.Matrix.flatMap((row, y) =>
      row.map((_, x) => ({ x, y })).filter((p) => IsGoodTreePlacement(p, w))
    ).filter(IsFloor);
    
    for(let i:number =0; i<numberoftowers; i++){
        const rand_f: number = Math.floor(Math.random()*TowersPositions.length);
        const rand = Math.floor(Math.random()*2);
        if(rand===0){
            if(rand_f!== undefined){
                CreateActor(TowersPositions[rand_f], ActorsTypeList.MagicTower, w);
                w.Towers.push({
                    Pos : TowersPositions[rand_f] ,
                    AnActor : ActorsTypeList.MagicTower
                });
            }
        }
        else{
            if(rand_f!== undefined){
                CreateActor(TowersPositions[rand_f], ActorsTypeList.SimpleTower, w);
                w.Towers.push({
                    Pos : TowersPositions[rand_f] ,
                    AnActor : ActorsTypeList.SimpleTower
                });
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

export function in_astar(x: point, y: point): number{
    if(x.x===y.x && x.y==y.y){
        return 1;
    }
    return 0;
}

export function flux(w: world, astar: point[]): number{
    let cases=0;
    for(let i=0; i<w.Towers.length; i++){
        let x=w.Towers[i].Pos.x;
        let y=w.Towers[i].Pos.y;
        for(let j=x-w.Towers[i].AnActor.AttackRange; j<x+w.Towers[i].AnActor.AttackRange; j++){
            for(let k=y-w.Towers[i].AnActor.AttackRange; k<y+w.Towers[i].AnActor.AttackRange; k++){
                if(w.Matrix[j][k].AnActor.Type!==undefined){
                    if(w.Matrix[j][k].AnActor.Type===ActorsTypeList.Floor.Type){
                        cases++;
                    }
                }
            }
        }
    }
    cases=cases*6;
    return cases;
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

// export function gameMotor(aPhase : action[] , aWorld : world) : world {
//     const predicate = (value : action) => value.AnActorInfos.AnActor.Type === "BigMonster";
//     /*we filter the moves of the phase, if there will be a conflict between two actors going to
//     same new position*/
//     aPhase  = aPhase.filter((value, index, arr) => {
//       return arr.indexOf(value) === index && (index === arr.lastIndexOf(value) || predicate(value));
//     });
//     for(let i : number =0; i < aPhase.length; ++i){
//         const act : action = aPhase[i];
//         aWorld.Matrix[act.aMove.ExPos.x][act.aMove.ExPos.y].AnActor = ActorsTypeList.Road;
//         aWorld.Matrix[act.aMove.NewPos.x][act.aMove.NewPos.y].AnActor = act.AnActorInfos.AnActor;
//         aWorld.Actors[i].Pos.x = act.aMove.NewPos.x ;
//         aWorld.Actors[i].Pos.y = act.aMove.NewPos.y ;
//     }
//     return aWorld;
// }
//NE PAS SUPPRIMER 

function compareActions(action1: action, action2: action): boolean {
    const t : boolean = 
    action1.aMove.NewPos.x === action2.aMove.NewPos.x &&
    action1.aMove.NewPos.y === action2.aMove.NewPos.y ;
    return t;
  }
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

// recursive terminal gameover
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
