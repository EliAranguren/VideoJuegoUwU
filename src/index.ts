import { Application, Loader, Sprite } from 'pixi.js' //importa esas librerias: application nos da el stage, y sprite es una imagen

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

Loader.shared.add({url:"./la roca.jpeg", name: "sus"}); //lo que hace la biblioteca loader es precargar el archivo que querramos usar y de apso ponerle un nombre

Loader.shared.onComplete.add(()=>{

const clampy: Sprite = Sprite.from("sus"); //Se crea una nueva instancia de Sprite llamada "clampy" utilizando el método estático from de la clase Sprite. 
//Este método carga una textura de una imagen especificada por su ruta y la asigna al sprite. Luego, se puede llamar directamente el archivo desde la carpeta
//o llamarlo por su nombre asignado si es que lo hicimos

clampy.anchor.set(0.5); //establece el punto de anclaje del sprite "clampy", en este caso es el centro de la imagen o sprite
//Esto significa que las transformaciones (como la rotación y la escala) se aplicarán en relación con este punto.

console.log("hola mundo!"); //escribo en la consola del navegador, se puede escribir directamente o llamar a un dato para que lo imprima

clampy.x = app.screen.width / 2; //Se establece la posición horizontal del sprite "clampy" en el centro del lienzo de renderizado. 
//app.screen.width devuelve el ancho del lienzo, y dividiéndolo por 2, se coloca el sprite en el centro horizontalmente.
clampy.y = app.screen.height / 2; //lo mismo que lo anterior pero en vertical

app.stage.addChild(clampy); //Se agrega el sprite "clampy" al contenedor principal de la aplicación PixiJS, que es el stage. 
//Esto significa que el sprite será renderizado y visible en la aplicación.
})

Loader.shared.load();