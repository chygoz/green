import { Component, OnInit } from '@angular/core';
import { apiService } from '../api.service';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {
  connections: Number = 0;
  userData;
  networks = [];

  constructor(private service: apiService, private cookieService: CookieService) { 
    let ud = this.cookieService.getCookie('currentUser');
    this.userData = JSON.parse(ud);
  }

  ngOnInit(): void {
    this.service.getUserNetwork({userId: this.userData._id}).subscribe((resp) => {
      if(resp.status && resp.data.length > 0){
        this.connections = resp.data.length
        this.networks = resp.data;
        this.networks = this.networks.sort((a,b) => 
          (a.leftLeg == true)? 1: -1)
      }else {

      }
    })
  }

}
