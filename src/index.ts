import { Loader, Ticker} from 'pixi.js'; //importa esas librerias: application nos da el stage, y sprite es una imagen
import { assets } from './assets';
import { ManagerEscenas } from './Utilidades/ManagerEscenas';
import { Jugador } from './Escenario/Jugador';
//import { Menu } from './Menuses/Menu';
//import { Teclado } from './Utilidades/Teclado';

Loader.shared.add(assets);

Loader.shared.onComplete.add(()=>{ //en esta funcion podemos agregar texto
	ManagerEscenas.iniciado();

	/*const menusito = new Menu();
	ManagerEscenas.cambiarEscena(menusito);

	Ticker.shared.add(function(variacionframes){ //por alguna razon que logro entender pero no solucionar
			menusito.update(Ticker.shared.deltaMS, variacionframes);
	})*/

	const jugadorticker = new Jugador();

	//if (Teclado.state.get("ArrowUp")){
		ManagerEscenas.cambiarEscena(jugadorticker);

		Ticker.shared.add(function(variacionframes){ //por alguna razon que logro entender pero no solucionar
		//tengo que "actualizar" o "updatear" mis escenas aca en el index, porque no se hace bien en en el "ManagerEscenas"
		//si, tengo 2 funciones que hacen lo mismo pero al querer volverlas una sola, rompo todo
		//mientras mas enredado mi codigo, mas dificil es de robar (?	
			jugadorticker.update(Ticker.shared.deltaMS, variacionframes);
		})	
	//}

});

Loader.shared.load();