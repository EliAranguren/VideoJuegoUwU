import { Loader, Ticker } from 'pixi.js';
import { assets } from './assets';
import { ManagerEscenas } from './Utilidades/ManagerEscenas';
import { Jugador } from './Escenario/EntornoGral/Jugador';
import { Menu } from './Menuses/Menu';
import { MinijVasos } from './Escenario/Minijuegos/VASOS/MinijVasos';
import { MinijGlobos } from './Escenario/Minijuegos/GLOBOS/MinijGlobos';
import { Historia } from './Escenario/Introduccion/Historia';

/*Querido/s profe/s del curso, si ven esto les recomendaria tomarse descansos cada tanto porque
mis codigos suelen ser bastante caoticos para los demas, todo nace de que al querer separar 
las cosas me pierdo sola, no las encuentro y encima me cuesta llamarlas y hacer funcionar todo;
en lo personal es mas simple meter a la jirafa, el elefante y el rinoceronte todos juntos en
la heladera antes de tener que estar sacandolos para que entre el otro, y eso es algo que van
a ver mucho aca jajaja suerte :)*/ 

Loader.shared.add(assets);

Loader.shared.onComplete.add(() => {
    ManagerEscenas.iniciado();

    const menu = new Menu();
    ManagerEscenas.cambiarEscena(menu);

    document.addEventListener('keydown', function(event) {
        switch (event.code) {
            case 'KeyI':
                const historia = new Historia(); //ESTA VERGA NO FUNCIONABA PORQUE SE DESTRUIA 
                //LA PUTA VARIABLEEE AAAAAAAAAA
                ManagerEscenas.cambiarEscena(historia);

                Ticker.shared.add(function(variacionframes) {
                    historia.update(Ticker.shared.deltaMS, variacionframes);
                });
                break;

            case 'KeyP':
                const jugadorticker = new Jugador();
                ManagerEscenas.cambiarEscena(jugadorticker);

                Ticker.shared.add(function(variacionframes) {
                    jugadorticker.update(Ticker.shared.deltaMS, variacionframes);
                });

                break;

            case 'KeyV':
                const vasos = new MinijVasos();
                ManagerEscenas.cambiarEscena(vasos);

                Ticker.shared.add(function(variacionframes) {
                    vasos.update(Ticker.shared.deltaMS, variacionframes);
                });
                break;

            case 'KeyG':
                const globos = new MinijGlobos();
                ManagerEscenas.cambiarEscena(globos);

                Ticker.shared.add(function(variacionframes) {
                    globos.update(Ticker.shared.deltaMS, variacionframes);
                });

                break;
        }
    });


});

Loader.shared.load();