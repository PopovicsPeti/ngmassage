import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from '../client.model';
import { ClientService } from '../client.service';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Problems } from '../problems.model';
import { DbService } from 'src/app/shared/db.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MedRecords } from '../medicalRecord.model';
import { Booking } from 'src/app/auth/booking.model';



@Component({
  selector: 'app-med-sheet',
  templateUrl: './med-sheet.component.html',
  styleUrls: ['./med-sheet.component.scss']
})
export class MedSheetComponent implements OnInit {
  errorMessage: string = ''
  clientForm: FormGroup = <FormGroup>{};
  problems = new FormArray([]);
  @Input() userEmail: string = this.AS.userEmail;
 
  curentUser: Client = <Client>{};

  ngOnInit(): void {

    this.curentUser = this.CS.getClient();
    this.CS.clientChange.subscribe( (client) => {
      this.curentUser = client;
    });
    if(this.curentUser.email == ''){
      this.curentUser.email = this.AS.userEmail;
    }
    this.CS.clientChange.subscribe( (client) => {
      this.curentUser = client;
    })

    if(this.curentUser.date == '')
      this.curentUser.date = new Date().toISOString().substring(0, 10); 

    this.InitForm();    
  }



  constructor(private CS: ClientService,
              private DBS: DbService,
              private AS: AuthService) { }

              clientProblems: Array<Problems> = [
                { id: 1,  select: false, name: 'lázas állapot'},
                { id: 2,  select: false, name: 'fertőző megbetegedés/bőrbetegség'},
                { id: 3,  select: false, name: 'heveny gyulladások'},
                { id: 4,  select: false, name: 'daganatos megbetegedés'},
                { id: 5,  select: false, name: 'műtét utáni állapot (3-6 hónap)'},
                { id: 6,  select: false, name: 'vérzékenység (haemophilia)'},
                { id: 7,  select: false, name: 'veleszületett izombetegség (myasthenia gravis)'},
                { id: 8,  select: false, name: 'mélyvénás trombózis'},
                { id: 9,  select: false, name: 'előrehaladott csontritkulás (osteoporosis 30%-os csonttömeg vesztés felett)'},
                { id: 10, select: false, name: 'epilepszia'},
                { id: 11, select: false, name: 'várandósság első három és utolsó hónapja'},
                { id: 12, select: false, name: 'illuminált, drogos állapot'},
                { id: 13, select: false, name: 'csonttörés, égés, ficam, trauma'},
                { id: 14, select: false, name: 'erős visszeresség, érelzáródásos megbetegedések, érgyulladás (tromboflebitis)'},
                { id: 15, select: false, name: 'akut vénás megbetegedések'},
                { id: 16, select: false, name: 'előrehaladott porckorongsérv (discus hernia)'},
                { id: 17, select: false, name: 'csigolyaív törés (spondylolisis)'},
                { id: 18, select: false, name: 'csigolya előre csúszás (spondylolisthesis)'},
                { id: 19, select: false, name: 'gerincmerevítő műtét'},
                { id: 20, select: false, name: 'protézis'},
                { id: 21, select: false, name: 'Bechterew kór (SPA)'},
                { id: 22, select: false, name: 'kóros lesoványodás (cachexia)'},
                { id: 23, select: false, name: 'cukorbetegség (diabetes mellitus)'},
                { id: 24, select: false, name: 'kezeletlen magas vérnyomás (hypertonia)'},
                { id: 25, select: false, name: 'krónikus szívelégtelenség'},
                { id: 26, select: false, name: 'szívritmus zavar/pacemaker'}
             ]

  

  getProblem(p: Problems){
    return p.id.toString();
  }

  onChangeProblems($event: any){
    const id = $event.target.value;
    const isChecked = $event.target.checked;
    
    const updatedProblems = this.curentUser.problems.map((p) => {
      if(p.id == id){
        p.select = isChecked;
        return p;
      }
      return p;
    });
    this.curentUser.problems = updatedProblems;
  }

  private InitForm(){
    let thisUser: Client = this.curentUser; 

    let name = '';
    let bornDate = '';
    let adress = '';
    let email = this.userEmail;
    let problems = this.curentUser.problems;
    let otherProblems = '';
    let date = '';
    let isClient = false; 

    if(thisUser.name !== ''){
      name = thisUser.name;
      bornDate = thisUser.bornDate;
      adress = thisUser.adress;
      email = thisUser.email;
      problems = thisUser.problems;
      otherProblems = thisUser.otherProblems;
      date = thisUser.date;
      isClient = thisUser.isClient;
    }



    if(thisUser.name == ''){
      this.clientForm = new FormGroup({
        'name': new FormControl(name, Validators.required),
        'bornDate': new FormControl(bornDate, Validators.required),
        'adress': new FormControl(adress, Validators.required),
        'email': new FormControl(email),
        'problems': this.problems,
        'otherProblems': new FormControl(otherProblems),
        'isclent': new FormControl(isClient = true)
      });
    }
  }

