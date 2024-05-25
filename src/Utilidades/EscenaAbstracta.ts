import { Container } from "pixi.js";

export abstract class EscenaAbstracta extends Container { //es como para crear una nueva clasificacion
    public abstract actualizar(variacionframes:number, variaciontiempo?:number): void

}