import { Component, EventEmitter} from '@angular/core';
import { CartItem } from '../../models/cartItems';
import { Router } from '@angular/router';
import { SharingData } from '../../services/sharing-data';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.html',
})
export class Cart{
  
  items: CartItem[] = [];
  total: number = 0;
  

  constructor(private SharingData: SharingData, private router: Router){
    this.items = router.getCurrentNavigation()?.extras.state!['items'];
    this.total = router.getCurrentNavigation()?.extras.state!['total'];
  }

  removeItem(item: CartItem){
    this.SharingData.removeItemEventEmitter.emit(item);
  }
}
