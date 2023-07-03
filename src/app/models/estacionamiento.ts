export class Estacionamiento {

    id: number;
    id_patente: number;
    celular: string;
    importe: number;
    inicio: Date;
    fin: Date;

    constructor(id: number, id_patente: number, celular: string, importe: number, inicio: Date, fin: Date) {
        this.id = id;
        this.id_patente = id_patente;
        this.celular = celular;
        this.importe = importe;
        this.inicio = inicio;
        this.fin = fin;
    }

}
