// module aliases

// eslint-disable-next-line no-undef
const { Engine, Render, Runner, Bodies, Composite, Events, Detector } = Matter;

/* eslint linebreak-style: ["error", "windows"] */

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
    element: document.body,
    engine,
});

// eslint-disable-next-line no-undef
const player = new mm.Player();

// create two boxes and a ground

class MusicTarget {
    constructor(name, body, sound, removed = false) {
        this.name = name;
        this.body = body;
        this.sound = sound;
        this.removed = removed
    }
}

const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

const boxList = [];
const bodyList = [ground];

// add all of the bodies to the world

// run the renderer
Render.run(render);

// create runner

const runner = Runner.create();

// run the engine
Runner.run(runner, engine);

Composite.add(engine.world, [ground])


// eslint-disable-next-line no-unused-vars
const TWINKLE_TWINKLE = {
    notes: [
        { pitch: 60, startTime: 0.0, endTime: 0.5 },
        { pitch: 60, startTime: 0.5, endTime: 1.0 },
        { pitch: 67, startTime: 1.0, endTime: 1.5 },
        { pitch: 67, startTime: 1.5, endTime: 2.0 },
        { pitch: 69, startTime: 2.0, endTime: 2.5 },
        { pitch: 69, startTime: 2.5, endTime: 3.0 },
        { pitch: 67, startTime: 3.0, endTime: 4.0 },
        { pitch: 65, startTime: 4.0, endTime: 4.5 },
        { pitch: 65, startTime: 4.5, endTime: 5.0 },
        { pitch: 64, startTime: 5.0, endTime: 5.5 },
        { pitch: 64, startTime: 5.5, endTime: 6.0 },
        { pitch: 62, startTime: 6.0, endTime: 6.5 },
        { pitch: 62, startTime: 6.5, endTime: 7.0 },
        { pitch: 60, startTime: 7.0, endTime: 8.0 },
    ],
    totalTime: 8,
};

// eslint-disable-next-line no-unused-vars
const DRUMS = {
    notes: [
        { pitch: 36, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
        { pitch: 38, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
        { pitch: 42, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
        { pitch: 46, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
        { pitch: 42, quantizedStartStep: 2, quantizedEndStep: 3, isDrum: true },
        { pitch: 42, quantizedStartStep: 3, quantizedEndStep: 4, isDrum: true },
        { pitch: 42, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
        { pitch: 50, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
        { pitch: 36, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
        { pitch: 38, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
        { pitch: 42, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
        { pitch: 45, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
        { pitch: 36, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
        { pitch: 42, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
        { pitch: 46, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
        { pitch: 42, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
        { pitch: 48, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
        { pitch: 50, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
    ],
    quantizationInfo: { stepsPerQuarter: 4 },
    tempos: [{ time: 0, qpm: 120 }],
    totalQuantizedSteps: 11,
};

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
            { pitch: 30, startTime: 0.0, endTime: 0.1 },
            { pitch: 90, startTime: 0.5, endTime: 1.0 },
            { pitch: 10, startTime: 1.0, endTime: 1.5 },
            { pitch: 10, startTime: 1.5, endTime: 2.0 },
            { pitch: 69, startTime: 2.0, endTime: 2.5 },
            { pitch: 90, startTime: 2.5, endTime: 3.0 },
        ],
        totalTime: 3,
    });

    AddTarget(newBox)
});



Events.on(engine, 'collisionStart', () => {
    const collisionList = Detector.collisions(detector);
    collisionList.forEach((a) => {
        // Check to see if ground is in detection array
        if (a.bodyA === ground || a.bodyB === ground) {
            // if there is ground, assign variable to NOT ground
            const extendedElement = a.bodyA !== ground ? a.bodyA : a.bodyB;
            // check if object is flagged for removal
            if (!boxList.find((box) => box.body === extendedElement).removed) {
                // remove object
                Composite.remove(engine.world, extendedElement);
                // stop player if there was one going
                player.stop();

                player.start(boxList.find((box) => box.body === extendedElement).sound);
                boxList.find((box) => box.body === extendedElement).removed = true;
            }
        }
    });
});


