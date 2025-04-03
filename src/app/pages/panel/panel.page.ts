import { Component, OnInit } from '@angular/core';
import { Esp32Service } from 'src/app/esp32.service';  // Importa el servicio

@Component({
  selector: 'app-panel',
  templateUrl: './panel.page.html',
  styleUrls: ['./panel.page.scss'],
  standalone:false
})


export class PanelPage implements OnInit {
ipAddress:string =''; // Variable para almacenar la dirección IP

voltaje: number = 0;
corriente: number = 0;
adc: number = 0;
loading: boolean = true;

  constructor(private esp32Service: Esp32Service) {}


  ngOnInit() {
    this.loadData();
  }

  // Enviar solicitud con el valor correspondiente
  sendCommand(value: string) {
    const message = value; // Cambia el mensaje según lo que desees enviar

    if (message) {
      this.esp32Service.sendData(message).subscribe(
        response => {
          alert(response);
          console.log('Respuesta del servidor:', response);
        },
        error => {
          console.error('Error al enviar los datos:', error);
        }
      );
    } else {
      console.error('El mensaje está vacío');
      alert('Por favor, ingresa un mensaje antes de enviarlo.');
    }
  }

  loadData() {
    this.esp32Service.getData().subscribe(
      data => {
        if (data && data.adc && data.voltaje && data.corriente) {
          this.adc = data.adc;
          this.voltaje = data.voltaje;
          this.corriente = data.corriente;        }
        this.loading = false;
      },
      error => {
        console.error('Error al obtener los datos', error);
        this.loading = false;
      }
    );
  }

  saveIp() {
    if (this.ipAddress) {
      localStorage.setItem('esp32_ip', this.ipAddress);
      this.esp32Service.setIp(this.ipAddress);
      alert('Dirección IP guardada correctamente');
    }else{
      alert('Por favor, ingrese una dirección válida')
    }
  }

  setIp(ip:string){
  this.ipAddress=ip;
  }

  getIp():string{
  return this.ipAddress;
  }
}
