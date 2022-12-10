import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { DbService } from './shared/db.service';
import { Client } from './user-profil/client.model';
import { ClientService } from './user-profil/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NgMassage';
  userEmail: string = '';
  checkClient: Client = <Client>{};

  constructor(private AS: AuthService,
              private DBS: DbService,
              private CS: ClientService ){}

  ngOnInit(){
    this.AS.autoLogin();
    this.userEmail = this.AS.getUserEmail();
    if(this.userEmail === 'p.popovics92@gmail.com'){
      this.DBS.fetchAllClient();
    }
    this.CS.getStorageData();



  }
}
