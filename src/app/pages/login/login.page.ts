import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  email='';
  password='';


  constructor(private authService: AuthService, private alertController:AlertController, private router:Router) { }

  async login(){
    await this.authService.login({email: this.email, password:this.password});
    console.log("Usuario autenticado");
    this.showAlert("Login","Usuario autenticado");
    this.router.navigate(['/products']);
  }

  async showAlert(header:string, message:string){
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
