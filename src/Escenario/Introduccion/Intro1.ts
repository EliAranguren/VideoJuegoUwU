import { AnimatedSprite, Container, Texture } from "pixi.js";

export class Intro1 extends Container{
    escuela: AnimatedSprite;

    constructor(){
        super();
        
        this.escuela = new AnimatedSprite(
            [
                Texture.from("inicio1.1"), //perdon no me quedaba otra y quiero que se vea lindo
                Texture.from("inicio1.1"),
                Texture.from("inicio1.1"),
                Texture.from("inicio1.1"),
                Texture.from("inicio1.1"),
                Texture.from("inicio1.1"),
                Texture.from("inicio1.2"),
                Texture.from("inicio1.2"),
                Texture.from("inicio1.2"),
                Texture.from("inicio1.2"),
                Texture.from("inicio1.2"),
                Texture.from("inicio1.2"),
                Texture.from("inicio1.3"),
            ], 
            true //es decirle: si porfa reproducilo booleanamente
        );

        this.escuela.play(); //RECORDAR METERLE PLAY
        this.escuela.animationSpeed = 0.02;

		this.escuela.position.set (0,0);
		this.escuela.scale.set (0.67,0.67);

        this.addChild(this.escuela);
    }
}