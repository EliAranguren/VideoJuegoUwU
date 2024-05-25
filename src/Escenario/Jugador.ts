import { Container } from "pixi.js";
import { Actualizable } from "../Utilidades/Actualizable";
import { Alto, Ancho } from "..";
import { Prota } from "./Prota";
import { Teclado } from "../Utilidades/Teclado";
import { colision } from "../Juego/Hitbox";
import { Faro } from "./Faro";
import { Casetas } from "./Casetas";
import { Escondite } from "./Escondite";
import { ParqueDiversiones } from "./ParqueDiversiones";

export class Jugador extends Container implements Actualizable {
    private protagonista: Prota;
    private Mundo: Container;
    private luces: Faro[] = []; //como voy a hacer varios, me conviene crear un string
    private tiendas: Casetas[] = [];
    private basuras: Escondite[] = [];
    private static velmov = 20;
    private static limiteMundo = 6;

    constructor() {
        super();

        this.Mundo = new ParqueDiversiones();
        this.protagonista = new Prota();

        this.addChild(this.Mundo);

        for (let i = 0; i < 7; i++) { //crear 7 luces
            const luz = new Faro();
            luz.position.x = 1100 * i;
            this.addChild(luz);
            this.luces.push(luz);
            this.Mundo.addChild(luz);
        }       
        for (let i = 0; i < 4; i++) { //crear 4 tiendas
            const tienda = new Casetas();
            tienda.position.x = 500 + 2000 * i; //los numeros tan al azar porque quedaba bonito
            this.addChild(tienda);
            this.tiendas.push(tienda);
            this.Mundo.addChild(tienda);
        }
        for (let i = 0; i < 3; i++) { //crear 3 basuras
            const basura = new Escondite();
            basura.position.x = 800 + 2500 * i;
            if (i == 2){ //agregue este if porque el ultimo quedaba feito y queria moverlo un poco mas
                basura.position.x = 1400 + 2500 * i;
            }
            this.addChild(basura);
            this.basuras.push(basura);
            this.Mundo.addChild(basura);
        }

        this.Mundo.addChild(this.protagonista);
    }

    public update(variaciontiempo: number, variacionframes: number): void {
        this.protagonista.update(variacionframes);
        const Dt = variaciontiempo / 1000;
        this.protagonista.update(Dt);

        if (Teclado.state.get("ArrowLeft")) { //creo los movimientos de izquierda y derecha
            this.protagonista.velocidad.x = -Jugador.velmov;
            this.protagonista.scale.x = 1;
        } else if (Teclado.state.get("ArrowRight")) {
            this.protagonista.velocidad.x = Jugador.velmov;
            this.protagonista.scale.x = -1;
        } else {
            this.protagonista.velocidad.x = 0;
        }

        if (Teclado.state.get("ArrowUp")) { //creo los moviminetos de arriba y abajo
            this.protagonista.velocidad.y = -Jugador.velmov;
        } else if (Teclado.state.get("ArrowDown")) {
            this.protagonista.velocidad.y = Jugador.velmov;
        } else {
            this.protagonista.velocidad.y = 0;
        }

        // limitar movimiento horizontales y verticales del jugador
        this.protagonista.x = Math.max(50, Math.min(this.protagonista.x, Jugador.limiteMundo * Ancho - 50));
        this.protagonista.y = Math.max(Alto - 130, Math.min(this.protagonista.y, Alto));
 
        //guardo los objetos colisionables en un string para analizarlos con el for
        const objetosColisionables = [...this.tiendas, ...this.luces, ...this.basuras];

        for (const objeto of objetosColisionables) { //for de colisiones del prota con los objetos
            const colisionObjeto = colision(this.protagonista, objeto);
            if (colisionObjeto) {
                this.protagonista.separar(colisionObjeto, objeto.position);
            }
        }

        if (this.protagonista.x > Ancho / 2 && this.protagonista.x < Ancho * (Jugador.limiteMundo - 1 / 2)) {
            // movimientos del mundo con respecto al jugador
            this.Mundo.x = -this.protagonista.x * this.worldTransform.a + Ancho / 2;
        } else if (this.protagonista.x >= Ancho * (Jugador.limiteMundo - 1 / 2)) {
            //en su momento si sabia de que eran estos numreos, lastima no los comente xd
            this.Mundo.x = -(Ancho * (Jugador.limiteMundo - 1 / 2) - Ancho / 2);
        }
  
        if (this.protagonista.velocidad.x === 0 && this.protagonista.velocidad.y === 0) {
            this.protagonista.stopAnimation(); // controlar las animaciones del jugador dependiendo su velocidad
            this.protagonista.setStaticFrame(3); 
        } else {
            this.protagonista.playAnimation();
        }
    }
}

