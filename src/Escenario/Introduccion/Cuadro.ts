import { Container, Graphics } from "pixi.js";

export class Cuadro extends Container{
    cuadro: Graphics;

    constructor(){
        super();

        this.cuadro = new Graphics();
        this.cuadro.beginFill(0xFFFFFF, 0.3);
        this.cuadro.drawRect(0,0,1240,200);
        this.cuadro.endFill();
        this.cuadro.position.set(20,500);

        this.addChild (this.cuadro);
    }
}
