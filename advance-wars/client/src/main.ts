import './style.css'

import 'phaser';
import { MenuScene } from './scenes/menu-scene';

const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'ExampleGame',
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: 'app',
  transparent: true,
  scene: [MenuScene],
  input: {
    keyboard: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  backgroundColor: '#000000',
  render: { pixelArt: true, antialias: false },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.RESIZE,
    // `fullscreenTarget` must be defined for phones to not have
    // a small margin during fullscreen.
    fullscreenTarget: 'app',
    expandParent: false,
  },
};


export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  // Expose `_game` to allow debugging, mute button and fullscreen button
  (window as any)._game = new Game(GameConfig);
});
