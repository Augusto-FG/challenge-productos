import { Producto } from "./Producto";

export class Carrito {

    constructor(id: number, tipo: string, estado: string) {
        this.id = id
        this.tipo = tipo
        this.estado = estado
        this.productos = []
    }

    id: number;
    tipo: string;
    estado: string;
    productos: Producto[]

}
