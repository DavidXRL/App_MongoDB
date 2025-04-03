import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  ipMongo:string =''; // Variable para almacenar la dirección IP
  constructor(private authService: AuthService) {}

  saveIp() {
    if (this.ipMongo) {
      localStorage.setItem('mongo_ip', this.ipMongo);
      this.authService.setIp(this.ipMongo);
      alert('Dirección IP guardada correctamente');
    }else{
      alert('Por favor, ingrese una dirección válida')
    }
  }

}
