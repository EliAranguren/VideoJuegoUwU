/*import { Container, Text, TextStyle } from "pixi.js";

export class Dialogo1 extends Container {
    indiceDialogo: number; // Añade la propiedad indiceDialogo
    d1:string[];

    constructor() {
        super();

        this.indiceDialogo = 0; // Inicializa el índice del diálogo

        const estilo = new TextStyle({
            fontFamily: "Comic Sans MS",
            fontSize: 30,
            fontStyle: "italic",
            fontWeight: "bold",
            lineJoin: "round",
            stroke: "#ffffff",
            strokeThickness: 2
        });

        this.d1 = [`Y bueno...
En estas situaciones no queda otra que reirse un rato jaja
Encima hacer mucho frio, asi que de alguna manera tengo que entrar en 
calor
        `,
            `Este hermoso clima me lo recuerda, aquella historia paso justo en un dia
como hoy...
¿Como era que decia?`,
        ];

        const dialogos = new Text(this.d1[this.indiceDialogo], estilo);

        dialogos.position.set(100, 500);
        this.addChild(dialogos);
    }

    actualizarDialogo(): void {
        if (this.indiceDialogo < this.d1.length - 1) {
            this.indiceDialogo++;
            const texto = this.getChildAt(0) as Text; 
            texto.text = this.d1[this.indiceDialogo];
            console.log("Cambio");
        } 
    }
}*/

import { Container, Text, TextStyle } from "pixi.js";

export class Dialogo1 extends Container {
    indiceDialogo: number;
    d1: string[];
    texto: Text; // Almacena una referencia al objeto de texto

    constructor() {
        super();

        this.indiceDialogo = 0;
        this.d1 = [
            `Y bueno...
En estas situaciones no queda otra que reirse un rato...
¡Oh bello INTERNET! ¿Que clase de memes me preparaste hoy?`, "...",
`Jaja los gatitos y la estupidez humana no desepcionan.
Hablando de estupidez humana...`,
`Este hermoso clima me lo recuerda, aquella historia empezo justo en 
un dia como hoy...
¿Como era que decia?`, /////////////////////////////////////////// 4
//////////////////////////////////////////////////////////// ENTRA INTRO2 ///////////////////////
"...", 
`Hola, buenas noches, observador. 
¿Como estas hoy?`,
`Si, se que te estaras preguntando que que hago aca...
Es una divertida anecdota que tal vez te cuente mas tarde,
las cosas no salieron como las planee jajaja!`,
`En fin, antes de comenzar quiero agradecerte por estar aca.
Vas a encontrar muchos errores a lo largo de esta historia,
el codigo de mi mente esta muy confuso y no tengo tiempo de
repararlo un poco mas antes de que lo veas.`,
`Sin embargo, ¡Quiero contarla de todos modos!
¡¡¡PRESTA ATENCION!!!`, 
"Creo que la historia era algo asi...",
//////////////////////////////////////////////////////// 10
//////////////////////////////////////////////////////////// ENTRA INTRO3 ///////////////////////
`Como te dije antes, era un dia como hoy cuando ocurrio.
Como de costumbre para él, le toco quedarse hasta tarde laburando.`,
`Un dia mas en la vida de todo adulto funcional independiente 
que trabaja en una oficina computarizando y ordenando archivos
del año de Maria Castaña.`,
`Aunque pensandolo bien... para esa misma tarde ya habia vaciado un 
frasco de calmantes; los cuales, de "calmantes" no funcionaron muy
bien.`,
`No era la primera vez que pasaba, pero hoy en particular el forro del
jefe vino mas hinchapelota que nunca y eso sumado a su dolor diario,
no dejaba que su mente estuviera mucho en paz.`,
//////////////////////////////////////////////////////// 14
//////////////////////////////////////////////////////////// ENTRA INTRO4 ///////////////////////
`Hogar ¡Dulce hogar!
Al fin un poco un paz y libertad.
Ahora a esperar que los nuevos calmantes que se tomo le hagan efecto.`,
"...","... ...", "... ... ...", 
`oh, oh... "¡LA PUTA MADRE! ¡NO PUEDE ESTAR PASANDO!"
Piensa él, ¡DESESPERADO! ¡ENOJADO! ¡RE PODRIDOOO!
¿Que acaso esta mierda de tormento no se piensa parar algun dia?`,
`Ya esta, ya se tomo medio frasco mas, ya es obvio que no esta funcionando
eso...
Encima ya son las 2 de la mañana y tiene que ir a trabajar mañana, no le 
queda otra que obligarse a dormir. `,
`Reza a Dios poder pasar la noche y que mañana este todo mejor, a parte, 
si ya llego hasta aca con ese dolor de mierda en la boca, ¿Por que no
llegar un dia mas? A este punto es obvio el auto-engaño que se impone, 
pero no piensa solucionarlo.`
//////////////////////////////////////////////////////// 20
//////////////////////////////////////////////////////////// ENTRA INTRO5 ///////////////////////

        ];

        const estilo = new TextStyle({
            "fill": "#101010",
            fontFamily: "Comic Sans MS",
            fontSize: 30,
            fontStyle: "italic",
            fontWeight: "bold",
            lineJoin: "round",
        });

        this.texto = new Text(this.d1[this.indiceDialogo], estilo); // Almacena una referencia al objeto de texto
        this.texto.position.set(100, 520);
        this.addChild(this.texto); // Agrega el objeto de texto al contenedor
    }

    actualizarDialogo(): void {
        if (this.indiceDialogo < this.d1.length - 1) {
            this.indiceDialogo++;
            this.texto.text = this.d1[this.indiceDialogo]; // Actualiza el texto del objeto de texto
            console.log(this.d1.length);
        }
    }
}

