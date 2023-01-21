// module aliases
import MusicTarget from "./musicTarget";
import Player from "./Player";

// eslint-disable-next-line no-undef
const { Engine, Render, Runner, Bodies, Composite, Events, Detector } = Matter;


const boxList = [];

const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
const bodyList = [ground];
// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
    element: document.body,
    engine,
});

// eslint-disable-next-line no-undef
// const soundPlayer = new core.Player();

// create two boxes and a ground





// add all of the bodies to the world

// run the renderer
Render.run(render);

// create runner

const runner = Runner.create();

// run the engine
Runner.run(runner, engine);



const detector = Detector.create();






function AddTarget(target) {
    boxList.push(target)
    bodyList.push(target.body)
    Composite.add(engine.world, target.body)
    Detector.setBodies(detector, bodyList);
}


// a little fun
document.getElementById('button2').addEventListener('click', () => {

    const inputValues = Array.from(document.querySelectorAll('input'))
    const step = 0.5;
    let startTime = 0;
    const notes = inputValues.reduce((acc, input) => {
        const currentNote = {
            pitch: input.value,
            startTime,
            endTime: startTime + step
        }
        startTime += step
        acc.push(currentNote)
        return acc
    }, []);

    const newBox = new MusicTarget('boxC', Bodies.rectangle(300, 200, 80, 80), {
        notes,
        totalTime: 3,
    });

    AddTarget(newBox)
});


const { x: groundX, y: groundY } = ground.position
// const player = new Player(groundX / 2 + 55, groundY - 21, 20, 20, detector)
const player = new Player(groundX / 2 + 55, groundY - 50, 20, 20)

//  player.Shoot(engine, 100, 100, 100, 100)

Composite.add(engine.world, [ground])
// Composite.add(engine.world, player.body)





Events.on(engine, 'collisionStart', () => {
    const collisionList = Detector.collisions(detector);
    collisionList.forEach((a) => {
        // Check to see if ground is in detection array
        if ((a.bodyA === ground || a.bodyB === ground)) {
            if ((a.bodyA !== player.body && a.bodyB !== player.body)) {
                const extendedElement = a.bodyA !== ground ? a.bodyA : a.bodyB;
                Composite.remove(engine.world, extendedElement)
            }
        }
        else if (a.bodyA === player.body || a.bodyB === player.body) {
            // if there is ground, assign variable to NOT ground
            const extendedElement = a.bodyA !== player.body ? a.bodyA : a.bodyB;
            // check if object is flagged for removal
            if (!boxList.find((box) => box.body === extendedElement).removed) {
                // // remove object
                // Composite.remove(engine.world, extendedElement);
                // // stop player if there was one going
                // if (soundPlayer.isPlaying()) soundPlayer.stop();
                // soundPlayer.start(boxList.find((box) => box.body === extendedElement).sound);
                // boxList.find((box) => box.body === extendedElement).removed = true;
            }
        }
    });
});

player.Spawn(engine, detector)
player.body.friction = 0
player.body.fritctionAir = 0
player.body.frictionStatic = 0

window.addEventListener('keydown', (event) => {

    if (event.key === "d") {
        player.moveRight()
    }
    if (event.key === "a") {
        player.moveLeft()
    }
})

// setInterval(()=>{
//     player.moveRight()
// },1)