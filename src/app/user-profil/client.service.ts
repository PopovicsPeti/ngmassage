import { Injectable, Output, Input } from '@angular/core';

import { map, Subject } from 'rxjs';
import { Booking } from '../auth/booking.model';
import { Client } from './client.model';
import { MedRecords } from './medicalRecord.model';
import { Problems } from './problems.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  @Output() regularCostumer: boolean = false;

  clientChange: Subject<Client> = new Subject<Client>();
  bookingChange = new Subject<number>();
  medRecordChange = new Subject<number>();
  allClientArrayChange: Subject<Array<Client>> = new Subject<Array<Client>>();

  private client: Client = <Client>{};
  private allClientArray: Array<Client> = [];

  selectedClient : Client = <Client>{};
   
  
  constructor() { }

  // {{{{{{{{{{{{{{{{{{  ADMIN component }}}}}}}}}}}}}}}}}} //

  getStorageData(){
    let curentUserString: string | null = localStorage.getItem('clientData');
    if(curentUserString == null){
      curentUserString = "";
    } 
    if(curentUserString == "" || curentUserString == null)
      return;
    const thisClientdata: {
      name: string,
      bornDate: string,
      adress: string,
      email: string,
      problems: Array<Problems>,
      otherProblems: string,
      date: string,
      isClient: boolean,
      booking: Array<Booking>,
      medRecords: Array<MedRecords>
    } = JSON.parse(curentUserString);

    this.client = new Client(
      thisClientdata.name,
      thisClientdata.bornDate,
      thisClientdata.adress,
      thisClientdata.email,
      thisClientdata.problems,
      thisClientdata.otherProblems,
      thisClientdata.date,
      thisClientdata.isClient,
      thisClientdata.booking,
      thisClientdata.medRecords,
      )
  }

  getAllClient(){
    return this.allClientArray;
  }

  setAllClient(clientArray: Array<Client>){
    this.allClientArray = clientArray;
    this.allClientArrayChange.next(this.allClientArray);
  }

  getChosedClient(index: number){
    this.selectedClient =  this.allClientArray[index];
    return this.selectedClient;
  }

  removeClientFromStorage(){
    this.client = new Client('','','','',[],'','',false,[],[]);
  }

  getClientId(email: string){
    let id: number = -1;
    for(let i = 0; i<this.allClientArray.length; i++){
      if(this.allClientArray[i].email === email)
        id = i; 
    }
    return id;
  }

  deleteSelectedClient(index: number){
    this.allClientArray.splice(index, 1);
    this.allClientArrayChange.next(this.allClientArray.slice());
  }
  

  // {{{{{{{{{{{{{{ Medical Sheet component }}}}}}}}}}}}}} //


  getClient(){
    return this.client;
  }

  
  setClient(client: Client){
    this.client = client;
    this.clientChange.next(this.client);
  }
  
  
  // {{{{{{{{{{{{{{{{{{{{{ Booking Component }}}}}}}}}}}}}}}}}}}}} //

  getBooking(){
    let sortedBooking: Array<Booking> = [];
    sortedBooking = this.client.booking.sort( (a, b) => (a.date < b.date ? 1 : -1));
    return sortedBooking;
  }


  newBooking(booking: Booking){
    this.client.booking.push(booking);
  }


  // {{{{{{{{{{{{{{{{{{{{ Medical Records Component }}}}}}}}}}}}}}}}}}}} //

  getRecords(){
    return this.client.medRecords;
  }
  
}