import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/productModel';
import { CartItem } from '../../models/cartItems';
import { NavBar } from '../nav-bar/nav-bar';
import { Router, RouterOutlet } from '@angular/router';
import { SharingData } from '../../services/sharing-data';
import Swal from 'sweetalert2';

@Component({
  selector: 'cart-app',
  imports: [NavBar, RouterOutlet],
  templateUrl: './cart-app.html',
})
export class CartApp implements OnInit {

  productos: ProductModel[] = [];
  total: number = 0;
  items: CartItem[] = [];

  constructor(private router: Router,
    private SharingData: SharingData) { }
  ngOnInit(): void {
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');

    // Me suscribo para que cuando se invoque a las funciones, estas respondan
    this.addCarItem();
    this.calcularTotal();
    this.removeItem();
  }


  addCarItem() {
    this.SharingData.addItemEventEmitter.subscribe(producto => {
      if (this.items.find(item => {
        return item.product.id == producto.id;
      })) {
        this.items = this.items.map(item => {
          if (item.product.id == producto.id) {
            return {
              ...item,
              quantity: item.quantity + 1
            }
          } else {
            return item;
          }
        })
      } else {
        this.items = [... this.items, { product: { ...producto }, quantity: 1 }];
      }
      this.calcularTotal();
      this.saveSession();
      this.router.navigate(['/cart'], {
        state: { items: this.items, total: this.total }
      });

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
          this.items = this.items.filter(item => {
            return item.product != itemRemove.product;
          })
          if (this.items.length == 0) {
            sessionStorage.removeItem('cart');
          }
          this.calcularTotal();
          this.saveSession();

          // Refrescamos para que se vean los resultados instantáneamente
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/cart'], {
              state: { items: this.items, total: this.total }
            });
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

  calcularTotal(): void {
    this.total = this.items.reduce((acumulador, item) => acumulador += item.quantity * item.product.price, 0);
  }
  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }


}
