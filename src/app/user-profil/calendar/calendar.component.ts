import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/auth/booking.model';
import { Client } from '../client.model';
import { ClientService } from '../client.service';
import { MedRecords } from '../medicalRecord.model';
import { Problems } from '../problems.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  curentUser: Client = <Client>{};
  bookingCheck: boolean = false;
  displayedColumns: string[] = ['id', 'date', 'service', 'complite'];
  
  ngOnInit(): void {
    this.dataSource = this.CS.getBooking();
    if(this.dataSource === undefined || this.dataSource.length == 0){
      this.bookingCheck = true;
    }
  }
  dataSource: Array<Booking> = []

  



  constructor( private CS: ClientService ) { }


}
