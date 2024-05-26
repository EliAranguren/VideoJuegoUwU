import { Graphics, Rectangle, Sprite } from "pixi.js";
import { Fisica } from "../../../Juego/Fisica";
import { Hitbox } from "../../../Juego/Hitbox";

export class Vasos1 extends Fisica implements Hitbox {
    hitbox: any;
    private v1: Sprite = Sprite.from("vasos1");

    constructor(){
        super();

        this.v1.position.set (230,160);
		this.v1.scale.set (0.5,0.5);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x0000FF, 0.000001);
        this.hitbox.drawRect(0,0,415,120);
        this.hitbox.endFill();
        this.hitbox.position.set(20,335);

        this.velocidad.x = 0;
        this.velocidad.y = 0;

        this.addChild(this.v1);
        this.v1.addChild(this.hitbox);
    }
    
    public damelimites(): Rectangle{
        return this.hitbox.getBounds(); //me da la posicion del rectangle en coordenadas de la pantalla
    }
}
