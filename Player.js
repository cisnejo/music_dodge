
import Bullet from './Bullet'
// for help -- https://brm.io/matter-js/docs/classes/Body.html 
// eslint-disable-next-line no-undef
const { Body, Bodies, Composite, Detector } = Matter;

export default class Player {
    constructor(playerPosX, playerPosY, playerWidth, playerHeight) {
        this.playerPosX = playerPosX
        this.playerPosY = playerPosY
        this.playerWidth = playerWidth
        this.playerHeight = playerHeight
        this.hasFired = false
        this.fireRate = 100
        this.health = 10
        this.alive = true
        this.speed = 3
        this.radius = 10
        this.isMoving = false
        // this.body = Bodies.rectangle(this.playerPosX, this.playerPosY, this.playerWidth, this.playerHeight)
        this.body = Bodies.circle(this.playerPosX, this.playerPosY, this.radius)
        this.Spawn = (engine, detector) => {
            Composite.add(engine.world, this.body)
            Detector.setBodies(detector, [...detector.bodies, this.body])
        }
        this.Shoot = (engine, xPos, YPos, width, height) => {
            const bullet = new Bullet(engine, xPos, YPos, width, height)
            bullet.Spawn()
        }
        this.moveRight = () => {
            this.move({ x: 1 * this.speed, y: this.body.velocity.y })
        }
        this.moveLeft = () => {

            this.move({ x: -1 * this.speed, y: this.body.velocity.y })
        }
        this.moveUp = () => {
            this.move({ x: this.body.velocity.x, y: -1 * this.speed })
        }
        this.moveDown = () => {
            this.move({ x: this.body.velocity.x, y: 1 * this.speed })
        }

        this.move = ({ x: xVector, y: yVector }) => {
            this.isMoving = true
            const x = xVector
            const y = yVector
            const positionVector = { x, y }

            //  Body.translate(this.body, positionVector)
            Body.setVelocity(this.body, positionVector)
        }
        this.moveStop = () => {
            Body.setVelocity(this.body, { x: 0, y: 0 })
        }
    }

}

