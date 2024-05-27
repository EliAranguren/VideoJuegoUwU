import { Application, Ticker } from "pixi.js";
import { Teclado } from "./Teclado";
import { EscenaAbstracta } from "./EscenaAbstracta";
import { Group } from "tweedle.js";

export namespace ManagerEscenas {

    export const Alto = 720;
    export const Ancho = 1280;
    
    let escenaActual: EscenaAbstracta;
    let app: Application;

    export function iniciado(){

        if(app != undefined){
            return;
        }

        app = new Application({ //Se crea una nueva instancia de PixiJS. Esta línea crea un objeto y toma otro de configuración como argumento
        	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	        resolution: window.devicePixelRatio || 1,
	        autoDensity: true, 
	        backgroundColor: 0x000000, 
	        width: Ancho,
	        height: Alto, 
        });

        Teclado.iniciado();

        window.addEventListener("resize", ()=>{ //que si se cambia el tamaño...
	        console.log("se resizeo"); //avisa

	        const X = window.innerWidth / app.screen.width; //valor x calculado
	        const Y = window.innerHeight / app.screen.height; //lo mismo pero con y
	        const escala =Math.min(X,Y);

	        const ancho = Math.round(app.screen.width * escala); //se calcula el tamaño del juego para adaptarlo
	        const alto = Math.round(app.screen.height * escala); //math.round es para que redondee el valor

	        const horizontal = Math.floor((window.innerWidth - ancho) /2); //se supone que es el espacio libre que queda entre la ventana y el juego
	        const vertical = Math.floor((window.innerHeight - alto)/2); //dividimos en 2 para repartir a los 2 lados

	        app.view.style.width = ancho + "px"; //hizo otra cosa que tampoco se jsjs
	        app.view.style.height = alto + "px";

	        app.view.style.marginLeft = horizontal + "px"; // puso los margenes todo alrededor para que quede centrado
	        app.view.style.marginRight = horizontal + "px";

	        app.view.style.marginTop = vertical + "px";
	        app.view.style.marginBottom = vertical + "px";
        });
        
        window.dispatchEvent(new Event("resize")); //obliga la funcion resize
        Ticker.shared.add(actualizar);
    }

    export function cambiarEscena (laNueva:EscenaAbstracta){ 
        if (escenaActual){ //tiene que destruir la escena anterior 

            escenaActual.destroy();
        }
        escenaActual = laNueva; //creo una nueva escena que va a pasar a ser la actual
        app.stage.addChild(laNueva); //la muestro
        if (escenaActual === laNueva){
            console.log("La escena actual es la nueva papirrium");
        }
    }

    function actualizar(framepas:number){
        Group.shared.update();
        escenaActual?.actualizar(Ticker.shared.elapsedMS, framepas); //eta no anda
        console.log("entro");
    }
}