import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculo } from '../vehiculo';
import { VehiculosService } from '../services/vehiculos.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
})
export class VehiculosPage implements OnInit {

  vehiculos !: Observable<Vehiculo[]>;

  constructor( private vehiculosService: VehiculosService) { }

  ngOnInit() {
    this.vehiculos = this.vehiculosService.getVehiculos();
  }

}
