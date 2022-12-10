import { Component, OnInit, ViewChild, ComponentFactoryResolver, EventEmitter, Output, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DbService } from '../shared/db.service';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { Client } from './client.model';
import { ClientService } from './client.service';
import { ShowClientComponent } from './show-client/show-client.component';


@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss'],
  providers: []
})
export class UserProfilComponent implements OnInit {
  regularCostumer: boolean = false;
  @Input() clientId : number = 0;



  curentUser: Client = <Client>{};
  clientsArray: Array<Client> = [];
  clientsChange: Subscription = new Subscription();
  errorMessage: string = '';
  

  @ViewChild(PlaceholderDirective) visitedClientPlace: PlaceholderDirective = <PlaceholderDirective>{};

  constructor(private AS: AuthService,
              private CS: ClientService, 
              private compFactRes: ComponentFactoryResolver,
              private DBS: DbService ) { }

  ngOnInit(): void {

    // this.clientsChange = this.CS.allClientArrayChange.subscribe( () => {
    //   this.CS.getAllClient();
    // });
   
    this.curentUser = this.CS.getClient();
    this.CS.clientChange.subscribe( (client) => {
      this.curentUser = client;
    });

    if(this.curentUser.email == 'p.popovics92@gmail.com'){
      this.clientsArray = this.CS.getAllClient();
      this.CS.allClientArrayChange
        .subscribe( clients =>{
          this.CS.getAllClient();
          this.clientsArray = clients;
      });
    }

    let counter = 0
    if(this.curentUser.booking)
      for (let k in this.curentUser.booking) {
        if (this.curentUser.booking[k].finished === true) {
          counter += 1
      }};     
    if(counter >= 10){
      this.regularCostumer = true;
    }
    if(counter >= 10){
      this.regularCostumer = true;
    }
  }

  showClient(index: number){
    this.clientId = index;
    const client = this.CS.getChosedClient(index);
   
    const showClientComponent = this.compFactRes.resolveComponentFactory(ShowClientComponent);

    const clientPlaceRef = this.visitedClientPlace.viewContRef;
    clientPlaceRef.clear();

    const showedClient = clientPlaceRef.createComponent(showClientComponent);

    showedClient.instance.visitedClient = client;
    showedClient.instance.close.subscribe( () => {
      clientPlaceRef.clear();
    })
    

  }

  onAdminSave(){
    this.DBS.storeClientsArray();
}

  onLogout(){
    this.AS.logout();
    this.CS.removeClientFromStorage();
    localStorage.clear();
  }



}
