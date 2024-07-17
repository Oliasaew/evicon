import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonList, IonItem, IonLabel, IonInput, IonFooter, IonCard, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-students-modal',
  templateUrl: './students-modal.component.html',
  styleUrls: ['./students-modal.component.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCard,
    IonFooter,
    IonInput,
    IonLabel,
    IonItem,
    IonList,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class StudentsModalComponent {
  @Input() student: any;
  @Input() isNew: boolean = false;
  studentForm!: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // Initialize the form
    this.studentForm = this.formBuilder.group({
      id: [
        { value: this.student?.id || '', disabled: !this.isNew },
        [Validators.required, Validators.pattern('^[0-9]{9}$')],
      ],
      name: [this.student?.name || '', Validators.required],
      apepat: [this.student?.apepat || '', Validators.required],
      apemat: [this.student?.apemat || '', Validators.required],
      email: [
        this.student?.email || '',
        [Validators.required, Validators.email],
      ],
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  save() {
    if (this.studentForm.valid) {
      // Pass the form values, including the disabled ID field, back to the caller
      this.modalController.dismiss(this.studentForm.getRawValue());
    }
  }
}
