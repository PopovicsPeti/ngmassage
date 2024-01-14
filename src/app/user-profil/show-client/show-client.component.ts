import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Booking } from 'src/app/auth/booking.model';
import { DbService } from 'src/app/shared/db.service';
import { Client } from '../client.model';
import { ClientService } from '../client.service';
import { MedRecords } from '../medicalRecord.model';


@Component({
  selector: 'app-show-client',
  templateUrl: './show-client.component.html',
  styleUrls: ['./show-client.component.scss']
})
export class ShowClientComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  @Input() visitedClient: Client = <Client>{};
  clientId: number = -1;
  clientsArrayChange: Subscription = new Subscription();

  // {{{{{{{{{{{{{{ Booking }}}}}}}}}}}}}}
  ChangeBookingData: Subscription = new Subscription();
  bookingIndex: number = -1;
  bookingDataToModify: Booking = <Booking>{};
  bookingSettingsMode: Boolean = false;
  bookingArray: Array<Booking> = [];

  // {{{{{{{{{{{{ Medrecords }}}}}}}}}}}}}
  ChangeMedRecordData: Subscription = new Subscription();
  medRecordIndex: number = -1;
  medRecordDataToModify: MedRecords = <MedRecords>{};
  medRecordSettingsMode: Boolean = false;

  newBooking = {
    'date': '',
    'service': '',
    'complite': '',
    'color': '',
    'finished': false
  }

  newMedrecord = {
    'date': '',
    'recomendation': '',
    'observation': '',
  }

  constructor(private CS: ClientService,
              private DBS: DbService,
              private router: Router) { }

  ngOnInit(): void {   
    this.bookingArray = this.visitedClient.booking
      .sort( (a, b) => (a.date > b.date ? 1 : -1));   

    this.clientId = this.CS.getClientId(this.visitedClient.email);
    
   this.ChangeBookingData = this.CS.bookingChange.subscribe(
      (index: number) => {
        this.bookingIndex = index;
        this.bookingDataToModify = this.getSpecificBookingDate(index);
        this.newBooking = {
                                'date': this.bookingDataToModify.date,
                                'service': this.bookingDataToModify.service,
                                'complite': this.bookingDataToModify.complite,
                                'color': '',
                                'finished': false
        }
      });

    this.ChangeMedRecordData = this.CS.medRecordChange.subscribe(
      (index: number) => {
        this.medRecordIndex = index;
        this.medRecordDataToModify = this.getSpecificMedRecordDate(index);
        this.newMedrecord = {
          'date': this.medRecordDataToModify.date,
          'recomendation': this.medRecordDataToModify.recomendation,
          'observation': this.medRecordDataToModify.observation,
        }
      });
  }
  
  /// {{{{{{{{{{{{ BOOKING }}}}}}}}}}}}
  
  getSpecificBookingDate(i: number){
    return this.visitedClient.booking[i];
  }

  onNewBooking(){
    if(this.newBooking.complite == 'Teljesült'){
      this.newBooking.color = 'lightgreen';
      this.newBooking.finished = true;
    } else if (this.newBooking.complite == 'Lefoglalva'){
      this.newBooking.color = 'lightblue';
      this.newBooking.finished = false;
    } else {
      this.newBooking.color = 'hotpink';
      this.newBooking.finished = false;
    }

    
    if(this.visitedClient.booking == undefined){
      this.visitedClient.booking = [];
    }
    this.visitedClient.booking.push(this.newBooking); 
    

    this.newBooking = {
      'date': '',
      'service': '',
      'complite': '',
      'color': '',
      'finished': false
    }
    
  }

  onLoadBookingData(index: number){
    this.CS.bookingChange.next(index);
    this.bookingSettingsMode = true;
  }

  onChangeBooking(){
    let index = this.bookingIndex;

    if(this.newBooking.complite == 'Teljesült'){
      this.newBooking.color = 'lightgreen';
      this.newBooking.finished = true;
    } else if (this.newBooking.complite == 'Lefoglalva'){
      this.newBooking.color = 'lightblue';
      this.newBooking.finished = false;
    } else {
      this.newBooking.color = 'hotpink';
      this.newBooking.finished = false;
    }

    this.visitedClient.booking[index] = this.newBooking;
    this.newBooking = {
      'date': '',
      'service': '',
      'complite': '',
      'color': '',
      'finished': false
    }
    this.bookingSettingsMode = false;
  }

  onDeleteBooking(i: number){
    this.visitedClient.booking.splice(i, 1)
  }

  onCancelBooking(){
    this.newBooking = {
      'date': '',
      'service': '',
      'complite': '',
      'color': '',
      'finished': false
    }
    this.bookingSettingsMode = false;
  }


  /// {{{{{{{{{{{{ MEDRECORDS }}}}}}}}}}}}
   
  getSpecificMedRecordDate(i: number){
    return this.visitedClient.medRecords[i];
  }

  onNewAdvice(){
    if(this.visitedClient.medRecords == undefined){
      this.visitedClient.medRecords = [];
    }
    this.visitedClient.medRecords.push(this.newMedrecord); 
    

    this.newMedrecord = {
      'date': '',
      'recomendation': '',
      'observation': '',
    }
  }

  onLoadMedRecordData(index: number){
    this.CS.medRecordChange.next(index);
    this.medRecordSettingsMode = true;
  }

  onChangeAdvice(){
    console.log(this.newMedrecord);
    let index = this.medRecordIndex;
    this.medRecordSettingsMode = true;
    console.log(this.medRecordSettingsMode)

    this.visitedClient.medRecords[index] = this.newMedrecord;
          
    this.newMedrecord = {
      'date': '',
      'recomendation': '',
      'observation': '',
    }
    this.medRecordSettingsMode = false;
  }

  onDeletAdvice(index: number){
    this.visitedClient.medRecords.splice(index, 1); 
  }

  onCancelAdvice(){
    this.newMedrecord = {
      'date': '',
      'recomendation': '',
      'observation': '',
    }
    this.medRecordSettingsMode = false;
  }

  /// {{{{{{{{{{{{{ UTILITY }}}}}}}}}}}}}


  onClose(){
    this.close.emit();
  }

  onDelete(){
    this.DBS.deleteSelectedClient(this.visitedClient.email, this.clientId);
    this.onClose();
  }


  onSave(){
    this.DBS.storeSelectedClient(this.visitedClient);
    this.onClose();
  }

}
