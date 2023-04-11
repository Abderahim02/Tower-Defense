/////////////////////////////////////        BEGIN            /////////////////////////////////////////////////////
import { ActorsTypeList, world, actor, position} from "./world.js";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        MOVES            /////////////////////////////////////////////////////

//This function return a possible place to move for the actor 

//Return True if the move is available, else False
export const AvailablePosition=(move:any, world:world):boolean=>{
    if(move[0]<0 || move[0]>=world.Height || move[1]>=world.Width || move[1]<0 )
        return false;
    return world.Matrix[move[0]][move[1]].AnActor.Type==="Road";
};

export const SimpleMove=(anActor:position, aWorld:world, type:string) : number[]=>{
    let dx: number=2;
    let dy: number=2;
     if(type==="BigMonster"){
          dx=2;
          dy=2;
     }
     else if (type==="SimpleMonster"){
        dx=1;
        dy=1;
     }
    
     let move:number[] = [anActor.Pos.x+dx,anActor.Pos.y+dy];
     if(AvailablePosition(move, aWorld)){
         return move;
     }
     const rand = Math.random();
     move = [anActor.Pos.x,anActor.Pos.y+dy];
     if(AvailablePosition(move, aWorld)){
         return move;
     }
     move = [anActor.Pos.x+dx,anActor.Pos.y];
     if(AvailablePosition(move, aWorld)){
         return move;
     }
     move = [anActor.Pos.x-dx,anActor.Pos.y];
     if(AvailablePosition(move, aWorld)){
         return move;
     }
     move = [anActor.Pos.x,anActor.Pos.y-dy];
     if(AvailablePosition(move, aWorld)){
         return move;
     }
    
    
     return [anActor.Pos.x,anActor.Pos.y];
 };


//export {AvailablePosition, SimpleMove};
