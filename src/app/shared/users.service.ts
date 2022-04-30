import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, forkJoin, map, Observable, of, pairwise, tap } from 'rxjs';
import { User } from '../models/user.model';
import { FullUser } from '../models/user.model';
import { LoggingService } from './logging.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UsersService {
  users: User[] = [];

  constructor(private loggingService: LoggingService, private http: HttpClient) {
    this.loggingService.setNiveauTrace(2);

  }

  baseUrl = environment.apiUrl;
    url = this.baseUrl + "/users";
  //url= "https://tpangularapi.herokuapp.com/api/assignments";

  getUsers(page: number, limit: number): Observable<any> {
    // en réalité, bientôt au lieu de renvoyer un tableau codé en dur,
    // on va envoyer une requête à un Web Service sur le cloud, qui mettra un
    // certain temps à répondre. On va donc préparer le terrain en renvoyant
    // non pas directement les données, mais en renvoyant un objet "Observable"
    //return of(this.assignments);
    return this.http.get<User[]>(this.url + "?page=" + page + "&limit=" + limit);
  }

  getUser(id: number): Observable<User | undefined> {
    //let a = this.assignments.find(a => a.id === id);
    //return of(a);
    return this.http.get<User>(`${this.url}/${id}`)
      .pipe(
        map(a => {
          a.nom = a.nom;
          return a;
        }),
        tap(a => {
          console.log("Dans le tap, pour debug, assignment recu = " + a.nom)
        }),
        catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
      );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
  }

  addUser(user: User): Observable<any> {
    this.loggingService.log(user.nom, "ajouté");

    return this.http.post<User>(this.url, user);
  }
  
  addUserFullInfo(user: FullUser): Observable<any> {

    this.loggingService.log(user.nom, "ajouté");

    return this.http.post<FullUser>(this.baseUrl+"/user/full-profil", user);
  }

  updateUser(user: User): Observable<any> {
    this.loggingService.log(user.nom, "modifié");

    return this.http.put<User>(this.url, user);
  }

  deleteUser(user: User): Observable<any> {
    //let pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);

    this.loggingService.log(user.nom, "supprimé");

    //return of("Assignment supprimé");
    return this.http.delete(this.url + "/" + user._id);
  }
  /*
    peuplerBD() {
      bdInitialAssignments.forEach(a => {
        let newAssignment = new User();
        newAssignment.nom = a.nom;
        newAssignment.dateDeRendu = new Date(a.dateDeRendu);
        newAssignment.rendu = a.rendu;
        newAssignment.id = a.id;
  
        this.addAssignment(newAssignment)
        .subscribe(reponse => {
          console.log(reponse.message);
        })
      })
    }
  
    peuplerBDAvecForkJoin(): Observable<any> {
      const appelsVersAddAssignment:any = [];
  
      bdInitialAssignments.forEach((a) => {
        const nouvelAssignment:any = new User();
  
        nouvelAssignment.id = a.id;
        nouvelAssignment.nom = a.nom;
        nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
        nouvelAssignment.rendu = a.rendu;
  
        appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
      });
      return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
    }*/

}
