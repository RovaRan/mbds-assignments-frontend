import { HttpClient } from '@angular/common/http';
import { LoggingService } from './logging.service';
import { Injectable } from '@angular/core';
import { UserLogin } from '../models/user.model';
import { FullUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  baseUrl = "http://localhost:8010/api";
  logIn(login:string, password:string) {
    // normalement il faudrait envoyer une requête sur un web service, passer le login et le password
    // et recevoir un token d'authentification, etc. etc.

    // pour le moment, si on appelle cette méthode, on ne vérifie rien et on se loggue
    return this.http.post<UserLogin>(this.baseUrl+"/user/authenticate", {identifiant:login,motDePasse:password});
    
  }

  logOut() {
    this.loggedIn = false;
    localStorage.setItem('isLoggedIn','false');    
    localStorage.removeItem('token'); 
  }

  isAdmin() {
    let isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
    //return this.loggedIn;
    return isUserAdmin;
  }

  // isAdmin().then(admin => { if(admin) { console.log("L'utilisateur est administrateur"); }})

  constructor(private loggingService: LoggingService, private http: HttpClient) {
    this.loggingService.setNiveauTrace(2);

  }
}
