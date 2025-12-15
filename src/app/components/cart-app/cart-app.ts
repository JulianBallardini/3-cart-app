import { Component, inject, Inject, OnInit } from '@angular/core';
import { ProductModel } from '../../models/productModel';
import { CartItem } from '../../models/cartItems';
import { NavBar } from '../nav-bar/nav-bar';
import { Router, RouterOutlet } from '@angular/router';
import { SharingData } from '../../services/sharing-data';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { addCartItem, removeItem, total } from '../../store/items.actions';

@Component({
  selector: 'cart-app',
  imports: [NavBar, RouterOutlet],
  templateUrl: './cart-app.html',
})
export class CartApp implements OnInit{

  productos: ProductModel[] = [];
  private store = inject(Store);
  total = this.store.selectSignal(state => state.items.total);
  items = this.store.selectSignal(state => state.items.items);


  constructor(private router: Router,
    private SharingData: SharingData) { }
  ngOnInit(): void {
    this.store.dispatch(total());

    this.addCartItem(); // -> para que queden escuchando
    this.removeItem();
  }

  addCartItem() {
    this.SharingData.addItemEventEmitter.subscribe((producto: ProductModel) => {
      
      this.store.dispatch(addCartItem({producto: producto}));
      this.store.dispatch(total());

      
      this.saveSession(); 
      this.router.navigate(['/cart']);

      Swal.fire({
        title: "Carro de compras",
        text: "Se agregó " + producto.name + " a tu carrito",
        icon: "success"
      });
    })
  }

  removeItem() {
    this.SharingData.removeItemEventEmitter.subscribe(itemRemove => {
      Swal.fire({
        title: "Eliminar",
        text: "¿Esta seguro que desea eliminar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(removeItem({id: itemRemove.product.id}));

          if (this.items.length == 0) {
            sessionStorage.removeItem('cart');
          }
          this.store.dispatch(total());
          this.saveSession();

          // Refrescamos para que se vean los resultados instantáneamente
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/cart']);
          }); // -> voy a la pagina raíz para refrescarS
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });


    })
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items()));
  }


}
