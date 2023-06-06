import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

import { revision} from '../revision';
import { RevisionesService } from '../services/revisiones.service';
import { RevisionesPageModule } from '../revisiones/revisiones.module';

@Component({
  selector: 'app-nuevarevision',
  templateUrl: './nuevarevision.page.html',
  styleUrls: ['./nuevarevision.page.scss'],
})
export class NuevarevisionPage implements OnInit {

  nuevaRevision = {} as revision;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private nav: NavController,
    private loadingController: LoadingController,
    private RevisionService: RevisionesService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    console.log('El componente de Nueva Revision se ha inicializado.');
  }

  nueva_revision(nuevaRevision: any) {
    this.mostrarMensaje('Guardando...');
    this.RevisionService.CrearRevision(this.nuevaRevision).then(() => {
      this.router.navigateByUrl('/tabs/revisiones');
      this.mostrarMensaje("Reision registrada");
      this.nuevaRevision = {} as revision;
    }, err => {
      this.mostrarMensaje("Ocurrio un error.");
    });
  }

  mostrarMensaje(mensaje: string) {
    this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    }).then(toast => toast.present());
  }

}
