import { Container } from "pixi.js";

export class UIdemo extends Container {
    constructor(){
        super();

        document.addEventListener("keydown",this.teclapresionada.bind (this));
        document.addEventListener("keyup",this.teclasoltada.bind (this));
    
    }

    private teclapresionada(evento:KeyboardEvent):void {
            console.log("Se presiono una tecla!",evento.code);
        }

    private teclasoltada(evento:KeyboardEvent):void {
        console.log("Se solto una tecla!",evento.code);
    }
    
}