import { Container, Sprite } from "pixi.js";

export class Carpa extends Container{
    private fondo: Sprite = Sprite.from("marco");
	
    constructor(){
        super();
		
		this.fondo.position.set (0,0);
		this.fondo.scale.set (0.67,0.67);

		this.addChild(this.fondo);
    }
}