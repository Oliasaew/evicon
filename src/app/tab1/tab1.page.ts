import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonItem, IonLabel, IonList, IonSpinner, IonItemOption, IonItemOptions, IonItemSliding, IonSearchbar, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { StudentsService } from '../services/alumnos.service';
import { CrudService } from './../services/crud.service';
import { ModalController, AlertController } from '@ionic/angular';
 import { StudentsModalComponent } from '../students-modal/students-modal.component';
 import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonButtons,
    IonCard,
    IonCardContent,
    IonList,
    IonItemSliding,
    IonItem,
    IonLabel,
    IonItemOptions,
    IonItemOption,
    IonIcon
  ],
})
export class Tab1Page {
  title: string = 'Alumnos';
  students: any[] = [];

  constructor(
    public studentsService: StudentsService,
    private modalController: ModalController,
    private crud: CrudService,
    private alertController: AlertController,
    private authService: AuthService
  ) {}
  
  ngOnInit() {
    this.studentsService.getStudents();
  }
  logout() {
    if (confirm('Estás saliendo')){
      this.authService.logout();
    }
  }
  editStudent(slidingItem: IonItemSliding, student: any) {
    slidingItem.close(); 
    this.openEditModal(student);
  }

  async deleteStudent(slidingItem: IonItemSliding, studentId: string) {
    const confirmDelete = await this.presentConfirmDeleteDialog(studentId);

    if (confirmDelete) {
      try {
        await this.crud.deleteDocument('Alumnos', studentId);
        console.log(`Alumno con matricula ${studentId} eliminado`);
        this.studentsService.getStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
    slidingItem.close(); 
  }

  async presentConfirmDeleteDialog(studentId: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const confirmAlert = this.alertController.create({
        header: 'Confirm Delete',
        message: `El alumno con la matrícula ${studentId} será eliminado, continuar?`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => resolve(false),
          },
          {
            text: 'Eliminar',
            handler: () => resolve(true),
          },
        ],
      });

      confirmAlert.then((alert) => alert.present());
    });
  }

  async openEditModal(student: any, isNew = false) {
    const modal = await this.modalController.create({
      component: StudentsModalComponent,
      componentProps: { student, isNew },
    });

    modal.onDidDismiss().then(async (data) => {
      if (data.data) {
        // Clone the form data and exclude 'id'
        const formData = { ...data.data };
        delete formData.id;
        if (isNew) {
          // Add new student
          await this.crud.addCustomDocument(
            'Alumnos',
            data.data.id,
            formData
          );
          this.studentsService.alumnos.push(data.data);
        } else {
          // Update existing student
          const index = this.studentsService.alumnos.findIndex(
            (s) => s.id === student.id
          );
          if (index > -1) {
            this.studentsService.alumnos[index] = data.data;
            // Update the Firestore document
            await this.crud.updateDocument(
              'Alumnos',
              student.id,
              formData
            );
          }
        }
      }
    });

    return await modal.present();
  }
}
