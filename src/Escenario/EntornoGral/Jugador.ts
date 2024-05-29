import { Container, Text, TextStyle} from "pixi.js";
import { Actualizable } from "../../Utilidades/Actualizable";
import { Prota } from "../Prota";
import { Teclado } from "../../Utilidades/Teclado";
import { colision } from "../../Juego/Hitbox";
import { EscenaAbstracta } from "../../Utilidades/EscenaAbstracta";
import { ManagerEscenas } from "../../Utilidades/ManagerEscenas";
import { Cuadro } from "../Introduccion/Cuadro";
import { Faro } from "./Faro";
import { Casetas } from "./Casetas";
import { Escondite } from "./Escondite";
import { ParqueDiversiones } from "./ParqueDiversiones";

export class Jugador extends EscenaAbstracta implements Actualizable {

    public override actualizar(): void {}
    
    private espacioPres = false;
    private protagonista: Prota;
    //private ratoncito: RatonPerez;
    private Mundo: Container;
    private luces: Faro[] = []; //como voy a hacer varios de estos 3
    private tiendas: Casetas[] = []; //me conviene crear un string
    private basuras: Escondite[] = [];
    private cuadro: Cuadro;
    
    private static velmov = 5; //velocidad de movimiento del prota
    private static limiteMundo = 6; //ponele que son la cantidad de "pantallas" que puse

    private dialogos: string[] = [ 
`Bienvenido al Parque de Diversiones.
(Presione espacio para avanzar)`,
`Se supone que estas aca para buscar tus dientes... pero todavia no
funciona del todo bien xd.`,
`Por el momento solo podes pasear por el parque y ver el entorno, se supone 
que las casetas te llevan a los minijuegos y que te podes esconder
en los tachos de basura, pero es mas complicado de programar de lo que crees.`,
`¿Que? ¿De que te esconderias? Bueno, eso tampoco esta programado por ahora.`,
`En fin, usa las flechas para moverte.
La hitbox de los objetos esta algo rota tambien, ya lo vas a notar.
¿Por que? No se, pero que no atravesas los objetos ¡No los atravesas!`,
`Que lo disfrutes. Podes cambiar de entorno cuando quieras.
Recorda apretar I para la Intro, G para el minijuego de los Globos y V para el
minijuego de los Vasos.`
    ];

    private indiceDialogo = 0;
    private textoDialogo: Text;
    private dialogosTerminados = false;

    constructor() {
        super();

        this.Mundo = new ParqueDiversiones();
        this.protagonista = new Prota();
        //this.ratoncito = new RatonPerez();
        this.cuadro = new Cuadro();

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

        const estiloTexto = new TextStyle({ //no se como hacer para llamarlo de dialogos1 pero bueno
            fill: "#101010",
            fontFamily: "Comic Sans MS",
            fontSize: 30,
            fontStyle: "italic",
            fontWeight: "bold",
            lineJoin: "round",
        });

        this.textoDialogo = new Text("", estiloTexto); //no te olvides de nuevo, lo dejaste vacio
        this.textoDialogo.position.set(60, 520); //para escribirle despues
        this.addChild(this.cuadro, this.textoDialogo,);

        this.mostrarDialogo();

        this.Mundo.addChild(this.protagonista);
    }

    private mostrarDialogo() {
        if (this.indiceDialogo < this.dialogos.length) {
            this.textoDialogo.text = this.dialogos[this.indiceDialogo];
        } else {
            this.removeChild(this.textoDialogo);
            this.removeChild(this.cuadro);
            this.dialogosTerminados = true;
        }
    }

    public update(variaciontiempo: number, variacionframes: number): void {
        if (!this.dialogosTerminados) {
            if (Teclado.state.get("Space") && !this.espacioPres) {
                this.indiceDialogo++;
                this.espacioPres = true;
                this.mostrarDialogo();
            } else if (!Teclado.state.get("Space")) {
                this.espacioPres = false;
            }
            return;
        }

        this.protagonista.update(variacionframes);
        const Dt1 = variaciontiempo / 1000;
        this.protagonista.update(Dt1);

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
        this.protagonista.x = Math.max(50, Math.min(this.protagonista.x, Jugador.limiteMundo * ManagerEscenas.Ancho - 50));
        this.protagonista.y = Math.max(ManagerEscenas.Alto - 130, Math.min(this.protagonista.y, ManagerEscenas.Alto));
 
        //guardo los objetos colisionables en un string para analizarlos con el for
        const objetosColisionables = [...this.tiendas, ...this.luces, ...this.basuras];

        for (const objeto of objetosColisionables) { //for de colisiones del prota con los objetos
            const colisionObjeto = colision(this.protagonista, objeto);

            if (colisionObjeto) {
                this.protagonista.separar(colisionObjeto, objeto.position);
            }
        }

        if (this.protagonista.x > ManagerEscenas.Ancho / 2 && this.protagonista.x < ManagerEscenas.Ancho * (Jugador.limiteMundo - 1 / 2) && this.protagonista && this.Mundo) {
            // movimientos del mundo con respecto al jugador
            this.Mundo.x = -this.protagonista.x * this.worldTransform.a + ManagerEscenas.Ancho / 2;
        } else if (this.protagonista.x >= ManagerEscenas.Ancho * (Jugador.limiteMundo - 1 / 2)) {
            //en su momento si sabia de que eran estos numreos, lastima no los comente xd
            this.Mundo.x = -(ManagerEscenas.Ancho * (Jugador.limiteMundo - 1 / 2) - ManagerEscenas.Ancho / 2);
        }
  
        if (this.protagonista.velocidad.x === 0 && this.protagonista.velocidad.y === 0) {
            this.protagonista.stopAnimation(); // controlar las animaciones del jugador dependiendo su velocidad
            this.protagonista.setStaticFrame(3); 
        } else {
            this.protagonista.playAnimation();
        }
    }
}