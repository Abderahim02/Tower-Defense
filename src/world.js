
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        BEGIN            /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        ACTORS           /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//This is a list of all types of actors
const ActorsTypeList = {
    SimpleMonster : {dx : 3, dy : 1, type : "SimpleMonster", color : "\x1b[37m  \x1b[0m", hit_points : 3},
    BigMonster : {dx : 3, dy : 1, type : "BigMonster", color : "\x1b[37m🦌\x1b[0m", hit_points : 5},
    SimpleTower : {dx : 0, dy : 0, type : "SimpleTower", color : "\x1b[48;2;34;139;34m🏯\x1b[0m", cost : 1000, damage: 1, attack_range : 5},
    MagicTower : {dx : 0, dy : 0, type : "MagicTower", color : "\x1b[37m⛪\x1b[0m", cost : 1500, damage: 2, attack_range : 10},
    Floor : {dx : 0, dy : 0, type : "Floor", color : "\x1b[48;2;34;139;34m ▒\x1b[0m"},
    River : {dx : 0, dy : 0, type : "River" , color : "\x1b[37m  \x1b[0m"},
    Road : {dx : 0, dy : 0, type : "Road" , color : "\x1b[48;2;76;70;50m  \x1b[0m"},
    Tree : {dx : 0, dy : 0, type : "Tree", color : "\x1b[48;2;34;139;34m 🎄\x1b[0m"},
    Fire : {dx : 0, dy : 0, type : "Fire", color : "\x1b[48;2;34;139;34m 🔥\x1b[0m"},
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        WORLD            /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//console.log(initializeWorld().Matrix[1][1].actions.move(1,1)[0]);

function Road(world){
    for(let i=0;i<=world.Height;i++){
        for(let j=0;j<world.Width  ;j++){
           if((j<=world.Width/4 || j>=3*world.Width/4) && (i<=world.Height/2+1 && i>=world.Height/2-1)){
            world.Matrix[i][j].typeActor=ActorsTypeList.Road;
           }
           else if(((i<=world.Height/3+1 && i>=world.Height/3-1 || i<=(2/3)*world.Height+1 && i>=(2/3)*world.Height-1) && !(j<=world.Width/4 || j>=3*world.Width/4))){
            world.Matrix[i][j].typeActor=ActorsTypeList.Road;
           }
           if(((j>=world.Width/4-1 && j<=world.Width/4+1) || (j>=3*world.Width/4-1 && j<=3*world.Width/4+1) ) && (i>=world.Height/3-1 && i<=(2/3)*world.Height+1)){
            world.Matrix[i][j].typeActor=ActorsTypeList.Road;
           }
        }
    }
    return world;

}

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
  
//console.log(initializeWorld().Matrix);
    
function display(world){
    for(let i=0; i<world.Height ;i++){
        let s=""
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

// function ConsActor(_pos, _actions, _type) { return { pos: _pos, actions: _actions, type : _type}; }


// function ActorTypeGen(pos, _dx, _dy, _type){
//     return ConsActor( pos, (anActor, aWorld) => [_dx, _dy], _type);
// }

const Actor = {
    pos : {},
    typeActor : {},
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        MONSTERS         /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//This function return a possible place to move for the actor 
function SimpleMove(anActor, aWorld){
    let x = anActor.pos.x, y = anActor.pos.y;
    let move = Array(2);
    move = [x+anActor.typeActor.dx,y+anActor.typeActor.dy];
    if(available_position(move, aWorld)){
        return move;
    }
    let rand = Math.random();
    move = [x,y+anActor.typeActor.dy];
    if(available_position(move, aWorld)){
        return move;
    }
    move = [x+anActor.typeActor.dx,y];
    if(available_position(move, aWorld)){
        return move;
    }
    move = [x-anActor.typeActor.dx,y];
    if(available_position(move, aWorld)){
        return move;
    }
    move = [x,y-anActor.typeActor.dy];
    if(available_position(move, aWorld)){
        return move;
    }
   
   
    return [x,y];
}

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

function number_of_enemies_in_attack_range(i,j,world){
    // if(world.Matrix[i][j].typeActor.type != "Tower"){
    //     console.log("Select a Tower");
    // }
    let range = world.Matrix[i][j].typeActor.attack_range;
    let count = 0;
    for(let k=i-range; k<i+range; k++){
        for(let l=j-range; l<j+range; l++){
            if(world.Matrix[k][l].typeActor.type === ActorsTypeList.BigMonster.type){
                count++;
            }
        }
    }
    
    return count;
}

function Tower_attacks(i,j,world){
    let enemies = number_of_enemies_in_attack_range(i,j,world);
    let rand  = Math.floor(Math.random()*enemies);
    
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        LOOP             /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loop(){
    
    let world={
        actors:[],
        Width:51,
        Height :25 ,
        Matrix:{}
    };

    world=Road(initializeWorld(world));
    for(let i=0;i<70;i++){
        if(i%4==0){
            
             world.actors.push({
                pos:     { x: Math.floor(world.Height/2), y: 0 },
                typeActor:ActorsTypeList.BigMonster

            });
            world.Matrix[Math.floor(world.Height/2)][0].ActorsTypeList=ActorsTypeList.BigMonster;
        }
        if(i%4==2){
            {
            
                world.actors.push({
                   pos:     { x: Math.floor(world.Height/2)+1, y: 0 },
                   typeActor:ActorsTypeList.SimpleMonster
   
               });
               world.Matrix[Math.floor(world.Height/2)+1][0].ActorsTypeList=ActorsTypeList.SimpleMonster;
           }
        }
      //  console.log(world.actors.length);
        
    display(world);
    console.log()
	// console.log(world.actors.length)
	
	for(let j=0;j<world.actors.length;j++){
            let [a,b]=SimpleMove(world.actors[j],world);
            world.Matrix[world.actors[j].pos.x][world.actors[j].pos.y].typeActor=ActorsTypeList.Road;
            world.Matrix[a][b].typeActor=world.actors[j].typeActor;
            world.actors[j].pos={x:a,y:b};
	}
	
	/*for(let i=0;i<world.actors.length;i++){
            let z=world.actors[i].pos;
	    // console.log(z)
            world.Matrix[Math.floor(z.x)][Math.floor(z.y)].typeActor=world.actors[i].typeActor;
	}*/
	//display(world);
    //console.log()
    create_simple_tower(Math.floor(world.Height/2)+2,11,world);
	console.log(number_of_enemies_in_attack_range(Math.floor(world.Height/2)+2,11,world));
    }
    
}
// loop();








///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////           END           /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
