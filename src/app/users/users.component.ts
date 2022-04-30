import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs';
import { UsersService } from '../shared/users.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  users:User[] = [];
  displayedColumns: string[] = ['id', 'nom', 'photUrl', 'type'];

  // pagination
  page=1;
  limit=10;
  totalPages=0;
  pagingCounter=0;
  hasPrevPage=false;
  hasNextPage=true;
  prevPage= 1;
  nextPage= 2;

  constructor(private usersService:UsersService, private ngZone: NgZone) {}

  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  ngAfterViewInit():void{
    this.scroller.elementScrolled().pipe(
      tap(event => {
        //console.log(event);
      }),
      map(event => {
        return this.scroller.measureScrollOffset('bottom');
      }),
      tap(val => {
        //console.log("distance par rapport à la fin = " + val)
      }),
      pairwise(),
      tap(val => {
        /*
        if(val[0] < val[1]) console.log("on monte")
        else console.log("on descend")
        */
      }),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      tap(val => {
        //console.log(val)
      }),
      throttleTime(200),
      tap(val => {
        //console.log(val);
      })
    ).subscribe(() => {
      // ici traitement final
      console.log("On va chercher de nouveaux assignments !")

      // on le fait en tache de fond...
      this.ngZone.run(() => {
        this.page = this.nextPage;
        this.getUsersScrollInfini();
      })
    })
  }

  // appelé après le constructeur et AVANT l'affichage du composant
  ngOnInit(): void {
    console.log("Dans ngOnInit, appelé avant l'affichage");
    this.getUsers();
  }

  getUsers() {
      // demander les données au service de gestion des assignments...
      this.usersService.getUsers(this.page, this.limit)
      .subscribe(reponse => {
        console.log("données arrivées");
        this.users = reponse.docs;
        this.page = reponse.page;
        this.limit=reponse.limit;
        this.totalPages=reponse.totalPages;
        this.pagingCounter=reponse.pagingCounter;
        this.hasPrevPage=reponse.hasPrevPage;
        this.hasNextPage=reponse.hasNextPage;
        this.prevPage= reponse.prevPage;
        this.nextPage= reponse.nextPage;
      });

      console.log("Après l'appel au service");
  }

  getUsersScrollInfini() {
    // demander les données au service de gestion des assignments...
    this.usersService.getUsers(this.page, this.limit)
    .subscribe(reponse => {
      console.log("données arrivées");
      //this.assignments = reponse.docs;
      // au lieu de remplacer les assignments chargés par les nouveaux, on les ajoute
      this.users = this.users.concat(reponse.docs);

      this.page = reponse.page;
      this.limit=reponse.limit;
      this.totalPages=reponse.totalPages;
      this.pagingCounter=reponse.pagingCounter;
      this.hasPrevPage=reponse.hasPrevPage;
      this.hasNextPage=reponse.hasNextPage;
      this.prevPage= reponse.prevPage;
      this.nextPage= reponse.nextPage;
    });

    console.log("Après l'appel au service");
}

  pagePrecedente() {
    this.page--;
    this.getUsers();
  }

  pageSuivante() {
    this.page++;
    this.getUsers();
  }

  premierePage() {
    this.page = 1;
    this.getUsers();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getUsers();
  }
}
