import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { ContactoService } from '../../services/contacto.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.page.html',
  styleUrls: ['./new-contact.page.scss'],
})
export class NewContactPage implements OnInit {

  private formNuevoContacto: FormGroup;
  private base64image = null;

  constructor(private formBuilder: FormBuilder,
              private contactoService: ContactoService,
              private toast:ToastController,
              private activateRoute: ActivatedRoute,
              private router:Router,
              private actionSheet: ActionSheetController,
              private camera: Camera,
              private domSanitizer: DomSanitizer,
              private file:File,
              private platform: Platform) {

    this.armaFormularioDeContacto();

  }

  ngOnInit() {
  }

  editarFotoContacto(){
    this.showActionSheet();
  }

  armaFormularioDeContacto(){
    this.formNuevoContacto = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required)
    });
  }

  submitForm(){
    if(this.formNuevoContacto.valid){
      let contacto = {
        nombre : this.formNuevoContacto.value.nombre,
        apellido : this.formNuevoContacto.value.nombre,
        telefono : this.formNuevoContacto.value.telefono
      };

      this.contactoService.altaContacto(contacto).then((data:any)=>{
        if(data.status == "200"){
          this.router.navigate(["/home"]);
          this.showToast(data.message);
        }else{
          this.showToast(data.message);
        }
      })
    }else{
      console.log("Invalido");
    }
  }

  iniciarCamara(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((pathImagen) => {
          if (this.platform.is('cordova')) {
            let fileName = pathImagen.split('/').pop();
            let path = pathImagen.substring(0, pathImagen.lastIndexOf("/") + 1);
            this.file.readAsDataURL(path, fileName)
            .then(base64File => { this.base64image = base64File; })
            .catch(() => { console.log('Error al leer el archivo'); })
          } else {
            //Si es Plataforma Browser, ya esta en Base64 la imagen
            this.base64image = 'data:image/jpeg;base64,' + pathImagen;
          }
     }, (err) => {
          console.log("error camara", err);
     });
  }

  async showToast(mensaje) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: 4000
    });
    toast.present();
  }

  async showActionSheet() {
    const actionSheet = await this.actionSheet.create({
      header: 'Seleccionar fuente',
      buttons: [{
        text: 'Camara',
        icon: 'camera-outline',
        handler: () => {
          this.iniciarCamara();
        }
      },
      {
        text: 'Cerrar',
        role: 'destructive',
        icon: 'close-outline'
      }]
    });
    await actionSheet.present();
  }

}
