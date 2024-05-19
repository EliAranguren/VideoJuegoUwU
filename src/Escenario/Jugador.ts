import { Container } from "pixi.js";
import { Actualizable } from "../Utilidades/Actualizable";
import { Alto, Ancho } from "..";
import { Prota } from "./Prota";
import { Teclado } from "../Utilidades/Teclado";
import { colision } from "../Juego/Hitbox";
import { Faro } from "./Faro";
import { Casetas } from "./Casetas";
import { Escondite } from "./Escondite";
//import { ParqueDiversiones } from "./ParqueDiversiones";

export class Jugador extends Container implements Actualizable{
    private protagonista: Prota;
    private Mundo: Container;
    private luces: Faro = new Faro;
    private tiendas: Casetas = new Casetas;
    private basura: Escondite = new Escondite;
    private static velmov= 20;
    AnimatedSprite: any;
    
    constructor(){
        super();

        this.Mundo = new Container();

        /*const piso = new TilingSprite (Texture.from ("piso"), Ancho*6, Alto);
        const fondo = new TilingSprite (Texture.from ("fondo"), Ancho*6, Alto);
        const cerca = new TilingSprite (Texture.from ("cerca"), Ancho*6, Alto);
        this.Mundo.addChild(piso,fondo,cerca);*/

        this.Mundo.addChild(this.tiendas);
        this.Mundo.addChild(this.luces);
        this.Mundo.addChild(this.basura);

        this.protagonista = new Prota;
        this.Mundo.addChild(this.protagonista);
        this.addChild(this.Mundo)  
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

        if (this.protagonista.x > 6*Ancho){ //delimito los bordes horizontales de la pantalla
            this.protagonista.x = 6*Ancho;
        } else if (this.protagonista.x < 0) {
            this.protagonista.x = 0;
        } 

        if (this.protagonista.y > Alto){ //delimito los bordes verticales correspondientes al piso
            this.protagonista.y = Alto;
        } else if (this.protagonista.y < (Alto-130)){
            this.protagonista.y = (Alto-130);
        }

        const colisionTiendas = colision(this.protagonista, this.tiendas); //cree una pa cada una porque no funcaba
        const colisionLuces = colision(this.protagonista, this.luces);
        const colisionBasura = colision(this.protagonista, this.basura);

        if (colisionTiendas != null) {
            this.protagonista.separar(colisionTiendas, this.tiendas.position);
        }
        if (colisionLuces != null) {
            this.protagonista.separar(colisionLuces, this.luces.position);
        }
        if (colisionBasura != null) {
            this.protagonista.separar(colisionBasura, this.basura.position);
        }

        if (this.protagonista.x > Ancho/3){
            this.Mundo.x = -this.protagonista.x * this.worldTransform.a + Ancho/3;
        }
        
    }
}