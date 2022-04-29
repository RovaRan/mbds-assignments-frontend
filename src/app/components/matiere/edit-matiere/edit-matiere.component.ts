import { Component, OnInit } from '@angular/core';
import { matSelectAnimations } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Matiere } from 'src/app/models/matiere.model';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { MatieresService } from 'src/app/shared/matieres.service';
import { UtilisateurService } from 'src/app/shared/utilisateur.service';

@Component({
  selector: 'edit-add-assignment',
  templateUrl: './edit-matiere.component.html',
})
export class EditMatiereComponent implements OnInit {

    nom: string;
    prof: string;

    // Liste des professeurs
    profs: Utilisateur[];

    matiere: any; // Normalement de type matiere

    constructor(
      private matiereService: MatieresService,
      private utilisateurService: UtilisateurService, 
      private route: ActivatedRoute){}

    ngOnInit(): void {
      this.getMatiere();
      console.log(' nom ', this.nom)

      this.getProfs(); // Recupérer la liste des profs pour la liste déroulante

      // this.buildMatieresList(); // Utiliser le nom du prof a la place de l'id
    }

    onSubmit() {
      console.log(' form submitted ')
    }

    // Recuperer la liste des profs 
    getProfs() {
      this.utilisateurService.getProfs() // retourne la liste des utilisateurs
        .subscribe( (profs: any) => {
          this.profs = profs
        })
    }

    // Recuperer la matiere a mettre a jour
    getMatiere() {
      // on récupère l'id dans le snapshot passé par le routeur
      // le "+" force l'id de type string en "number"
      const id = this.route.snapshot.params['id'];
  
      this.matiereService.getMatiere(id).subscribe((matiere) => {
        if (!matiere) return;
  
        this.matiere = matiere;
  
        // Pour pré-remplir le formulaire
        this.nom = matiere.nom;
        this.prof = matiere.prof;

      });
    }
}