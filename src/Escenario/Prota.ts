import { AnimatedSprite, Graphics, ObservablePoint, Rectangle, Texture } from "pixi.js";
import { Fisica } from "../Juego/Fisica";
import { Hitbox } from "../Juego/Hitbox";

export class Prota extends Fisica implements Hitbox {

    private susanimado: AnimatedSprite;
    //private static readonly GRAVEDAD = 0;
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
        //this.aceleracion.y = Prota.GRAVEDAD;
        //this.susanimado.tint = 0x909090;

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

    /*public separar(sobreposicion: Rectangle, objeto: ObservablePoint<any>) {
        if (sobreposicion.width < sobreposicion.height) { //cuando la sobreposicion sea mas notable en la altura, corrijo anchura
            if (this.x > objeto.x){
                this.x += sobreposicion.width; //limita derecha si es +, izquierda si es -
            } else if (this.x < objeto.x){
                this.x -= sobreposicion.width; // se supone que limita izquierda
            }
                
        } else {
            if (this.y > objeto.y){
                this.y += sobreposicion.height; //si es - limita arriba, si es + limita abajo
            } else if (this.y < objeto.y){
                this.y += sobreposicion.height; //se supone que limita abajo
            }
        }
    }*/

    public separar(sobreposicion: Rectangle, objeto: ObservablePoint<any>) {
        if (sobreposicion.width < sobreposicion.height) {
            if (this.x > objeto.x) {
                this.x += sobreposicion.width;
            } else {
                this.x -= sobreposicion.width;
            }
        } else {
            if (this.y > objeto.y) {
                this.y += sobreposicion.height;
            } else {
                this.y -= sobreposicion.height;
            }
        }
    }

    public stopAnimation(): void { // metodos para controlar la animación
        this.susanimado.stop();
    }    
    public playAnimation(): void {
        this.susanimado.play();
    }   
    public setStaticFrame(frameIndex: number): void {
        this.susanimado.gotoAndStop(frameIndex);
    }
}