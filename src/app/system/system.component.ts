import {Component, OnInit, ViewChild} from '@angular/core';
import {SideNavService} from '../shared/services/side-nav.service';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;
  public onMain;

  constructor(private sidenavService: SideNavService) {
    this.onMain = true;
    this.sidenavService = sidenavService;
  }

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }

  changeName() {
    this.sidenavService.change();
  }
}
