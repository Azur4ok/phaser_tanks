import { MainScene } from './MainScene'

export class UIScene extends Phaser.Scene {
  protected fireButtonRadius: number = 128
  protected fireButton!: Phaser.GameObjects.Sprite
  protected moveButton!: Phaser.GameObjects.Sprite
  private mainScene!: MainScene
  public constructor() {
    super({ key: 'ui-scene', active: true })
  }

  init(): void {
    this.mainScene = this.scene.get('main-scene') as MainScene
  }

  private create(): void {
    this.fireButton = this.add
      .sprite(
        window.innerWidth - this.fireButtonRadius,
        window.innerHeight - this.fireButtonRadius,
        'ball',
      )
      .setInteractive()

    this.moveButton = this.add
      .sprite(this.fireButtonRadius, window.innerHeight - this.fireButtonRadius, 'ball')
      .setInteractive()

    this.initEvents()
  }

  initEvents(): void {
    this.fireButton.on('pointerdown', () => {
      this.fireButton.setTint(0x00ff00)
      this.mainScene.player?.handleFire()
    })
    this.fireButton.on('pointerup', () => {
      this.fireButton.setTint(0x00ffff)
    })

    this.moveButton.on('pointermove', (pointer: PointerEvent) => {
      this.mainScene.player.handleChangeAngle(
        Math.PI / 2 + Math.atan2(this.moveButton.x - pointer.x, pointer.y - this.moveButton.y),
      )
    })
    this.moveButton.on('pointermove', () => {
      this.mainScene.player.setVelocity(0)
    })
  }
}
