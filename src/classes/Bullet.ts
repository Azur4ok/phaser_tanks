export class Bullet extends Phaser.Physics.Arcade.Sprite {
  public constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'bullet')
  }
}
