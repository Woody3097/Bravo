import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { VerificationComponent } from './auth/verification/verification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './shared/services/auth.service';
import { MainModule } from './main/main.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RegistrationCompleteComponent } from './auth/registration-complete/registration-complete.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalComponent } from './components/modals/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditCustomerModalComponent } from './components/modals/edit-customer-modal/edit-customer-modal.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './shared/store/reducers/side-bar.reducer';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EditCatalogModalComponent } from './components/modals/edit-catalog-modal/edit-catalog-modal.component';
import { AddCatalogModalComponent } from './components/modals/add-catalog-modal/add-catalog-modal.component';
import { DeleteCatalogModalComponent } from './components/modals/delete-catalog-modal/delete-catalog-modal.component';
import { ReplaceCatalogModalComponent } from './components/modals/replace-catalog-modal/replace-catalog-modal.component';
import { ngfModule } from 'angular-file';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    VerificationComponent,
    RegistrationCompleteComponent,
    ModalComponent,
    EditCustomerModalComponent,
    EditCatalogModalComponent,
    AddCatalogModalComponent,
    DeleteCatalogModalComponent,
    ReplaceCatalogModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MainModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    StoreModule.forRoot({ SideBar: reducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    ngfModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
