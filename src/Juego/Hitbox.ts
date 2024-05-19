import { Rectangle } from "pixi.js";

export interface Hitbox {

    damelimites(): Rectangle;
}

export function colision (A:Hitbox, B: Hitbox): Rectangle | null {

    const rectA = A.damelimites();
    const rectB = B.damelimites();

    const DereMasaIzqui = rectA.left < rectB.left ? rectB.left : rectA.left;
    const IzquiMasaDere = rectA.right > rectB.right ? rectB.right : rectA.right;
    const AbaMasaArri = rectA.top < rectB.top ? rectB.top : rectA.top;
    const ArriMasaAba = rectA.bottom > rectB.bottom ? rectB.bottom : rectA.bottom;

    if(DereMasaIzqui < IzquiMasaDere && AbaMasaArri < ArriMasaAba) { //magia negra de programacion, el profe se entendio

        const valores = new Rectangle();

        valores.x = DereMasaIzqui; 
        valores.y = AbaMasaArri;
        valores.width = IzquiMasaDere - DereMasaIzqui;
        valores.height = ArriMasaAba - AbaMasaArri;

        return valores;
    } else {
        return null;
    }
}