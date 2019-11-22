import { Router, Params, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
@Component({
  selector: 'app-calander-api',
  templateUrl: './calander-api.component.html',
  styleUrls: ['./calander-api.component.scss']
})
export class CalanderAPIComponent implements OnInit {

  calander: CalanderAPIComponent;
  calendarPlugins = [dayGridPlugin];
  userId: number;


  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams
    .subscribe( params => {
      console.log(params);
      this.userId = params.useridMain;
      console.log(this.userId);
    });
  }

  goToInfoPage() {
    this.router.navigate(['/info-page'], { queryParams: { useridMain: this.userId } });
  }

  logOut() {
    this.router.navigate(['/login']);
  }

}
