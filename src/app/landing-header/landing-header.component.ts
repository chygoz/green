import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss']
})
export class LandingHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }

}
