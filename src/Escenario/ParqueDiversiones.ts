import { Container, Texture, TilingSprite } from "pixi.js";
import { Alto, Ancho } from "..";

export class ParqueDiversiones extends Container{
    constructor(){
        super();
        /*const fondo: Sprite = Sprite.from("fondo");
        const piso: Sprite = Sprite.from("piso");
		const cerca: Sprite = Sprite.from("cerca");*/

		const piso = new TilingSprite (Texture.from ("piso"), Ancho*7, Alto);
        const fondo = new TilingSprite (Texture.from ("fondo"), Ancho*7, Alto);
        const cerca = new TilingSprite (Texture.from ("cerca"), Ancho*7, Alto);
		
		fondo.position.set (0,0);
		fondo.scale.set (0.7,0.7);
		piso.position.set (0,0);
		piso.scale.set (0.7,0.7);
		cerca.position.set (0,20);
		cerca.scale.set (0.671);
		//cerca.rotation = 0.015;

		this.addChild(piso,fondo,cerca);
    }
}