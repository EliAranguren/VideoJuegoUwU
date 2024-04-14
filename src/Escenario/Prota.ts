import { AnimatedSprite, Texture } from "pixi.js";
import { Fisica } from "./Fisica";

export class Prota extends Fisica {
    private susanimado: AnimatedSprite;
    private static readonly GRAVEDAD = 0.1;

    constructor(){
        super();

        this.susanimado = new AnimatedSprite(
            [
                Texture.from("1"),
                Texture.from("2"),
                Texture.from("3"),
                Texture.from("4"),
                Texture.from("5")
            ], 
            true //es decirle: si porfa reproducilo booleanamente
        );

        this.susanimado.play(); //RECORDAR METERLE PLAY
        this.susanimado.animationSpeed = 0.3;
        this.susanimado.anchor.set(1,1);
        this.susanimado.scale.set(0.3);

        this.velocidad.x = 5;
        this.velocidad.y = 0;
        this.aceleracion.y = Prota.GRAVEDAD;
        this.susanimado.tint = 0x909090;

        this.addChild(this.susanimado);
    }
}