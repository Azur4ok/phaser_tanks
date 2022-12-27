export class Tile extends Phaser.Physics.Arcade.Sprite {
  public healthPoint: number = 100
  public constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture)
    scene.add.existing(this)
  }
}
