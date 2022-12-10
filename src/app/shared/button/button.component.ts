import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-btn',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent implements OnInit {
 @Input() text: string = '';
 @Input() link: string = '';


  constructor(private router: Router,
              private rout: ActivatedRoute
    ) { }

  ngOnInit(): void {
  }

  linkTo(){
    this.router.navigate([`/${this.link}`]);
  }

}
