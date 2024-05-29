import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { Hitbox } from "../../Juego/Hitbox";

export class Faro extends Container implements Hitbox{
    hitbox: any;
    private faro: Sprite = Sprite.from("luz");

    constructor(){
        super();
        
        this.faro.position.set (200,-60);
		this.faro.scale.set (0.8,0.8);
        this.faro.rotation = 0.04;

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x000000, 0.000001);
        this.hitbox.drawRect(0,0,50,40);
        this.hitbox.endFill();
        this.hitbox.position.set(280,770);

        this.addChild(this.faro);
        this.faro.addChild(this.hitbox);
    }

    public damelimites(): Rectangle{

        return this.hitbox.getBounds(); //me da la posicion del rectangle en coordenadas de la pantalla
    }
}