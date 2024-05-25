import { Application, Loader, Ticker } from 'pixi.js'; //importa esas librerias: application nos da el stage, y sprite es una imagen
import { assets } from './assets';
//import { UIdemo } from './Juego/UIdemo';
import { Teclado } from './Utilidades/Teclado';
import { Jugador } from './Escenario/Jugador';

export const Alto = 720;
export const Ancho = 1280;
const app = new Application({ //Se crea una nueva instancia de PixiJS. Esta línea crea un objeto y toma otro de configuración como argumento
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	//view especifica el elemento HTMLCanvasElement que se utilizará como lienzo de renderizado para la aplicación PixiJS. 
	//En este caso, se busca un elemento con el id "pixi-canvas" en el documento HTML y se convierte en un elemento HTMLCanvasElement.
	resolution: window.devicePixelRatio || 1, //resolution especifica la relación entre píxeles físicos y píxeles lógicos en el lienzo de renderizado. 
	//Si window.devicePixelRatio está definido se utilizará como resolución. De lo contrario, se usará una resolución de 1.
	autoDensity: true, //indica si se debe ajustar automáticamente la densidad de píxeles para que coincida con la resolución del dispositivo. 
	//Cuando se establece en true, PixiJS ajustará automáticamente la densidad de píxeles 
	backgroundColor: 0x000000, //establece el color de fondo del lienzo de renderizado. En este caso, se establece en un color utilizando la notación hexadecimal.
	//pero se puede hacer con "color deseado" o con "rgb(0,0,0)"
	width: Ancho, //establece el ancho del lienzo de renderizado en píxeles.
	height: Alto, //establece el alto del lienzo de renderizado en píxeles.
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

Loader.shared.add(assets);

Loader.shared.onComplete.add(()=>{
	//const uidemo = new UIdemo();
	//app.stage.addChild(uidemo);

	const jugadorticker = new Jugador();
	app.stage.addChild(jugadorticker);
	Ticker.shared.add(function(variacionframes){
		jugadorticker.update(Ticker.shared.deltaMS, variacionframes);
	})
});

Loader.shared.load();