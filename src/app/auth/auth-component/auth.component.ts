import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { DbService } from 'src/app/shared/db.service';
import { Client } from 'src/app/user-profil/client.model';
import { AuthResponse } from '../auth-response.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @Output() loginmode: boolean = false; 
  error: string = "";

  constructor(private AS: AuthService,
              private DBS: DbService,
              private router: Router) { }

  ngOnInit(): void {

  }


  
  onFormSubmit(form: NgForm){
    if(!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponse>;
    let errorObs: Observable<any> = this.DBS.fetchClient(email) // Két asynk hívás egyszerre ami nem tudni mikor tér vissza

    errorObs
        .pipe( 
          catchError( error => {
          console.log('error' + error)
          return of(error)
          })
        )
        .subscribe( error => {
        })

        if(!this.loginmode){
          authObs = this.AS.login(email, password);
        } else {
            authObs = this.AS.signup(email, password)
        }

        
      

    authObs.subscribe(
      response => {
          this.error = '';
          if(this.loginmode){
              alert('Sikeres regisztráció! Kérlek jelentkezz be!');
          } else {
              this.router.navigate(['/profil']);
          }
      },
      error => {
          this.error = error;
      }
    );

    form.reset();
  }

  onSwitchLoginMode(){
    this.loginmode = !this.loginmode;
  }

}


/*
export class AuthComponent implements OnInit {
  @Output() loginmode: boolean = false; 
  error: string = "";

  constructor(private AS: AuthService,
              private DBS: DbService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onLoginSubmit(form: NgForm){
    if(!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;

    this.DBS.fetchClient(email);
    this.AS.login(email, password)
      .subscribe(
        response => {
            this.error = '';
            this.router.navigate(['/profil']);
        },
        error => {
            this.error = error;
        }
      );
      form.reset();
  }

  onSignupSubmit(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    const secondPassword = form.value.password;
    if( password != secondPassword){
      return alert('A jelszavak nem egyeznek!')
    }

    this.AS.signup(email, password)
    .subscribe(
      response => {
          this.DBS.fetchClient(email)
          this.error = '';
          this.router.navigate(['/profil']);
      },
      error => {
          this.error = error;
      }
    );
    form.reset();
  }

  onSwitchLoginMode(){
    this.loginmode = !this.loginmode;
  }

}
*/


/* HTML TEMPLATE FOR " FORM VARIANT"

<div class="login ">
    
    <div class="login-box" >
        <h1>{{ loginmode ? 'Regisztráció' : 'Bejelentkezés'}}</h1>
        <form #loginForm="ngForm"
              (ngSubmit)="onLoginSubmit(loginForm)"
              *ngIf="!loginmode">


                <div class="form-group my-4">
                    <label for="email" class="my-2">E-mail cím:</label>
                    <input type="email" 
                           name="email" 
                           id="email"
                           class="form-control"
                           required
                           ngModel
                           email>
                </div>

                <div class="form-group my-4">
                    <label for="password" class="my-2">Jelszó: </label>
                    <input type="password" 
                           name="password" 
                           id="password"
                           class="form-control"
                           placeholder="minimum 8 karakter aminek tartalmaznia kell számot, különleges karaktert, kis és nagybetűt,"
                           required
                           ngModel
                           password
                           minlength="8">
                        </div>
                        <!-- pattern="/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/" -->

                <div class="my-2 login-box-btns">
                    <button class="btn btn-primary"
                            type="submit"
                            [disabled]="!loginForm.valid">
                        Bejelentkezés
                    </button>
                    <button class="btn btn-info mx-4 my-2"
                            type="button"
                            (click)="onSwitchLoginMode()">
                        {{ !loginmode ? 'Regisztrálok' : 'Bejelentkezem' }}
                    </button>
                </div>
        </form>

        <form #signupForm="ngForm"
              (ngSubmit)="onSignupSubmit(signupForm)"
              *ngIf="loginmode">


                <div class="form-group my-4">
                    <label for="email" class="my-2">E-mail cím:</label>
                    <input type="email" 
                           name="email" 
                           id="email"
                           class="form-control"
                           required
                           ngModel
                           email>
                </div>

                <div class="form-group my-4">
                    <label for="password" class="my-2">Jelszó: </label>
                    <input type="password" 
                           name="password" 
                           id="password"
                           class="form-control"
                           placeholder="minimum 8 karakter aminek tartalmaznia kell számot, különleges karaktert, kis és nagybetűt,"
                           required
                           ngModel
                           password
                           minlength="8">
                        </div>
                        <!-- pattern="/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/" -->

                <div class="form-group my-4">
                    <label for="secondPassword" class="my-2">Jelszó újra: </label>
                    <input type="secondPassword" 
                            name="secondPassword" 
                            id="secondPassword"
                            class="form-control"
                            placeholder="minimum 8 karakter aminek tartalmaznia kell számot, különleges karaktert, kis és nagybetűt,"
                            required
                            ngModel
                            password
                            minlength="8">
                        </div>

                <div class="my-2 login-box-btns">
                    <button class="btn btn-primary"
                            type="submit"
                            [disabled]="!signupForm.valid">
                            Regisztráció
                    </button>
                    <button class="btn btn-success mx-4 my-2"
                            type="button"
                            (click)="onSwitchLoginMode()">
                        {{ !loginmode ? 'Regisztrálok' : 'Bejelentkezem' }}
                    </button>
                </div>
        </form>

        <div class="alert alert-danger alert-dismissible fade show" role="alert" *ngIf="error">
            <strong> {{ error }} </strong>  
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" (click)="error = ''" ></button>
          </div>
    </div>
</div>



*/
