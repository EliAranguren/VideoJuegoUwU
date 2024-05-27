import { Container,Graphics,Text, TextStyle } from "pixi.js";
import { Actualizable } from "../../../Utilidades/Actualizable";
import { EscenaAbstracta } from "../../../Utilidades/EscenaAbstracta"
import { Puntero } from "../Puntero";
import { Vasos1 } from "./Vasos1";
import { Vasos2 } from "./Vasos2";
import { Carpa } from "../Carpa";
import { Piedra } from "./Piedra";
import { Teclado } from "../../../Utilidades/Teclado";
import { ManagerEscenas } from "../../../Utilidades/ManagerEscenas";
import { Vasos3 } from "./Vasos3";
import { colision } from "../../../Juego/Hitbox";

export class MinijVasos extends EscenaAbstracta implements Actualizable {
    public override actualizar(): void {}

    private espacioPres = false; //pa controlar el estado de la tecla espacio porque borra to
    private moverse1: boolean = true; //que porque hice 3?
    private moverse2: boolean = true; //porque el cerebro ya no funciona y me voy a lo facil
    private moverse3: boolean = true;

    private punto: Puntero;

    private Mundo: Container;
    private vas1: Vasos1;
    private vas2: Vasos2;
    private vas3: Vasos3;
    private piedras: Piedra[] = [];
    private static velmov = 8;
    private static limiteMundo = 1;
    private static cantPiedras = 5;

    constructor() {
        super();

        this.Mundo = new Carpa();
        this.punto = new Puntero();
        this.vas1 = new Vasos1();
        this.vas2 = new Vasos2();
        this.vas3 = new Vasos3();

        this.addChild(this.Mundo);

        for (let i=0; i<MinijVasos.cantPiedras; i++){ //creo los sprites de piedras
            const piedra = new Piedra();
            piedra.position.x = 110 * i;

            this.addChild(piedra);
            this.piedras.push(piedra);
            this.Mundo.addChild(piedra);
        }

        this.Mundo.addChild(this.vas1,this.vas2,this.vas3,this.punto);

        const estiloTexto = new TextStyle({
            fontFamily: "Arial",
            fontSize: 15,
            fill: "black"
        });

        const indicaciones = new Graphics();
        indicaciones.beginFill(0xFFFFFF, 0.3);
        indicaciones.drawRect(0,0,400,100);
        indicaciones.endFill();
        indicaciones.position.set(20,20);

        const textoMerequetengue = new Text("--> Use las flechas para moverse y Espacio para disparar. <--", estiloTexto);
        textoMerequetengue.position.set(30, 30);

        const textoMerequetengue1 = new Text("Recuerde que ya no puede volver.", estiloTexto);
        textoMerequetengue1.position.set(30, 45);
        const textoMerequetengue2 = new Text("Presione I para la intro; P para pasear por el parque;", estiloTexto);
        textoMerequetengue2.position.set(30, 60);
        const textoMerequetengue3 = new Text("y G para el minijuego de los globos.", estiloTexto);
        textoMerequetengue3.position.set(30, 75);
        const textoMerequetengue4 = new Text("¡Dispare a la base de las torres! Tiene tiros limitados.", estiloTexto);
        textoMerequetengue4.position.set(30, 90);

        this.Mundo.addChild(indicaciones,textoMerequetengue,textoMerequetengue1,textoMerequetengue2,textoMerequetengue3,textoMerequetengue4);
    }

    public update(variaciontiempo: number, variacionframes: number): void {
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

        const objetosColisionables = [this.vas3,this.vas2,this.vas1]; //array de vasos para analizar

        for (const objeto of objetosColisionables) {
            const colisionObjeto = colision(this.punto, objeto);
            if (colisionObjeto && Teclado.state.get("Space") && MinijVasos.cantPiedras>0 && this.espacioPres == false) { 
                //seria el disparo piu piu pero solo si hay piedras y SI SE DEJO DE APRETAR EL ESPACIO
                this.Mundo.removeChild(objeto);
            }
        }

        if (Teclado.state.get("Space")) {
            if (!this.espacioPres) {
                this.removerPiedras();
                this.espacioPres = true; //tecla presionada
            }
        } else {
            this.espacioPres = false; //resetear el estado de la tecla
        }
    }

    private removerPiedras() {
        if (this.piedras.length > 0) {
            const ultimapiedra = this.piedras.pop();
            if (ultimapiedra) {
                this.Mundo.removeChild(ultimapiedra); //remover el piedra del contenedor
                MinijVasos.cantPiedras -= 1;
            }
        }
    }
}

