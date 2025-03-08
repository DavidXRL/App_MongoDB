import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
  standalone:false
})
export class AddProductModalComponent  implements OnInit {
@Input() product: any; //RECIBE EL PRODUCTO A EDITAR


name: string='';
description: string='';
price: number = 0;
isEditing: boolean = false;
  
  constructor(private modalController: ModalController, private productService:ProductService) { }

  ngOnInit() {
    if(this.product){
      this.isEditing = true;
      this.name= this.product.name;
      this.description = this.product.description;
      this.price=this.product.price;
    }
  }

  async saveProduct()
  {
    try{
      let updateProduct;
      if(this.isEditing)
      {
        updateProduct = await this.productService.updateProduct(this.product._id,{
          name: this.name,
          description: this.description,
          price: this.price,
          stock:100
        });
      }
      else
      {
        updateProduct = await this.productService.addProduct({
          name: this.name,
          description: this.description,
          price: this.price,
          stock: 100
        });
      }

      this.modalController.dismiss({product:updateProduct});
    }catch (error){
      console.error('Error al guardar producto:', error);
    }
  }

  close(){
    this.modalController.dismiss();
  }
}
