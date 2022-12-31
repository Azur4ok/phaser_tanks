export class Bullet extends Phaser.Physics.Arcade.Sprite {
  private fireSpeed: number = 450
  public timeToDie: Phaser.Time.TimerEvent
  public bulletDamage: number = 20
  public constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'bullet')

    this.timeToDie = this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.body.enable = false
        this.setVisible(false)
        this.setActive(false)
        this.setVelocity(0)
      },
    })
  }

  public fire(x: number, y: number, angle: number): void {
    this.body.reset(x, y)
    this.setDepth(1)
    this.setRotation(angle)

    this.body.enable = true
    this.setVisible(true)
    this.setActive(true)
    this.setVelocity(
      Math.round(this.fireSpeed * Math.sin(angle)),
      Math.round(-this.fireSpeed * Math.cos(angle)),
    )
  }
}
