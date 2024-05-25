import { Container, Point } from "pixi.js";

export class Fisica extends Container {
    public velocidad: Point = new Point(); //esto no uso porque el pibe no salta por ahora
    public aceleracion: Point = new Point();

    public update(variacionseg:number){
        this.x += this.velocidad.x * variacionseg + 1/2 * this.aceleracion.x * Math.pow(variacionseg,2);
        this.y += this.velocidad.y * variacionseg + 1/2 * this.aceleracion.y * Math.pow(variacionseg,2);

        this.velocidad.y += this.aceleracion.y * variacionseg;
    }
}