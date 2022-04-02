import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Matiere } from 'src/app/models/matiere.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatieresService } from 'src/app/shared/matieres.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // Champ de formulaire
  nomAssignment!: string;
  dateDeRendu!: Date;
  auteur?: string;
  matiere?: string;
  note?: number;
  remarque?: string;
  matieres: Matiere[] = [];

  constructor(private assignmentsService:AssignmentsService, private matieresService:MatieresService ,private router:Router) {}

  ngOnInit(): void {
    // Recuperation de la liste des matieres
    this.getMatieres();
  }

  onSubmit() {
    if((!this.nomAssignment) || (!this.dateDeRendu)) return;
    console.log(
      'nom = ' + this.nomAssignment + ' date de rendu = ' + this.dateDeRendu
    );

    let newAssignment = new Assignment();
    newAssignment.id = Math.round(Math.random()*10000000);
    newAssignment.nom = this.nomAssignment;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    newAssignment.auteur = this.auteur; // TODO: Prochainement l'etudiant
    newAssignment.matiere = this.matiere; 
    newAssignment.note = this.note;
    newAssignment.remarque = this.remarque; 

    this.assignmentsService.addAssignment(newAssignment)
    .subscribe(reponse => {
      console.log(reponse.message);

      // il va falloir naviguer (demander au router) d'afficher à nouveau la liste
      // en gros, demander de naviguer vers /home
      this.router.navigate(["/home"]);
    })
  }

  // Recuperer la liste des matieres pour le dropdown
  getMatieres() {
    this.matieresService.getMatieres().subscribe((matieres) => { this.matieres = matieres })
  }
}
