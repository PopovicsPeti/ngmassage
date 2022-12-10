import { Component, OnInit, Input } from '@angular/core';
import { Product } from './product.model';
import { ProductService, } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() productId: number = 0;
  @Input('selectedProduct') product: Product = new Product('', '', -1, -1, '', '');
  productsArray: Array<Product> = Array<Product>();
  

  constructor(private prodService: ProductService ) { }

  ngOnInit(): void {
    this.productsArray = this.prodService.getProducts();
  } 

}
