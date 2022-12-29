import { Physics, Scene } from 'phaser'
import { BulletGroup } from './BulletGroup'

export class Player extends Physics.Arcade.Sprite {
  private keyW: Phaser.Input.Keyboard.Key
  private keyA: Phaser.Input.Keyboard.Key
  private keyS: Phaser.Input.Keyboard.Key
  private keyD: Phaser.Input.Keyboard.Key
  private keySpace: Phaser.Input.Keyboard.Key
  private keyTab: Phaser.Input.Keyboard.Key
  private currentFrame: number
  private cameraSpeed: number = 100
  private tankSpeed: { x: number; y: number } = { x: 0, y: 0 }
  public bullets: BulletGroup

  public constructor(scene: Scene, x: number, y: number, frame: number, bullets: BulletGroup) {
    super(scene, x, y, 'tanks', frame)

    this.bullets = bullets
    this.currentFrame = frame
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setDepth(1)

    this.getBody().setCollideWorldBounds(true)

    this.keyW = this.scene.input.keyboard.addKey('W')
    this.keyA = this.scene.input.keyboard.addKey('A')
    this.keyS = this.scene.input.keyboard.addKey('S')
    this.keyD = this.scene.input.keyboard.addKey('D')
    this.keySpace = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.keyTab = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB)

    this.initEvents()
  }

  private initEvents(): void {
    this.keySpace.on('down', () => {
      this.handleFire()
    })
    this.keyTab.on('down', () => {
      this.changeTankFrame(this.currentFrame)
    })
    this.keyA.on('down', () => {
      this.handleChangeVelocity(-this.cameraSpeed, 0)
    })
    this.keyW.on('down', () => {
      this.handleChangeVelocity(0, -this.cameraSpeed)
    })
    this.keyD.on('down', () => {
      this.handleChangeVelocity(this.cameraSpeed, 0)
    })
    this.keyS.on('down', () => {
      this.handleChangeVelocity(0, this.cameraSpeed)
    })
  }

  handleFire(): void {
    this.bullets.fireBullet(this.x, this.y, this.rotation)
  }

  changeTankFrame(frame: number): void {
    if (frame === 2) {
      this.currentFrame = 0
      this.setFrame(this.currentFrame)
    } else if (!frame) {
      this.currentFrame = 1
      this.setFrame(this.currentFrame)
    } else {
      this.currentFrame = 2
      this.setFrame(this.currentFrame)
    }
  }

  public handleChangeVelocity(velocityX: number, velocityY: number): void {
    if (velocityX) {
      this.tankSpeed.x += this.tankSpeed.x >= this.cameraSpeed ? 0 : velocityX
    } else {
      this.tankSpeed.x += this.tankSpeed.x <= -this.cameraSpeed ? 0 : velocityX
    }
    if (velocityY) {
      this.tankSpeed.y += this.tankSpeed.y >= this.cameraSpeed ? 0 : velocityY
    } else {
      this.tankSpeed.y += this.tankSpeed.y <= -this.cameraSpeed ? 0 : velocityY
    }
    this.setVelocity(this.tankSpeed.x, this.tankSpeed.y)
    if (this.tankSpeed.x || this.tankSpeed.y) {
      this.setRotation(Math.atan2(this.tankSpeed.x, -this.tankSpeed.y))
    }
  }

  public handleChangeAngle(angle: number): void {
    this.rotation = angle + Math.PI / 2
    this.tankSpeed.x = this.cameraSpeed * Math.cos(angle)
    this.tankSpeed.y = this.cameraSpeed * Math.sin(angle)
    this.setVelocity(this.tankSpeed.x, this.tankSpeed.y)
  }

  getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body
  }
}
