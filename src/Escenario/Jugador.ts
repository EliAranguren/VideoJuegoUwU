import { AnimatedSprite, Container, Texture} from "pixi.js";
import { Actualizable } from "../Utilidades/Actualizable";

export class Jugador extends Container implements Actualizable{

    private susanimado: AnimatedSprite;

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
        this.susanimado.scale.set(0.3);
        this.addChild(this.susanimado);   
    }

    public update (_variaciontiempo: number, variacionframes: number): void {
        this.susanimado.update(variacionframes);
        //this.susanimado.x ++; //esto es movimiento en x
    }

}