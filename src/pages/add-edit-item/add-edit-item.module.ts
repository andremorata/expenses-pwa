import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditItemPage } from './add-edit-item';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    AddEditItemPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEditItemPage), TextMaskModule
  ],
})
export class AddEditItemPageModule {}
