import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { ContactoService } from '../../services/contacto.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {

  private formEditarContacto: FormGroup;
  private contacto;

  constructor(private formBuilder: FormBuilder,
              private activateRoute: ActivatedRoute,
              private contactoService: ContactoService,
              private router:Router,
              private toast:ToastController) {

    activateRoute.params.subscribe( params => {
      this.contacto = params;
      this.armaFormularioDeContacto(params);
    });

    
  }

  ngOnInit() {
  }

  armaFormularioDeContacto(contacto){
    this.formEditarContacto = this.formBuilder.group({
      nombre: new FormControl(contacto.nombre, Validators.required),
      apellido: new FormControl(contacto.apellido, Validators.required),
      telefono: new FormControl(contacto.telefono, Validators.required)
    });
  }

  submitForm(){
    if(this.formEditarContacto.valid){
      let contacto = {...this.contacto};
      contacto.nombre = this.formEditarContacto.value.nombre;
      contacto.apellido = this.formEditarContacto.value.apellido;
      contacto.telefono = this.formEditarContacto.value.telefono;

      this.contactoService.editarContacto(contacto).then((data:any)=>{
        if(data.status == "200"){
          this.router.navigate(["/single-contact", contacto])
          this.showToast(data.message);
        }else{
          this.showToast(data.message);
        }
      });
    }else{
      console.log("Invalido");
    }
  }

  async showToast(mensaje) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: 4000
    });
    toast.present();
  }

}
