import { Tile } from './Tile'

export class Enemy extends Tile {
  public healthPoint: number = 100
  private animation!: boolean | Phaser.Animations.Animation
  private sprite!: Phaser.GameObjects.Sprite

  public constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture)

    this.initAnimation()

    this.sprite = this.scene.add
      .sprite(this.x + this.width / 2, this.y + this.height / 2, 'explosion')
      .setScale(2, 2)

    this.setVisible(false)
  }

  private initAnimation(): void {
    if (!this.scene.anims.get('explosion')) {
      this.animation = this.scene.anims.create({
        key: 'explosion',
        frames: this.scene.anims.generateFrameNumbers('explosion', { start: 0 }),
        frameRate: 25,
        hideOnComplete: true,
        showOnStart: true,
      })
    }
  }

  public getDamage(damageNumber: number): void {
    this.healthPoint -= damageNumber
    if (this.healthPoint <= 0) {
      this.healthPoint = 0
      this.sprite.anims.play('explosion')
      this.destroy()
    }
  }
}
