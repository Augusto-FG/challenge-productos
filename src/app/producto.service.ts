import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from './model/Producto';
import { Observable } from 'rxjs';
import { ParamMap } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
 
  constructor(private http: HttpClient) {}

  localURL = 'http://localhost:8080/productos/';
  localURLdetail = 'http://localhost:8080/detalle/';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.localURL);
  }


  findById(map: ParamMap): Observable<Producto[]> {
    const url = `${this.localURLdetail}${map.get('id')}`;
    return this.http.get<Producto[]>(url,  {headers: new HttpHeaders({'Content-Type': 'application/json'})})
  }

  create(body: string) : Observable<Producto> {
    return this.http.post<Producto>(this.localURL, body, this.httpOptions);
  }

  delete(id: number) : Observable<any> {
    return this.http.delete(this.localURL + id)
  }
  
  
}
