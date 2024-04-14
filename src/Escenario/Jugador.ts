import { Container } from "pixi.js";
import { Actualizable } from "../Utilidades/Actualizable";
import { Alto, Ancho } from "..";
import { Prota } from "./Prota";

export class Jugador extends Container implements Actualizable{
    private jugable: Prota;

    constructor(){
        super();

        this.jugable = new Prota;
        this.addChild(this.jugable);
    }

    public update (variaciontiempo: number, variacionframes: number): void {
        this.jugable.update(variacionframes);
        const Dt= variaciontiempo / 1000;
        //this.jugable.x ++; //esto es movimiento en x
        this.jugable.update(Dt);
        if (this.jugable.x>Ancho){
            this.jugable.x = Ancho;
            this.jugable.velocidad.x = Math.abs(this.jugable.velocidad.x) * -1;
            this.jugable.scale.x = -1;
        } else if (this.jugable.x<0) {
            this.jugable.x = 0;
            this.jugable.velocidad.x = Math.abs(this.jugable.velocidad.x) ;
            this.jugable.scale.x = 1;
        }

        if (this.jugable.y > Alto){
            this.jugable.y = Alto;
        }
    }

}