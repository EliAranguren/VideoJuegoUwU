import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { Hitbox } from "../Juego/Hitbox";

export class Escondite extends Container implements Hitbox{
    hitbox: any;
    private escondite: Sprite = Sprite.from("basura");

    constructor(){
        super();
        
        this.escondite.position.set (800,430);
		this.escondite.scale.set (0.6,0.6);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF0000, 0.5);
        this.hitbox.drawRect(0,0,350,150);
        this.hitbox.endFill();
        this.hitbox.position.set(180,200);

        this.escondite.addChild(this.hitbox);
        this.addChild(this.escondite);
    }

    public damelimites(): Rectangle{

        return this.hitbox.getBounds(); //me da la posicion del rectangle en coordenadas de la pantalla
    }
}