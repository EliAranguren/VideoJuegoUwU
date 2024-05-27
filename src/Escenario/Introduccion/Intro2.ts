import { Container, Sprite } from "pixi.js";

export class Intro2 extends Container{
    private caja: Sprite = Sprite.from("inicio2");

    constructor(){
        super();
        
		this.caja.position.set (0,0);
		this.caja.scale.set (0.67,0.67);

        this.addChild(this.caja);
    }
}