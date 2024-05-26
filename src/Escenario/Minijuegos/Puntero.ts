import { Graphics, Rectangle } from "pixi.js";
import { Fisica } from "../../Juego/Fisica";
import { Hitbox } from "../../Juego/Hitbox";

export class Puntero extends Fisica implements Hitbox {
    hitbox: Graphics;
    private mirilla = new Graphics();

    constructor(){
        super();

        this.mirilla.lineStyle(2, 0xFF0000); // Línea roja de grosor 2
        this.mirilla.drawCircle(0, 0, 20); // Círculo con radio 20
    
        this.mirilla.moveTo(-10, -10);// Dibujar la "X"
        this.mirilla.lineTo(10, 10);
        this.mirilla.moveTo(10, -10);
        this.mirilla.lineTo(-10, 10);
    
        this.mirilla.pivot.set(0, 0); // Hacer que el punto de referencia de la mirilla sea el centro del círculo
    
        //this.mirilla.position.set(120,360);
        this.velocidad.x = 0;
        this.velocidad.y = 0;

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x000000, 0.000001);
        this.hitbox.drawRect(0,0,15,15);
        this.hitbox.endFill();
        this.hitbox.position.set(-7.5,-7.5);

        this.addChild(this.mirilla);
        this.addChild(this.hitbox);
    }
    
    damelimites(): Rectangle {
        return this.hitbox.getBounds();
    }
}
