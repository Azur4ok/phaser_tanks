import { Player } from './Player'
import { Tile } from './Tile'
import { MainScene } from './../scenes/MainScene'
import { Enemy } from './Enemy'
import { Bullet } from './Bullet'

export class Area {
  private isLoaded: boolean = false
  private scene: MainScene
  private tileGroup: Phaser.GameObjects.Group
  private blockedLayer: Phaser.GameObjects.Group
  public x: number
  public y: number
  public constructor(scene: MainScene, x: number, y: number) {
    this.scene = scene
    this.x = x
    this.y = y

    this.tileGroup = scene.add.group()
    this.blockedLayer = scene.add.group()
  }

  public clearElements(): void {
    if (this.isLoaded) {
      this.tileGroup.clear(true, true)
      this.blockedLayer.clear(true, true)
      this.isLoaded = false
    }
  }

  public loadElements(player: Player): void {
    if (!this.isLoaded) {
      for (let i = 0; i < this.scene.squareSize; i++) {
        for (let j = 0; j < this.scene.squareSize; j++) {
          const tileX =
            this.x * (this.scene.squareSize * this.scene.tileSize) + i * this.scene.tileSize
          const tileY =
            this.y * (this.scene.squareSize * this.scene.tileSize) + j * this.scene.tileSize
          const randomNumber = Math.random()
          let key = 'earth'
          let isblocking = false
          let destroyable = false
          if (randomNumber > 0.9) {
            key = 'wall'
            isblocking = true
          } else if (randomNumber > 0.8) {
            key = 'hay'
            isblocking = true
            destroyable = true
          }

          this.tileGroup.add(new Tile(this.scene, tileX, tileY, 'earth'))
          if (isblocking) {
            let tile = null
            if (destroyable) {
              tile = new Enemy(this.scene, tileX, tileY, key)
            } else {
              tile = new Tile(this.scene, tileX, tileY, key)
            }

            this.blockedLayer.add(tile)
            this.scene.physics.add.existing(tile, true)
            this.scene.physics.add.collider(player, tile)
            this.scene.physics.add.overlap(
              player,
              tile,
              (_object1, object2) => {
                if (!(object2 as Tile).healthPoint) {
                  object2.destroy(true)
                } else {
                  object2.destroy(true)
                }
              },
              undefined,
              this,
            )
            this.scene.physics.add.collider(player.bullets, tile, (tile, bullet) => {
              player.bullets.enemyCollision(bullet as Bullet, tile as Enemy | Tile)
            })
          }
        }
      }
      this.isLoaded = true
    }
  }
}
