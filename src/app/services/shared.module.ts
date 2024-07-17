import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from './icons.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonItem, IonLabel, IonList, IonSpinner, IonItemOption, IonItemOptions, IonItemSliding, IonSearchbar, IonButtons, IonIcon } from '@ionic/angular/standalone';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconsModule,
    IonIcon, 
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonButtons,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonItemOptions,
    IonItemOption,
    IonIcon,
  ],
  exports: [
    RouterModule,
    IonIcon, 
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonButtons,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonItemOptions,
    IonItemOption,
    IonIcon,
  ],
  providers: [],
})
export class SharedModule {
  constructor() {}
}
