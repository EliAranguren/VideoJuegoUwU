import { Container } from "pixi.js";
import { EscenaAbstracta } from "../../Utilidades/EscenaAbstracta";
import { Actualizable } from "../../Utilidades/Actualizable";
import { Carpa } from "./Carpa";
import { Globos } from "./Globos";
import { Teclado } from "../../Utilidades/Teclado";
import { ManagerEscenas } from "../../Utilidades/ManagerEscenas";
import { colision } from "../../Juego/Hitbox";
import { Puntero } from "./Puntero";
import { Pelota } from "./Pelota";

export class MinijGlobos extends EscenaAbstracta implements Actualizable {
    public override actualizar(): void {}

    private punto: Puntero;

    private Mundo: Container;
    private globos: Globos[] = [];
    private pinchos: Pelota[] = [];
    private static velmov = 20;
    private static limiteMundo = 1;
    private static cantPinchos = 5;
    private static readonly movimientosAdyacentes = [
        { x: -130, y: 0 }, // pa la izquierda
        { x: 130, y: 0 }, //pa la derecha
        { x: 0, y: -130 }, //parriba
        { x: 0, y: 130 } // pabajo
    ];
    private tiempoMovimiento = 0; //este es para ir comparando con el de abajo, lo reseteo cuando coinciden
    private readonly intervaloMovimiento = 2000; //segundos en milisegundos
    private readonly limitesMovimiento = { xMin: 0, xMax: 0, yMin: 0, yMax: 0 };

    constructor() {
        super();

        this.Mundo = new Carpa();
        this.punto = new Puntero();

        this.addChild(this.Mundo);

        for (let j = 0; j < 3; j++) { // Crear 3 filas
            for (let i = 0; i < 6; i++) { // Crear 6 globos
                if (Math.random() < 0.5) { // 50% de probabilidad de mostrar el globo
                    const globo = new Globos();
                    globo.position.x = 130 * i;
                    globo.position.y = 130 * j;

                    this.addChild(globo);
                    this.globos.push(globo);
                    this.Mundo.addChild(globo);

                    // Actualizar los límites del movimiento
                    this.limitesMovimiento.xMax = Math.max(this.limitesMovimiento.xMax, globo.position.x);
                    this.limitesMovimiento.yMax = Math.max(this.limitesMovimiento.yMax, globo.position.y);
                }
            }
        }

        for (let i=0; i<MinijGlobos.cantPinchos; i++){
            const pincho = new Pelota();
            pincho.position.x = 110 * i;

            this.addChild(pincho);
            this.pinchos.push(pincho);
            this.Mundo.addChild(pincho);
        }

        this.Mundo.addChild(this.punto);
    }

    public update(variaciontiempo: number, variacionframes: number): void {
        this.punto.update(variacionframes);
        const Dt = variaciontiempo / 1000;
        this.punto.update(Dt);

        if (Teclado.state.get("ArrowLeft")) {
            this.punto.velocidad.x = -MinijGlobos.velmov;
        } else if (Teclado.state.get("ArrowRight")) {
            this.punto.velocidad.x = MinijGlobos.velmov;
        } else {
            this.punto.velocidad.x = 0;
        }

        if (Teclado.state.get("ArrowUp")) {
            this.punto.velocidad.y = -MinijGlobos.velmov;
        } else if (Teclado.state.get("ArrowDown")) {
            this.punto.velocidad.y = MinijGlobos.velmov;
        } else {
            this.punto.velocidad.y = 0;
        }

        this.punto.x = Math.max(0, Math.min(this.punto.x, MinijGlobos.limiteMundo * ManagerEscenas.Ancho));
        this.punto.y = Math.max(0, Math.min(this.punto.y, ManagerEscenas.Alto));

        const objetosColisionables = [...this.globos];

        for (const objeto of objetosColisionables) {
            const colisionObjeto = colision(this.punto, objeto);
            if (colisionObjeto && Teclado.state.get("Space") /*&& MinijGlobos.cantPinchos>0*/) { //seria el disparo piu piu
                this.eliminarGlobo(objeto);
            }
        }

        if (Teclado.state.get("Space")){
            this.removerPincho();
        }

        this.tiempoMovimiento += variaciontiempo;

        if (this.tiempoMovimiento >= this.intervaloMovimiento) {
            this.moverGlobosAleatoriamente();
            this.tiempoMovimiento = 0; // resete0 el temporizador
        }
    }

    private eliminarGlobo(globo: Globos) {
        this.Mundo.removeChild(globo); //lo saco del Mundo
        this.globos = this.globos.filter(g => g !== globo); 
    }

    private removerPincho() {
        if (this.pinchos.length > 0) {
            const ultimopincho = this.pinchos.pop();
            if (ultimopincho) {
                this.Mundo.removeChild(ultimopincho); //remover el pincho del contenedor
                MinijGlobos.cantPinchos -= 1;
            }
        }
    }

    private moverGlobosAleatoriamente() {
        for (const globo of this.globos) {
            const movimiento = this.getMovimientoAleatorio(); //recive un mov adyacente
            const nuevaPosicion = { //y asigna esos valores a la supuesta nueva posiciom
                x: globo.position.x + movimiento.x,
                y: globo.position.y + movimiento.y
            };

            if (this.puedeMoverse(nuevaPosicion)) { //pero primero analizo si puedo o no
                //si recibo true, se mueve, pero si recibo false ni entra aca
                globo.position.set(nuevaPosicion.x, nuevaPosicion.y);
            }
        }
    }

    private getMovimientoAleatorio() { //simplemento creo un valor de movimiento aleatorio que respeta
        //el movmioento adyacente que puse arriba, osea elije uno solo de esos
        const indice = Math.floor(Math.random() * MinijGlobos.movimientosAdyacentes.length);
        return MinijGlobos.movimientosAdyacentes[indice]; //y aca lo envia a quien llame la funcion
    }

    private puedeMoverse(nuevaPosicion: { x: number, y: number }): boolean {
        for (const globo of this.globos) {//analiza si ya hay alguno ahi
            if (globo.position.x === nuevaPosicion.x && globo.position.y === nuevaPosicion.y) {
                return false; //si lo hay, dice no mi bro ahi ni vayas plebe
            }
        }

        if (//verificar si la nueva posición está dentro de los límites permitidos
            nuevaPosicion.x < this.limitesMovimiento.xMin ||
            nuevaPosicion.x > this.limitesMovimiento.xMax ||
            nuevaPosicion.y < this.limitesMovimiento.yMin ||
            nuevaPosicion.y > this.limitesMovimiento.yMax
        ) {
            return false; //y si lo estan, tambien le dice que nao nao
        }

        return true; //y de ultima si cumple con todo, le da para adelante
    }
}

