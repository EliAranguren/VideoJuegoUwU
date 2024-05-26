import { Graphics, Rectangle, Sprite } from "pixi.js";
import { Fisica } from "../../../Juego/Fisica";
import { Hitbox } from "../../../Juego/Hitbox";

export class Vasos2 extends Fisica implements Hitbox {
    hitbox: Graphics;
    private v2: Sprite = Sprite.from("vasos2");

    constructor(){
        super();

        this.v2.position.set (600,180);
		this.v2.scale.set (0.5,0.5);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x0000FF, 0.000001);
        this.hitbox.drawRect(0,0,305,120);
        this.hitbox.endFill();
        this.hitbox.position.set(20,225);

        this.velocidad.x = 0;
        this.velocidad.y = 0;

        this.addChild(this.v2);
        this.v2.addChild(this.hitbox);
    }
    
    public damelimites(): Rectangle{
        return this.hitbox.getBounds(); //me da la posicion del rectangle en coordenadas de la pantalla
    }
}
