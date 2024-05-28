import { Container, Text, TextStyle } from "pixi.js";
import { Actualizable } from "../../../Utilidades/Actualizable";
import { EscenaAbstracta } from "../../../Utilidades/EscenaAbstracta";
import { Puntero } from "../Puntero";
import { Vasos1 } from "./Vasos1";
import { Vasos2 } from "./Vasos2";
import { Carpa } from "../Carpa";
import { Piedra } from "./Piedra";
import { Teclado } from "../../../Utilidades/Teclado";
import { ManagerEscenas } from "../../../Utilidades/ManagerEscenas";
import { Vasos3 } from "./Vasos3";
import { colision } from "../../../Juego/Hitbox";
import { Cuadro } from "../../Introduccion/Cuadro";

export class MinijVasos extends EscenaAbstracta implements Actualizable {
    public override actualizar(): void {}

    private espacioPres = false;
    private moverse1: boolean = true;
    private moverse2: boolean = true;
    private moverse3: boolean = true;

    private punto: Puntero;
    private Mundo: Container;
    private vas1: Vasos1;
    private vas2: Vasos2;
    private vas3: Vasos3;
    private cuadro: Cuadro;
    private piedras: Piedra[] = [];
    private static velmov = 8;
    private static limiteMundo = 1;
    private static cantPiedras = 5;

    private dialogos: string[] = [ 
        `¡Bienvenido al minijuego de los vasos, querido cliente!
¡El juego es muy simple! Te voy a explicar las reglas.
(Presione espacio para continuar)`,
`Utiliza las flechas del teclado para apuntar y espacio para tirar tu piedra.
¿¡QUE!? ¿¡ME ESTAS DICIENDO RATA POR PONER PIEDRAS EN VEZ DE 
PELOTAS!? ¡LAS PIEDRAS NO ESTAN AHI PORQUE LAS PELOTAS CUESTAN 
UN OJO DE LA CARA, PELOTUDO!`,
`...`,`Perdon, me altere... En realidad puse piedras por una razon muy razonable: 
todo empezo hace unos dias cuando me di cuenta que mi tienda tenia un juego 
muy simple y cliche, asi que como buen emprendedor que soy, decidi cambiar 
las cosas para atraer mas clientela.`,
`Para agregarle mas dinamismo coloque las torres de vasos en plataformas que se
mueven constantemente. ¿Como? ¿Que no podes ver las plataformas? ¡pero si 
estan ahi! Capaz tenes que hacerte una revision de ojos nomas.`,
`Cuestion, cuando puse a andar mi invento se cayeron todos los vasos a la mierda,
asi que los tuve que pegar con la gotita entre si.
Despues de eso iba todo viendo en popa, hasta que unos dias despues vino el 
patron y me dijo que la gente andaba diciendo que mi juego tenia trampas.`,
`Y si, me re olvide que las pelotitas eran muy blandas para tirar las torres, ya 
me parecia raro a mi que mis peluches no se iban mas.`,
`Pase horas rompiendome la cabeza para ver como chota hacia para que el juego 
fuera mas facil pero no tanto, hasta que en una vino uno de los mas grandes 
Ingenieros de Argentina y me dio una piedra, un capo el chabon.
Lo que si, hay que tirar las piedras bien a la base, porque si no ni se caen.`,
`Y bueno, hasta aca llegamos, ponete a jugar nomas que me retrasas la fila.
¡Suerte, pibe! Acordate de apuntar a la base.`
    ];

    private indiceDialogo = 0;
    private textoDialogo: Text;
    private dialogosTerminados = false;

    private ganaste = false;
    private perdiste = false;

    constructor() {
        super();

        this.Mundo = new Carpa();
        this.punto = new Puntero();
        this.vas1 = new Vasos1();
        this.vas2 = new Vasos2();
        this.vas3 = new Vasos3();
        this.cuadro =new Cuadro();

        this.addChild(this.Mundo);

        for (let i = 0; i < MinijVasos.cantPiedras; i++) {
            const piedra = new Piedra();
            piedra.position.x = 110 * i;

            this.addChild(piedra);
            this.piedras.push(piedra);
            this.Mundo.addChild(piedra);
        }

        this.Mundo.addChild(this.vas1, this.vas2, this.vas3, this.punto);

        const estiloTexto = new TextStyle({ //no se como hacer para llamarlo de dialogos1 pero bueno
            fill: "#101010",
            fontFamily: "Comic Sans MS",
            fontSize: 30,
            fontStyle: "italic",
            fontWeight: "bold",
            lineJoin: "round",
        });

        this.textoDialogo = new Text("", estiloTexto);
        this.textoDialogo.position.set(60, 520);
        this.addChild(this.cuadro, this.textoDialogo);

        this.mostrarDialogo();
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
        this.textoDialogo.text = "¡GANASTE PIBE! Podes seguir de largo nomas.\nAcordate, G para Globos, P para Parque e I para Intro.\nSi ya estuviste en alguno, no vuelvas porque se rompe todo.";
        this.addChild(this.cuadro, this.textoDialogo);
    }

