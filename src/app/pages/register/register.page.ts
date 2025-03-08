import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage  {

  name: string = '';
  email: string = '';
  password: string = '';


  constructor(
    private authService:AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  async register(){
    if(!this.name || !this.email ||  !this.password)
    {
      this.showAlert('Error', 'Todos los campos son obligatorios.');
      return;
    }

     const loading = await this.loadingController.create({message: 'Registrando...'});
     await loading.present();

     const userData = {
      username: this.name,
      email: this.email,
      password: this.password,
     };

     console.log('Datos enviados:', userData);

     try{
      await this.authService.register(userData);
      await loading.dismiss();
      this.showAlert('Exit', 'Registro exitoso. Ahora puedes iniciar sesión.');
      this.router.navigate(['/login']);
     }catch(error:any){
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
  }

    async showAlert(header:string, message:string)
    {
  const alert = await this.alertController.create({
    header, 
    message, 
    buttons:['OK'],
  });
  await alert.present();
    }

  ngOnInit() {
  }

}
