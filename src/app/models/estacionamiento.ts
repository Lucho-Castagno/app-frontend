import { Patente } from "./patente";
import { Usuario } from "./usuario";

export class Estacionamiento {

    id: number;
    patente: Patente;
    usuario: Usuario;
    importe: number;
    inicio: Date;
    fin: Date;

    constructor(id: number, patente: Patente, usuario: Usuario, importe: number, inicio: Date, fin: Date) {
        this.id = id;
        this.patente = patente;
        this.usuario = usuario;
        this.importe = importe;
        this.inicio = inicio;
        this.fin = fin;
    }

}
