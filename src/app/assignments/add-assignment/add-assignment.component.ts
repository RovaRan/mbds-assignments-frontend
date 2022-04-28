import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatieresService } from 'src/app/shared/matieres.service';
import { UtilisateurService } from 'src/app/shared/utilisateur.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  nomAssignment!: string;
  dateDeRendu!: Date;
  etudiant: string;
  matiere: string;
  note: number;

  matieres: any;
  utilisateurs: any;
  etudiants: any;
  

  constructor(
    private assignmentsService:AssignmentsService, 
    private router:Router, 
    private matieresService: MatieresService,
    private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.getMatieres();
    this.getUtilisateurs();
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
    newAssignment.etudiant = this.etudiant;
    newAssignment.matiere = this.matiere;
    newAssignment.note = this.note;

    this.assignmentsService.addAssignment(newAssignment)
    .subscribe(reponse => {
      console.log(reponse.message);

      // il va falloir naviguer (demander au router) d'afficher à nouveau la liste
      // en gros, demander de naviguer vers /home
      this.router.navigate(["/home"]);
    })
  }

  // Recuperer la liste des matieres
  getMatieres() {
    this.matieresService.getMatieres()
    .subscribe((matieres) => {
      this.matieres = matieres.docs
    })
  }

  // Recuperer la liste des utilisateurs 
  getUtilisateurs() {
    this.utilisateurService.getUtilisateur()
      .subscribe((users) => {
        this.etudiants = users.docs // Ajouter un tri pour n avoir que les etudiants (non les professeurs)
      })
  }

}
