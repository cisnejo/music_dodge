

export default class Player {
    constructor(body) {
        this.body = body
        this.hasFired = false
        this.fireRate = 100
        this.health = 10
        this.alive = true
    }
}