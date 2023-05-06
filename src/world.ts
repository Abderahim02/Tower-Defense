
import {SimpleMove } from './movements.js';
import {action, world, position, actor, ActorsTypeList } from './defineType.js';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*this is a type that defines an actor ,we suppose that floor and road are also 
    actors but with  no power
*/

//this function create an empty matrix
export const CreateEmptyMatrix = (width : number, height : number) : position[][]=> {
    //let tmp: position[][] = [...Array(height)].fill(0);
    const b : actor = ActorsTypeList.Floor;
    const tmp: number[][] = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
   return tmp.map((x,i)=>{
        return x.map((y,j)=>{
            return {AnActor : ActorsTypeList.Floor, Pos : {x : i, y : j}};
        });
    });
    
};

//this function create the world with no actors , towers and no road
export const CreateWorld=(width : number, height : number): world =>{
    const emptyWorld : world = {Matrix : CreateEmptyMatrix(width, height), Width : width, Height : height, Score : 0, Actors : [], Towers : []};
    return emptyWorld;
};

export const initializeWorld = (world : world) : world=> {
    const {Matrix:m, ...other}:world=world;
    const w:world={Matrix:CreateEmptyMatrix(world.Width , world.Height), ...other};
    return w;
   
};


//this a function that displays the world
export const display=(world : world,end: number): void=> {
    let s2 : string ="";
    let count : number =0;
    for(let i : number =0; i<world.Height+19; i++){
        if(i<world.Height/2 +15 && i >world.Height/2+5 && count===0){
            s2+=" Score : ";
            s2+=world.Score;
            s2+=" 💀 ";
            count ++;
        }
        else{
            s2+= "🕸️ ";
        }
    }
    console.log(s2);
    for(let i: number =0; i<world.Height ;i++){
        let s: string ="";
        for(let j : number =0;j<world.Width;j++){
            switch(world.Matrix[i][j].AnActor.Type){
                case 'SimpleMonster':
                    s+=ActorsTypeList.SimpleMonster.Color;
                    break;
                case 'BigMonster':
                    s+=ActorsTypeList.BigMonster.Color;
                    break;
                case 'SimpleTower':
                    s+=ActorsTypeList.SimpleTower.Color;
                    break;
                case 'MagicTower':
                    s+=ActorsTypeList.MagicTower.Color;
                    break;
                case 'SimpleTowerII':
                    s+=ActorsTypeList.SimpleTower.Color;
                    break;
                case 'MagicTowerII':
                    s+=ActorsTypeList.MagicTower.Color;
                    break;
                case 'SimpleTowerIII':
                    s+=ActorsTypeList.SimpleTower.Color;
                    break;
                case 'MagicTowerIII':
                    s+=ActorsTypeList.MagicTower.Color;
                    break;
                case 'Floor':
                    s+=ActorsTypeList.Floor.Color;
                    break;
                case 'River':
                    s+=ActorsTypeList.River.Color;
                    break;
                case 'Tree':
                    s+=ActorsTypeList.Tree.Color;
                    break;
                case 'Fire':
                    s+=ActorsTypeList.Fire.Color;
                    break;
                case 'Road':
                    if(Math.floor(end/world.Width)===i && end%world.Width===j)
                     s+="\x1b[48;2;76;70;50m✴ \x1b[0m";
                    else{
                     s+=ActorsTypeList.Road.Color;
                    }
                    break;
            }
        }
        console.log(`${s}`+`${i}`);
    }
};

/*this function create a phase of the game, we see all possible moves for all actors
and we return a list of actions */
export function gamePhase(aWorld : world) : action[] {
    const Phase : action[] = [];

    for (let i : number = 0; i < aWorld.Actors.length; ++i ){
        const tmp : number[] = SimpleMove(aWorld.Actors[i], aWorld, aWorld.Actors[i].AnActor.Type );
        const mv : action = { AnActorIndex : i,  AnActorInfos : aWorld.Actors[i] , aMove : {ExPos : aWorld.Actors[i].Pos , NewPos : {x : tmp[0], y : tmp[1]} }};
        Phase.push(mv);
    }
    return Phase;
}

export function gameMotor(aPhase : action[] , aWorld : world) : world {
    for(let i : number =0; i < aPhase.length; ++i){
        const act : action = aPhase[i];
        aWorld.Matrix[act.aMove.ExPos.x][act.aMove.ExPos.y].AnActor = ActorsTypeList.Road;
        aWorld.Matrix[act.aMove.NewPos.x][act.aMove.NewPos.y].AnActor = act.AnActorInfos.AnActor;
        aWorld.Actors[act.AnActorIndex].Pos.x = act.aMove.NewPos.x ;
        aWorld.Actors[act.AnActorIndex].Pos.y = act.aMove.NewPos.y ;
    }
    return aWorld;
}

// recursive terminale gameover
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
