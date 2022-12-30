import { Scene } from 'phaser'

export class PreloadScene extends Scene {
  public constructor() {
    super('preload-scene')
  }

  private preload(): void {
    this.load.baseURL = 'assets/images/'

    this.load.spritesheet('tanks', 'tanks.png', { frameWidth: 54, frameHeight: 57 })
    this.load.spritesheet('explosion', 'explosion.png', { frameWidth: 64, frameHeight: 64 })
    this.load.image('bullet', 'bullet.png')
    this.load.image('hay', 'hay.jpg')
    this.load.image('wall', 'wall.jpg')
    this.load.image('earth', 'earth.jpg')
    this.load.image('ball', 'ball.png')
  }

  private create(): void {
    this.scene.start('main-scene')
    this.scene.start('ui-scene')
  }
}
