export class Facturacion {
    id: number;
    cedula: string;
    fecha: Date;
    montoTotal: number;
    subTotal: number;
    impuestos: number;
    productos: string[];
}
