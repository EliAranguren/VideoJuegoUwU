import { Container } from "pixi.js";
import { ParqueDiversiones } from "./ParqueDiversiones";
import { Casetas } from "./Casetas";
import { Escondite } from "./Escondite";
import { Faro } from "./Faro";

export class Escena extends Container {
    constructor() {
        super();
        const parque: ParqueDiversiones = new ParqueDiversiones();
        const tienda: Casetas = new Casetas();
        const basura: Escondite = new Escondite();
        const luz: Faro = new Faro();

        this.addChild(parque, tienda, basura, luz);
    }
}