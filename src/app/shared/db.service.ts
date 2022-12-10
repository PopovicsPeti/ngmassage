import { Injectable, Input,} from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { ClientService } from "../user-profil/client.service";
import { Client } from "../user-profil/client.model";
import { catchError, throwError } from "rxjs"


@Injectable({
    providedIn: 'root'
})

export class DbService {
    @Input() loginMode: boolean = false;
    localStorageClient = new BehaviorSubject<Client>(<Client>{}); 
    localStorageClientArray = new BehaviorSubject<Array<Client>>(<Array<Client>>{}); 
    errorObs: Observable<any> = new Observable<any>();

    constructor(    private http: HttpClient,
                    private CS: ClientService
    ){}

    private errorhendler(errorResp: HttpErrorResponse){
        let error = errorResp.message;
        return throwError(error); // retorn of(error)
    }



    private ClientLoadHandler(client: Client){
        const clientString: Client = client;
        this.localStorageClient.next(clientString);
        localStorage.setItem('clientData', JSON.stringify(clientString));
    }


    fetchClient(email: string): Observable<Client>{
        return this.http.get<Client>(
            `https://ngmassage-3365e-default-rtdb.europe-west1.firebasedatabase.app/User/${email.replace(/[^a-zA-Z0-9 ]/g, '')}.json`)
        .pipe(
            catchError( this.errorhendler),
            tap( (client: Client) => {
                if (client == null || client == undefined) {
                    let newClient: Client = new Client(
                        '',
                        '',
                        '',
                        email,
                        [
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
                        ],
                        '',
                        '',
                        true,
                        [],
                        []
          
                        )
                        client = newClient
                    } 
                    this.ClientLoadHandler(client);
        }))
    }

    fetchAllClient(){
        return this.http.get<Array<Client>>(
            `https://ngmassage-3365e-default-rtdb.europe-west1.firebasedatabase.app/User/.json`)
            .pipe( 
                map( clients => {
                    let clientsArray: Client[] = [];
                    Object.entries(clients).forEach( ([key, value]) => { 
                      clientsArray.push(value) 
                    })
                    return clientsArray;
                  }),
                tap( clients => { 
                    let pureClientArray: Array<Client> = [];
                    for(let i=0; i<clients.length; i++)
                        if(clients[i].email != 'p.popovics92@gmail.com')
                            pureClientArray.push(clients[i])

                    this.CS.setAllClient(pureClientArray)
                }),
                catchError( this.errorhendler)
            )
            .subscribe();
        }

    storeClient(email: string){
        let client = this.CS.getClient();

        this.http.put<Client>(
            `https://ngmassage-3365e-default-rtdb.europe-west1.firebasedatabase.app/User/${email.replace(/[^a-zA-Z0-9 ]/g, '')}.json`, client)
            .pipe(
                catchError( error => {

                    return throwError(error);
                  })
            )
            .subscribe( response => {} /* alert('sikeres mentés')*/ );
    }

    storeClientsArray(){
        let clients: Array<Client> = this.CS.getAllClient();
        this.http.put<Client[]>(
            `https://ngmassage-3365e-default-rtdb.europe-west1.firebasedatabase.app/User.json`, clients)
            .pipe(
                catchError( error => {
                    return throwError(error);
                  })
            )
            .subscribe( response => {} );
    }

    storeSelectedClient(client: Client){
        this.http.put<Client>(
            `https://ngmassage-3365e-default-rtdb.europe-west1.firebasedatabase.app/User/${client.email.replace(/[^a-zA-Z0-9 ]/g, '')}.json`, client)
            .pipe(
                catchError( error => {
                    return throwError(error);
                  })
            )
            .subscribe( response => {} /* alert('sikeres mentés') */ );
    }

    deleteSelectedClient(email: string, index: number){
        this.http.delete(`https://ngmassage-3365e-default-rtdb.europe-west1.firebasedatabase.app/User/${email.replace(/[^a-zA-Z0-9 ]/g, '')}.json`)
        .pipe(
            catchError( error => {
                return throwError(error);
              })
        )
        .subscribe( response => {
            alert('Profil törölve.')
            this.CS.deleteSelectedClient(index)
            }
        ); 
      }

      deleteClient(email: string){
        this.http.delete(`https://ngmassage-3365e-default-rtdb.europe-west1.firebasedatabase.app/User/${email.replace(/[^a-zA-Z0-9 ]/g, '')}.json`)
        .pipe(
            catchError( error => {
                return throwError(error);
              })
        )
        .subscribe( response => {
            alert('Profil törölve.')
            }
        ); 
      }
}