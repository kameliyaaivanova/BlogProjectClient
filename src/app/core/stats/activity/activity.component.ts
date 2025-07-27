import { Component } from '@angular/core';
import { Pageable } from '../../model/Pageable';
import { Activity } from '../../model/Activity';
import { StatsService } from '../../service/stats.service';
import { DatePipe } from '@angular/common';
import { PageNavComponent } from '../../page-nav/page-nav.component';

@Component({
  selector: 'app-activity',
  imports: [DatePipe, PageNavComponent],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {

  page: Pageable = {} as Pageable
  activities: Activity[] = []

  constructor(private statsService: StatsService) {
  }

  getPage(number: number) {
    this.statsService.getActivity(number).subscribe((r: Pageable) => {
      this.activities = r.content
      this.page = r
    })
  }
}
