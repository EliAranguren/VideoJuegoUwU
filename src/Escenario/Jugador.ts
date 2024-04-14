import { AnimatedSprite, Container, Texture} from "pixi.js";
import { Actualizable } from "../Utilidades/Actualizable";
import { Fisica } from "./Fisica";
import { Alto, Ancho } from "..";

export class Jugador extends Container implements Actualizable{

    private susanimado: AnimatedSprite;
    private fisicaJug: Fisica;

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

        this.fisicaJug = new Fisica();
        this.addChild(this.fisicaJug);

        this.fisicaJug.velocidad.x = 200;
        this.fisicaJug.velocidad.y = 0;
        this.fisicaJug.aceleracion.y = 200;
        this.susanimado.tint = 0x909090;

        this.fisicaJug.addChild(this.susanimado);
    }

    public update (variaciontiempo: number, variacionframes: number): void {
        this.susanimado.update(variacionframes);
        const Dt= variaciontiempo / 1000;
        //this.susanimado.x ++; //esto es movimiento en x
        this.fisicaJug.update(Dt);
        if (this.fisicaJug.x>Ancho){
            this.fisicaJug.x = Ancho;
            this.fisicaJug.velocidad.x = Math.abs(this.fisicaJug.velocidad.x) * -1;
            this.fisicaJug.scale.x = -1;
        } else if (this.fisicaJug.x<0) {
            this.fisicaJug.x = 0;
            this.fisicaJug.velocidad.x = Math.abs(this.fisicaJug.velocidad.x) ;
            this.fisicaJug.scale.x = 1;
        }

        if (this.fisicaJug.y > Alto){
            this.fisicaJug.y = Alto;
        }
    }

}