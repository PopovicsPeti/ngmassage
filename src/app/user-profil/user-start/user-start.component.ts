import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Booking } from 'src/app/auth/booking.model';
import { DbService } from 'src/app/shared/db.service';
import { Client } from '../client.model';
import { ClientService } from '../client.service';
import { MedRecords } from '../medicalRecord.model';
import { Problems } from '../problems.model';

@Component({
  selector: 'app-user-start',
  templateUrl: './user-start.component.html',
  styleUrls: ['./user-start.component.scss']
})
export class UserStartComponent implements OnInit {
  curentUser: Client = <Client>{};
  nextBooking: string = 'Még nem volt foglalásod.';
  regularCostumer: boolean = false;
  delete: boolean = false;
  errorMessage: string = '';


  constructor(private CS: ClientService,
              private AS: AuthService,
              private DBS: DbService) { }


  ngOnInit(): void {

    this.curentUser = this.CS.getClient();
    this.CS.clientChange.subscribe( (client) => {
      this.curentUser = client;
    });
    if(!this.curentUser.email){
      this.errorMessage = 'Sajnos hiba történt az adatok betöltésével, kérem látogasson vissza később vagy keressen fel minket!'
    }
    if(!this.curentUser.booking){
      this.curentUser.booking = [];
    }
    if(this.curentUser.booking.length != 0){
      let nextBookingCandidate = this.curentUser.booking.sort((a, b) => (a.date < b.date) ? 1 : -1 )
      this.nextBooking = nextBookingCandidate[0].date;
      let counter = 0
      if(this.curentUser.booking)
        for (let k in this.curentUser.booking) {
          if (this.curentUser.booking[k].finished === true) {
            counter += 1
        }};     
      if(counter >= 10){
        this.regularCostumer = true;
      }
    }
  }

  onCostumerDelete(){
    this.DBS.deleteClient(this.curentUser.email);
    this.AS.deleteUserAuth();

    alert('Sikeresen törölted a profiéodat.')
    this.AS.logout();
    localStorage.clear();
  }

}
