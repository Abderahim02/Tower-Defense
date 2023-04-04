//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        BEGIN            /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import { ActorsTypeList, world } from "./world.js";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        MOVES            /////////////////////////////////////////////////////

//This function return a possible place to move for the actor 

//Return True if the move is available, else False
function AvailablePosition(move:any, world:world){
    if(move[0]<0 || move[0]>=world.Height || move[1]>=world.Width || move[1]<0 )
        return 0;
    return world.Matrix[move[0]][move[1]].AnActor.Type=="Road";
}

function SimpleMove(anActor:actor, aWorld:world,type:string){
    let dx=2;
    let dy=2;
     if(type=="BigMonster"){
          dx=1;
          dy=1;
     }
    
     let move = [anActor.pos.x+dx,anActor.pos.y+dy];
     if(AvailablePosition(move, aWorld)){
         return move;
     }
     let rand = Math.random();
     move = [anActor.pos.x,anActor.pos.y+dy];
     if(AvailablePosition(move, aWorld)){
         return move;
     }
     move = [anActor.pos.x+dx,anActor.pos.y];
     if(AvailablePosition(move, aWorld)){
         return move;
     }
     move = [anActor.pos.x-dx,anActor.pos.y];
     if(AvailablePosition(move, aWorld)){
         return move;
     }
     move = [anActor.pos.x,anActor.pos.y-dy];
     if(AvailablePosition(move, aWorld)){
         return move;
     }
    
    
     return [anActor.pos.x,anActor.pos.y];
 }


export {AvailablePosition, SimpleMove}
