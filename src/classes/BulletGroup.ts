import { Bullet } from './Bullet'

export class BulletGroup extends Phaser.Physics.Arcade.Group {
  public constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene)

    this.createMultiple({
      key: 'bullet',
      classType: Bullet,
      frameQuantity: 5,
      active: false,
      visible: false,
    })

    this.world.enable(this.getChildren())
  }

  public fireBullet(x: number, y: number, angle: number): void {
    const bullet: Bullet = this.getFirstDead(false)
    if (bullet && bullet.body) {
      if (bullet.timeToDie) {
        bullet.timeToDie.destroy()
      }
      bullet.fire(x, y, angle)
    } 
  }
}
