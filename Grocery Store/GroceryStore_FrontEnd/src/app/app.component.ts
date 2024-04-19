import { Component, OnInit } from '@angular/core';
import { ProductService } from './Services/product.service';
import { Product } from './Models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'GroceryStore';

  constructor(){}
  ngOnInit(): void {
    
  }

}
