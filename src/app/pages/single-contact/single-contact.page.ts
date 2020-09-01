import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ContactoService } from '../../services/contacto.service';

@Component({
  selector: 'app-single-contact',
  templateUrl: './single-contact.page.html',
  styleUrls: ['./single-contact.page.scss'],
})
export class SingleContactPage implements OnInit {

  private contacto;

  constructor(  private router: Router,
                private activateRoute:ActivatedRoute,
                private alert: AlertController,
                private contactoService: ContactoService) {

    activateRoute.params.subscribe( params => {
      this.contacto = params;
    });

  }

  ngOnInit() {
  }

  borrarContacto(){
    this.contactoService.bajaContacto(this.contacto.id).then((data:any) => {
      this.navegarHome();
    });
  }

  buttonBorrarContacto(){
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alert.create({
      cssClass: 'alert-borrar-contacto',
      header: 'Aviso',
      message: 'El contacto no podra recuperarse despues de ser borrado',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: () => {
            this.borrarContacto();
          }
        }
      ]
    });

    await alert.present();
  }

  navegarEditarContacto(){
    this.router.navigate(['/edit-contact', this.contacto]);
  }

  navegarHome(){
    this.router.navigate(['/home']);
  }

}
