import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { ComponentsModule } from '../../components/components.module';
import { Utilities } from '../../services/utils.service';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage), ComponentsModule
  ],
  providers: [
    Utilities
  ]
})
export class LoginPageModule {}
