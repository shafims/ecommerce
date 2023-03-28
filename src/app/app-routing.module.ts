
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { NgxSpinnerModule } from 'ngx-spinner';


const routes: Routes = [
  
  {
    path: 'login',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
    pathMatch:'full',
    
  },
  {
    path: '',
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule),
    pathMatch:'full',
    canActivate:[AuthGuardService]
  },
  {
    path: 'jobs',
    loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule),
    pathMatch:'full',
    canActivate:[AuthGuardService]
  },
  
  // {
  //   path:'**',
  //   loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule),
  //   // pathMatch:'full'
  // }
];

@NgModule({
  declarations:[
  ],
  imports: [
    MatIconModule,MatButtonModule,
    ReactiveFormsModule, FormsModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    NgxSpinnerModule,
    RouterModule.forRoot(routes),
    NgxSpinnerModule.forRoot({ type: 'ball-atom'})
  ],
  providers: [AuthGuardService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
