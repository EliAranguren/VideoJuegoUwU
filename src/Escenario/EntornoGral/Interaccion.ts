import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { Hitbox } from "../../Juego/Hitbox";

export class Interaccion extends Container implements Hitbox{
    hitbox: Graphics;
    public espacio: Sprite = Sprite.from("space");

    constructor(){
        super();

        this.espacio.position.set(520,-50);
        this.espacio.scale.set(0.25);
        this.espacio.visible = false;

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x00FF00, 0.000001);
        this.hitbox.drawRect(0,0,2000,1000);
        this.hitbox.endFill();
        this.hitbox.position.set(-720,1500);

        this.espacio.addChild(this.hitbox);
        this.addChild(this.espacio);
    }

    public damelimites(): Rectangle{
        return this.hitbox.getBounds(); //me da la posicion del rectangle en coordenadas de la pantalla
    }
}