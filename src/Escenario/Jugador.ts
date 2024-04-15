import { Container } from "pixi.js";
import { Actualizable } from "../Utilidades/Actualizable";
import { Alto, Ancho } from "..";
import { Prota } from "./Prota";
import { Teclado } from "../Utilidades/Teclado";

export class Jugador extends Container implements Actualizable{
    private protagonista: Prota;

    constructor(){
        super();

        this.protagonista = new Prota;
        this.addChild(this.protagonista);
    }

    public update (variaciontiempo: number, variacionframes: number): void {
        this.protagonista.update(variacionframes);
        const Dt= variaciontiempo / 1000;
        this.protagonista.update(Dt);

        if (Teclado.state.get("ArrowLeft")){ //creo los movimientos de izquierda y derecha
            this.protagonista.velocidad.x = -10;
            this.protagonista.scale.x = -1;
        } else if (Teclado.state.get("ArrowRight")) {
            this.protagonista.velocidad.x = 10;
            this.protagonista.scale.x = 1;
        } else {
            this.protagonista.velocidad.x = 0;
        }

        if (Teclado.state.get("ArrowUp")){ //creo los moviminetos de arriba y abajo
            this.protagonista.velocidad.y = -10;
        } else if (Teclado.state.get("ArrowDown")) {
            this.protagonista.velocidad.y = 10;
        } else {
            this.protagonista.velocidad.y = 0;
        }


        if (this.protagonista.x > Ancho){ //delimito los bordes horizontales de la pantalla
            this.protagonista.x = Ancho;
        } else if (this.protagonista.x < 0) {
            this.protagonista.x = 0;
        } 

        if (this.protagonista.y > Alto){ //delimito los bordes verticales correspondientes al piso
            this.protagonista.y = Alto;
        } else if (this.protagonista.y < (Alto-130)){
            this.protagonista.y = (Alto-130);
        }
    }

}