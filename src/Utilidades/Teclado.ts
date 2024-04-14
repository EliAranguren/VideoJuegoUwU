export class Teclado {
    public static readonly state: Map<string, Boolean> = new Map;

    private constructor (){}

    private static initialized:boolean = false;
    public static iniciado():void{
        if(Teclado.initialized){
            return;
        }
        Teclado.initialized = true;
        document.addEventListener("keydown",this.teclapresionada.bind (this));
        document.addEventListener("keyup",this.teclasoltada.bind (this));
    }

    private static teclapresionada(evento:KeyboardEvent) {
        Teclado.state.set(evento.code,true);
    }

    private static teclasoltada(evento:KeyboardEvent) {
        Teclado.state.set(evento.code,false);
}



}