import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Matiere } from 'src/app/models/matiere.model';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { MatieresService } from 'src/app/shared/matieres.service';
import { UtilisateurService } from 'src/app/shared/utilisateur.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-matiere.component.html',
})
export class AddMatiereComponent implements OnInit {

  nom: string;
  prof: string;

  profs: Utilisateur[];

  constructor(
    private utilisateurService: UtilisateurService,
    private matiereService: MatieresService,
    private router: Router,
    private snackbar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.getUtilisateurs();
  }

  onSubmit() {
    if((!this.nom) || (!this.prof)) return;

    let newMatiere = new Matiere();
    newMatiere.id = Math.round(Math.random()*10000000).toString();
    newMatiere.nom = this.nom;
    newMatiere.prof = this.prof;

    this.matiereService.addMatiere(newMatiere)
      .subscribe(reponse => {
        console.log(reponse.message);

        this.snackbar.open(reponse.message, '', {  duration: 3000 } )

      this.router.navigate(["/matiere/list"]).then(() => window.location.reload());
    })
  }

    // Recuperer la liste des profs 
    getUtilisateurs() {
      this.utilisateurService.getProfs()
        .subscribe((users: any) => {
          this.profs = this.getProfs(users)
        })
    }

    getProfs(users: Utilisateur[]): Utilisateur[] {
      return users.filter( (user: Utilisateur) => user.type && user.type.toLowerCase() === 'professeur' ) 
    }

}
    