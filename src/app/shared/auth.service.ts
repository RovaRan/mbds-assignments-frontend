import { HttpClient } from '@angular/common/http';
import { LoggingService } from './logging.service';
import { Injectable } from '@angular/core';
import { UserLogin } from '../models/user.model';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = new BehaviorSubject<boolean>(false);
  isAdminUser = new BehaviorSubject<boolean>(false);

  //loggedIn: boolean;
  isAdminUse=false;
  baseUrl = environment.apiUrl;
  logIn(login:string, password:string) {
    // normalement il faudrait envoyer une requête sur un web service, passer le login et le password
    // et recevoir un token d'authentification, etc. etc.

    // pour le moment, si on appelle cette méthode, on ne vérifie rien et on se loggue
    return this.http.post<UserLogin>(this.baseUrl+"/user/authenticate", {identifiant:login,motDePasse:password});
    
  }

  logOut() {
    //this.loggedIn = false;
    localStorage.setItem('isLoggedIn','false');    
    localStorage.removeItem('token'); 
    this.isLoggedIn.next(false);
  }

  isAdmin() {
    //console.log(this.isAdminUser);
    let isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.isAdminUser.next(true));
    });
    //return this.loggedIn;
    return isUserAdmin;
  }

  isLogged(){
    let isLogged = new Promise((resolve, reject) => {
      resolve(this.isLoggedIn.next(true));
    });
    //return this.loggedIn;
    return isLogged;
    //return {isAdmin:true,isLogged:true};
  }

  // isAdmin().then(admin => { if(admin) { console.log("L'utilisateur est administrateur"); }})

  constructor(private loggingService: LoggingService, private http: HttpClient) {
    this.loggingService.setNiveauTrace(2);

  }
}
