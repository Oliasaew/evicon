import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonItem, IonLabel, IonList, IonSpinner, IonItemOption, IonItemOptions, IonItemSliding, IonSearchbar, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { StudentsService } from '../services/alumnos.service';
import { CrudService } from './../services/crud.service';
import { ModalController, AlertController } from '@ionic/angular';
 import { StudentsModalComponent } from '../students-modal/students-modal.component';

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
  title: string = 'Estudiantes';
  students: any[] = [];

  constructor(
    public studentsService: StudentsService,
    private modalController: ModalController,
    private crud: CrudService,
    private alertController: AlertController
  ) {}
  
  ngOnInit() {
    this.studentsService.getStudents();
  }

  editStudent(slidingItem: IonItemSliding, student: any) {
    slidingItem.close(); // Close the sliding item
    this.openEditModal(student);
  }

  async deleteStudent(slidingItem: IonItemSliding, studentId: string) {
    const confirmDelete = await this.presentConfirmDeleteDialog(studentId);

    if (confirmDelete) {
      try {
        await this.crud.deleteDocument('estudiantes', studentId);
        // Optionally, update UI or provide feedback to the user
        console.log(`Student ${studentId} successfully deleted.`);
        this.studentsService.getStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
        // Handle specific errors or provide user-friendly feedback
      }
    }
    slidingItem.close(); // Close the sliding item
  }

  async presentConfirmDeleteDialog(studentId: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const confirmAlert = this.alertController.create({
        header: 'Confirm Delete',
        message: `Are you sure you want to delete the entry: ${studentId}?`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => resolve(false),
          },
          {
            text: 'Delete',
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
            'estudiantes',
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
              'estudiantes',
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
