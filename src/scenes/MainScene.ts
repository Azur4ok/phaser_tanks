import { Scene } from 'phaser'
import { Player } from './../classes/Player'
import { BulletGroup } from './../classes/BulletGroup'
import { Area } from './../classes/Area'

export class MainScene extends Scene {
  public player!: Player
  private squares: Area[] = []
  public squareSize: number = 9
  public tileSize: number = 128
  private snappedSquareX!: number
  private snappedSquareY!: number
  chunks: any
  public constructor() {
    super('main-scene')
  }

  private create(): void {
    this.scale.on('resize', this.handleResize, this)
    const bullets = new BulletGroup(this)
    this.player = new Player(
      this,
      this.cameras.main.worldView.x + this.cameras.main.worldView.width * 0.5,
      this.cameras.main.worldView.y + this.cameras.main.worldView.height * 0.5,
      1,
      bullets,
    )
    this.cameras.main.startFollow(this.player)
  }

  private handleUpdateMap(): void {
    this.snappedSquareX =
      this.squareSize *
      this.tileSize *
      Math.round(this.player.x / (this.squareSize * this.tileSize))
    this.snappedSquareY =
      this.squareSize *
      this.tileSize *
      Math.round(this.player.y / (this.squareSize * this.tileSize))
    this.snappedSquareX = this.snappedSquareX / this.squareSize / this.tileSize
    this.snappedSquareY = this.snappedSquareY / this.squareSize / this.tileSize

    for (let x = this.snappedSquareX - 2; x < this.snappedSquareX + 2; x++) {
      for (let y = this.snappedSquareY - 2; y < this.snappedSquareY + 2; y++) {
        let square = this.getSquare(x, y)
        if (!square) {
          square = new Area(this, x, y)
          this.squares.push(square)
        }
      }
    }

    for (let i = 0; i < this.squares.length; i++) {
      let square = this.squares[i]
      if (
        Phaser.Math.Distance.Between(this.snappedSquareX, this.snappedSquareY, square.x, square.y) <
        2
      ) {
        if (square) {
          square.loadElements(this.player)
        }
      } else {
        if (square) {
          square.clearElements()
        }
      }
    }
  }

  private getSquare(x: number, y: number): Area | null {
    let square = null
    for (let i = 0; i < this.squares.length; i++) {
      if (this.squares[i].x === x && this.squares[i].y === y) {
        square = this.squares[i]
      }
    }
    return square
  }

  handleResize(
    gameSize: { width: number | string; height: number | string },
    _baseSize: number,
    _displaySize: number,
    _resolution: number,
  ): void {
    let width = gameSize.width
    let height = gameSize.height
    if (!width) {
      width = this.sys.game.config.width
    }
    if (!height) {
      height = this.sys.game.config.height
    }

    this.cameras.resize(width as number, height as number)
  }

  update(_time: number, _delta: number): void {
    this.handleUpdateMap()
  }
}
