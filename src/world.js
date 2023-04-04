
import {Road} from './rand.js'
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        BEGIN            /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        ACTORS           /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//This is a list of all types of actors
const ActorsTypeList = {
    SimpleMonster : {Movement:SimpleMove, type : "SimpleMonster", color : "\x1b[37m  \x1b[0m", hit_points : 3},
    BigMonster : {Movement:SimpleMove, type : "BigMonster", color : "\x1b[37m🦌\x1b[0m", hit_points : 3},
    SimpleTower : {dx : 0, dy : 0, type : "SimpleTower", color : "\x1b[48;2;34;139;34m🏯\x1b[0m", cost : 1000, damage: 5, attack_range : 5},
    MagicTower : {dx : 0, dy : 0, type : "MagicTower", color : "\x1b[37m⛪\x1b[0m", cost : 1500, damage: 5, attack_range : 10},
    Floor : {dx : 0, dy : 0, type : "Floor", color : "\x1b[48;2;34;139;34m ▒\x1b[0m"},
    River : {dx : 0, dy : 0, type : "River" , color : "\x1b[37m  \x1b[0m"},
    Road : {dx : 0, dy : 0, type : "Road" , color : "\x1b[48;2;76;70;50m  \x1b[0m"},
    Tree : {dx : 0, dy : 0, type : "Tree", color : "\x1b[48;2;34;139;34m 🎄\x1b[0m"},
    Fire : {dx : 0, dy : 0, type : "Fire", color : "\x1b[48;2;34;139;34m 🔥\x1b[0m"},
};

export {ActorsTypeList}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        WORLD            /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SimpleMove(anActor, aWorld,type){
   let dx=2;
   let dy=2;
    if(type=="BigMonster"){
         dx=1;
         dy=1;
    }
   
    let move = [anActor.pos.x+dx,anActor.pos.y+dy];
    if(available_position(move, aWorld)){
        return move;
    }
    let rand = Math.random();
    move = [anActor.pos.x,anActor.pos.y+dy];
    if(available_position(move, aWorld)){
        return move;
    }
    move = [anActor.pos.x+dx,anActor.pos.y];
    if(available_position(move, aWorld)){
        return move;
    }
    move = [anActor.pos.x-dx,anActor.pos.y];
    if(available_position(move, aWorld)){
        return move;
    }
    move = [anActor.pos.x,anActor.pos.y-dy];
    if(available_position(move, aWorld)){
        return move;
    }
   
   
    return [anActor.pos.x,anActor.pos.y];
}
function initializeWorld(world){
    world.Matrix = Array(world.Height);
    for(let i=0;i<world.Height;i++){
	world.Matrix[i]=Array(world.Width);
    }
    for(let i=0; i<world.Height; i++){
        for(let j=0;j<world.Width; j++){
            world.Matrix[i][j]={
                pos:     { x: i, y: j },
                typeActor:ActorsTypeList.Floor
            };
        }
    }
    return world;
}
/*
*/
function random_road(world){
    let ht = world.Height;
    let wt = world.Height;

    for(let k=0; k<wt; k+=3){
        for(let i=Math.floor(ht/2)-1; i<Math.floor(ht/2)+1; i++){
            for(let j=0+k; j<3+k; j++){
                world.Matrix[i][j].typeActor=ActorsTypeList.Road;
            }
        }
    }
    return world;
}
  
    
function display(world){
    let s2="";
    let count=0;
    for(let i =0; i<world.Height+19; i++){
        if(i<world.Height/2 +15 && i >world.Height/2+5 && count===0){
            s2+=" Score : ";
            s2+=world.score;
            s2+=" 💀 ";
            count ++;
        }
        else{
            s2+= "🕸️ ";
        }
    }
    console.log(s2);
    for(let i=0; i<world.Height ;i++){
        let s="";
        for(let j=0;j<world.Width;j++){
            switch(world.Matrix[i][j].typeActor.type){
                case 'SimpleMonster':
                    s+=ActorsTypeList.SimpleMonster.color;
                    break;
                case 'BigMonster':
                    s+=ActorsTypeList.BigMonster.color;
                    break;
                case 'SimpleTower':
                    s+=ActorsTypeList.SimpleTower.color;
                    break;
                case 'MagicTower':
                    s+=ActorsTypeList.MagicTower.color;
                    break;
                case 'Floor':
                    s+=ActorsTypeList.Floor.color;
                    break;
                case 'River':
                    s+=ActorsTypeList.River.color;
                    break;
                case 'Tree':
                    s+=ActorsTypeList.Tree.color;
                    break;
                case 'Fire':
                    s+=ActorsTypeList.Fire.color;
                    break;
                case 'Road':
                    s+=ActorsTypeList.Road.color;
                    break;
               // default:
                 //   s+=ActorsTypeList.Road.color;
            }
        }
        console.log(s)
        
    }

}
//display(initializeWorld())
//display(Road(initializeWorld()));

