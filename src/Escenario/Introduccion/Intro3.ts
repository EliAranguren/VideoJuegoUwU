import { Container, Sprite } from "pixi.js";

export class Intro3 extends Container{
    private trabajo: Sprite = Sprite.from("inicio3");

    constructor(){
        super();
        
		this.trabajo.position.set (0,0);
		this.trabajo.scale.set (0.67,0.67);

        this.addChild(this.trabajo);
    }
}