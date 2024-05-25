import { Container, Texture, TilingSprite } from "pixi.js";
import { sound } from "@pixi/sound";

export class ParqueDiversiones extends Container{
	
    constructor(){
        super();

		const piso = new TilingSprite (Texture.from ("piso"), 1280*10, 720*2); //el alto lo puse *2 porque si no me cortaba la mitad de las ilustraciones
        const fondo = new TilingSprite (Texture.from ("fondo"), 1280*10, 720*2); //el ancho es *10 para que cubra todo mi escenario
        const cerca = new TilingSprite (Texture.from ("cerca"), 1280*10, 720*2);
		
		fondo.position.set (0,0);
		fondo.scale.set (0.7,0.7);
		piso.position.set (0,0);
		piso.scale.set (0.7,0.7);
		cerca.position.set (0,20);
		cerca.scale.set (0.671);

		this.addChild(piso,fondo,cerca);
		sound.play("Circus", {loop:true, volume:0.2});
    }
}