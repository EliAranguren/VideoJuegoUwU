import { Graphics, Rectangle, Sprite } from "pixi.js";
import { Fisica } from "../../../Juego/Fisica";
import { Hitbox } from "../../../Juego/Hitbox";

export class Vasos3 extends Fisica implements Hitbox {
    private v3: Sprite = Sprite.from("vasos3");
    hitbox1: Graphics;

    constructor(){
        super();

        this.v3.position.set (450,400);
		this.v3.scale.set (0.5,0.5);

        this.hitbox1 = new Graphics();
        this.hitbox1.beginFill(0x0000FF, 0.000001);
        this.hitbox1.drawRect(0,0,202,120);
        this.hitbox1.endFill();
        this.hitbox1.position.set(22,115);

        this.velocidad.x = 0;
        this.velocidad.y = 0;

        this.addChild(this.v3);
        this.v3.addChild(this.hitbox1);
    }
    
    public damelimites(): Rectangle{
        return this.hitbox1.getBounds(); //me da la posicion del rectangle en coordenadas de la pantalla
    }
}
