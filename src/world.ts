
import { world, position, actor, ActorsTypeList } from './defineType.js';

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
                     s+="\x1b[48;2;76;70;50m💀\x1b[0m";
                        // s+="\x1b[48;2;76;70;50m* \x1b[0m";
                    else{
                     s+=ActorsTypeList.Road.Color;
                    }
                    break;
            }
        }
        console.log(`${s}`+`${i}`);
    }
};

// //this function returns the type of the actor in position p in the grid
// export function GetActorType(w: world, p:point) : string{
//     return w.Matrix[p.x][p.y].AnActor.Type;
// }



/////////////////////////////////////           END           /////////////////////////////////////////////////////