    private Perdiste() { 
        this.textoDialogo.text = "¡Que macana, perdiste! Ya no tenes mas piedras.\nAcordate, G para Globos, P para Parque e I para Intro.\nSi ya estuviste en alguno, no vuelvas porque se rompe todo.";
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

        if (this.ganaste || this.perdiste) { //me recomendaron parar todo asi ya no se sigue actualizando
            return;
        }

        this.punto.update(variacionframes);
        const Dt = variaciontiempo / 1000;
        this.punto.update(Dt);

        if (Teclado.state.get("ArrowLeft")) {
            this.punto.velocidad.x = -MinijVasos.velmov;
        } else if (Teclado.state.get("ArrowRight")) {
            this.punto.velocidad.x = MinijVasos.velmov;
        } else {
            this.punto.velocidad.x = 0;
        }
        if (Teclado.state.get("ArrowUp")) {
            this.punto.velocidad.y = -MinijVasos.velmov;
        } else if (Teclado.state.get("ArrowDown")) {
            this.punto.velocidad.y = MinijVasos.velmov;
        } else {
            this.punto.velocidad.y = 0;
        }

        if (this.moverse1) {
            this.vas1.position.y += MinijVasos.velmov;
            if (this.vas1.position.y >= 160) {
                this.moverse1 = false;
            }
        } else {
            this.vas1.position.y -= MinijVasos.velmov;
            if (this.vas1.position.y <= -50) {
                this.moverse1 = true;
            }
        }

        if (this.moverse2) {
            this.vas2.position.x += MinijVasos.velmov;
            if (this.vas2.position.x >= 240) {
                this.moverse2 = false;
            }
        } else {
            this.vas2.position.x -= MinijVasos.velmov;
            if (this.vas2.position.x <= -150) {
                this.moverse2 = true;
            }
        }

        if (this.moverse3) {
            this.vas3.position.x += MinijVasos.velmov;
            if (this.vas3.position.x >= 450) {
                this.moverse3 = false;
            }
        } else {
            this.vas3.position.x -= MinijVasos.velmov;
            if (this.vas3.position.x <= 0) {
                this.moverse3 = true;
            }
        }

        this.punto.x = Math.max(0, Math.min(this.punto.x, MinijVasos.limiteMundo * ManagerEscenas.Ancho));
        this.punto.y = Math.max(0, Math.min(this.punto.y, ManagerEscenas.Alto));

        const objetosColisionables = [this.vas3, this.vas2, this.vas1];

        for (const objeto of objetosColisionables) {
            const colisionObjeto = colision(this.punto, objeto);
            if (colisionObjeto && Teclado.state.get("Space") && MinijVasos.cantPiedras > 0 && this.espacioPres == false) {
                this.Mundo.removeChild(objeto);
            }
        }

        if (Teclado.state.get("Space")) {
            if (!this.espacioPres) {
                this.removerPiedras();
                this.espacioPres = true;
            }
        } else {
            this.espacioPres = false;
        }

        if (MinijVasos.cantPiedras === 0) {
            if (this.Mundo.children.includes(this.vas1) || this.Mundo.children.includes(this.vas2) || this.Mundo.children.includes(this.vas3)) {
                this.perdiste = true;
                this.Perdiste();
            }
        }

        if (this.Mundo.children.indexOf(this.vas1) === -1 && this.Mundo.children.indexOf(this.vas2) === -1 && this.Mundo.children.indexOf(this.vas3) === -1) {
            this.ganaste = true;
            this.Ganaste();
        }
    }

    private removerPiedras() {
        if (this.piedras.length > 0) {
            const ultimapiedra = this.piedras.pop();
            if (ultimapiedra) {
                this.Mundo.removeChild(ultimapiedra);
                MinijVasos.cantPiedras -= 1;
            }
        }
    }
}
