import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, AfterViewInit {
  intervalId = 0;
  seconds = 30;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.countDown();
  }
  

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        //this.message = 'Blast off!';
        this.clearTimer();
      } else {
        //if (this.seconds < 0) { this.seconds = 10; } // reset
        //this.message = `T-${this.seconds} seconds and counting`;
      }
    }, 1000);
  }

  clearTimer() { clearInterval(this.intervalId); }

}
