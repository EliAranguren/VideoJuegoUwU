import { Container, Texture, TilingSprite } from "pixi.js";
import { Alto, Ancho } from "..";

export class ParqueDiversiones extends Container{
	
    constructor(){
        super();
        /*const fondo: Sprite = Sprite.from("fondo");
        const piso: Sprite = Sprite.from("piso");
		const cerca: Sprite = Sprite.from("cerca");*/

		const piso = new TilingSprite (Texture.from ("piso"), Ancho*10, Alto*2); //el alto lo puse *2 porque si no me cortaba la mitad de las ilustraciones
        const fondo = new TilingSprite (Texture.from ("fondo"), Ancho*10, Alto*2); //el ancho es *10 para que cubra todo mi escenario
        const cerca = new TilingSprite (Texture.from ("cerca"), Ancho*10, Alto*2);
		
		fondo.position.set (0,0);
		fondo.scale.set (0.7,0.7);
		piso.position.set (0,0);
		piso.scale.set (0.7,0.7);
		cerca.position.set (0,20);
		cerca.scale.set (0.671);

		this.addChild(piso,fondo,cerca);
    }
}