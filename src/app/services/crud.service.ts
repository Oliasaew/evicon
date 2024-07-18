import { Injectable } from '@angular/core';
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  Firestore,
} from '@firebase/firestore/lite';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private firestore: Firestore;

  constructor(private firebaseService: AuthService) {
    this.firestore = getFirestore(this.firebaseService.getApp);
  }

  async addDocument(collectionName: string, data: any): Promise<String> {
    try {
      const docRef = await addDoc(
        collection(this.firestore, collectionName),
        data
      );
      console.log('Alumno agregado con matricula:', docRef.id);
      return docRef.id; 
    } catch (error) {
      throw error;
    }
  }

  async addCustomDocument(
    collectionName: string,
    documentId: string,
    data: any
  ): Promise<void> {
    try {
      const docRef = doc(this.firestore, `${collectionName}/${documentId}`);
      await setDoc(docRef, data);
      console.log(`Alumno con matricula ${documentId} agregado exitosamente`);
    } catch (error) {
      console.error('Error agregando alumno:', error);
      throw error;
    }
  }

  async getDocument(collectionName: string, documentId: string): Promise<any> {
    const colRef = collection(this.firestore, collectionName);
    const docRef = doc(colRef, documentId);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No existe un alumno con esa matricula');
      return null;
    }
  }

  async updateDocument(
    collectionName: string,
    documentId: string,
    data: any
  ): Promise<void> {
    try {
      const docRef = doc(this.firestore, `${collectionName}/${documentId}`);
      await updateDoc(docRef, data);
      console.log('Alumno actualizado');
    } catch (error) {
      console.error('Error actualizando:', error);
      throw error;
    }
  }

  async deleteDocument(
    collectionName: string,
    documentId: string
  ): Promise<void> {
    try {
      const docRef = doc(this.firestore, `${collectionName}/${documentId}`);
      await deleteDoc(docRef);
      console.log('Alumno eliminado');
    } catch (error) {
      console.error('Error eliminando:', error);
      throw error;
    }
  }
}
