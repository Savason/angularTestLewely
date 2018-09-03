import {EventEmitter, Injectable, Output} from '@angular/core';
import {MatSidenav} from '@angular/material';

@Injectable()
export class SideNavService {
  @Output() fire: EventEmitter<any> = new EventEmitter();
  private sidenav: MatSidenav;

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  constructor() {
  }

  public toggle(): void {
    this.sidenav.toggle();
  }

  change() {
    console.log('change started');
    this.fire.emit(false);
  }

  getEmittedValue() {
    return this.fire;
  }
}
