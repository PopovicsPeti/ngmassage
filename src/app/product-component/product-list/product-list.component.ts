import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productDescription: Product = new Product('', '', -1, -1, '', '');
  curentProduct: Product = new Product('', '', -1, -1, '', '');
  productsArray: Array<Product> = Array<Product>();
  aside: boolean = false;
  productId: number = 0;

  constructor(private prodService: ProductService,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.prodService.selectedProduct
      .subscribe(
        (product: Product) => {
          this.curentProduct = product;
        }
    );
    this.productsArray = this.prodService.getProducts();

    this.route.params.subscribe(
      (params: Params) => {
        this.productId = +params['id'];
        this.productDescription = this.prodService.getProduct(this.productId);
  })

  this.productDescription = this.prodService.getProduct(1);

}

  onAside(){
    this.aside = true;
  } 

  

  selectedProduct(index: number){
    this.productDescription = this.prodService.getProduct(index);
  }
}
