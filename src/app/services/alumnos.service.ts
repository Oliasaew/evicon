import { Auth } from 'firebase/auth';
import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  Firestore,
} from '@firebase/firestore/lite';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private db: Firestore;
  public isLoading: boolean = false;
  public alumnos: any[] = [];
  public results: any[] = [];
  public noResultsFound = false;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController
  ) {
    this.db = getFirestore(this.authService.getApp);
  }

  async presentLoading() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Cargando',
    });
    await loading.present();

    return loading;
  }

  async dismissLoading() {
    this.isLoading = false;
    await this.loadingController.dismiss();
  }

  async getStudents() {
    this.presentLoading();
    const querySnapshot = await getDocs(collection(this.db, 'Alumnos'));
    this.alumnos = this.results = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    this.dismissLoading();
  }

  public async handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.alumnos.filter((alumnos) => {
      return (
        alumnos['Nombre'].toLowerCase().indexOf(query) > -1 ||
        alumnos['app'].toLowerCase().indexOf(query) > -1 ||
        alumnos['apm'].toLowerCase().indexOf(query) > -1 ||
        alumnos['Email'].toLowerCase().indexOf(query) > -1
      );
    });

    this.noResultsFound = this.results.length === 0;
  }
}

