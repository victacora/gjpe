import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../vehiculo';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { VehiculosService } from '../services/vehiculos.service';
import { TipovehiculosService } from '../services/tipovehiculos.service';
import { Observable } from 'rxjs';
import { TipoVehiculo } from '../tipoVehiculo';

@Component({
  selector: 'app-nuevovehiculo',
  templateUrl: './nuevovehiculo.page.html',
  styleUrls: ['./nuevovehiculo.page.scss'],
})
export class NuevovehiculoPage implements OnInit {

  nuevoVehiculo = {} as Vehiculo;
  tipoVehiculos !: Observable<TipoVehiculo[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private nav: NavController,
    private loadingController: LoadingController,
    private vehiculosService: VehiculosService,
    private tipoVehiculoService: TipovehiculosService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.tipoVehiculos = this.tipoVehiculoService.getTipoVehiculos();
  }

  ionViewDidEnter() {
    
  }

  nuevo(nuevoVehiculo: any) {
    this.vehiculosService.crearNuevo(nuevoVehiculo).then(() => {
      this.router.navigateByUrl("tabs/vehiculos");
      this.mostrarMensaje("Vehiculo registrado");
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
