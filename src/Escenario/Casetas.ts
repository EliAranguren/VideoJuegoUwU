import { Container, Sprite } from "pixi.js";

export class Casetas extends Container {

    constructor(){
        super();
        const caseta: Sprite = Sprite.from("tienda");

        caseta.position.set (50,230);
		caseta.scale.set (0.6,0.6);

        this.addChild(caseta);
    }
}