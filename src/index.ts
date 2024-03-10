import { Application, Sprite } from 'pixi.js' //importa esas librerias: application nos da el stage, y sprite es una imagen

const app = new Application<HTMLCanvasElement>({ //Se crea una nueva instancia de PixiJS. Esta línea crea un objeto y toma otro de configuración como argumento
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	//view especifica el elemento HTMLCanvasElement que se utilizará como lienzo de renderizado para la aplicación PixiJS. 
	//En este caso, se busca un elemento con el id "pixi-canvas" en el documento HTML y se convierte en un elemento HTMLCanvasElement.
	resolution: window.devicePixelRatio || 1, //resolution especifica la relación entre píxeles físicos y píxeles lógicos en el lienzo de renderizado. 
	//Si window.devicePixelRatio está definido se utilizará como resolución. De lo contrario, se usará una resolución de 1.
	autoDensity: true, //indica si se debe ajustar automáticamente la densidad de píxeles para que coincida con la resolución del dispositivo. 
	//Cuando se establece en true, PixiJS ajustará automáticamente la densidad de píxeles 
	backgroundColor: 0x6495ed, //establece el color de fondo del lienzo de renderizado. En este caso, se establece en un color azul utilizando la notación hexadecimal.
	width: 640, //establece el ancho del lienzo de renderizado en píxeles.
	height: 480 //establece el alto del lienzo de renderizado en píxeles.
});

const clampy: Sprite = Sprite.from("clampy.png"); //Se crea una nueva instancia de Sprite llamada "clampy" utilizando el método estático from de la clase Sprite. 
//Este método carga una textura de una imagen especificada por su ruta y la asigna al sprite.

clampy.anchor.set(0.5); //e establece el punto de anclaje del sprite "clampy" en el centro. 
//Esto significa que las transformaciones (como la rotación y la escala) se aplicarán en relación con este punto.

clampy.x = app.screen.width / 2; //Se establece la posición horizontal del sprite "clampy" en el centro del lienzo de renderizado. 
//app.screen.width devuelve el ancho del lienzo, y dividiéndolo por 2, se coloca el sprite en el centro horizontalmente.
clampy.y = app.screen.height / 2; //lo mismo que lo anterior pero en vertical

app.stage.addChild(clampy); //Se agrega el sprite "clampy" al contenedor principal de la aplicación PixiJS, que es el stage. 
//Esto significa que el sprite será renderizado y visible en la aplicación.