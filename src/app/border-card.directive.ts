import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBorderCard]'
})
export class BorderCardDirective {

  // permet de récupérer avec les crochets la valeur définie dans le Component
  @Input('appBorderCard')  borderColor : string = '';

  // récupérer l'élément HTML décoré
  constructor(private el : ElementRef) {
   }

   @HostListener('mouseenter')
   onMouseEnter(){
    
    this.modifyBorder(this.borderColor || "#000", 2);
   }

   @HostListener('mouseleave')
   onMouseLeave(){
    this.modifyBorder("#f5f5f5", 2);
   }

   private modifyBorder(color: string, px: number):void{
    this.el.nativeElement.style.border = `solid ${px}px ${color}`;
   }

}
