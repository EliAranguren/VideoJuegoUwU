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

export class Jugador extends Container implements Actualizable{
    private protagonista: Prota;
    private Mundo: Container;
    private luces: Faro = new Faro;
    private tiendas: Casetas = new Casetas;
    private tienda1 = new Casetas();
    private tienda2 = new Casetas();
    private tienda3 = new Casetas();
    private basura: Escondite = new Escondite;
    private static velmov= 20;
    private static limiteMundo= 6;
    AnimatedSprite: any;
    
    constructor(){
        super();

        this.Mundo = new ParqueDiversiones();
        this.protagonista = new Prota;

        this.Mundo.addChild(this.tiendas,this.luces,this.basura);  
        
        this.tienda1.position.x = (1500); //Dios me ayude a que esto funcione
        this.addChild(this.tienda1); //me ayudo :) lo dejo feo nomas

        this.tienda2.position.x = (3500);
        this.addChild(this.tienda2);

        this.tienda3.position.x = (6000);
        this.addChild(this.tienda3);

        this.Mundo.addChild(this.tienda1,this.tienda2,this.tienda3);
        this.Mundo.addChild(this.protagonista);

        this.addChild(this.Mundo);
    }

    public update (variaciontiempo: number, variacionframes: number): void {
        this.protagonista.update(variacionframes);
        const Dt= variaciontiempo / 1000;
        this.protagonista.update(Dt);

        if (Teclado.state.get("ArrowLeft")){ //creo los movimientos de izquierda y derecha
            this.protagonista.velocidad.x = - Jugador.velmov;
            this.protagonista.scale.x = 1;
        } else if (Teclado.state.get("ArrowRight")) {
            this.protagonista.velocidad.x = Jugador.velmov;
            this.protagonista.scale.x = -1;
        } else {
            this.protagonista.velocidad.x = 0;
        }

        if (Teclado.state.get("ArrowUp")){ //creo los moviminetos de arriba y abajo
            this.protagonista.velocidad.y = -Jugador.velmov;
        } else if (Teclado.state.get("ArrowDown")) {
            this.protagonista.velocidad.y = Jugador.velmov;
        } else {
            this.protagonista.velocidad.y = 0;
        }

        if (this.protagonista.x > Jugador.limiteMundo*Ancho - 50){ //delimito los bordes horizontales de la pantalla
            this.protagonista.x = Jugador.limiteMundo*Ancho - 50; //es -50 para que el prota no atraviese la pantalla
        } else if (this.protagonista.x < 50) {
            this.protagonista.x = 50;
        } 

        if (this.protagonista.y > Alto){ //delimito los bordes verticales correspondientes al piso
            this.protagonista.y = Alto;
        } else if (this.protagonista.y < (Alto-130)){
            this.protagonista.y = (Alto-130);
        }

        const colisionTiendas = colision(this.protagonista, this.tiendas); //cree una pa cada una porque no funcaba
        const colisionLuces = colision(this.protagonista, this.luces);
        const colisionBasura = colision(this.protagonista, this.basura);
        const colisionTienda1 = colision(this.protagonista, this.tienda1);
        const colisionTienda2 = colision(this.protagonista, this.tienda2);
        const colisionTienda3 = colision(this.protagonista, this.tienda2);

        if (colisionTienda1 != null) {
            this.protagonista.separar(colisionTienda1, this.tienda1.position);
        }
        if (colisionTienda2 != null) {
            this.protagonista.separar(colisionTienda2, this.tienda2.position);
        }
        if (colisionTienda3 != null) {
            this.protagonista.separar(colisionTienda3, this.tienda3.position);
        }
        if (colisionTiendas != null) {
            this.protagonista.separar(colisionTiendas, this.tiendas.position);
        }
        if (colisionLuces != null) {
            this.protagonista.separar(colisionLuces, this.luces.position);
        }
        if (colisionBasura != null) {
            this.protagonista.separar(colisionBasura, this.basura.position);
        }

        if (this.protagonista.x > Ancho/2 && this.protagonista.x < (Ancho*(Jugador.limiteMundo- 1/2))){ 
            //cuando llegue al tercio de la pantalla y mientras este antes del limite empezara a moverse el mundo a la par del prota            
            this.Mundo.x = -this.protagonista.x * this.worldTransform.a + Ancho/2;
        } else if (this.protagonista.x >= (Ancho*(Jugador.limiteMundo - 1/2))){
            //si llega al limite del mapa, que pare de mover el mundo
            this.Mundo.x = -(Ancho*(Jugador.limiteMundo- 1/2) - Ancho/2);
        }
    }
}