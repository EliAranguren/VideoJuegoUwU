import { AnimatedSprite, Container, Texture } from "pixi.js";

export class Intro5 extends Container{
    pesadilla: AnimatedSprite;

    constructor(){
        super();
        
        this.pesadilla = new AnimatedSprite(
            [//perdon no me quedaba otra y quiero que se vea lindo
                Texture.from("pesadilla2"),
                Texture.from("pesadilla2"),
                Texture.from("pesadilla2"),
                Texture.from("pesadilla2"),
                Texture.from("pesadilla1"),
                Texture.from("pesadilla1"),
                Texture.from("pesadilla2"),
                Texture.from("pesadilla2"),
                Texture.from("pesadilla2"),
                Texture.from("pesadilla2"),
                Texture.from("pesadilla2"),
                Texture.from("pesadilla4"),
                Texture.from("pesadilla3"),
                Texture.from("pesadilla3"),
                Texture.from("pesadilla3"),    
            ], true
        );

        this.pesadilla.play(); //RECORDAR METERLE PLAY
        this.pesadilla.animationSpeed = 0.017;

		this.pesadilla.position.set (0,0);
		this.pesadilla.scale.set (0.67,0.67);

        this.addChild(this.pesadilla);
    }

    reseteo(): void {
        this.pesadilla.stop();
        this.pesadilla.gotoAndStop(0);
        this.pesadilla.play();
    }
}