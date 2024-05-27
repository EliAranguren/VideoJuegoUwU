import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { Hitbox } from "../Juego/Hitbox";
import { Interaccion } from "./Interaccion";

export class Casetas extends Container implements Hitbox{
    private caseta: Sprite = Sprite.from("tienda");
    hitbox:Graphics;
    public aura = new Interaccion();

    constructor(){
        super();
        
        this.caseta.position.set (10,230);
		this.caseta.scale.set (0.6,0.6);

        this.aura = new Interaccion();
        this.aura.position.set (50,150);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x00FF00, 0.000001);
        this.hitbox.drawRect(0,0,430,170);
        this.hitbox.endFill();
        this.hitbox.position.set(425,530);

        this.caseta.addChild(this.hitbox, this.aura);
        this.addChild(this.caseta);
    }

    public damelimites(): Rectangle{

        return this.hitbox.getBounds(); //me da la posicion del rectangle en coordenadas de la pantalla
    }
}