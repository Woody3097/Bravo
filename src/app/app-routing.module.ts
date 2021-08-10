import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegistrationComponent } from "./auth/registration/registration.component";
import { LoginComponent } from "./auth/login/login.component";
import {VerificationComponent} from "./auth/verification/verification.component";
import {MainComponent} from "./main/main.component";
import {RegistrationCompleteComponent} from "./auth/registration-complete/registration-complete.component";

const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'verification',
    component: VerificationComponent
  },
  {
    path: 'registration-complete',
    component: RegistrationCompleteComponent
  },
  {
    path: "main",
    redirectTo: "main/customers"
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