  onSubmit(){
    console.log(this.curentUser)
      this.CS.setClient(this.curentUser);

     this.DBS.storeClient(this.curentUser.email);
     this.CS.clientChange.unsubscribe();
     alert('Sikeres mentés.')
  }

}


/*
 OLD INIT FORM

 this.clientForm = this.FB.group({
      name: '',
      bornDate: '',
      adress: '',
      email: '',
      problems: this.FB.group({
        'lázas állapot': false,
        'fertőző megbetegedés/bőrbetegség': false,
        'heveny gyulladások': false,
        'daganatos megbetegedés': false,
        'műtét utáni állapot (3-6 hónap)': false,
        'vérzékenység (haemophilia)': false,
        'veleszületett izombetegség (myasthenia gravis)': false,
        'mélyvénás trombózis': false,
        'előrehaladott csontritkulás (osteoporosis 30%-os csonttömeg vesztés felett)': false,
        'epilepszia': false,
        'várandósság első három és utolsó hónapja': false,
        'illuminált, drogos állapot': false,
        'csonttörés, égés, ficam, trauma': false,
        'erős visszeresség, érelzáródásos megbetegedések, érgyulladás (tromboflebitis)': false,
        'akut vénás megbetegedések': false,
        'előrehaladott porckorongsérv (discus hernia)': false,
        'csigolyaív törés (spondylolisis)': false,
        'csigolya előre csúszás (spondylolisthesis)': false,
        'gerincmerevítő műtét': false,
        'protézis': false,
        'Bechterew kór (SPA)': false,
        'kóros lesoványodás (cachexia)': false,
        'cukorbetegség (diabetes mellitus)': false,
        'kezeletlen magas vérnyomás (hypertonia)': false,
        'krónikus szívelégtelenség': false,
        'szívritmus zavar/pacemaker': false
      }),
      otherProblems: '',
      date: ''
    });
    


    

OLD PROBLEMS ARRAY

//clientProblems: Array<Problems> = [
    // { id: 1,  select: false, name: 'lázas állapot'},
    // { id: 2,  select: false, name: 'fertőző megbetegedés/bőrbetegség'},
    // { id: 3,  select: false, name: 'heveny gyulladások'},
    // { id: 4,  select: false, name: 'daganatos megbetegedés'},
    // { id: 5,  select: false, name: 'műtét utáni állapot (3-6 hónap)'},
    // { id: 6,  select: false, name: 'vérzékenység (haemophilia)'},
    // { id: 7,  select: false, name: 'veleszületett izombetegség (myasthenia gravis)'},
    // { id: 8,  select: false, name: 'mélyvénás trombózis'},
    // { id: 9,  select: false, name: 'előrehaladott csontritkulás (osteoporosis 30%-os csonttömeg vesztés felett)'},
    // { id: 10, select: false, name: 'epilepszia'},
    // { id: 11, select: false, name: 'várandósság első három és utolsó hónapja'},
    // { id: 12, select: false, name: 'illuminált, drogos állapot'},
    // { id: 13, select: false, name: 'csonttörés, égés, ficam, trauma'},
    // { id: 14, select: false, name: 'erős visszeresség, érelzáródásos megbetegedések, érgyulladás (tromboflebitis)'},
    // { id: 15, select: false, name: 'akut vénás megbetegedések'},
    // { id: 16, select: false, name: 'előrehaladott porckorongsérv (discus hernia)'},
    // { id: 17, select: false, name: 'csigolyaív törés (spondylolisis)'},
    // { id: 18, select: false, name: 'csigolya előre csúszás (spondylolisthesis)'},
    // { id: 19, select: false, name: 'gerincmerevítő műtét'},
    // { id: 20, select: false, name: 'protézis'},
    // { id: 21, select: false, name: 'Bechterew kór (SPA)'},
    // { id: 22, select: false, name: 'kóros lesoványodás (cachexia)'},
    // { id: 23, select: false, name: 'cukorbetegség (diabetes mellitus)'},
    // { id: 24, select: false, name: 'kezeletlen magas vérnyomás (hypertonia)'},
    // { id: 25, select: false, name: 'krónikus szívelégtelenség'},
    // { id: 26, select: false, name: 'szívritmus zavar/pacemaker'}
 // ]



*/
