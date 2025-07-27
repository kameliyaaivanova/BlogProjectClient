import { Component } from '@angular/core';
import { PageNavComponent } from '../../page-nav/page-nav.component';
import { DatePipe } from '@angular/common';
import { Pageable } from '../../model/Pageable';
import { DeletedFile } from '../../model/DeletedFile';
import { StatsService } from '../../service/stats.service';

@Component({
  selector: 'app-deleted-files',
  imports: [DatePipe, PageNavComponent],
  templateUrl: './deleted-files.component.html',
  styleUrl: './deleted-files.component.scss'
})
export class DeletedFilesComponent {

  page: Pageable = {} as Pageable
  deletedFiles: DeletedFile[] = []

  constructor(private statsService: StatsService) {
  }

  getPage(number: number) {
    this.statsService.getDeletedFiles(number).subscribe((r: Pageable) => {
      this.deletedFiles = r.content
      this.page = r
    })
  }
}
