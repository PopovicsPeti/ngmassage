import { Component, OnInit } from '@angular/core';
import { Client } from '../user-profil/client.model';
import { ClientService } from '../user-profil/client.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  isLogedIn: boolean = false;
  curentUser: Client = <Client>{};

  constructor(private CS: ClientService) { }

  ngOnInit(): void {
    this.curentUser = this.CS.getClient();
    this.CS.clientChange.subscribe( (client) => {
      this.curentUser = client;
    });

    if(this.curentUser.email != null || undefined){
      this.isLogedIn = true;
    }

  }

}
