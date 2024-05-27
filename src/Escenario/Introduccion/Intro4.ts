import { Container, Sprite } from "pixi.js";

export class Intro4 extends Container{
    private dulceHogar: Sprite = Sprite.from("inicio4");

    constructor(){
        super();
        
		this.dulceHogar.position.set (0,0);
		this.dulceHogar.scale.set (0.67,0.67);

        this.addChild(this.dulceHogar);
    }
}