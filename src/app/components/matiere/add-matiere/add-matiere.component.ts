import { Component, OnInit } from '@angular/core';
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
    private matiereService: MatieresService) {

  }

  ngOnInit(): void {
    this.getUtilisateurs();
  }

  onSubmit() {
    // if((!this.nomAssignment) || (!this.dateDeRendu)) return;
    // console.log(
    //   'nom = ' + this.nomAssignment + ' date de rendu = ' + this.dateDeRendu
    // );

    let newMatiere = new Matiere();
    newMatiere.id = Math.round(Math.random()*10000000).toString();
    newMatiere.nom = this.nom;
    newMatiere.prof = this.prof;
    console.log( this.prof , '  pojcpejzoepivhzpievip')

    console.log(newMatiere, ' matiere vao ')

    this.matiereService.addMatiere(newMatiere)
      .subscribe(reponse => {
        console.log(reponse.message);

      // this.router.navigate(["/matiere/list"]);
    })
  }

    // Recuperer la liste des profs 
    getUtilisateurs() {
      this.utilisateurService.getProfs()
        .subscribe((users: any) => {
          console.log(users)
          this.profs = users // Ajouter un tri pour n avoir que les professeurs
        })

        // this.getProfs()
    }

    getProfs(users: Utilisateur[]) {
      let profs = [];
      users.map( 
        (user: Utilisateur) => {
          if( user.type ) {
            console.log('user manana type: ', user)
            // if( user.type.localeCompare('Professeur') == 0 ) {
            //   console.log(user, 'professeur iray indray ity')
            //   profs.push(user)
            // }
          }
        }
      )
    }

}
    