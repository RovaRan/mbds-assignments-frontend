import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

    matiere: Matiere; // Normalement de type matiere

    constructor(
      private matiereService: MatieresService,
      private utilisateurService: UtilisateurService, 
      private route: ActivatedRoute,
      private router: Router){}

    ngOnInit(): void {
      this.getMatiere();
      this.getProfs(); // Recupérer la liste des profs pour la liste déroulante
    }

    onSubmit() {
      // Récupération des valeurs saisies dans le formulaire
      this.matiere.nom = this.nom;
      this.matiere.prof = this.prof;

      this.matiereService.update(this.matiere)
        .subscribe(
          response => console.log(response) // Confirmation de la mise à jour
        )

        // Redirection vers la liste des matieres
        this.router.navigate(['/matiere/list']);

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