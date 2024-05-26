import { Loader, Ticker} from 'pixi.js'; //importa esas librerias: application nos da el stage, y sprite es una imagen
import { assets } from './assets';
import { ManagerEscenas } from './Utilidades/ManagerEscenas';
import { MinijGlobos } from './Escenario/Minijuegos/MinijGlobos';

Loader.shared.add(assets);

Loader.shared.onComplete.add(()=>{ //en esta funcion podemos agregar texto
	ManagerEscenas.iniciado();

	//const pruebaJuego = new Jugador();
	const menusito = new MinijGlobos();

	ManagerEscenas.cambiarEscena(menusito); // Empezar mostrando el menú
	Ticker.shared.add(function(variacionframes){ 
		menusito.update(Ticker.shared.deltaMS, variacionframes);
	})

/*    setTimeout(() => {
        ManagerEscenas.cambiarEscena(pruebaJuego);
		Ticker.shared.add(function(variacionframes){ 
			pruebaJuego.update(Ticker.shared.deltaMS, variacionframes);
		})
		//sound.play("Circus", {loop:true, volume:0.05});
		//sound.play("Multitud", {loop:true, volume:0.05});
    }, 5000); // Cambiar escena después de 5 segundos


			Ticker.shared.add(function(variacionframes){ 
				menusito.update(Ticker.shared.deltaMS, variacionframes);
			})

	ManagerEscenas.cambiarEscena(pruebaJuego);

	Ticker.shared.add(function(variacionframes){ //por alguna razon que logro entender pero no solucionar
		//tengo que "actualizar" o "updatear" mis escenas aca en el index, porque no se hace bien en en el "ManagerEscenas"
		//si, tengo 2 funciones que hacen lo mismo pero al querer volverlas una sola, rompo todo
		//mientras mas enredado mi codigo, mas dificil es de robar (?	
		pruebaJuego.update(Ticker.shared.deltaMS, variacionframes);
	})*/
});

Loader.shared.load();