import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Vehiculo } from '../vehiculo';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  private vehiculos!: Observable<Vehiculo[]>;
  private vehiculosCollection: AngularFirestoreCollection<Vehiculo>;

  constructor(private afs: AngularFirestore) {
    this.vehiculosCollection = this.afs.collection<Vehiculo>("vehiculos");
    var snap = this.vehiculosCollection.snapshotChanges();
    console.log(snap);
    this.vehiculos = this.vehiculosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { ...data, id };
        });
      })
    );
  }

  crearNuevo(vehiculo:Vehiculo){
    console.log(vehiculo);
    return this.vehiculosCollection.add(vehiculo);
  }

  getVehiculos(): Observable<Vehiculo[]> {
    return this.vehiculos;
  }

}
