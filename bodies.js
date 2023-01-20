// module aliases
import MusicTarget from "./musicTarget";
import Player from "./Player";
// eslint-disable-next-line no-undef
const { Engine, Render, Runner, Bodies, Composite, Events, Detector } = Matter;


const boxList = [];
const bodyList = [];
// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
    element: document.body,
    engine,
});

// eslint-disable-next-line no-undef
const soundPlayer = new core.Player();

// create two boxes and a ground



const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });


// add all of the bodies to the world

// run the renderer
Render.run(render);

// create runner

const runner = Runner.create();

// run the engine
Runner.run(runner, engine);

Composite.add(engine.world, [ground])

const detector = Detector.create();



function AddTarget(target) {
    boxList.push(target)
    bodyList.push(target.body)
    Composite.add(engine.world, target.body)
    Detector.setBodies(detector, bodyList);
}


document.getElementById('button2').addEventListener('click', () => {
    const newBox = new MusicTarget('boxC', Bodies.rectangle(300, 200, 80, 80), {
        notes: [
            { pitch: 60, startTime: 0.0, endTime: 0.1 },
            { pitch: 55, startTime: 0.5, endTime: 1.0 },
            { pitch: 50, startTime: 1.0, endTime: 1.5 },
            { pitch: 55, startTime: 1.5, endTime: 2.0 },
            { pitch: 65, startTime: 2.0, endTime: 2.5 },
            { pitch: 60, startTime: 2.5, endTime: 3.0 },
        ],
        totalTime: 3,
    });

    AddTarget(newBox)
});


const { x: groundX, y: groundY } = ground.position



const player = new Player(Bodies.rectangle(groundX / 2 + 55, groundY - 21, 20, 20))
AddTarget(player)

Events.on(engine, 'collisionStart', () => {
    const collisionList = Detector.collisions(detector);
    collisionList.forEach((a) => {
        // Check to see if ground is in detection array
        if (a.bodyA === player.body || a.bodyB === player.body) {
            // if there is ground, assign variable to NOT ground
            const extendedElement = a.bodyA !== player.body ? a.bodyA : a.bodyB;
            // check if object is flagged for removal
            if (!boxList.find((box) => box.body === extendedElement).removed) {
                // remove object
                Composite.remove(engine.world, extendedElement);
                // stop player if there was one going
                if (soundPlayer.isPlaying()) soundPlayer.stop();
                soundPlayer.start(boxList.find((box) => box.body === extendedElement).sound);
                boxList.find((box) => box.body === extendedElement).removed = true;
            }
        }
    });
});




Composite.add(engine.world, player.body)


