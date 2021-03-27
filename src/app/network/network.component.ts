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
  allNetworks = [];
  pendingNetworks = [];
  mainNetwork:any = [];
  params;
  pendingParams;

  constructor(private service: apiService, private cookieService: CookieService) { 
    let ud = this.cookieService.getCookie('currentUser');
    this.userData = JSON.parse(ud);
    this.mainNetwork = this.userData;
    console.log(this.mainNetwork)
  }

  ngOnInit(): void {
    this.params = {userId: this.userData._id};
    this.getUserNetwork(this.params);
    this.getPendingNetwork(this.params);
  }

  getUserNetwork(params) {
    this.service.getUserNetwork(params).subscribe((resp) => {
      if(resp.status && resp.data.length > 0){
        this.connections = resp.data.length
        this.allNetworks = resp.data
        this.networks = resp.data;
        this.networks = this.networks.filter(nw => nw.show_below == params.userId);
        this.networks = this.networks.sort((a,b) => 
          (a.leftLeg == true)? -1: 1)
      }else {

      }
    })
  }

  getPendingNetwork(params){
    this.service.getPendingNetwork(params).subscribe((resp) => {
      if(resp.status && resp.data.length > 0){
        this.connections = resp.data.length
        this.pendingNetworks = resp.data;
      }else {

      }
    })
  }

  addLeg(network, pn, leg) {
    console.log(network);
    let params = {
      cnId: network._id,
      pnId: pn._id,
      leg: leg
    }
    this.service.addleg(params).subscribe((resp) => {
      if(resp.status) {
        this.service.showSuccess(resp.msg);
        this.getUserNetwork(this.params);
        this.getPendingNetwork(this.params);

      }else {
        this.service.showError(resp.msg);
      }
    })
  }

  getSelectedNetwork(user){
    this.params = {userId: user._id};
    this.mainNetwork = user;
    this.getUserNetwork(this.params);
  }

}
