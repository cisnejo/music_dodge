
import Bullet from './Bullet'

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
            this.move({ x: 1, y: 0 })
        }
        this.moveLeft = () => {
            this.move({ x: -1, y: 0 })
        }
        this.moveUp = () => {
            this.move({ x: 0, y: -1 })
        }
        this.moveDown = () => {
            this.move({ x: 0, y: 1 })
        }

        this.move = ({ x: xVector, y: yVector }) => {
            this.isMoving = true
            const x = xVector * this.speed
            const y = yVector * this.speed
            const positionVector = { x, y }
            //  Body.translate(this.body, positionVector)
            Body.setVelocity(this.body, positionVector)
        }
        this.moveStop = () => {
            Body.setVelocity(this.body, { x: 0, y: 0 })
        }
    }

}

