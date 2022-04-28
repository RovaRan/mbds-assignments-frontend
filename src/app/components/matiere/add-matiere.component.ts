import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { UtilisateurService } from 'src/app/shared/utilisateur.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-matiere.component.html',
})
export class AddMatiereComponent implements OnInit {

  prof: string;

  profs: Utilisateur[];

  constructor(private utilisateurService: UtilisateurService) {

  }

  ngOnInit(): void {
    this.getUtilisateurs();
  }

  onSubmit() {
    console.log(
      'le prof responsable ', this.prof
    );
  }

    // Recuperer la liste des profs 
    getUtilisateurs() {
      this.utilisateurService.getUtilisateur()
        .subscribe((users) => {
          this.profs = users.docs // Ajouter un tri pour n avoir que les professeurs
        })
    }

}
    