import {Directive, ElementRef, HostListener, Renderer, Renderer2} from '@angular/core';

@Directive({
  selector: '[appActiveLink]'
})
export class ActiveLinkDirective {

  private _isActive = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  @HostListener('click', ['$event'])
  onClick(e) {
    e.preventDefault();
    this._isActive = !this._isActive;
    this.renderer.addClass(this.el.nativeElement, 'active');
  }

}
