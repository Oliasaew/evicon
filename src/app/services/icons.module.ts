// All icons go here
import { NgModule } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import {
  alertCircleOutline,
  chevronForward,
  card,
  checkboxOutline,
  documentOutline,
  home,
  people,
  person,
  personCircle,
  radioButtonOnOutline,
  calendar,
  add,
  gridOutline,
  chevronExpandOutline,
  star,
  settings,
  heart,
  reorderFourOutline,
  listOutline,
  homeOutline,
  alertCircle,
  warning,
  ellipsisHorizontalOutline,
  notifications,
  logOut,
  close,
  menu,
  createOutline,
  trash,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

@NgModule({
  imports: [IonIcon],
  exports: [IonIcon],
})
export class IconsModule {
  constructor() {
    addIcons({
      documentOutline,
      radioButtonOnOutline,
      alertCircleOutline,
      card,
      checkboxOutline,
      personCircle,
      person,
      home,
      people,
      chevronForward,
      calendar,
      add,
      gridOutline,
      chevronExpandOutline,
      star,
      heart,
      settings,
      reorderFourOutline,
      listOutline,
      homeOutline,
      alertCircle,
      warning,
      ellipsisHorizontalOutline,
      notifications,
      logOut,
      close,
      menu,
      createOutline,
      trash,
    });
  }
}
