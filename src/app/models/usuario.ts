export class Usuario {

    celular: string;
    email: string;
    contraseña: string;

    constructor(celular: string, contraseña: string, email: string) {
        this.celular = celular;
        this.contraseña = contraseña;
        this.email = email;
    }

}
