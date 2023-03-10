// module aliases
import MusicTarget from "./musicTarget";
import Player from "./Player";

// eslint-disable-next-line no-undef
const { Engine, Render, Runner, Bodies, Composite, Events, Detector, Body } = Matter;

const startButton = document.getElementById("start_button")
const gameStatusText = document.getElementById('game_status')?.querySelector('span')
const music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
music_rnn.initialize();

const rnnPlayer = new mm.Player();

function play(note) {
    if (rnnPlayer.isPlaying()) {
        rnnPlayer.stop();
    }

    rnnPlayer.start(note)
}


function removeBody(engine, detector, body) {
    detector.bodies.splice(detector.bodies.indexOf(body), 1)
    Composite.remove(engine.world, body)
}
const boxList = [];




const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
ground.label = "ground"
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
const player = new Player(groundX / 2 + 55, groundY - 50, 20, 20, engine, detector)
player.body.label = "player"

Composite.add(engine.world, ground)
Detector.setBodies(detector, [...detector.bodies, ground])

engine.gravity.scale = 0


Events.on(engine, 'collisionStart', () => {
    const detectorList = Detector.collisions(detector);
    detectorList.forEach((detection) => {
        // Check to see if ground is in detection array
        if ((detection.bodyA === ground || detection.bodyB === ground)) {
            if ((detection.bodyA !== player.body && detection.bodyB !== player.body)) {

                const extendedElement = detection.bodyA !== ground ? detection.bodyA : detection.bodyB;

                removeBody(engine, detector, extendedElement)

                return null
            }
        }
        else if (detection.bodyA === player.body || detection.bodyB === player.body) {
            // if there is ground, assign variable to NOT ground
            const extendedElement = detection.bodyA !== player.body ? detection.bodyA : detection.bodyB;
            // check if object is flagged for removal
            if (!boxList.find((box) => box.body === extendedElement).removed) {
                // // remove object
                removeBody(engine, detector, extendedElement)
                // // stop player if there was one going
                // if (soundPlayer.isPlaying()) soundPlayer.stop();
                // soundPlayer.start(boxList.find((box) => box.body === extendedElement).sound);
                // boxList.find((box) => box.body === extendedElement).removed = true;
            }
            return null
        }

        else if ((detection.bodyA.label === "bullet" || detection.bodyB.label === "bullet") && (detection.bodyA.label === "hostile" || detection.bodyB.label === "hostile")) {
            const hostile = detection.bodyA.label === "hostile" ? detection.bodyA : detection.bodyB
            if (rnnPlayer.isPlaying()) {
                rnnPlayer.stop();
            }
            const musicObject = boxList.find((box) => box.body === hostile)
            rnnPlayer.start(musicObject.sound)
            notesForNewSong = [...notesForNewSong, musicObject.sound.notes[0]]
            // play(boxList.find((box) => box.body === hostile).sound)
            removeBody(engine, detector, detection.bodyA)
            removeBody(engine, detector, detection.bodyB)
        }
        return null
    });
});


let newTime
let gameStartTime
let noteCounter = 0;
let notesForNewSong = []
const gameLength = 20000
// eslint-disable-next-line no-unused-vars
let newSong

let stoppedGame = false
const TWINKLE_TWINKLE = {
    notes: [
        { pitch: 60, startTime: 0.0, endTime: 0.5 },
        { pitch: 60, startTime: 0.0, endTime: 0.5 },
        { pitch: 67, startTime: 0.0, endTime: 0.5 },
        { pitch: 67, startTime: 0.0, endTime: 0.5 },
        { pitch: 69, startTime: 0.0, endTime: 0.5 },
        { pitch: 69, startTime: 0.0, endTime: 0.5 },
        { pitch: 67, startTime: 0.0, endTime: 0.5 },
        { pitch: 65, startTime: 0.0, endTime: 0.5 },
        { pitch: 65, startTime: 0.0, endTime: 0.5 },
        { pitch: 64, startTime: 0.0, endTime: 0.5 },
        { pitch: 64, startTime: 0.0, endTime: 0.5 },
        { pitch: 62, startTime: 0.0, endTime: 0.5 },
        { pitch: 62, startTime: 0.0, endTime: 0.5 },
        { pitch: 60, startTime: 0.0, endTime: 0.5 },
    ],
    totalTime: 8
};

