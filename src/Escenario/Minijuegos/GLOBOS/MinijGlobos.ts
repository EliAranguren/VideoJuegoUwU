import { Container, TextStyle, Text } from "pixi.js";
import { EscenaAbstracta } from "../../../Utilidades/EscenaAbstracta";
import { Actualizable } from "../../../Utilidades/Actualizable";
import { Teclado } from "../../../Utilidades/Teclado";
import { ManagerEscenas } from "../../../Utilidades/ManagerEscenas";
import { colision } from "../../../Juego/Hitbox";
import { Globos } from "./Globos";
import { Pelota } from "./Pelota";
import { Carpa } from "../Carpa";
import { Puntero } from "../Puntero";
import { Cuadro } from "../../Introduccion/Cuadro";

export class MinijGlobos extends EscenaAbstracta implements Actualizable {
    public override actualizar(): void {}

    private espacioPres = false; //pa controlar el estado de la tecla espacio porque borra to

    private punto: Puntero;
    private Mundo: Container;
    private globos: Globos[] = [];
    private pinchos: Pelota[] = [];
    private cuadro: Cuadro;
    //private dienteCayendo: any;

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
    private readonly intervaloMovimiento = 1000; //segundos en milisegundos
    private readonly limitesMovimiento = { xMin: 0, xMax: 0, yMin: 0, yMax: 0 };

    private dialogos: string[] = [ 
        `¡BIENVENIDO A LOS GLOBOS LOCOS! ¡PRESTE ATENCION!
(Aprete espacio para avanzar)`,
`El juego es facil y complicado a la vez, usted va a tener estan pelotitas
pinchudas las cuales tiene que lanzar con mucha fuerza para reventar los
globos, para agregarle dificultad hice que los paneles de globos se muevan.
Use las flechas para apuntar y el espacio para disparar.`,
`¿Como dice? ¿Que como es fisicamente posible que los paneles se 
teletransportan? No se que me esta contando señor, claramente se estan 
moviendo respetando todas las leyes de la fisica... ¿No estara usted drogado?`,
`Ah, si, casi lo olvidaba, el objetivo principal de este juego no es solo darle
a los globos, ¡Si no que tiene que darle a los globos!`,
`A los correctos claro, estos contienen sorpresas en su interior que caeran 
cuando se pinchen... ¿Como? ¿Una pista de cuales son los correctos? ¡Na!
Seria muy facil ¡Todo el mundo sabe eso! confirmo, usted anda falopeado.`,
`Su secreto esta a salvo conmigo, la vida es dura y una distraccion de vez en
cuando no viene mal *guiño, guiño*
Para reventar los globos solo siga su corazon, estoy seguro de que lo guiara al
globo correcto.`,
`Sin mas que decir, lo dejo jugar.
¡Buena suerte caballero!`
    ];

    private indiceDialogo = 0;
    private contador = 0;
    private textoDialogo: Text;
    private dialogosTerminados = false;

    private ganaste = false;
    private perdiste = false;


    constructor() {
        super();

        this.Mundo = new Carpa();
        this.punto = new Puntero();
        this.cuadro = new Cuadro();
        //this.dienteCayendo = new Piedra();

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

        for (let i=0; i<MinijGlobos.cantPinchos; i++){ //creo los sprites de pinchos
            const pincho = new Pelota();
            pincho.position.x = 110 * i;

            this.addChild(pincho);
            this.pinchos.push(pincho);
            this.Mundo.addChild(pincho);
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
        this.addChild(this.cuadro, this.textoDialogo);

        this.mostrarDialogo();

        //this.dienteCayendo.position.set(300,500);
        //this.addChild(this.dienteCayendo);

        this.Mundo.addChild(this.punto);
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

    private Ganaste() {
        this.textoDialogo.text = "¡FELICITACIONES! Disfrute su premio, señor.\nRecuerde, G para Globos, P para Parque e I para Intro.";
        this.addChild(this.cuadro, this.textoDialogo);
    }

    private Perdiste() { 
        this.textoDialogo.text = "¡Mala suerte! Ya no tenes mas pelotas.\nRecuerde, V para Vasos, P para Parque e I para Intro.";
        this.addChild(this.cuadro, this.textoDialogo);
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

        if(this.contador===2){
            this.Ganaste();
            this.ganaste = true;
        }

        if (this.ganaste || this.perdiste) { //me recomendaron parar todo asi ya no se sigue actualizando
            return;
        }

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

        const objetosColisionables = [...this.globos]; //array de globos para analizar

        for (const objeto of objetosColisionables) {
            const colisionObjeto = colision(this.punto, objeto);
            if (colisionObjeto && Teclado.state.get("Space") && MinijGlobos.cantPinchos>0 && this.espacioPres == false) { 
                //seria el disparo piu piu pero solo si hay pelotas y SI SE DEJO DE APRETAR EL ESPACIO
                this.eliminarGlobo(objeto);
            }
        }

        if (Teclado.state.get("Space")) {
            if (!this.espacioPres) {
                this.removerPincho();
                this.espacioPres = true; //tecla presionada
            }
        } else {
            this.espacioPres = false; //resetear el estado de la tecla
        }

        if (MinijGlobos.cantPinchos === 0 && this.contador<2) {
            this.perdiste = true;
            this.Perdiste();
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

        const chance = Math.random();
        console.log("Reventaste un globo!");

        if (chance < 0.3) { 
            //this.Mundo.addChild(this.dienteCayendo);
            //this.dienteCayendo.position.set(globo.position.x, globo.position.y);
            console.log("Se cayo un diente!");
            this.contador++;
        }
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

