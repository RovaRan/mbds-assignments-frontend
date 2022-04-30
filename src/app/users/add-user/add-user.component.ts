import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/users.service';
import { FullUser } from '../../models/user.model';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  // Champ de formulaire
  nomUser!: string;
  photoUser?: string;
  typeUser!: string;
  identifiantUser!: string;
  motDePasseUser!: string;
  confirmerMotDePasseUser!: string;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit() {
    if ((!this.nomUser) || (!this.typeUser) || !this.identifiantUser || !this.motDePasseUser) return;
    if (!this.photoUser) {
      this.photoUser = "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";
    }
   
    let newUser = new FullUser();
    newUser.nom = this.nomUser;
    newUser.photoUrl = this.photoUser;
    newUser.type = this.typeUser;
    newUser.identifiant = this.identifiantUser;
    newUser.motDePasse = Md5.hashStr(this.motDePasseUser);

    this.usersService.addUserFullInfo(newUser)
      .subscribe(reponse => {
        console.log(reponse.message);

        // il va falloir naviguer (demander au router) d'afficher à nouveau la liste
        // en gros, demander de naviguer vers /home
        this.router.navigate(["/home"]);
      })
  }
}
