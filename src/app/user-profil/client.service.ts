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
    //   'G??bly??s Jol??n',
    //   new Date(1970, 8, 25),
    //   '2060 Bicske Endresz Gy??rgy utca 28',
    //   'goblyos.jolan1970@gmail.com',
    //   [
    //     { id: 1,  select: false, name: 'l??zas ??llapot'},
    //     { id: 2,  select: false, name: 'fert??z?? megbeteged??s/b??rbetegs??g'},
    //     { id: 3,  select: false, name: 'heveny gyullad??sok'},
    //     { id: 4,  select: false, name: 'daganatos megbeteged??s'},
    //     { id: 5,  select: false, name: 'm??t??t ut??ni ??llapot (3-6 h??nap)'},
    //     { id: 6,  select: false, name: 'v??rz??kenys??g (haemophilia)'},
    //     { id: 7,  select: false, name: 'velesz??letett izombetegs??g (myasthenia gravis)'},
    //     { id: 8,  select: false, name: 'm??lyv??n??s tromb??zis'},
    //     { id: 9,  select: false, name: 'el??rehaladott csontritkul??s (osteoporosis 30%-os csontt??meg veszt??s felett)'},
    //     { id: 10, select: false, name: 'epilepszia'},
    //     { id: 11, select: false, name: 'v??rand??ss??g els?? h??rom ??s utols?? h??napja'},
    //     { id: 12, select: false, name: 'illumin??lt, drogos ??llapot'},
    //     { id: 13, select: false, name: 'csontt??r??s, ??g??s, ficam, trauma'},
    //     { id: 14, select: false, name: 'er??s visszeress??g, ??relz??r??d??sos megbeteged??sek, ??rgyullad??s (tromboflebitis)'},
    //     { id: 15, select: false, name: 'akut v??n??s megbeteged??sek'},
    //     { id: 16, select: false, name: 'el??rehaladott porckorongs??rv (discus hernia)'},
    //     { id: 17, select: false, name: 'csigolya??v t??r??s (spondylolisis)'},
    //     { id: 18, select: false, name: 'csigolya el??re cs??sz??s (spondylolisthesis)'},
    //     { id: 19, select: false, name: 'gerincmerev??t?? m??t??t'},
    //     { id: 20, select: false, name: 'prot??zis'},
    //     { id: 21, select: false, name: 'Bechterew k??r (SPA)'},
    //     { id: 22, select: false, name: 'k??ros lesov??nyod??s (cachexia)'},
    //     { id: 23, select: false, name: 'cukorbetegs??g (diabetes mellitus)'},
    //     { id: 24, select: false, name: 'kezeletlen magas v??rnyom??s (hypertonia)'},
    //     { id: 25, select: false, name: 'kr??nikus sz??vel??gtelens??g'},
    //     { id: 26, select: false, name: 'sz??vritmus zavar/pacemaker'}
    //   ],
    //   '',
    //   new Date(2022, 5, 10),
    //   true
    // );
