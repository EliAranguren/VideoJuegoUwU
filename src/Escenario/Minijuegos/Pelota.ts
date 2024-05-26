import { Sprite } from "pixi.js";
import { Fisica } from "../../Juego/Fisica";

export class Pelota extends Fisica {
    private pelota: Sprite = Sprite.from("pinchuda");

    constructor(){
        super();

        this.pelota.position.set (230,600);
		this.pelota.scale.set (0.8,0.8);

        this.addChild(this.pelota);
    }
}
