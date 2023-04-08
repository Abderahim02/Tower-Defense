import {CreateWorld, initializeWorld, display} from "../src/world";

let world = CreateWorld(10,15);
world = initializeWorld(world);
display(world);