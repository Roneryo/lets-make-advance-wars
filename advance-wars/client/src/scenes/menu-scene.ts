import 'phaser';
import { AnimatedTile } from '../utils/AnimatedTile';
import { TilesetTileData } from '../utils/AnimatedTile';
import { TileAnimationData } from '../utils/AnimatedTile';

export class MenuScene extends Phaser.Scene {
  private tilemapKey!: string;
  private tilesetKey!: string;
  private animatedTiles!: AnimatedTile[];
  constructor() {
    super({
      key: 'MenuScene'
    });
  }
  init() {
    this.tilemapKey = "../../assets/tilemaps/customMap.json";
    this.tilesetKey = "../../assets/tilesets";
    this.animatedTiles = [];
  }
  preload(): void {
    this.load.image('dessert-tiles', `${this.tilesetKey}/DESSERT3.png`);
    this.load.image('sea-tiles', `${this.tilesetKey}/MAR2.png`);
    this.load.image('idleRed-tiles', `${this.tilesetKey}/IdleRed.png`);
    this.load.image('animated', `${this.tilesetKey}/AnimatedUnits.png`);
    this.load.tilemapTiledJSON("map", this.tilemapKey);
  }

  create(): void {
    // const tilemap = this.make.tilemap({ key: this.tilemapKey });
    // this.createLevelWithGrid();
    this.createLevelWithTileMap();

  }

  update(time: number, delta: number): void {
    // this.checkMouse();
    if (this.input.mousePointer.leftButtonDown()) {
      console.log('se Clickeo')
    }
    this.animatedTiles.forEach(tile => tile.update(delta));
  }

  /*custom methods*/
  checkMouse(): void {
    let x = Math.round(this.input.mousePointer.x);
    let y = Math.round(this.input.mousePointer.y);
    console.log(x, y);
  }
  //nivel por grid
  createLevelWithGrid(): void {
    const level = [
      [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
      [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
      [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
      [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
      [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
      [33, 12, 14, 14, 13, 33, 33, 33, 33, 33, 33],
      [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
      [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
      [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
      [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
      [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
    ];
    const map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16, height: 30, width: 30 });
    const tiles = map.addTilesetImage("dessert-tiles");
    const layer = map.createLayer(0, tiles, 0, 0);
    layer.setScale(2.5, 2.5);
  }
  createLevelWithTileMap(): void {
    const map = this.make.tilemap({ key: "map" });
    console.log(map);
    const dessert_tilesets = map.addTilesetImage("DESSERT2", "dessert-tiles");
    const sea_tilesets = map.addTilesetImage("MAR2", "sea-tiles");
    const idleSprites_tilesets = map.addTilesetImage("IdleRed", "idleRed-tiles");

    const animatedTile = map.tilesets[3];
    console.log(animatedTile);

    const ground = map.createLayer(0, dessert_tilesets, 0, 0)
    const sea = map.createLayer(4, sea_tilesets, 0, 0)

    const tree = map.createLayer(1, dessert_tilesets, 0, 0)
    const mountain = map.createLayer(2, dessert_tilesets, 0, 0)
    const mountain2 = map.createLayer(3, dessert_tilesets, 0, 0)

    const idleSprites = map.createLayer(5, idleSprites_tilesets, 0, 0)

    idleSprites.setScale(2)
    mountain.setScale(2)
    mountain2.setScale(2)
    ground.setScale(2)
    sea.setScale(2)
    tree.setScale(2)
    // console.log(ground);
    // console.log(sea);
    // const tileData = idleSprites_tilesets.tileData as TilesetTileData;
    this.makeTileAnimations(idleSprites_tilesets, map)
    this.makeTileAnimations(sea_tilesets, map)

  }
  makeTileAnimations(tileSet: Phaser.Tilemaps.Tileset, map: Phaser.Tilemaps.Tilemap): void {
    const tileData = tileSet.tileData as TilesetTileData
    for (let tileid in tileData) {
      map.layers.forEach(layer => {
        // if (layer.tilemapLayer===null  || layer.tilemapLayer.type === "StaticTilemapLayer"  ) return;
        layer.data.forEach(tileRow => {
          tileRow.forEach(tile => {
            if (tile.index - tileSet.firstgid === parseInt(tileid, 10)) {
              this.animatedTiles.push(
                new AnimatedTile(
                  tile,
                  tileData[tileid].animation as TileAnimationData,
                  tileSet.firstgid
                )
              );
            }
          });
        });
      });
    }
  }
}

