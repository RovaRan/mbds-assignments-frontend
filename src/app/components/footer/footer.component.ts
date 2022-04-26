import { Component } from "@angular/core";
import { Router } from "express";
import { AssignmentsService } from "src/app/shared/assignments.service";
import { AuthService } from "src/app/shared/auth.service";

@Component({
    selector: 'ass-footer',
    templateUrl: './footer.component.html',
  })

export class FooterComponent {

  titre = "titre"

  constructor(private authService: AuthService,
    private router: Router,
    private assignmentsService: AssignmentsService) {}

}