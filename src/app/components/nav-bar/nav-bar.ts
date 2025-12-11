import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cartItems';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'nav-bar',
  imports: [RouterModule],
  templateUrl: './nav-bar.html',
})
export class NavBar {
  @Input() items: CartItem[] = [];
  @Input() total: number = 0;
 
}
