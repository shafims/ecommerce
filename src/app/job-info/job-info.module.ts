import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JobInfoComponent } from './job-info/job-info.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {path:'',component:JobInfoComponent}
 ];

@NgModule({
  declarations: [JobInfoComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    [RouterModule.forChild(routes)],
    NgxSpinnerModule,
    NgxSpinnerModule.forRoot({ type: 'ball-atom'})

  ]
})
export class JobInfoModule { }
