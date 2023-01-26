
import Bullet from './Bullet'
// for help -- https://brm.io/matter-js/docs/classes/Body.html 
// eslint-disable-next-line no-undef
const { Body, Bodies, Composite, Detector } = Matter;

export default class Player {
    constructor(playerPosX , playerPosY , playerWidth , playerHeight , engine,detector) {
        this.playerPosX = playerPosX
        this.playerPosY = playerPosY
        this.playerWidth = playerWidth
        this.playerHeight = playerHeight
        this.hasFired = false
        this.fireRate = 100
        this.health = 10
        this.alive = true
        this.speed = 5
        this.radius = 10
        this.isMovingRight = false
        this.isMovingUp = false
        this.horizontalMovement = []
        this.verticalMovement = []
        this.engine = engine
        this.detector = detector

        // this.body = Bodies.rectangle(this.playerPosX, this.playerPosY, this.playerWidth, this.playerHeight)
        this.body = Bodies.circle(this.playerPosX, this.playerPosY, this.radius)
        this.Spawn = () => {
            this.body.collisionFilter = { 'group': -1, 'category': 1, 'mask': 0 }
            Composite.add(this.engine.world, this.body)
            Detector.setBodies(this.detector, [...this.detector.bodies, this.body])
        }
        this.Shoot = (xPos, YPos, width, height) => {
            const bullet = new Bullet(this.engine, xPos, YPos, width, height)
            return bullet.Spawn()
        }

        this.isMoving = (e) => {
            switch (true) {
                case e === "d":
                    this.isMovingRight = true
                    this.horizontalMovement = [... new Set([...this.horizontalMovement, "d"])]
                    break;
                case e === "a":
                    this.isMovingRight = false
                    this.horizontalMovement = [... new Set([...this.horizontalMovement, "a"])]
                    break;
                case e === "w":
                    this.isMovingUp = true
                    this.verticalMovement = [... new Set([...this.verticalMovement, "w"])]
                    break;
                case e === "s":
                    this.isMovingUp = false
                    this.verticalMovement = [... new Set([...this.verticalMovement, "s"])]
                    break;
                default:
                    this.isMovingRight = false
                    this.isMovingVertical = false
            }
        }

        this.moveStop = (e) => {
            switch (true) {
                case e.key === "a" || e.key === "d":
                    this.horizontalMovement.splice(this.horizontalMovement.indexOf(e.key), 1)
                    this.isMovingRight = false
                    if (e.key === "a" && this.horizontalMovement.length > 0) this.isMovingRight = true
                    break;
                case e.key === "w" || e.key === "s":
                    this.verticalMovement.splice(this.verticalMovement.indexOf(e.key), 1)
                    this.isMovingUp = false
                    if (e.key === "s" && this.verticalMovement.length > 0) this.isMovingUp = true
                    break;
                default:
                    Body.setVelocity(this.body, { x: 0, y: 0 });
            }

            if (this.horizontalMovement.length === 0) Body.setVelocity(this.body, { x: 0, y: this.body.velocity.y });
            if (this.verticalMovement.length === 0) Body.setVelocity(this.body, { x: this.body.velocity.x, y: 0 });
        }
    }
}
