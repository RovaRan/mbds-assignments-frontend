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
      this.getProfsList(); // Recupérer la liste des profs pour la liste déroulante
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

    getProfsList() {
      this.utilisateurService.getUtilisateur()
        .subscribe( (profs: any) => {
          this.profs = this.getProfs(profs.docs);
        })
    }

    getProfs(users: Utilisateur[]): Utilisateur[] {
      return users.filter( (user: Utilisateur) => user.type && user.type.toLowerCase() === 'professeur' ) 
    }

    // Recuperer la matiere a mettre a jour
    getMatiere() {
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