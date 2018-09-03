import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appQuillActivePanel]'
})
export class QuillActivePanelDirective {

  private _isActive = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  @HostListener('click', ['$event'])
  onClick(e) {
    e.preventDefault();
    this._isActive = !this._isActive;
    // this.renderer.addClass(this.el.nativeElement, 'active');
    this.renderer.addClass(document.getElementById('quill_editor_toolbar'), 'active');
  }

}
