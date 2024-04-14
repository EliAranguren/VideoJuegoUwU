import { Container } from "pixi.js";
import { ParqueDiversiones } from "./ParqueDiversiones";

export class Escena extends Container {
    constructor() {
        super();
        const parque: ParqueDiversiones = new ParqueDiversiones();

        this.addChild(parque);
    }
}