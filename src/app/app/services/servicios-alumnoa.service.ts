import { Auth } from 'firebase/auth';
import { AuthService } from './../../auth/auth.service';
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
  public students: any[] = [];
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
      message: 'Loading...',
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
    const querySnapshot = await getDocs(collection(this.db, 'estudiantes'));
    this.students = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    this.dismissLoading();
  }

  public async handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.students.filter((student) => {
      return (
        student.name.toLowerCase().indexOf(query) > -1 ||
        student.apepat.toLowerCase().indexOf(query) > -1 ||
        student.apemat.toLowerCase().indexOf(query) > -1 ||
        student.email.toLowerCase().indexOf(query) > -1
      );
    });

    this.noResultsFound = this.results.length === 0;
  }
}

