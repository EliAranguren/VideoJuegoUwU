import { AnimatedSprite, Graphics, Rectangle, Texture } from "pixi.js";
import { Fisica } from "../Juego/Fisica";
import { Hitbox } from "../Juego/Hitbox";

export class Prota extends Fisica implements Hitbox {
    private susanimado: AnimatedSprite;
    private static readonly GRAVEDAD = 0;
    AnimatedSprite: any;
    private hitbox: Graphics;

    constructor(){
        super();

        this.susanimado = new AnimatedSprite(
            [
                Texture.from("1"),
                Texture.from("2"),
                Texture.from("3"),
                Texture.from("4")
            ], 
            true //es decirle: si porfa reproducilo booleanamente
        );

        this.susanimado.play(); //RECORDAR METERLE PLAY
        this.susanimado.animationSpeed = 0.1;
        this.susanimado.anchor.set(0.5,1);
        this.susanimado.scale.set(0.55);

        this.velocidad.x = 0;
        this.velocidad.y = 0;
        this.aceleracion.y = Prota.GRAVEDAD;
        this.susanimado.tint = 0x909090;

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF0000, 0.5);
        this.hitbox.drawRect(0,0,220,50);
        this.hitbox.endFill();
        this.hitbox.position.set(-90,-60);

        this.addChild(this.susanimado);
        this.susanimado.addChild(this.hitbox);
    }

    public damelimites(): Rectangle{

        return this.hitbox.getBounds(); //me da la posicion del rectangle en coordenadas de la pantalla
    }
}