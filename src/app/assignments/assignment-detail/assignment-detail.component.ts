import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis?: Assignment;
  loggedIn: boolean;
  
  constructor(
    private assignmentsService: AssignmentsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.authService.isLoggedIn.subscribe((value) => this.loggedIn = value);
    this.getAssignment(id);
  }

  getAssignment(id: number) {
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignmentTransmis = assignment;
    });
  }

  onAssignmentRendu() {
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;

      this.assignmentsService
        .updateAssignment(this.assignmentTransmis)
        .subscribe((reponse) => {
          console.log(reponse.message);
          // et on navigue vers la page d'accueil pour afficher la liste
          this.router.navigate(['/home']);
        });
    }
  }

  onDelete() {
    if (!this.assignmentTransmis) return;

    this.assignmentsService
      .deleteAssignment(this.assignmentTransmis)
      .subscribe((reponse) => {
        console.log(reponse.message);
        // et on navigue vers la page d'accueil pour afficher la liste
        this.router.navigate(['/home']);
      });
  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.assignmentTransmis?.id, 'edit'], {
      queryParams: {
        name: 'Michel Buffa',
        job: 'Professeur',
      },
      fragment: 'edition',
    });
  }


}
