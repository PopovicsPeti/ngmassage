import { Component, OnInit, OnDestroy, } from '@angular/core';
import { HostListener } from '@angular/core';
import { Subscription } from "rxjs";
import { AuthService } from '../auth/auth.service';
import { Client } from '../user-profil/client.model';
import { ClientService } from '../user-profil/client.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  isUserLogin: boolean = false;

  private userSub: Subscription = new Subscription();

  
  constructor(private AS: AuthService) {
   }

   
  ngOnInit(): void {
    this.userSub = this.AS.user.subscribe( user => {
      if( user.email == ''|| user.token == '')
        this.isUserLogin = false;
      else if(user.email != ''){
        if(user.email == 'p.popovics92@gmail.com')
          this.isAdmin = true;
        this.isUserLogin = true;
      }

    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.isUserLogin = false;
  }

  onLogout(){
    this.AS.logout();
    this.isUserLogin = false;
    this.isAdmin = false;
    localStorage.clear();
  }

  

  @HostListener('window:scroll', ['$event'])
  
  onWindowScroll() {
      let nav = document.querySelector('.intersected-nav') as HTMLElement;
      if (window.pageYOffset > nav.clientHeight) {
        nav.classList.add('navbar-scrolled');
      } else {
        nav.classList.remove('navbar-scrolled');
      }
    }

}
