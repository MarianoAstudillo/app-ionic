import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router'

import { ContactoService } from '../../services/contacto.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private formBusqueda: FormGroup;
  private contactos = null;
  private filtrados = null;

  constructor(private router:Router,
    private formBuilder: FormBuilder,
              private contactoService:ContactoService
  ){ }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.listarContactos();
  }

  armaFormularioDeBusqueda(){
    this.formBusqueda = this.formBuilder.group({
      termino: new FormControl('', Validators.required)
    });
  }

  listarContactos(){
    this.contactoService.listarTodosContactos().then((data:any) => {
      this.contactos = data.data;
    });
  }

  buscarContacto(termino){
    if(termino){
      let resultado = [];
      for (var i=0 ; i < this.contactos.length ; i++){
          if (this.contactos[i]["nombre"] == termino) {
              resultado.push(this.contactos[i]);
          }
      }
      this.filtrados = resultado;
    }else{
      this.filtrados = null;
    }
  }

  resetContactos(event){
    event.target.value = '';
    this.filtrados = null;
  }

  navegaContacto(contacto){
    this.router.navigate(['/single-contact', contacto]);
  }

  navegarNuevoContacto(){
    this.router.navigate(['/new-contact']);
  }

}
