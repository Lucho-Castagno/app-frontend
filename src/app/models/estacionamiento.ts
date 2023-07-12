import { Patente } from "./patente";

export class Estacionamiento {

    id: number;
    patente: Patente;
    importe: number;
    inicio: Date;
    fin: Date;

    constructor(id: number, patente: Patente, importe: number, inicio: Date, fin: Date) {
        this.id = id;
        this.patente = patente;
        this.importe = importe;
        this.inicio = inicio;
        this.fin = fin;
    }

}
