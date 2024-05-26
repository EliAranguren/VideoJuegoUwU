import { Container, Graphics, Sprite } from "pixi.js";

export class Carpa extends Container{
    private fondo: Sprite = Sprite.from("marco");
    hueco: Graphics;
	
    constructor(){
        super();
		
		this.fondo.position.set (0,0);
		this.fondo.scale.set (0.67,0.67);

        this.hueco = new Graphics();
        this.hueco.beginFill(0x000000);
        this.hueco.drawRect(0,0,785,395);
        this.hueco.endFill();
        this.hueco.position.set(230,160);

		this.addChild(this.fondo, this.hueco);
    }
}