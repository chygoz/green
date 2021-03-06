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

  constructor(private service: apiService, private cookieService: CookieService) { 
    let ud = this.cookieService.getCookie('currentUser');
    this.userData = JSON.parse(ud);
    console.log(ud);
  }

  ngOnInit(): void {
    this.service.getUserNetwork({}).subscribe((resp) => {
      console.log(resp);
      if(resp.status && resp.data.length > 0){
        this.connections = resp.data.length
      }else {

      }
    })
  }

}
