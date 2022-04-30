import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatieresService } from 'src/app/shared/matieres.service';
import { UtilisateurService } from 'src/app/shared/utilisateur.service';
import { Assignment } from '../assignment.model';
import { Matiere } from '../../models/matiere.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  nomAssignment!: string;
  dateDeRendu!: Date;
  etudiant: string[];
  matiere: string;
  note: number;

  matieres: any;
  utilisateurs: any;
  etudiants: any;


  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private matieresService: MatieresService,
    private utilisateurService: UtilisateurService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMatieres();
    this.getUtilisateurs();
  }

  onSubmit() {
    if ((!this.nomAssignment) || (!this.dateDeRendu)) return;
    console.log(
      'nom = ' + this.nomAssignment + ' date de rendu = ' + this.dateDeRendu
    );

    

    let existingMatiere = new Matiere();
    existingMatiere._id = this.matiere;
    existingMatiere.etudiants = this.etudiant;
    let newAssignment = new Assignment();
    //newAssignment.id = Math.round(Math.random() * 10000000);
    newAssignment.nom = this.nomAssignment;
    newAssignment.dateDeRendu = this.dateDeRendu;

    this.matieresService.update(existingMatiere)
      .subscribe(reponse => {
        //console.log(reponse.message);
        //this.snackbar.open(reponse.message, '', {  duration: 3000 } )
      
    //newAssignment.rendu = false;
   // newAssignment.etudiant = this.etudiant;
    //newAssignment.matiere = this.matiere;
    //newAssignment.note = this.note;
    //console.log("eto");
 
    console.log(newAssignment);
    //console.log("vita");
        this.assignmentsService.createAssigments(newAssignment, reponse.result._id).subscribe(reponse => {
          //console.log(reponse.message);
          this.snackbar.open(reponse.message, '', { duration: 3000 })
          this.router.navigate(["/home"]);
        })
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
        this.etudiants = users.docs.filter((user: Utilisateur) => user.type && user.type.toLowerCase() === 'etudiant')
      })
  }

}
