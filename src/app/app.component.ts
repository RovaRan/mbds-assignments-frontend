import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  titre = 'Assignments';

  loggedIn: boolean;
  isAdmin: boolean;

  subsription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private assignmentsService: AssignmentsService
  ) {}

  ngOnInit(): void {
    this.loggedIn = localStorage.getItem('isLoggedIn')==='true';

    this.isAdmin = localStorage.getItem('isAdmin')==='true';
console.log("admin ve? "+this.isAdmin);
     this.subsription = this.authService.isLoggedIn.subscribe(
      (value) => {
        this.loggedIn = value
      }
    )
    this.authService.isAdminUser.subscribe(
      (value) => {
        this.isAdmin = value
      }
    )
    console.log("admin ve 2? "+this.isAdmin);
  }
  
  onLoginLogout() {
    if (this.loggedIn) {
      console.log('je me deloggue');
      this.authService.logOut();
      // et je navigue vers la page d'accueil
      this.router.navigate(['/home']);
    } else {
      console.log('je me loggue');
      this.authService.logIn('michel', 'monpassword');
    }
  }

  isLogged() {
    return this.loggedIn;
  }

  genererDonneesDeTest() {
    //this.assignmentsService.peuplerBD();
    this.assignmentsService.peuplerBDAvecForkJoin().subscribe(() => {
      console.log(
        'TOUS LES AJOUTS ONT ETE FAITS, ON PEUT RE-AFFICHER LA LISTE'
      );
      // replaceUrl = true = force le refresh, même si
      // on est déjà sur la page d’accueil
      // Marche plus avec la dernière version d’angular
      this.router.navigate(['/home'], { replaceUrl: true });
    });
  }

  logout() {
    this.authService.logOut();

    this.router.navigate(['/user/login'], { replaceUrl: true });
  }
}
