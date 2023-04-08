import * as W from "./world";
import * as R from "./rand_road";
import * as A from "./actors"; 




function loop(){
    
    let world= W.CreateWorld(15,10);
    world = W.initializeWorld(world);

    let start: number = Math.floor(world.Height/2)*world.Width;
    let end: number = start-1;
    world=R.Road(world,start,end);

    world=A.CreateSimpleTower(Math.floor(world.Height/2)+2,11,world);
    for(let i:number=0;i<20;i++){
        if(i%6==0){
            
             world.Actors.push({
                Pos:     { x: Math.floor(world.Height/2), y: 0 },
                AnActor:W.ActorsTypeList.BigMonster

            });
            world.Matrix[Math.floor(world.Height/2)][0].AnActor.Type=W.ActorsTypeList.BigMonster.Type;
        }
        if(i%6==3){
            {
            
                world.Actors.push({
                   Pos:     { x: Math.floor(world.Height/2)+1, y: 0 },
                   AnActor:W.ActorsTypeList.SimpleMonster
   
               });
               world.Matrix[Math.floor(world.Height/2)+1][0].AnActor.Type=W.ActorsTypeList.SimpleMonster.Type;
           }
        }
    
        
    W.display(world);
    console.log()
	
	for(let j=0;j<world.Actors.length;j++){
            var actor=world.Actors[j]
            let t=actor.AnActor.Move(actor,world,actor.AnActor.Type);
            let [a,b]=t
            world.Matrix[actor.Pos.x][actor.Pos.y].AnActor.Type=W.ActorsTypeList.Road.Type;
            world.Matrix[a][b].AnActor.Type=world.Actors[j].AnActor.Type;
            world.Actors[j].Pos={x:a,y:b};
	}
	
    }
}
 loop();