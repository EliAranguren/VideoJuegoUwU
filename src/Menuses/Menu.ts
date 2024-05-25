import { Text, TextStyle } from 'pixi.js';
import { EscenaAbstracta } from '../Utilidades/EscenaAbstracta';

export class Menu extends EscenaAbstracta {
	update(_deltaMS: number, _variacionframes: number) {
	}
    public override actualizar(): void {
    }

    constructor() {
        super();
        
        const estiloTexto = new TextStyle({ //Estilo de texto para las opciones
            fontFamily: 'Arial',
            fontSize: 32,
            fill: 'white'
        });

        const pruebaTexto = new Text('Prueba', estiloTexto); // Opción: Prueba
        pruebaTexto.x = 100;
        pruebaTexto.y = 100;
        this.addChild(pruebaTexto);

        const opcionesTexto = new Text('Opciones', estiloTexto); // Opción: Opciones
        opcionesTexto.x = 100;
        opcionesTexto.y = 200;
        this.addChild(opcionesTexto);

        const salirTexto = new Text('Salir', estiloTexto); // Opción: Salir
        salirTexto.x = 100;
        salirTexto.y = 300;
        this.addChild(salirTexto);
    }
}