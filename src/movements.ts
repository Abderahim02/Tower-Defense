/////////////////////////////////////        BEGIN            /////////////////////////////////////////////////////
import {world, position,point} from "./defineType.js";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        MOVES            /////////////////////////////////////////////////////

//This function return a possible place to move for the actor 

//Return True if the move is available, else False
// export const AvailablePosition=(move:any, world:world):boolean=>{
//     if(move[0]<0 || move[0]>=world.Height || move[1]>=world.Width || move[1]<0 )
//         return false;
//     return world.Matrix[move[0]][move[1]].AnActor.Type === "Road";
// };
export const AvailablePosition=(p:point, w : world) : boolean => {
    if(p.x >= w.Height || p.y >= w.Width || p.x < 0 || p.y < 0 )
        return false;
    return w.Matrix[p.x][p.y].AnActor.Type === "Road";
};


//this function caracterizes the inactive actors in the world, floor and road
export const noMove=(pos: position, aWorld: world, type: string) : any =>{
    return ;
};


export const SimpleMove=(anActor:position, aWorld:world, type:string) : point=>{
    let dx: number=1;
    let dy: number=1;
     if(type==="BigMonster"){
          dx=2;
          dy=2;
     }
     else if (type==="SimpleMonster"){
        dx=1;
        dy=1;
     }
    
     let move : point = {x : anActor.Pos.x+dx,y : anActor.Pos.y+dy};
     if(AvailablePosition(move, aWorld)){
         return move;
     }
     const rand = Math.random();
     move = {x : anActor.Pos.x,y : anActor.Pos.y+dy};
     if(AvailablePosition(move, aWorld)){
         return move;
     }
     move = {x : anActor.Pos.x+dx, y :anActor.Pos.y};
     if(AvailablePosition(move, aWorld)){
         return move;
     }
     move = {x : anActor.Pos.x-dx, y :anActor.Pos.y};
     if(AvailablePosition(move, aWorld)){
         return move;
     }
     move = {x : anActor.Pos.x,y : anActor.Pos.y-dy};
     if(AvailablePosition(move, aWorld)){
         return move;
     }
     return {x : anActor.Pos.x,y : anActor.Pos.y};
 };


//export {AvailablePosition, SimpleMove};
