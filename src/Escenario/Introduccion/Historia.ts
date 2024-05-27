import { Container } from "pixi.js";
import { EscenaAbstracta } from "../../Utilidades/EscenaAbstracta";
import { Intro1 } from "./Intro1";
import { Dialogo1 } from "./Dialogo1";
import { Cuadro } from "./Cuadro";
import { Teclado } from "../../Utilidades/Teclado";
import { Puntero } from "../Minijuegos/Puntero";
import { Actualizable } from "../../Utilidades/Actualizable";
import { Intro2 } from "./Intro2";
import { Intro3 } from "./Intro3";
import { Intro4 } from "./Intro4";
import { Intro5 } from "./Intro5";

export class Historia extends EscenaAbstracta implements Actualizable{
    fondo1: Intro1;
    fondo2: any;
    fondo3: any;
    fondo4: any;
    fondo5: any;
    public override actualizar(): void {}

    dial: Dialogo1;
    cuadro: Cuadro;
    punto = new Puntero();
    private static contador = 0;
    private static contadorEscena = 1;
    private acercarse: boolean = false;
    private static velmov = 0.002;

    private Mundo: Container;
    private espacioPres = false;

    constructor() {
        super();

        this.Mundo = new Container();
        this.dial = new Dialogo1();
        this.cuadro = new Cuadro();
        this.punto = new Puntero();
        this.fondo1 = new Intro1();
        this.fondo2 = new Intro2();
        this.fondo3 = new Intro3();
        this.fondo4 = new Intro4();
        this.fondo5 = new Intro5();

        this.addChild(this.Mundo);
        this.Mundo.addChild(this.fondo1,this.cuadro, this.dial);
    }

    public update(variaciontiempo: number, variacionframes: number): void {
        this.punto.update(variacionframes);
        const Dt = variaciontiempo / 1000;
        this.punto.update(Dt);

        if (Teclado.state.get("Space")) {
            if (!this.espacioPres && Historia.contadorEscena ==1) {
                this.dial.actualizarDialogo();
                this.espacioPres = true; // tecla presionada
                this.fondo1.position.set (this.fondo1.position.x -250,this.fondo1.position.y -150);
		        this.fondo1.scale.set (this.fondo1.scale.x + 0.2 ,this.fondo1.scale.y + 0.2);
                //efectito de mierda porque si
                Historia.contador++;

                if (Historia.contador === 4){
                    Historia.contadorEscena++;
                    this.Mundo.removeChild(this.fondo1);    
                    this.Mundo.addChildAt(this.fondo2, 0);
                }
            } else if (!this.espacioPres && Historia.contadorEscena === 2 ) {
                this.dial.actualizarDialogo();
                this.espacioPres = true; // tecla presionada
                Historia.contador++;
                
                if (Historia.contador === 10){
                    Historia.contadorEscena++;
                    this.Mundo.removeChild(this.fondo2);    
                    this.Mundo.addChildAt(this.fondo3, 0);
                }

            } else if (!this.espacioPres && Historia.contadorEscena === 3 ) {
                this.dial.actualizarDialogo();
                this.espacioPres = true; // tecla presionada
                Historia.contador++;
                
                if (Historia.contador === 14){
                    Historia.contadorEscena++;
                    this.Mundo.removeChild(this.fondo3);    
                    this.Mundo.addChildAt(this.fondo4, 0);
                }

            } else if (!this.espacioPres && Historia.contadorEscena === 4 ) {
                this.dial.actualizarDialogo();
                this.espacioPres = true; // tecla presionada
                Historia.contador++;
                
                if (Historia.contador === 21){
                    Historia.contadorEscena++;
                    this.Mundo.removeChild(this.fondo4,this.cuadro,this.dial);    
                    this.Mundo.addChildAt(this.fondo5, 0);
                    this.fondo5.reseteo();
                    this.acercarse =true;	
                }

            } else if (!this.espacioPres && Historia.contadorEscena === 6 ) {
                this.espacioPres = true; // tecla presionada

            }

        } else {
            this.espacioPres = false; // resetear el estado de la tecla            
        }

        if (this.acercarse) {
            this.fondo5.scale.set (this.fondo5.scale.x + (0.2*Historia.velmov) ,this.fondo5.scale.y + (0.2*Historia.velmov));
            this.fondo5.position.set (this.fondo5.position.x -(130*Historia.velmov),this.fondo5.position.y -(70*Historia.velmov));
            if (this.fondo5.position.x < - 200) {
                this.acercarse = false;
                Historia.contadorEscena++;
                this.Mundo.removeChild(this.fondo5);    
            }
        }
    }
}

