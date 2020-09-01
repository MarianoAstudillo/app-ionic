import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private urlServidor = "https://ionicappserver.000webhostapp.com/api";
  
  constructor(private http: HttpClient) { }

  listarTodosContactos(){
    return new Promise(resolve => {
      this.http.get(`${this.urlServidor}/contacto/`).subscribe((data:any) => {
        resolve(data);
      }); 
    });
  }

  listarContactoPorID(id){
    return new Promise(resolve => {
      this.http.get(`${this.urlServidor}/contacto/${id}`).subscribe((data:any) => {
        resolve(data);
      }); 
    });
  }

  altaContacto(contacto){
    return new Promise(resolve => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/x-www-form-urlencoded'
        })
      };

      console.log("traza", contacto);

      const body = new HttpParams()
      .set('nombre', contacto.nombre)
      .set('apellido', contacto.apellido )
      .set('telefono', contacto.telefono );

      this.http.post(`${this.urlServidor}/contacto/`, body).subscribe((data:any) => {
        resolve(data);
      }); 
    });
  }

  editarContacto(contacto){
    return new Promise(resolve => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/x-www-form-urlencoded'
        })
      };

      const body = new HttpParams()
      .set('id', contacto.id )
      .set('nombre', contacto.nombre)
      .set('apellido', contacto.apellido )
      .set('telefono', contacto.telefono );

      this.http.post(`${this.urlServidor}/contacto/editar/`, body.toString(), httpOptions).subscribe((data:any) => {
        resolve(data);
      }); 
    });
  }

  bajaContacto(id){
    return new Promise(resolve => {
      this.http.get(`${this.urlServidor}/contacto/baja/${id}`).subscribe((data:any) => {
        resolve(data);
      }); 
    });
  }
}
