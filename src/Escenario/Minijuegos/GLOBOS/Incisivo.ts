import { AnimatedSprite, Texture } from "pixi.js";
import { Fisica } from "../../../Juego/Fisica";

export class Incisivo extends Fisica {

    private Diente: AnimatedSprite;

    constructor(){
        super();

        this.Diente = new AnimatedSprite(
            [
                Texture.from("Incisivo1.4"),
                Texture.from("Incisivo1.5"),
                Texture.from("Incisivo1.6"),
            ], 
            true //es decirle: si porfa reproducilo booleanamente
        );

        this.Diente.play(); //RECORDAR METERLE PLAY
        this.Diente.animationSpeed = 0.05;
        this.Diente.anchor.set(0.5,1);
        this.Diente.scale.set(0.55);
        this.Diente.position.set (400,300);

        this.velocidad.x = 0;
        this.velocidad.y = 0;
        this.Diente.tint = 0x909090;

        this.addChild(this.Diente);
    }
}