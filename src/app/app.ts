import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartApp } from './components/cart-app/cart-app';

@Component({
  selector: 'app-root',
  imports: [CartApp],
  templateUrl: './app.html',
})
export class App {
  protected title = '3-cart-app';
}
