import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { NonRenduDirective } from './shared/non-rendu.directive';
import { FormsModule } from '@angular/forms';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';

import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { MatSelectModule } from '@angular/material/select';
import { AddMatiereComponent } from './components/matiere/add-matiere/add-matiere.component';
import { ListMatiereComponent } from './components/matiere/list-matiere/list-matiere.component';
import { EditMatiereComponent } from './components/matiere/edit-matiere/edit-matiere.component';

import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptor } from './provider/interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const routes: Routes = [
  {
    path: "",
    component: AssignmentsComponent
  },
  {
    path: "home",
    component: AssignmentsComponent
  },
  {
    path: "add",
    component: AddAssignmentComponent
  },
  {
    path: "assignment/:id",
    component: AssignmentDetailComponent
  },
  {
    path: "assignment/:id/edit",
    component: EditAssignmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "users",
    component: UsersComponent
  },
  {
    path: "user/add",
    component: AddUserComponent
  },
  {
    path: "matiere/add",
    component: AddMatiereComponent
  },
  {
    path: "matiere/list",
    component: ListMatiereComponent
  },
  {
    path: "matiere/edit/:id",
    component: EditMatiereComponent
  }
  /*,
  {
    path: "user/:id",
    component: AssignmentDetailComponent
  },
  {
    path: "user/:id/edit",
    component: EditAssignmentComponent,
    canActivate: [AuthGuard]
  }*/
]
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    NonRenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    UsersComponent,
    AddUserComponent,
    LoginComponent,
    AddMatiereComponent,
    ListMatiereComponent,
    EditMatiereComponent,
  ],
  imports: [
    BrowserModule, FormsModule,
    BrowserAnimationsModule, MatButtonModule, MatIconModule, MatDividerModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule,
    MatListModule, MatCardModule, MatCheckboxModule, MatSlideToggleModule, MatTableModule,
    RouterModule.forRoot(routes), HttpClientModule, ScrollingModule,
    MatSnackBarModule
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