const Actor = {
    pos : {},
    typeActor : {},
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        MONSTERS         /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//This function return a possible place to move for the actor 

//Return True if the move is available, else False
function available_position(move, world){
    if(move[0]<0 || move[0]>=world.Height || move[1]>=world.Width || move[1]<0 )
        return 0;
    return world.Matrix[move[0]][move[1]].typeActor.type=="Road";
}


function gamePhase(aWorld){
    let Phase=[];
    for (let i=0; i<aWorld.actors.length; ++i ){
        let tmp = SimpleMove(aWorld.actors[i], aWorld);
        Phase.push({index :i ,type : aWorld.actors[i].typeActor ,exPos : aWorld.actors[i].pos, newPos : {x : tmp[0], y :tmp[1]}}) ;
    }
    return Phase;
}
/*
function test_gamePhase(){
    let world={
        actors:[{
            pos:     { x: 0 , y: 0 },
            typeActor:ActorsTypeList.BigMonster
        } ],
        Width:51,
        Height :25 ,
        Matrix:{}
    };
    world=Road(initializeWorld(world));
    world.actors[0].pos = {x : Math.floor(world.Height/2), y : 0};
    world.Matrix[Math.floor(world.Height/2)][ 0 ].typeActor = ActorsTypeList.BigMonster;
    display(world);
    console.log(world.actors);
    console.log(gamePhase(world));
    console.log("\napre\n");
    console.log(world.actors);
    console.log(gamePhase(world));
}
test_gamePhase();


function GameMotor(aPhase, aWorld){
    for(let i=0; i<aPhase.length; ++i){
        let [index,type,ex_pos,new_pos]=aPhase[i];
        aWorld.Matrix[new_pos.x][new_pos.y].typeActor = type ;
        aWorld.Matrix[ex_pos.x][ex_pos.y].typeActor = ActorsTypeList.Road;
        aWorld.actors[index].x = new_pos.x;
        aWorld.actors[index].y = new_pos.y;
    }
}

function test_GameMotor(){
    let world={
        actors:[{
            pos:     { x: 0 , y: 0 },
            typeActor:ActorsTypeList.BigMonster
        } ],
        Width:51,
        Height :25 ,
        Matrix:{}
    };
    world=Road(initializeWorld(world));
    world.actors[0].pos = {x : Math.floor(world.Height/2), y : 0};
    world.Matrix[Math.floor(world.Height/2)][ 0 ].typeActor = ActorsTypeList.BigMonster;
    display(world);
    // console.log(world.actors);
    // console.log(gamePhase(world));
    // console.log("\napre\n");
    // console.log(world.actors);
    // console.log(gamePhase(world));
}
test_GameMotor();

*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        TOWER            /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function create_magic_tower(i, j, world){
    let move = Array(2);
    move = [i,j]
    if(!available_position(move, world)){
        world.Matrix[i][j]={
            pos:     { x: i, y: j },
            typeActor:ActorsTypeList.MagicTower
        };
        return world;
    }
    return world;
}

function create_simple_tower(i, j, world){
    let move = Array(2);
    move = [i,j]
    if(!available_position(move, world)){
        world.Matrix[i][j]={
            pos:     { x: i, y: j },
            typeActor:ActorsTypeList.SimpleTower
        };
        return world;
    }
    return world;
}

function enemies_in_attack_range(i,j,world){
    // if(world.Matrix[i][j].typeActor.type != "Tower"){
    //     console.log("Select a Tower");
    // }
    let enemies=[];

    let range = world.Matrix[i][j].typeActor.attack_range;
    for(let k=i-range; k<i+range; k++){
        for(let l=j-range; l<j+range; l++){
            if(world.Matrix[k][l].typeActor.type === ActorsTypeList.BigMonster.type){
                enemies.push({x:world.Matrix[k][l].pos.x, y:world.Matrix[k][l].pos.y})
                
                
            }
        }
    }
    
    return enemies;
}


function Tower_attacks(i,j,world){
    let enemies = enemies_in_attack_range(i,j,world);
    if(enemies.length!=0){
        let rand  = Math.floor(Math.random()*enemies.length);
        //console.log(enemies[0].x)
        world.Matrix[enemies[rand].x][enemies[rand].y].typeActor.hit_points-=world.Matrix[i][j].typeActor.damage;
        if(world.Matrix[enemies[rand].x][enemies[rand].y].typeActor.hit_points <= 0){
            world.Matrix[enemies[rand].x][enemies[rand].y].typeActor=ActorsTypeList.Road;
            world.score ++;
        }
    }
    return world;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        LOOP             /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loop(){
    
    let world={
        actors:[],
        Width:15,
        Height :10 ,
        score:0,
        Matrix:{}
    };
let start = Math.floor(world.Height/2)*world.Width;
let end = start-1;
    world=Road(initializeWorld(world),start,end);

    world=create_simple_tower(Math.floor(world.Height/2)+2,11,world);
    for(let i=0;i<2;i++){
        if(i%6==0){
            
             world.actors.push({
                pos:     { x: Math.floor(world.Height/2), y: 0 },
                typeActor:ActorsTypeList.BigMonster

            });
            world.Matrix[Math.floor(world.Height/2)][0].ActorsTypeList=ActorsTypeList.BigMonster;
        }
        if(i%6==3){
            {
            
                world.actors.push({
                   pos:     { x: Math.floor(world.Height/2)+1, y: 0 },
                   typeActor:ActorsTypeList.SimpleMonster
   
               });
               world.Matrix[Math.floor(world.Height/2)+1][0].ActorsTypeList=ActorsTypeList.SimpleMonster;
           }
        }
        
    display(world);
    console.log()
	
	for(let j=0;j<world.actors.length;j++){
            var actor=world.actors[j]
            let t=actor.typeActor.Movement(actor,world,actor.type);
            let [a,b]=t
            world.Matrix[world.actors[j].pos.x][world.actors[j].pos.y].typeActor=ActorsTypeList.Road;
            world.Matrix[a][b].typeActor=world.actors[j].typeActor;
            world.actors[j].pos={x:a,y:b};
	}
	
    }
}
 loop();



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////           END           /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
