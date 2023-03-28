import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../homepage/home-page/home-page.component';
import { HeaderComponent } from '../header/header.component';
import { JobsComponent } from './jobs.component';
import { JobInfoComponent } from './job-info/job-info.component';
import { CoonectionLostComponent } from './coonection-lost/coonection-lost.component';
import { AuthGuardService } from '../auth-guard.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

const routes: Routes = [
  {path:'',component:JobsComponent,canActivate:[AuthGuardService]},
  {path:'jobs/:id',component:JobInfoComponent,canActivate:[AuthGuardService]},
];

@NgModule({
  declarations: [
    JobsComponent,
    JobInfoComponent,
    CoonectionLostComponent,
  ],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    [RouterModule.forChild(routes)],
    CommonModule,
    NgxSpinnerModule.forRoot({ type: 'ball-atom'})
  ],
  providers:[AuthGuardService]
})
export class JobsModule { }
