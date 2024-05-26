import { Sprite } from "pixi.js";
import { Fisica } from "../../../Juego/Fisica";

export class Piedra extends Fisica {
    private piedra: Sprite = Sprite.from("piedra");

    constructor(){
        super();

        this.piedra.position.set (230,630);
		this.piedra.scale.set (0.9,0.9);

        this.addChild(this.piedra);
    }
}
