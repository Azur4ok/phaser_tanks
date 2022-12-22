import { Bullet } from './Bullet'

export class BulletGroup extends Phaser.Physics.Arcade.Group {
  public constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene)

    this.createMultiple({
      classType: Bullet,
      frameQuantity: 5,
      active: false,
      visible: false,
      key: 'bullet',
    })
  }
}
