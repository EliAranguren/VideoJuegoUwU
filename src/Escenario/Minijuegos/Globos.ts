import { Graphics, Rectangle, Sprite } from "pixi.js";
import { Fisica } from "../../Juego/Fisica";
import { Hitbox } from "../../Juego/Hitbox";

export class Globos extends Fisica implements Hitbox {
    hitbox: any;
    private gl1: Sprite = Sprite.from("globo1");
    //private gl2: Sprite = Sprite.from("globo2");
    //private gl3: Sprite = Sprite.from("globo3");

    constructor(){
        super();

        this.gl1.position.set (230,160);
		this.gl1.scale.set (0.75,0.75);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x000000, 0.000001);
        this.hitbox.drawRect(0,0,142,150);
        this.hitbox.endFill();
        this.hitbox.position.set(20,15);

        this.addChild(this.gl1);
        this.gl1.addChild(this.hitbox);
    }
    
    public damelimites(): Rectangle{
        return this.hitbox.getBounds(); //me da la posicion del rectangle en coordenadas de la pantalla
    }
}
