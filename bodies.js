// module aliases
import MusicTarget from "./musicTarget";
import Player from "./Player";

// eslint-disable-next-line no-undef
const { Engine, Render, Runner, Bodies, Composite, Events, Detector, Body } = Matter;


const boxList = [];

const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
    element: document.body,
    engine,
});

// run the renderer
Render.run(render);

// create runner

const runner = Runner.create();

// run the engine
Runner.run(runner, engine);

const detector = Detector.create();

function AddTarget(target) {
    boxList.push(target)

    Composite.add(engine.world, target.body)
    Detector.setBodies(detector, [...detector.bodies, target.body]);
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const { x: groundX, y: groundY } = ground.position
// const player = new Player(groundX / 2 + 55, groundY - 21, 20, 20, detector)
const player = new Player(groundX / 2 + 55, groundY - 50, 20, 20)

//  player.Shoot(engine, 100, 100, 100, 100)

Composite.add(engine.world, ground)
Detector.setBodies(detector, [...detector.bodies, ground])
// Composite.add(engine.world, player.body)


engine.gravity.scale = 0


Events.on(engine, 'collisionStart', () => {
    const detectorList = Detector.collisions(detector);
    detectorList.forEach((detection) => {
        // Check to see if ground is in detection array
        if ((detection.bodyA === ground || detection.bodyB === ground)) {
            if ((detection.bodyA !== player.body && detection.bodyB !== player.body)) {
                const extendedElement = detection.bodyA !== ground ? detection.bodyA : detection.bodyB;

                Composite.remove(engine.world, extendedElement)

                return null
            }
        }
        else if (detection.bodyA === player.body || detection.bodyB === player.body) {
            // if there is ground, assign variable to NOT ground
            const extendedElement = detection.bodyA !== player.body ? detection.bodyA : detection.bodyB;
            // check if object is flagged for removal
            if (!boxList.find((box) => box.body === extendedElement).removed) {
                // // remove object
                Composite.remove(engine.world, extendedElement);
                // // stop player if there was one going
                // if (soundPlayer.isPlaying()) soundPlayer.stop();
                // soundPlayer.start(boxList.find((box) => box.body === extendedElement).sound);
                // boxList.find((box) => box.body === extendedElement).removed = true;
            }
            return null
        }
        return null
    });
});

player.Spawn(engine, detector)
player.body.friction = 0
player.body.fritctionAir = 0
player.body.frictionStatic = 0

window.addEventListener('keydown', (event) => {
console.log(event.key)
    if (event.key === "d") {
        player.moveRight("d")
    }
    if (event.key === "a") {
        player.moveLeft("a")
    }
    if (event.key === "w") {
        player.moveUp("w")
    }
    if (event.key === "s") {
        player.moveDown("s")
    }
})

window.addEventListener('keyup', (event) => {

    if (event.key === "d" || event.key === "a" || event.key === "w" || event.key === "s") {
        player.moveStop(event)
    }
})

// setInterval(() => {
//     const inputValues = Array.from(document.querySelectorAll('input'))
//     const step = 0.5;
//     let startTime = 0;
//     const notes = inputValues.reduce((acc, input) => {
//         const currentNote = {
//             pitch: input.value,
//             startTime,
//             endTime: startTime + step
//         }
//         startTime += step
//         acc.push(currentNote)
//         return acc
//     }, []);

//     const { width: canvasWidth } = render.canvas

//     const boxWidth = 20
//     //  const boxHeight = max.y - min.y

//     const constrainedWidth = canvasWidth - boxWidth
//     // const constrainedHeight = canvasHeight - boxHeight

//     const randX = randomIntFromInterval(boxWidth, constrainedWidth)

//     const newBox = new MusicTarget('boxC', Bodies.rectangle(randX, -50, 20, 20), {
//         notes,
//         totalTime: 3,
//     });


//     Body.setVelocity(newBox.body, { x: 0, y: 8 })
//     newBox.body.friction = 0
//     newBox.body.fritctionAir = 0
//     newBox.body.frictionStatic = 0
//     AddTarget(newBox)

// }, 500)

// // a little fun
// document.getElementById('button2').addEventListener('click', () => {

//     const inputValues = Array.from(document.querySelectorAll('input'))
//     const step = 0.5;
//     let startTime = 0;
//     const notes = inputValues.reduce((acc, input) => {
//         const currentNote = {
//             pitch: input.value,
//             startTime,
//             endTime: startTime + step
//         }
//         startTime += step
//         acc.push(currentNote)
//         return acc
//     }, []);

//     const { width: canvasWidth } = render.canvas

//     const boxWidth = 20
//     //  const boxHeight = max.y - min.y

//     const constrainedWidth = canvasWidth - boxWidth
//     // const constrainedHeight = canvasHeight - boxHeight

//     const randX = randomIntFromInterval(boxWidth, constrainedWidth)

//     const newBox = new MusicTarget('boxC', Bodies.rectangle(randX, 200, 20, 20), {
//         notes,
//         totalTime: 3,
//     });


//     Body.setVelocity(newBox.body, { x: 0, y: 5 })
//     newBox.body.friction = 0
//     newBox.body.fritctionAir = 0
//     newBox.body.frictionStatic = 0
//     AddTarget(newBox)
// });