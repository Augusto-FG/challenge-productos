import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarritoService } from '../carrito.service';
import { Carrito } from '../model/Carrito';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  isSubmitted = false;
  formType: string | undefined;
  carritos: Carrito[] | undefined;
  estado = "ABIERTO"

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit(): void {
    this.carritoService
      .getCarritos()
      .subscribe((data: Carrito[] | undefined) => {
        this.carritos = data;
      });
  }

  /*########### Template Driven Form ###########*/
  submitForm(form: NgForm) {
    this.isSubmitted = true;
    if (!form.valid) {
      return false;
    } else {
      this.formType = JSON.stringify(form.value);
      debugger
      this.carritoService.create(this.formType).subscribe((data) => {
        this.carritos?.push(data);
      });
      return true;
    }
  }

  eliminar(id: number) {
    this.carritoService.delete(id).subscribe(() => {
      this.carritoService
        .getCarritos()
        .subscribe((data: Carrito[] | undefined) => {
          this.carritos = data;
        });
    });
  }
  seleccionar(id: number) {
    const url = `detalle/${id}`;
    this.router.navigate([url]);
  }
}