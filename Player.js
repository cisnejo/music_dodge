
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
        this.speed = 5
        this.radius = 10
        this.isMoving = []
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
        this.moveRight = (d) => {
            let yVelocity = this.body.velocity.y
            if (this.body.velocity.y !== 0) {
                const sign = yVelocity > 0 ? 1 : -1;
                yVelocity = 1 * this.speed * sign
            }
            this.move({ x: 1 * this.speed, y: yVelocity, key: d })
        }
        this.moveLeft = (a) => {
            let yVelocity = this.body.velocity.y
            if (this.body.velocity.y !== 0) {
                const sign = yVelocity > 0 ? 1 : -1;
                yVelocity = 1 * this.speed * sign
            }
            this.move({ x: -1 * this.speed, y: yVelocity, key: a })
        }
        this.moveUp = (w) => {
            let xVelocity = this.body.velocity.x
            if (this.body.velocity.x !== 0) {
                const sign = xVelocity > 0 ? 1 : -1;
                xVelocity = 1 * this.speed * sign
            }
            this.move({ x: xVelocity, y: -1 * this.speed, key: w })
        }
        this.moveDown = (s) => {

            let xVelocity = this.body.velocity.x
            if (this.body.velocity.x !== 0) {
                const sign = xVelocity > 0 ? 1 : -1;
                xVelocity = 1 * this.speed * sign
            }
            this.move({ x: xVelocity, y: 1 * this.speed, key: s })
        }

        this.move = ({ x: xVector, y: yVector, key }) => {
            this.isMoving = [...new Set([...this.isMoving, key])]
            const x = xVector
            const y = yVector
            const positionVector = { x, y }
            //  Body.translate(this.body, positionVector
            Body.setVelocity(this.body, positionVector)
        }
        this.moveStop = (event) => {
            this.isMoving.splice(this.isMoving.indexOf(event.key), 1)
            if (this.isMoving.length === 0) {
                Body.setVelocity(this.body, { x: 0, y: 0 })
            }
            if ((event.key === "d" || event.key === "a") && (!this.isMoving.includes('a') && !this.isMoving.includes('d'))) {
                Body.setVelocity(this.body, { x: 0, y: this.body.velocity.y })
            }
            if ((event.key === "w" || event.key === "s") && (!this.isMoving.includes('s') && !this.isMoving.includes('w'))) {
                Body.setVelocity(this.body, { x: this.body.velocity.x, y: 0 })
            }

        }
    }

}

