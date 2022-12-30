import { Types, AUTO, Game } from 'phaser'
import { PreloadScene, MainScene, UIScene } from './scenes'

const scaleConfig: Types.Core.ScaleConfig = {
  mode: Phaser.Scale.FIT,
  parent: 'app',
  width: window.innerWidth + 3,
  height: window.innerHeight,
}

const gameConfig: Types.Core.GameConfig = {
  type: AUTO,
  scale: scaleConfig,
  roundPixels: true,
  input: {
    activePointers: 5,
  },
  physics: {
    default: 'arcade',
    arcade: {
      x: 0,
      y: 0,
    },
  },
  scene: [PreloadScene, MainScene, UIScene],
}

export default new Game(gameConfig)
