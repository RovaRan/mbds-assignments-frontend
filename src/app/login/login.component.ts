import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Md5 } from 'ts-md5';
import { response } from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  identifiantUser!: string;
  motDePasseUser!: string;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  // appelé après le constructeur et AVANT l'affichage du composant
  ngOnInit(): void { }

  login() {
    if (!this.identifiantUser || !this.motDePasseUser) return;


    let motDePasse = Md5.hashStr(this.motDePasseUser);

    this.authService.logIn(this.identifiantUser, motDePasse)
      .subscribe(reponse => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', reponse.accessToken);
        this.authService.loggedIn=true;

        this.authService.isLoggedIn.next(true);

        if(reponse.user.type.toLowerCase()==="professeur"){
          this.authService.isAdminUser=true;
        }
        const component = this.route.snapshot.queryParamMap.get('returnUrl')?.toString();
        if(component!==undefined&&component.length>0){
          const decodedComponent = decodeURIComponent(component);
          console.log(this.router.url);
          console.log(decodedComponent);
          this.router.navigate([decodedComponent]);
          return;
        }
        
        this.router.navigate(["/home"]);
      })
  }

}