startButton?.addEventListener('click', () => {
    newTime = new Date().getTime()
    gameStartTime = newTime
    startButton.setAttribute('data-started', 'true')
    // @ts-ignore
    gameStatusText.innerText = 'Started'
})
const spawnBoxInterval = (note, gameLength) => {
    const interval = (gameLength / (note.notes.length))
    console.log(interval)
    const currentTime = new Date().getTime()


    const { width: canvasWidth } = render.canvas

    const boxWidth = 20
    //  const boxHeight = max.y - min.y

    const constrainedWidth = canvasWidth - boxWidth
    // const constrainedHeight = canvasHeight - boxHeight

    const randX = randomIntFromInterval(boxWidth, constrainedWidth)

    const newBox = new MusicTarget(`Box_${noteCounter}`, Bodies.rectangle(randX, -50, 20, 20), {
        notes: [note.notes[noteCounter]],
        totalTime: 0.5,
    })
    newBox.body.label = "hostile"
    Body.setVelocity(newBox.body, { x: 0, y: 3 })
    newBox.body.friction = 0
    newBox.body.frictionAir = 0
    newBox.body.frictionStatic = 0



    if (currentTime - newTime > interval) {
        newTime = currentTime
        AddTarget(newBox)
        noteCounter += 1
        if (currentTime - gameStartTime > gameLength && !stoppedGame) {
            stoppedGame = true
            startButton?.setAttribute('data-started', 'false')
            // @ts-ignore
            gameStatusText.innerText = 'Stopped'
            newSong = notesForNewSong.map((testNote, index) => {
                const startTime = index % 2 === 0 ? index + 0.5 : (Math.floor(index + 1) / 2)
                const endTime = startTime + 0.5
                return { note: testNote.pitch, startTime, endTime }
            })
        }

    }
}

Events.on(runner, 'afterUpdate', () => {


    if (player.isMovingRight) {
        Body.setVelocity(player.body, { x: 1 * player.speed, y: player.body.velocity.y })
    } else if (!player.isMovingRight && player.horizontalMovement.length > 0) {
        Body.setVelocity(player.body, { x: - 1 * player.speed, y: player.body.velocity.y })
    }
    else {
        Body.setVelocity(player.body, { x: 0, y: player.body.velocity.y })
    }
    if (player.isMovingUp) {
        Body.setVelocity(player.body, { x: player.body.velocity.x, y: -1 * player.speed })
    } else if (!player.isMovingUp && player.verticalMovement.length > 0) {
        Body.setVelocity(player.body, { x: player.body.velocity.x, y: 1 * player.speed })
    }
    else {
        Body.setVelocity(player.body, { x: player.body.velocity.x, y: 0 })
    }

    if (startButton?.getAttribute('data-started') === 'true') {
        spawnBoxInterval(TWINKLE_TWINKLE, gameLength)
    }
})



player.Spawn()
player.body.friction = 0
player.body.frictionAir = 0
player.body.frictionStatic = 0

window.addEventListener('keydown', (event) => {
    if (event.key === "d" || event.key === "a" || event.key === "w" || event.key === "s") {
        const { key } = event
        player.isMoving(key)
    }

})

window.addEventListener('keyup', (event) => {
    if (event.key === "d" || event.key === "a" || event.key === "w" || event.key === "s") {
        player.moveStop(event)
    }
})


document.querySelector('canvas')?.addEventListener("click", (e) => {

    // const bullet = player.Shoot()

    // position is from window, that's why angle is off
    const { offsetTop, offsetLeft } = e.currentTarget
    const { clientX, clientY } = e
    const bodyX = player.body.position.x;
    const bodyY = player.body.position.y;

    const diffX = clientX - bodyX - offsetLeft;
    const diffY = clientY - bodyY - offsetTop;

    // console.log(`x: ${diffX} || y:${diffY}`)
    // console.log(`mouse-x: ${diffX} || bod-x:${bodyX}`)

    const angle = (Math.atan2(diffY, diffX) * 180) / Math.PI;

    Body.setAngle(player.body, angle);


    const hypot = Math.hypot(diffX, diffY)
    const ratio = 30
    const hypotRatio = hypot / ratio
    const bullet = player.Shoot(player.body.position.x, player.body.position.y, 10, 10)
    Detector.setBodies(detector, [...detector.bodies, bullet])
    // Body.setAngularVelocity(bullet, (1 * Math.abs(diffX)) / diffX);
    Body.setVelocity(bullet, {
        x: diffX / hypotRatio,
        y: diffY / hypotRatio
    });
});



