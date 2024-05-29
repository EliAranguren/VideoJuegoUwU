import { AnimatedSprite, Texture } from "pixi.js";
import { Fisica } from "../../Juego/Fisica";

export class RatonPerez extends Fisica{

    public Perez: AnimatedSprite;

    constructor(){
        super();

        this.Perez = new AnimatedSprite(
            [
                Texture.from("RT1"),
                Texture.from("RT2"),
                Texture.from("RT3"),
                Texture.from("RT4")
            ], 
            true //es decirle: si porfa reproducilo booleanamente
        );

        this.Perez.play(); //RECORDAR METERLE PLAY
        this.Perez.animationSpeed = 0.15;
        this.Perez.anchor.set(0.5,1);
        this.Perez.scale.set(0.55);

        this.velocidad.x = 0;
        this.velocidad.y = 0;
        //this.Perez.tint = 0x909090;

        this.addChild(this.Perez);
    }

    public stopAnimation(): void { // metodos para controlar la animación
        this.Perez.stop();
    }    
    public playAnimation(): void {
        this.Perez.play();
    }   
    public setStaticFrame(frameIndex: number): void {
        this.Perez.gotoAndStop(frameIndex);
    }
}