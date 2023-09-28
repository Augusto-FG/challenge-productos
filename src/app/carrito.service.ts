import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrito } from './model/Carrito';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ParamMap } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  constructor(private http: HttpClient) {}

  localURL = 'http://localhost:8080/carritos/';
  localURLDetalle = 'http://localhost:8080/detalle/';
  localURLComprar = 'http://localhost:8080/comprar/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getCarritos(): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(this.localURL);
  }

  create(body: string): Observable<Carrito> {
    return this.http.post<Carrito>(this.localURL, body, this.httpOptions);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.localURL + id);
  }

  findById(map: ParamMap): Observable<Carrito> {
    const url = `${this.localURL}${map.get('id')}`;
    return this.http.get<Carrito>(url, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
  agregarProducto(
    carritoId: string | undefined,
    productoId: number
  ): Observable<Carrito> {
    const body = { carritoId: carritoId, productoId: productoId };
    return this.http.post<Carrito>(
      this.localURLDetalle,
      body,
      this.httpOptions
    );
  }

  comprar(carritoId: string | undefined) : Observable<Carrito> {
    const body = { "carritoId": carritoId };
    debugger
    return this.http.post<Carrito>(
      this.localURLComprar,
      body,
      this.httpOptions
    );
  }
  
}
