import { NgModule } from '@angular/core';
import { BrowserModule,Title  } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from './auth-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuardService } from './auth-guard.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { JobsModule } from './jobs/jobs.module';
import { NotFoundModule } from './not-found/not-found.module';
import { MatButtonModule } from '@angular/material/button';
import { HomepageModule } from './homepage/homepage.module';
import { MatTooltipModule } from '@angular/material/tooltip';

// import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    AuthenticationModule,
    HomepageModule,
    JobsModule,
    NotFoundModule
  ],
providers: [
  AuthServiceService,
  CookieService,
  AuthGuardService,
  Title
],
  bootstrap: [AppComponent]
})
export class AppModule { }
