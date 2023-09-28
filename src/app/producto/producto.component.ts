import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductoService } from '../producto.service';
import { Producto } from '../model/Producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  productos: Producto[] | undefined;
  isSubmitted = false;
  formType: string | undefined;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService
      .getProductos()
      .subscribe((data: Producto[] | undefined) => {
        this.productos = data;
      });
  }


  submitForm(form: NgForm) {
    this.isSubmitted = true;
    if (!form.valid) {
      return false;
    } else {
      this.formType = JSON.stringify(form.value);
      this.productoService.create(this.formType).subscribe((data) => {
        this.productos?.push(data);
      });
      return true;
    }
  }

  eliminar(id: number) {
    debugger
    this.productoService.delete(id).subscribe(
      error => console.log(error),
      () => {
      this.productoService
        .getProductos()
        .subscribe((data: Producto[] | undefined) => {
          this.productos = data;
        });
    });
  }

}
