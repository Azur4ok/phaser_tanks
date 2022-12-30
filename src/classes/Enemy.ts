import { Tile } from './Tile'

export class Enemy extends Tile {
  private animation!: boolean | Phaser.Animations.Animation
  private sprite!: Phaser.GameObjects.Sprite

  public constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture)

    this.sprite = this.scene.add
      .sprite(this.x + this.width / 2, this.y + this.height / 2, 'explosion')
      .setScale(2, 2)
      .setVisible(false)
    this.initAnimation()
  }

  private initAnimation(): void {
    if (!this.sprite.anims.get('explosion')) {
      this.animation = this.sprite.anims.create({
        key: 'explosion',
        frames: this.scene.anims.generateFrameNumbers('explosion', {}),
        frameRate: 25,
        repeat: 0,
        hideOnComplete: true,
        showOnStart: true,
      })
    }
  }

  public getDamage(damageNumber: number): void {
    this.healthPoint -= damageNumber
    if (this.healthPoint <= 0) {
      this.healthPoint = 0
      this.sprite.play('explosion')
      this.destroy()
    }
  }
}
