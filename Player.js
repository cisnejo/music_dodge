
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
        this.speed = 10
        this.body = Bodies.rectangle(this.playerPosX, this.playerPosY, this.playerWidth, this.playerHeight)
        this.Spawn = (engine, detector) => {
            Composite.add(engine.world, this.body)
            Detector.setBodies(detector, [...detector.bodies, this.body])
        }
        this.Shoot = (engine, xPos, YPos, width, height) => {
            const bullet = new Bullet(engine, xPos, YPos, width, height)
            bullet.Spawn()
        }
        this.moveRight = () => {

            const x = 1 * this.speed
            const y = 0
            const positionVector = { x, y }
            Body.translate(this.body, positionVector)
        }
        this.moveLeft = () => {
            this.playerPosX -= (1 * this.speed)
            const x = -1 * this.speed
            const y = 0
            const positionVector = { x, y }
            Body.translate(this.body, positionVector)
        }
    }

}

