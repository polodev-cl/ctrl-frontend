import { Directive, HostListener, Input } from "@angular/core";
import { NavigationService } from "@common/navigation/navigation.service";

@Directive({
  selector: '[backButton]',
  standalone: true
})
export class BackButtonDirective {
  @Input() defaultRoute: string[] = [ '..' ];

  constructor(private navitation: NavigationService) {
  }

  @HostListener('click')
  onClick(): void {
    this.navitation.back(this.defaultRoute);
  }
}
