import { ActorsTypeList } from "./world.js";

//This function return a possible place to move for the actor 

//Return True if the move is available, else False
function available_position(move, world){
    if(move[0]<0 || move[0]>=world.Height || move[1]>=world.Width || move[1]<0 )
        return 0;
    return world.Matrix[move[0]][move[1]].typeActor.type=="Road";
}

export {available_position}