import { Component, OnInit } from '@angular/core';
import { apiService } from '../api.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {

  constructor(private service: apiService) { }

  ngOnInit(): void {
    this.service.getUserNetwork({}).subscribe((data) => {
      console.log(data);
    })
  }

}
