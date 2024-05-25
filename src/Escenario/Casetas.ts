import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { Hitbox } from "../Juego/Hitbox";

export class Casetas extends Container implements Hitbox{
    private caseta: Sprite = Sprite.from("tienda");
    hitbox: any;

    constructor(){
        super();

        this.caseta.position.set (10,230);
		this.caseta.scale.set (0.6,0.6);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF0000, 0.5);
        this.hitbox.drawRect(0,0,430,170);
        this.hitbox.endFill();
        this.hitbox.position.set(425,530);

        this.caseta.addChild(this.hitbox);
        this.addChild(this.caseta);
    }

    public damelimites(): Rectangle{

        return this.hitbox.getBounds(); //me da la posicion del rectangle en coordenadas de la pantalla
    }
}