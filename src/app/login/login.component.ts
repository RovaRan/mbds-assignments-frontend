import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  identifiantUser!: string;
  motDePasseUser!: string;

  constructor(private authService: AuthService, private router: Router) { }

  // appelé après le constructeur et AVANT l'affichage du composant
  ngOnInit(): void { }

  login() {
    if (!this.identifiantUser || !this.motDePasseUser) return;


    let motDePasse = Md5.hashStr(this.motDePasseUser);

    this.authService.logIn(this.identifiantUser, motDePasse)
      .subscribe(reponse => {
        //console.log(reponse.message);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', reponse.accessToken);
        // il va falloir naviguer (demander au router) d'afficher à nouveau la liste
        // en gros, demander de naviguer vers /home
        this.router.navigate(["/home"]);
      })
  }

}
