
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
        // this.isMoving = []
        this.isMovingRight = false
        this.isMovingUp = false
        this.horizontalMovement = []
        this.verticalMovement = []

        // this.body = Bodies.rectangle(this.playerPosX, this.playerPosY, this.playerWidth, this.playerHeight)
        this.body = Bodies.circle(this.playerPosX, this.playerPosY, this.radius)
        this.Spawn = (engine, detector) => {
            // this.body.collisionFilter = { 'group': -1, 'category': 1, 'mask': 0 }
            Composite.add(engine.world, this.body)
            Detector.setBodies(detector, [...detector.bodies, this.body])
        }
        this.Shoot = (engine, xPos, YPos, width, height) => {
            const bullet = new Bullet(engine, xPos, YPos, width, height)
            bullet.Spawn()
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

        // this.moveRight = (d) => {
        //     let yVelocity = this.body.velocity.y
        //     if (this.body.velocity.y !== 0) {
        //         const sign = yVelocity > 0 ? 1 : -1;
        //         yVelocity = 1 * this.speed * sign
        //     }
        //     this.move({ x: 1 * this.speed, y: yVelocity, key: d })
        // }
        // this.moveLeft = (a) => {
        //     let yVelocity = this.body.velocity.y
        //     if (this.body.velocity.y !== 0) {
        //         const sign = yVelocity > 0 ? 1 : -1;
        //         yVelocity = 1 * this.speed * sign
        //     }
        //     this.move({ x: -1 * this.speed, y: yVelocity, key: a })
        // }
        // this.moveUp = (w) => {
        //     let xVelocity = this.body.velocity.x
        //     if (this.body.velocity.x !== 0) {
        //         const sign = xVelocity > 0 ? 1 : -1;
        //         xVelocity = 1 * this.speed * sign
        //     }
        //     this.move({ x: xVelocity, y: -1 * this.speed, key: w })
        // }
        // this.moveDown = (s) => {

        //     let xVelocity = this.body.velocity.x
        //     if (this.body.velocity.x !== 0) {
        //         const sign = xVelocity > 0 ? 1 : -1;
        //         xVelocity = 1 * this.speed * sign
        //     }
        //     this.move({ x: xVelocity, y: 1 * this.speed, key: s })
        // }

        // this.move = ({ x: xVector, y: yVector, key }) => {
        //     this.isMoving = [...new Set([...this.isMoving, key])]
        //     const x = xVector
        //     const y = yVector
        //     const positionVector = { x, y }
        //     //  Body.translate(this.body, positionVector
        //     Body.setVelocity(this.body, positionVector)
        // }
        // this.moveStop = (event) => {
        //     this.isMoving.splice(this.isMoving.indexOf(event.key), 1)
        //     if (this.isMoving.length === 0) {
        //         Body.setVelocity(this.body, { x: 0, y: 0 })
        //     }
        //     if ((event.key === "d" || event.key === "a") && (!this.isMoving.includes('a') && !this.isMoving.includes('d'))) {
        //         Body.setVelocity(this.body, { x: 0, y: this.body.velocity.y })
        //     }
        //     if ((event.key === "w" || event.key === "s") && (!this.isMoving.includes('s') && !this.isMoving.includes('w'))) {
        //         Body.setVelocity(this.body, { x: this.body.velocity.x, y: 0 })
        //     }

        // }
    }

}

