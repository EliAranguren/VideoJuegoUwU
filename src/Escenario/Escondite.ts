import { Container, Sprite } from "pixi.js";

export class Escondite extends Container {

    constructor(){
        super();
        const escondite: Sprite = Sprite.from("basura");

        escondite.position.set (800,430);
		escondite.scale.set (0.6,0.6);

        this.addChild(escondite);
    }
}