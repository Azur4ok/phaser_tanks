import { MainScene } from './MainScene'

export class UIScene extends Phaser.Scene {
  protected fireButtonRadius: number = 128
  protected fireButton!: Phaser.GameObjects.Sprite
  protected moveButton!: Phaser.GameObjects.Sprite
  private mainScene!: MainScene
  private tutorialText!: Phaser.GameObjects.Text
  private tank0!: Phaser.GameObjects.Sprite
  private tank1!: Phaser.GameObjects.Sprite
  private tank2!: Phaser.GameObjects.Sprite
  public constructor() {
    super({ key: 'ui-scene', active: true })
  }

  init(): void {
    this.mainScene = this.scene.get('main-scene') as MainScene
  }

  private create(): void {
    this.tutorialText = this.add.text(
      20,
      20,
      'press down WASD for moving\n space for shooting\n tab for change the shape of the tank',
      { align: 'center', fontSize: '25px', color: '#fff' },
    )
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

    this.tank0 = this.add
      .sprite(
        window.innerWidth / 2 - this.fireButtonRadius / 2,
        this.fireButtonRadius / 2,
        'tanks',
        0,
      )
      .setInteractive()
      .setAlpha(0.6)
    this.tank1 = this.add
      .sprite(window.innerWidth / 2, this.fireButtonRadius / 2, 'tanks', 1)
      .setInteractive()
      .setAlpha(1)
    this.tank2 = this.add
      .sprite(
        window.innerWidth / 2 + this.fireButtonRadius / 2,
        this.fireButtonRadius / 2,
        'tanks',
        2,
      )
      .setInteractive()
      .setAlpha(0.6)

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
    this.moveButton.on('pointerout', () => {
      this.mainScene.player.setVelocity(0)
    })

    this.tank0.on('pointerdown', () => {
      this.tank0.alpha = 0.95
      this.tank1.alpha = 0.6
      this.tank2.alpha = 0.6

      this.mainScene.player.changeTankFrame(0)
    })
    this.tank1.on('pointerdown', () => {
      this.tank0.alpha = 0.6
      this.tank1.alpha = 0.95
      this.tank2.alpha = 0.6

      this.mainScene.player.changeTankFrame(1)
    })
    this.tank2.on('pointerdown', () => {
      this.tank0.alpha = 0.6
      this.tank1.alpha = 0.6
      this.tank2.alpha = 0.95

      this.mainScene.player.changeTankFrame(2)
    })
  }

  update(_time: number, _delta: number): void {
    if (window.innerWidth < 776) {
      this.tutorialText.setVisible(false)
    } else {
      this.tutorialText.setVisible(true)
    }
  }

  resize() {
    this.moveButton.setPosition(
      this.fireButtonRadius,
      window.innerHeight - this.fireButtonRadius / 2,
    )
    this.tank0.setPosition(
      window.innerWidth / 2 - this.fireButtonRadius / 2,
      this.fireButtonRadius / 2,
    )
    this.tank1.setPosition(window.innerWidth / 2, this.fireButtonRadius / 2)
    this.tank2.setPosition(
      window.innerWidth / 2 + this.fireButtonRadius / 2,
      this.fireButtonRadius / 2,
    )
    this.fireButton.setPosition(
      window.innerWidth - this.fireButtonRadius,
      window.innerHeight - this.fireButtonRadius / 2,
    )
  }
}
