import { Scene } from 'phaser'
import { Player } from './../classes/Player'
import { BulletGroup } from './../classes/BulletGroup'
import { Area } from './../classes/Area'

export class MainScene extends Scene {
  private player!: Player
  private chunks: Area[] = []
  public chunkSize: number = 9
  public tileSize: number = 128
  public constructor() {
    super('main-scene')
  }

  private create(): void {
    const bullets = new BulletGroup(this)
    this.player = new Player(this, window.innerWidth / 2, window.innerHeight / 2, 1, bullets)

    this.cameras.main.startFollow(this.player, true, 0.9, 0.9)
  }

  private handleUpdateMap(): void {
    let snappedChunkX =
      this.chunkSize * this.tileSize * Math.round(this.player.x / (this.chunkSize * this.tileSize))
    let snappedChunkY =
      this.chunkSize * this.tileSize * Math.round(this.player.y / (this.chunkSize * this.tileSize))
    snappedChunkX = snappedChunkX / this.chunkSize / this.tileSize
    snappedChunkY = snappedChunkY / this.chunkSize / this.tileSize

    for (let x = snappedChunkX - 2; x < snappedChunkX + 2; x++) {
      for (let y = snappedChunkY - 2; y < snappedChunkY + 2; y++) {
        let chunk = this.getChunk(x, y)
        if (!chunk) {
          chunk = new Area(this, x, y)
          this.chunks.push(chunk)
        }
      }
    }

    for (let i = 0; i < this.chunks.length; i++) {
      let chunk = this.chunks[i]
      if (Phaser.Math.Distance.Between(snappedChunkX, snappedChunkY, chunk.x, chunk.y) < 2) {
        if (chunk) {
          chunk.loadElements(this.player)
        }
      } else {
        if (chunk) {
          chunk.clearElements()
        }
      }
    }
  }

  private getChunk(x: number, y: number): Area | null {
    let chunk = null
    for (let i = 0; i < this.chunks.length; i++) {
      if (this.chunks[i].x === x && this.chunks[i].y === y) {
        chunk = this.chunks[i]
      }
    }
    return chunk
  }

  update(time: number, delta: number): void {
    this.handleUpdateMap()
  }
}
