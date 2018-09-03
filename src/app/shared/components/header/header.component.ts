import {Component, OnInit} from '@angular/core';
import {SideNavService} from '../../services/side-nav.service';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public toggleActive = false;
  public onMain = true;

  constructor(private sidenav: SideNavService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.sidenav.getEmittedValue()
      .subscribe(item => this.onMain = item);
  }

  onClose() {
    this.onMain = true;
    this.toggleActive = !this.toggleActive;
    this.sidenav.toggle();
  }

  logout() {
    this.authService.logout();
  }

}
