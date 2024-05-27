import { Loader, Ticker } from 'pixi.js';
import { assets } from './assets';
import { ManagerEscenas } from './Utilidades/ManagerEscenas';
import { Jugador } from './Escenario/Jugador';
import { Menu } from './Menuses/Menu';
import { MinijVasos } from './Escenario/Minijuegos/VASOS/MinijVasos';
import { MinijGlobos } from './Escenario/Minijuegos/GLOBOS/MinijGlobos';
import { Historia } from './Escenario/Introduccion/Historia';
import { sound } from '@pixi/sound';

let spacebarPressed = false;
let numOnePressed = false;
let numTwoPressed = false;
let numThreePressed = false;

Loader.shared.add(assets);

Loader.shared.onComplete.add(() => {
    ManagerEscenas.iniciado();

    const menusito = new Menu();
    ManagerEscenas.cambiarEscena(menusito);

    Ticker.shared.add((variacionframes) => {
        menusito.update(Ticker.shared.deltaMS, variacionframes);
    });

    const jugadorticker = new Jugador();
    const vasos = new MinijVasos();
    const globos = new MinijGlobos();
    const historia = new Historia();

    document.addEventListener('keydown', function(event) {
        if (event.code === 'KeyI' && !spacebarPressed) {
            if (!spacebarPressed) {
                spacebarPressed = true;
                ManagerEscenas.cambiarEscena(historia);
                Ticker.shared.add(function(variacionframes) {
                    historia.update(Ticker.shared.deltaMS, variacionframes);
                });
            }
        }
    });

    document.addEventListener('keydown', function(event) {
            if (event.code === 'KeyP' && !numOnePressed) {
                numOnePressed = true;
				sound.play("Circus", {loop:true, volume:0.5});

                ManagerEscenas.cambiarEscena(jugadorticker);
                Ticker.shared.add(function(variacionframes) {
                    jugadorticker.update(Ticker.shared.deltaMS, variacionframes);
                });

            } 
            if (event.code === 'KeyV' && !numTwoPressed) {
                numTwoPressed = true;

                ManagerEscenas.cambiarEscena(vasos);
                Ticker.shared.add(function(variacionframes) {
                    vasos.update(Ticker.shared.deltaMS, variacionframes);
                });
            } 
            if (event.code === 'KeyG' && !numThreePressed) {
                numThreePressed = true;

                ManagerEscenas.cambiarEscena(globos);
                Ticker.shared.add(function(variacionframes) {
                    globos.update(Ticker.shared.deltaMS, variacionframes);
                });
            }
    });

});

Loader.shared.load();
