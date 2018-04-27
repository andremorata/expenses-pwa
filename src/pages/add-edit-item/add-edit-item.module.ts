import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditItemPage } from './add-edit-item';

@NgModule({
  declarations: [
    AddEditItemPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEditItemPage),
  ],
})
export class AddEditItemPageModule {}
