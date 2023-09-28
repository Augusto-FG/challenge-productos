import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../carrito.service';
import { Producto } from '../model/Producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  productos: Producto[] | undefined;
  catalogo: Producto[] | undefined;
  carritoId: string | undefined;
  total: number | undefined;
  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.total = 0;
    this.route.paramMap.subscribe((params) => {
      this.carritoId = params.get('id')?.toString();
      this.productoService.findById(params).subscribe((data: Producto[]) => {
        this.productos = data;
        this.total = 0;
        let tot1:number = 0!; 
        data.forEach(
          (x) => (tot1 = tot1 + x.precio)
        );
        this.total = tot1
      });
    });

    this.productoService
      .getProductos()
      .subscribe((data: Producto[] | undefined) => {
        this.catalogo = data;
      });
  }

  comprar(): void {
    this.carritoService
      .comprar(this.carritoId)
      .subscribe((carrito) => {
        this.productos = [];
        this.total = 0
      });  
  }

  seleccionar(productoId: number): void {
    this.carritoService
      .agregarProducto(this.carritoId, productoId)
      .subscribe((carrito) => {
        this.productos = [];
        carrito.productos.forEach((itemProducto) => {
          this.productos?.push(itemProducto);
          this.total = this.total ? this.total + itemProducto.precio : itemProducto.precio;
        });
      });
  }
}
