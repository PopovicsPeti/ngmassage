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


 // new Client(
    //   'Göblyös Jolán',
    //   new Date(1970, 8, 25),
    //   '2060 Bicske Endresz György utca 28',
    //   'goblyos.jolan1970@gmail.com',
    //   [
    //     { id: 1,  select: false, name: 'lázas állapot'},
    //     { id: 2,  select: false, name: 'fertőző megbetegedés/bőrbetegség'},
    //     { id: 3,  select: false, name: 'heveny gyulladások'},
    //     { id: 4,  select: false, name: 'daganatos megbetegedés'},
    //     { id: 5,  select: false, name: 'műtét utáni állapot (3-6 hónap)'},
    //     { id: 6,  select: false, name: 'vérzékenység (haemophilia)'},
    //     { id: 7,  select: false, name: 'veleszületett izombetegség (myasthenia gravis)'},
    //     { id: 8,  select: false, name: 'mélyvénás trombózis'},
    //     { id: 9,  select: false, name: 'előrehaladott csontritkulás (osteoporosis 30%-os csonttömeg vesztés felett)'},
    //     { id: 10, select: false, name: 'epilepszia'},
    //     { id: 11, select: false, name: 'várandósság első három és utolsó hónapja'},
    //     { id: 12, select: false, name: 'illuminált, drogos állapot'},
    //     { id: 13, select: false, name: 'csonttörés, égés, ficam, trauma'},
    //     { id: 14, select: false, name: 'erős visszeresség, érelzáródásos megbetegedések, érgyulladás (tromboflebitis)'},
    //     { id: 15, select: false, name: 'akut vénás megbetegedések'},
    //     { id: 16, select: false, name: 'előrehaladott porckorongsérv (discus hernia)'},
    //     { id: 17, select: false, name: 'csigolyaív törés (spondylolisis)'},
    //     { id: 18, select: false, name: 'csigolya előre csúszás (spondylolisthesis)'},
    //     { id: 19, select: false, name: 'gerincmerevítő műtét'},
    //     { id: 20, select: false, name: 'protézis'},
    //     { id: 21, select: false, name: 'Bechterew kór (SPA)'},
    //     { id: 22, select: false, name: 'kóros lesoványodás (cachexia)'},
    //     { id: 23, select: false, name: 'cukorbetegség (diabetes mellitus)'},
    //     { id: 24, select: false, name: 'kezeletlen magas vérnyomás (hypertonia)'},
    //     { id: 25, select: false, name: 'krónikus szívelégtelenség'},
    //     { id: 26, select: false, name: 'szívritmus zavar/pacemaker'}
    //   ],
    //   '',
    //   new Date(2022, 5, 10),
    //   true
    // );
