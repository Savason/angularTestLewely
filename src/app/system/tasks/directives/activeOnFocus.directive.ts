import {Directive, HostListener, NgZone, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: 'quill-editor [appActiveOnFocus]'
})
export class QuillActiveOnFocusDirective {
  private hasFocus = false;

  constructor(
    private ngZone: NgZone,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
  }


  @HostListener('onSelectionChanged', ['$event']) onSelectionChanged(data) {

    this.ngZone.run(() => {
      if (data.range) {
        if (!this.hasFocus) {
          this.hasFocus = true;
          this.renderer.addClass(this.elementRef.nativeElement, 'active_quill_editor');
          this.renderer.addClass(document.getElementById('quill_editor_toolbar'), 'active');
        }
      } else {
        if (this.hasFocus) {
          this.hasFocus = false;
          this.renderer.removeClass(this.elementRef.nativeElement, 'active_quill_editor');
          this.renderer.removeClass(document.getElementById('quill_editor_toolbar'), 'active');
        }
      }
    });
  }

}
