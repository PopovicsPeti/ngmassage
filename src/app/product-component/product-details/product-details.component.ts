import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  
  productDescription: Product = new Product('', '', -1, -1, '', '');
  productId: number = 0;
  

  constructor(private prodService: ProductService,
              private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.productId = +params['id'];
        this.productDescription = this.prodService.getProduct(this.productId);
      }
    );
  }

  selectedProduct(index: number){
    this.productDescription = this.prodService.getProduct(index);
  }
}
