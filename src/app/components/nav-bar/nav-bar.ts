import { Component, inject, Input } from '@angular/core';
import { CartItem } from '../../models/cartItems';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'nav-bar',
  imports: [RouterModule],
  templateUrl: './nav-bar.html',
})
export class NavBar {
  private store = inject(Store);
  items = this.store.selectSignal(state => state.items.items);

}
