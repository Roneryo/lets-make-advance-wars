import { GameObjects } from 'phaser';

import { Map } from '../gameObjetcs/Map';

export class MenuScene extends Phaser.Scene {
  private map!: Map;
  public character!: Phaser.Tilemaps.Tile;
  public tile!: any;
  public text!: GameObjects.Text;
  public grid!: GameObjects.Grid;
  public sprite!: Phaser.Tilemaps.Tilemap;
  public units  !: GameObjects.Sprite[];
  constructor() {
    super({
      key: 'MenuScene'
    });
    this.map=new Map();
  }
  init() {
    this.map.init();
    this.units=[];
  }
  preload(): void {
    this.map.preload(this)
    this.load.tilemapTiledJSON("map", this.map.tilemapKey);
  }
  create(): void {
    this.map.createLevelWithTileMap(this);
    this.character = this.map.animatedTiles[0].tile;
    console.log(this.map.grid);
    console.log(this.character.x, this.character.y)
    this.inputHandler();
    this.grid = this.add.grid(32*15, 32*10,
      32*30, 32*20,
      32, 32,
      0, 0, 100, 0.05)
    this.grid.setScale(1)

  }
  update(time: number, delta: number): void {
    this.map.update(time, delta);
    // console.log(delta);
  }
  /*custom methods*/
  checkMouse(): void {
    let x = Math.round(this.input.mousePointer.x);
    let y = Math.round(this.input.mousePointer.y);
    console.log(x, y);
  }
  cursorPosition({ x, y } : Phaser.Input.Pointer) {
    let { gridMoveX, gridMoveY } = this.calculateGridPosition(x, y);

    if (this.sprite === undefined) {
      console.log(gridMoveX, gridMoveY)
      // this.add.sprite()
      // this.sprite = this.map.grid.copy(7, 9, 1, 1, gridMoveX, gridMoveY, undefined, "World")

      // this.text = this.make.text({ text: "hola mundo", x, y, style: { color: "black" } })
      // this.sprite = this.add.rectangle(gridMoveX, gridMoveY, 16, 16, 12)
     } else {
      console.log("xd");
      // console.log(this.sprite)

      // this.sprite.setDisplayOrigin(gridMoveX, gridMoveY)
      // this.sprite.x = gridMoveX;
      // this.sprite.y = gridMoveY;

    }
  }
  calculateGridPosition(x: number, y: number): {gridMoveX:number,gridMoveY:number} {
    let gridMoveX= (Math.floor(Math.floor(x)/32)*32)/32;
    let gridMoveY= (Math.floor(Math.floor(y)/32)*32)/32;
    // x = Math.round((Math.round(x) / 32));
    // y = Math.round((Math.round(y) / 32));
    return {gridMoveX,gridMoveY}
  }
  inputHandler(): void {
    this.input.keyboard.addKeys("UP,DOWN,RIGHT,LEFT");
    this.input.keyboard.on("keydown-A", () => {
      console.log('A presionado')
    })
    this.input.keyboard.on("keydown-LEFT", () => {
      console.log('LEFT presionado')
      this.character.pixelX -= 16;
    })
    this.input.keyboard.on("keydown-RIGHT", () => {
      console.log('RIGHT presionado')
      this.character.pixelX += 16;
    })
    this.input.keyboard.on("keydown-UP", () => {
      console.log('UP presionado')
      this.character.pixelY -= 16;
    })
    this.input.keyboard.on("keydown-DOWN", () => {
      console.log('UP presionado')
      this.character.pixelY += 16;
    })
    this.input.on('pointerdown', (e: any) => {
      if (e.button === 0) {
        // let { x, y } = e.position;
        // let { gridMoveX, gridMoveY } = this.calculateGridPosition(x, y)

      // console.log("left clickdown", e);
        // console.log(this);
        // let copyTile = this.map.grid.copy(7, 9, 1, 1, gridMoveX, gridMoveY, undefined, "World");

      }
    })
    this.input.on('pointerup', (e: Phaser.Input.Pointer) => {
      if (e.button === 0) {
        let { x, y } = e.position;
        let { gridMoveX, gridMoveY } = this.calculateGridPosition(x, y)
        let tile = this.data
        // console.log(tile);
        // console.log(this)
        // console.log(tile.setFlipX(!tile.flipX))
        console.log(gridMoveX, gridMoveY);
/*
        let unit = this.add.sprite(gridMoveX,gridMoveY,"animatedUnits");
        unit.setScale(2);
        unit.play("leftRun")
        this.units.push(unit);
*/      let aTile = this.map.grid.getTileAt(gridMoveX,gridMoveY);

        // aTile.alpha===1 ? aTile.alpha=0 : aTile.alpha=1
        if(aTile.alpha===1){
          aTile.alpha=0;
          let unit = this.add.sprite((gridMoveX*32)+12,(gridMoveY*32)+8,"animatedUnits");
          unit.setScale(2);
          unit.play("leftRun")
          this.units.push(unit);

        }else{
          aTile.alpha=1;
          this.units.forEach(unit=>{
            unit.destroy();
          });
          this.units = [];

        }
        console.log(aTile.alpha);
        // console.log(copyTile)
        // let text = this.make.text({ text: "hola mundo", x: gridMoveX, y: gridMoveY, style: { color: "black" } });
        // let sprite = this.make.tilemap({key:"map",width:48,height:432,tileWidth:16,tileHeight:16})
        //this.make.tileSprite({ x: gridMoveX+13, y: gridMoveY+13, key: "idleRed-tiles", width: 16, height: 16 }, true)


      }
      // console.log(e);
    })
    this.input.on('pointermove', (e: any) => {
      // this.cursorPosition(e);

    })

  }
}

