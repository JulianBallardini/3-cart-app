import { Component, EventEmitter, inject} from '@angular/core';
import { CartItem } from '../../models/cartItems';
import { Router } from '@angular/router';
import { SharingData } from '../../services/sharing-data';
import { Store } from '@ngrx/store';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.html',
})
export class Cart{
  
  private store = inject(Store);
  total = this.store.selectSignal(state => state.items.total);
  items = this.store.selectSignal(state => state.items.items);
  

  constructor(private SharingData: SharingData, private router: Router){}

  removeItem(item: CartItem){
    this.SharingData.removeItemEventEmitter.emit(item);
  }
}
