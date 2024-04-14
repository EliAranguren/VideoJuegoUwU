import { Container } from "pixi.js";
import { ParqueDiversiones } from "./ParqueDiversiones";
import { Jugador } from "../Jugador";

export class Escena extends Container {

    constructor() {
        super();
        const parque: ParqueDiversiones = new ParqueDiversiones();
        const sus: Jugador = new Jugador();
        sus.scale.set(0.3,0.3);

        this.addChild(parque);
        //this.addChild(sus);

        //const migrafico: Graphics = new Graphics();

    }
}