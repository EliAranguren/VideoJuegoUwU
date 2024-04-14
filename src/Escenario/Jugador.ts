import { AnimatedSprite, Container, Texture} from "pixi.js";
import { Actualizable } from "../Utilidades/Actualizable";

export class Jugador extends Container implements Actualizable{
    constructor(){
        super();
        const susanimado: AnimatedSprite = new AnimatedSprite(
            [
                Texture.from("1"),
                Texture.from("2"),
                Texture.from("3"),
                Texture.from("4"),
                Texture.from("5")
            ], 
            true //es decirle: si porfa reproducilo booleanamente
        );

        susanimado.play(); //RECORDAR METERLE PLAY
        susanimado.animationSpeed = 0.5;
        this.addChild(susanimado);
    }
    public update (_variaciontiempo: number, variacionframes?: number | undefined): void {
        this.susanimado.update(variacionframes);
    }

}