import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, Output } from "@angular/core";

import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";


import { Router } from "@angular/router";
import { User } from "./user";
import { AuthResponse } from "./auth-response.model";
import { DbService } from "../shared/db.service";
import { ClientService } from "../user-profil/client.service";


@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    user = new BehaviorSubject<User>(new User('', '', '', new Date()));
    // @Output() isAdmin: boolean = false;
    private tokenTimer: any;
    private toDelete: string = '';
    userEmail: string = '';

    

    constructor(private http: HttpClient,
                private router: Router,
                private DB: DbService,
                private CS: ClientService
        ){}

    getUserEmail(){
        return this.userEmail;
    }

    signup(email: string, password: string){
            return this.http.post<AuthResponse>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBybL1H5fQiqCFSiOZolv4sk3SfHQ0Yk9o', 
                 {
                    email: email,
                    password: password,
                    returnSecureToken: true
                 }
            )
            .pipe( 
                tap( respData => {  this.AuthenticationHandler(respData.email, respData.localId, respData.idToken,  +respData.expiresIn)                 
                }),
                catchError( this.errorhendler )
            );
    }

    login(email: string, password: string){ 
        return this.http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBybL1H5fQiqCFSiOZolv4sk3SfHQ0Yk9o',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(
                catchError( this.errorhendler ), 
                tap( respData => {  this.AuthenticationHandler(respData.email, respData.localId, respData.idToken,  +respData.expiresIn), 
                this.userEmail = respData.email;
                this.toDelete = respData.idToken
                }),
                tap(respData => { 
                    this.DB.fetchClient(this.userEmail);
                    this.CS.getStorageData();
                        if(respData.email === 'p.popovics92@gmail.com'){
                            // respData.isAdmin = true;
                            // this.isAdmin = true;
                            this.DB.fetchAllClient();
                        }                           
                }),
            );
    }

    private AuthenticationHandler(email: string, id: string, token: string, lejar: number){
        const lejarat = new Date(new Date().getTime() + +lejar*1000);

        const u = new User(email, id, token, lejarat);
        this.user.next(u);
        this.autoLogout(lejar*1000);
        localStorage.setItem('userData', JSON.stringify(u));

    }

    private errorhendler(errorResp: HttpErrorResponse){
        console.log(errorResp)
        let error = '';
        switch( errorResp.error.error.message ){
            case 'EMAIL_EXISTS': 
                error= 'Ez az email cím már foglalt.'
                break;
            case 'OPERATION_NOT_ALLOWED':
                error = 'nincs jogosultságod.'
                break;
            case 'USER_DISABLED':
                error = 'Jelenleg letiltottuk a fiókodat.'
                break;
            case 'USER_NOT_FOUND':
                error = 'Nincs ilyen felhasználó!'
                break;
            case 'API key not valid':
                error = 'Nem vagy feljogosítva a belépéshez'
                break;
            default:
                error = 'Something went wrong! :(';
                break;
        }
        return throwError(error);
    }

    
    autoLogin(){
        let udString: string | null = localStorage.getItem('userData');
        if(udString == null){
            udString = "";
        } 

        if(udString == "" || udString == null)
            return;
        
        const userData: {
                        email: string, 
                        id: string, 
                        _token: string, 
                        _tokenDate: Date
                        } = JSON.parse(udString); 
                        // ha nem példányosítod az osztály példányát nem kapja meg az osztály függvényeit
        
        const u = new User(
            userData.email, 
            userData.id, 
            userData._token, 
            userData._tokenDate)

            this.userEmail = userData.email;

            // this.DB.fetchClient(userData.email);
            // if(userData.email == 'p.popovics92@gmail.com')
            //     this.DB.fetchAllClient();
            
            if ( u.token){
                this.user.next(u);
                const lejarat = new Date(userData._tokenDate).getTime()- new Date().getTime();
                this.autoLogout(lejarat);
            }
        }
        
        logout(){
            this.user.next(new User('', '', '', new Date()));
            this.router.navigate(['/home']);
            
            if(this.tokenTimer){
                clearTimeout(this.tokenTimer);
            }
            this.tokenTimer = null;
            localStorage.removeItem('userData'); 
            localStorage.removeItem('clientData'); 
            this.toDelete = '';
            this.CS.removeClientFromStorage();
            window.location.reload();
        }

        autoLogout(tokenTime: number){
            this.tokenTimer = setTimeout(() => { this.logout() }, tokenTime);
        }

        deleteUserAuth(){
            this.http.post<any>(
            'https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyBybL1H5fQiqCFSiOZolv4sk3SfHQ0Yk9o', 
            {
                idToken: this.toDelete
            }
            )
            .pipe()
            .subscribe()
        }
  }



