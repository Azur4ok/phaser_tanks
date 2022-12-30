import { Bullet } from './Bullet'
import { Tile } from './Tile'
import { Enemy } from './Enemy'

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

    this.setDepth(1, 0)

    this.world.enable(this.getChildren())
  }

  public enemyCollision(bullet: Bullet, enemy: Tile | Enemy): void {
    bullet.body.enable = false
    bullet.setActive(false)
    bullet.setVisible(false)
    enemy.getDamage(bullet.bulletDamage)
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
