import { Component, OnInit } from '@angular/core';
import { SfrTitleService } from '@sfr/shared/utils/services';

@Component({
  selector: 'sfr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class SfrAppComponent implements OnInit {
  constructor(private readonly titleService: SfrTitleService) {}
  ngOnInit(): void {
    this.titleService.setTabTitles();
  }
}
