import { Component, OnInit } from '@angular/core';
import { MedRecords } from '../medicalRecord.model';
import { ClientService } from '../client.service';
import { Problems } from '../problems.model';
import { Booking } from 'src/app/auth/booking.model';
import { Client } from '../client.model';

@Component({
  selector: 'app-med-record',
  templateUrl: './med-record.component.html',
  styleUrls: ['./med-record.component.scss']
})
export class MedRecordComponent implements OnInit {
  arrayCheck: boolean = false;
 // curentUser: Client = <Client>{};
  medRecorsdArray: Array<MedRecords> = Array<MedRecords>();

  constructor( private CS: ClientService) { }

  ngOnInit(): void {
    // let curentUserString: string | null = localStorage.getItem('clientData');
    // if(curentUserString == null){
    //   curentUserString = "";
    // } 
    // if(curentUserString == "" || curentUserString == null)
    //   return;
    // const thisClientdata: {
    //   name: string,
    //   bornDate: string,
    //   adress: string,
    //   email: string,
    //   problems: Array<Problems>,
    //   otherProblems: string,
    //   date: string,
    //   isClient: boolean,
    //   booking: Array<Booking>,
    //   medRecords: Array<MedRecords>
    // } = JSON.parse(curentUserString);

    // this.curentUser = new Client(
    //   thisClientdata.name,
    //   thisClientdata.bornDate,
    //   thisClientdata.adress,
    //   thisClientdata.email,
    //   thisClientdata.problems,
    //   thisClientdata.otherProblems,
    //   thisClientdata.date,
    //   thisClientdata.isClient,
    //   thisClientdata.booking,
    //   thisClientdata.medRecords,
    // )
    // this.curentUser = this.CS.getClient();
    // this.CS.clientChange.subscribe( (client) => {
    //   this.curentUser = client;
    // });
    this.medRecorsdArray = this.CS.getRecords();

    if(this.medRecorsdArray === undefined || this.medRecorsdArray.length === 0){
      this.arrayCheck = true;
    }
  }

}
