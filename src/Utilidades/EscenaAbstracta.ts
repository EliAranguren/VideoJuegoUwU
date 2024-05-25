import { Container } from "pixi.js";

export abstract class EscenaAbstracta extends Container { //es como para crear una nueva clasificacion
    //pero solo extiende a las demas que son de tipo escena
    public abstract actualizar(variacionframes:number, variaciontiempo?:number): void
}