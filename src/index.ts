import { Application, Container, Loader, Sprite } from 'pixi.js' //importa esas librerias: application nos da el stage, y sprite es una imagen

const app = new Application({ //Se crea una nueva instancia de PixiJS. Esta línea crea un objeto y toma otro de configuración como argumento
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	//view especifica el elemento HTMLCanvasElement que se utilizará como lienzo de renderizado para la aplicación PixiJS. 
	//En este caso, se busca un elemento con el id "pixi-canvas" en el documento HTML y se convierte en un elemento HTMLCanvasElement.
	resolution: window.devicePixelRatio || 1, //resolution especifica la relación entre píxeles físicos y píxeles lógicos en el lienzo de renderizado. 
	//Si window.devicePixelRatio está definido se utilizará como resolución. De lo contrario, se usará una resolución de 1.
	autoDensity: true, //indica si se debe ajustar automáticamente la densidad de píxeles para que coincida con la resolución del dispositivo. 
	//Cuando se establece en true, PixiJS ajustará automáticamente la densidad de píxeles 
	backgroundColor: 0xFF0000, //establece el color de fondo del lienzo de renderizado. En este caso, se establece en un color utilizando la notación hexadecimal.
	//pero se puede hacer con "color deseado" o con "rgb(0,0,0)"
	width: 600, //establece el ancho del lienzo de renderizado en píxeles.
	height: 700, //establece el alto del lienzo de renderizado en píxeles.
});

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

Loader.shared.add({url:"./la roca.jpeg", name: "sus"}); //lo que hace la biblioteca loader es precargar el archivo que querramos usar y de apso ponerle un nombre
Loader.shared.add({url:"./cowboy.jpg", name: "gorro"});

Loader.shared.onComplete.add(()=>{

	const therock: Sprite = Sprite.from("sus"); //Se crea un Sprite llamado "therock" utilizando el método estático from de la clase Sprite. 
	//Este método carga una textura de una imagen especificada por su ruta y la asigna al sprite.
	//llamo por su nombre asignado

	therock.x = 80; //establece el punto de anclaje del sprite "therock", en este caso en la esquinita
	therock.y = 120;//Esto significa que las transformaciones (como la rotación y la escala) se aplicarán en relación con este punto.

	therock.scale.x = 0.6;
	therock.scale.y = 0.6;

	//therock.rotation = -45;

	const hat: Sprite = Sprite.from("gorro");

	hat.position.set (-90,-150);

	hat.scale.set (0.6,0.6);
	
	const therockcowboy: Container = new Container();

	therockcowboy.addChild(therock); //Se agrega el sprite "therock" al contenedor principal de la aplicación PixiJS, que es el stage. 
	//Esto significa que el sprite será renderizado y visible en la aplicación.
	therockcowboy.addChild(hat);

	therockcowboy.scale.set(1.2,1.2);

	app.stage.addChild(therockcowboy);
})

Loader.shared.load();