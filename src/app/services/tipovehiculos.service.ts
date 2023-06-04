import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { TipoVehiculo } from '../tipoVehiculo';

@Injectable({
  providedIn: 'root'
})
export class TipovehiculosService {

  private tipoVehiculo!: Observable<TipoVehiculo[]>;
  private tipoVehiculoCollection: AngularFirestoreCollection<TipoVehiculo>;

  constructor(private afs: AngularFirestore) {
    this.tipoVehiculoCollection = this.afs.collection<TipoVehiculo>("tipos");
    var snap = this.tipoVehiculoCollection.snapshotChanges();
    console.log(snap);
    this.tipoVehiculo = this.tipoVehiculoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { ...data, id };
        });
      })
    );
  }
  crearNuevo(tipo:TipoVehiculo){
    console.log(tipo);
    return this.tipoVehiculoCollection.add(tipo);
  }

  getTipoVehiculos(): Observable<TipoVehiculo[]> {
    return this.tipoVehiculo;
  }
}
