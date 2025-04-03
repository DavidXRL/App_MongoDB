import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class Esp32Service {
private ipAddress:string = localStorage.getItem('esp32_ip') || '172.16.0.36';


  // private apiUrl = 'http://192.168.43.34/post';  // Reemplaza con la IP del ESP32
  // private apiUrlGet = 'http://192.168.137.184/current';  // Reemplaza con la IP del ESP32
  constructor(private http: HttpClient) { }

setIp(ip:string){
this.ipAddress=ip;
}

getIp():string{
return this.ipAddress;
}

  // Método para enviar datos al ESP32
  sendData(data: any): Observable<any> {
    const apiUrl=`http://${this.ipAddress}/post`;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    // Asegúrate de que los datos que se envían son correctos
    console.log('Enviando datos al servidor:', JSON.stringify({ value: data }));

    return this.http.post(apiUrl, { value: data }, { headers })
      .pipe(
        tap(response => {
          console.log('Respuesta del servidor:', response);  // Verifica la respuesta recibida
        }),
        catchError(error => {
          console.error('Error en la solicitud:', error);
          alert('Error al enviar los datos al servidor. Inténtalo de nuevo.');
          return [];  // Devuelve un arreglo vacío o un valor predeterminado
        })
      );
  }


  // Método para obtener los datos de temperatura y humedad desde el ESP32
  getData(): Observable<any> {

    const apiUrlGet = `http://${this.ipAddress}/data`;

    return this.http.get<any>(apiUrlGet)
      .pipe(
        tap(response => {
          console.log('Datos obtenidos del servidor:', response);  // Verifica los datos recibidos
        }),
        catchError(error => {
          console.error('Error al obtener los datos:', error);
          alert('Error al obtener los datos del servidor. Inténtalo de nuevo.');
          return [];  // Devuelve un arreglo vacío o un valor predeterminado
        })
      );
  }
}
