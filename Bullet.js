// eslint-disable-next-line no-undef
const { Engine, Render, Runner, Bodies, Composite, Events, Detector } = Matter;

export default class Bullet {
    constructor(engine, xPos, YPos, width, height) {
        this.engine = engine
        this.width = width
        this.height = height
        this.YPos = YPos
        this.xPos = xPos
        this.damage = 10
        this.Spawn = () => {
            const body = Bodies.rectangle(this.xPos, this.YPos, this.width, this.height)
            Composite.add(engine.world, body)
        }
    }
}