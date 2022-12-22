import { Scene } from 'phaser'
import { Player } from './../classes/Player'

export class MainScene extends Scene {
  private player!: Player
  public constructor() {
    super('main-scene')
  }

  private create(): void {
    this.player = new Player(this, window.innerWidth / 2, window.innerHeight / 2, 1)

    this.cameras.main.startFollow(this.player, true, 0.9, 0.9)
  }
}
