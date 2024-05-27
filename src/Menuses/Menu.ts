import { Text, TextStyle } from 'pixi.js';
import { EscenaAbstracta } from '../Utilidades/EscenaAbstracta';
import { Actualizable } from '../Utilidades/Actualizable';
import { Puntero } from '../Escenario/Minijuegos/Puntero';

export class Menu extends EscenaAbstracta implements Actualizable{

    public override actualizar(): void {}

    private punto: Puntero;
    //private pressDos = false;

    constructor() {
        super();

        this.punto = new Puntero();
        
        const estiloTexto = new TextStyle({ //Estilo de texto para las opciones
            fontFamily: 'Arial',
            fontSize: 32,
            fill: 'white'
        });

        const introTexto = new Text('I. Introducción a la Historia', estiloTexto); 
        introTexto.x = 100;
        introTexto.y = 100;
        this.addChild(introTexto);

        const pruebaTexto = new Text('P. Prueba de Alpha', estiloTexto);
        pruebaTexto.x = 100;
        pruebaTexto.y = 200;
        this.addChild(pruebaTexto);

        const globosTexto = new Text('G. Minijuego de Globos', estiloTexto); 
        globosTexto.x = 100;
        globosTexto.y = 300;
        this.addChild(globosTexto);

        const vasosTexto = new Text('V. Minijuego de Vasos', estiloTexto); 
        vasosTexto.x = 100;
        vasosTexto.y = 400;
        this.addChild(vasosTexto);

        const salirTexto = new Text('S. Salir (No hace nada)', estiloTexto);
        salirTexto.x = 100;
        salirTexto.y = 500;
        this.addChild(salirTexto);

        const advertencia = new Text('(este juego tiene ERRORES, no puede volver a las categorias si ya entraste una vez)', estiloTexto);
        advertencia.x = 50;
        advertencia.y = 600;
        this.addChild(advertencia);
    }
    update(variaciontiempo: number, variacionframes: number): void {
        this.punto.update(variacionframes);
        const Dt = variaciontiempo / 1000;
        this.punto.update(Dt);

        /*if (Teclado.state.get("KeyP")) {
            if (!this.pressDos) {
                this.pressDos = true; // tecla presionada
                
            }
        } else {
            this.pressDos = false;
        }
        if (Teclado.state.get("KeyI")) {
            if (!this.pressDos) {
                this.pressDos = true; // tecla presionada
                
            }
        } else {
            this.pressDos = false;
        }
        if (Teclado.state.get("KeyS")) {
            if (!this.pressDos) {
                this.pressDos = true; // tecla presionada
                
            }
        } else {
            this.pressDos = false;
        }*/
        
    }
}