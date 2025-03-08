import {Component, OnInit} from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { AddProductModalComponent } from 'src/app/components/add-product-modal/add-product-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone:false
})

export class ProductsPage implements OnInit{
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private alertController: AlertController,
    private modalController: ModalController,
    private loadingController: LoadingController
  ){}

  async ngOnInit(){ //este es el constructor porque consulta a todos los productos
    await this.loadProducts();
  }

  async loadProducts()
  {
    const loading = await this.loadingController.create({message: 'Registrando...'});
    await loading.present();
    try{
      const response = await this.productService.getProducts();
      this.products = response.data; //AHORA PRODUCTS ES UN ARRAY CORRECTAMENTE
    }
    catch(error:any){
      await loading.dismiss();
      if(error.response){
      //ERROR CON RESPUESTA DEL SERVIDOR
      console.error('Error de servidor:', error.response.data);
      console.error('Código de estado:', error.response.status);
     }else if (error.request){
      //ERROR SIN RESPUESTA (PUEDE SER UN PROBLEMA DE RED)
      console.error('Error de red:', error.request);
     }else{
      //OTRO TIPO DE ERROR
      console.error('Error desconocido:', error.message);
     }
     this.showAlert('Error', 'No se pudo completar el registro. Intenta nuevamente.');
    }
    finally{
      await loading.dismiss();
    }
  }


  async showAlert(header: string, message:string)
  {
    const alert = await this.alertController.create({
      header,
      message,
      buttons:['OK'],
    });
    await alert.present();
  }

  async deleteProduct(productId: string){
    const alert = await this.alertController.create({
      header: 'Eliminar producto',
      message: '¿Estás seguro de que deseas eliminar este producto?',
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: async() => {
            try{
              await this.productService.deleteProduct(productId);
              this.products = this.products.filter(p => p._id !== productId);
            }catch (error){
              console.error('Error');
            }
          }
        }
      ]
    });

    await alert.present();
};


  
  
  async openAddProductModal()
  {
    const modal = await this.modalController.create({
      component: AddProductModalComponent
    });

    await modal.present(); //PARA MOSTRAR LA MODAL
    const {data}=await modal.onWillDismiss();
    if(data && data.product){
      this.products.push(data.product);
    }
  }

  async logout()
  {
    this.authService.logout();
    //REDIRIGIR A LA PÁGINA DE INICIO DE SESIÓN (AJUSTAR SEGÚN LA CONFIGURACIÓN DE RUTAS)
    window.location.href = '/login';
  };

  async editProduct(product:any){
    const modal = await this.modalController.create({
      component: AddProductModalComponent,
      componentProps:{product} //PASAMOS EL PRODUCTO SELECCIONADO AL MODAL
    });
    
    await modal.present();
    
    const {data} = await modal.onWillDismiss();
    if(data && data.product){
      const index = this.products.findIndex(p=>p._id === product._id);
      if(index !==-1){
        this.products[index]=data.product; //ACTUALIZA EL PRODUCTO EN LA LISTA
      }
    }
      }
}