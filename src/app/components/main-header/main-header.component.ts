import { Component } from "@angular/core";
import { Router } from "express";
import { AssignmentsService } from "src/app/shared/assignments.service";
import { AuthService } from "src/app/shared/auth.service";

@Component({
    selector: 'main-header',
    templateUrl: './main-header.component.html',
    // styleUrls: ['./main-header.component.css'],
  })

export class MainHeaderComponent {

  titre = "titre"

  constructor(private authService: AuthService,
    private router: Router,
    private assignmentsService: AssignmentsService) {}

}