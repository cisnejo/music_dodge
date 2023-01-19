// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Events = Matter.Events,
  Detector = Matter.Detector;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine,
});

// create two boxes and a ground
var boxA = {
  name: "boxA",
  sound: {
    notes: [{ pitch: 30, startTime: 0.0, endTime: 0.1 }],
    totalTime: 0.1,
  },
  body: Bodies.rectangle(400, 200, 80, 80),
  removed: false,
};

var boxB = {
  name: "boxB",
  sound: {
    notes: [{ pitch: 60, startTime: 0.0, endTime: 0.1 }],
    totalTime: 0.1,
  },
  body: Bodies.rectangle(450, 50, 80, 80),
  removed: false,
};

var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world

// run the renderer
Render.run(render);

// create runner

var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

Events.on(engine, "collisionStart", (event) => {
  const collisionList = Matter.Detector.collisions(detector);
  collisionList.forEach((a) => {
    if (a.bodyA == ground || a.bodyB == ground) {
      let extendedElement = a.bodyA != ground ? a.bodyA : a.bodyB;
      if (!box_list.find((box) => box.body == extendedElement).removed) {
        console.log(box_list.find((box) => box.body == extendedElement).name)
        Composite.remove(engine.world, extendedElement);
        player.stop();
        player.start(box_list.find((box) => box.body == extendedElement).sound);
        box_list.find((box) => box.body == extendedElement).removed = true;
      }
    }
  });
  //   if (Matter.Collision.collides(boxA.body, ground).collided && !boxA.removed) {
  //     player.stop();
  //     boxA.removed = true;
  //     Composite.remove(engine.world, boxA.body);
  //     player.start(boxA.sound);

  //   }
});

let TWINKLE_TWINKLE = {
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

let DRUMS = {
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

let detector = Detector.create();

const box_list = [boxA, boxB];
const body_list = [boxA.body, boxB.body, ground];
document.getElementById("button").addEventListener("click", () => {
  Composite.add(engine.world, body_list);
  player.start({
    notes: [{ pitch: 60, startTime: 0.0, endTime: 0.1 }],
    totalTime: 0.1,
  });
  Matter.Detector.setBodies(detector, body_list);
});

document.getElementById("button2").addEventListener("click", () => {
  const newBox = {
    sound: {
      notes: [{ pitch: 30, startTime: 0.0, endTime: 0.1 }],
      totalTime: 0.1,
    },
    body: Bodies.rectangle(400, 200, 80, 80),
    removed: false,
  };
  Composite.add(engine.world, [newBox.body]);
});

let player = new mm.Player();
