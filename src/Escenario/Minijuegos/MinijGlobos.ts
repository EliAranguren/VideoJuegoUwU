import { Container } from "pixi.js";
import { EscenaAbstracta } from "../../Utilidades/EscenaAbstracta";
import { Actualizable } from "../../Utilidades/Actualizable";
import { Carpa } from "./Carpa";
import { Globos } from "./Globos";
import { Teclado } from "../../Utilidades/Teclado";
import { ManagerEscenas } from "../../Utilidades/ManagerEscenas";
import { colision } from "../../Juego/Hitbox";
import { Puntero } from "./Puntero";

export class MinijGlobos extends EscenaAbstracta implements Actualizable {

    public override actualizar(): void {}
    
    private punto: Puntero;
    private Mundo: Container;
    private globos: Globos[] = []; //como voy a hacer varios de este hago un string
    private static velmov = 20; //velocidad de movimiento del prota
    private static limiteMundo = 1; //ponele que son la cantidad de "pantallas" que puse

    constructor() {
        super();

        this.Mundo = new Carpa();
        this.punto = new Puntero();

        this.addChild(this.Mundo);

        for (let j = 0; j < 3; j++) { //crear 3 filas
            for (let i = 0; i < 6; i++) { //crear 6 globos
               const globo = new Globos();
                globo.position.x = 130 * i;
                globo.position.y = 130 * j;

                this.addChild(globo);
                this.globos.push(globo);
                this.Mundo.addChild(globo);      
            }        
        }        

        this.Mundo.addChild(this.punto);
    }

    public update(variaciontiempo: number, variacionframes: number): void {
        this.punto.update(variacionframes);
        const Dt = variaciontiempo / 1000;
        this.punto.update(Dt);

        if (Teclado.state.get("ArrowLeft")) { //creo los movimientos de izquierda y derecha
            this.punto.velocidad.x = -MinijGlobos.velmov;
        } else if (Teclado.state.get("ArrowRight")) {
            this.punto.velocidad.x = MinijGlobos.velmov;
        } else {
            this.punto.velocidad.x = 0;
        }

        if (Teclado.state.get("ArrowUp")) { //creo los moviminetos de arriba y abajo
            this.punto.velocidad.y = -MinijGlobos.velmov;
        } else if (Teclado.state.get("ArrowDown")) {
            this.punto.velocidad.y = MinijGlobos.velmov;
        } else {
            this.punto.velocidad.y = 0;
        }

        // limitar movimiento horizontales y verticales del MinijGlobos
        this.punto.x = Math.max(0, Math.min(this.punto.x, MinijGlobos.limiteMundo * ManagerEscenas.Ancho));
        this.punto.y = Math.max(0, Math.min(this.punto.y, ManagerEscenas.Alto));
 
        //guardo los objetos colisionables en un string para analizarlos con el for
        const objetosColisionables = [...this.globos];

        for (const objeto of objetosColisionables) { //for de colisiones del prota con los objetos
            const colisionObjeto = colision(this.punto, objeto);
            if (colisionObjeto) {
                console.log("TOCANDOOO");
                //this.punto.separar(colisionObjeto, objeto.position);
            }
        }

    }
}

