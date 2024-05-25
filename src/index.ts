import { Loader, Ticker } from 'pixi.js'; //importa esas librerias: application nos da el stage, y sprite es una imagen
import { assets } from './assets';
import { ManagerEscenas } from './Utilidades/ManagerEscenas';
import { Jugador } from './Escenario/Jugador';

Loader.shared.add(assets);

Loader.shared.onComplete.add(()=>{ //en esta funcion podemos agregar texto
	ManagerEscenas.iniciado();

	const jugadorticker = new Jugador();
	ManagerEscenas.cambiarEscena(jugadorticker);

	Ticker.shared.add(function(variacionframes){ //por alguna razon que logro entender pero no solucionar
		//tengo que "actualizar" o "updatear" mis escenas aca en el index, porque no se hace bien en en el "ManagerEscenas"
		jugadorticker.update(Ticker.shared.deltaMS, variacionframes);
		//si, tengo 2 funciones que hacen lo mismo pero al querer volverlas una sola, rompo todo
		//mientras mas enredado mi codigo, mas dificil es de robar (?
	})
});

Loader.shared.load();