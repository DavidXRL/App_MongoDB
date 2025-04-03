import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ipAddress:string = localStorage.getItem('mongo_ip') || '172.16.0.36';
  baseUrl = `http://${this.ipAddress}:5001/api/auth`;

  async register(user:any){
    this.ipAddress = localStorage.getItem('mongo_ip') || '172.16.0.36';
    this.baseUrl = `http://${this.ipAddress}:5001/api/auth`;
    return axios.post(`${this.baseUrl}/register`, user);
  }

  async login(user: any){
    this.ipAddress = localStorage.getItem('mongo_ip') || '172.16.0.36';
    this.baseUrl = `http://${this.ipAddress}:5001/api/auth`;
    const res = await axios.post(`${this.baseUrl}/login`, user);
    localStorage.setItem("token", res.data.token);
  }

  logout(){
    localStorage.removeItem("token");
  }

  setIp(ip:string){
    this.ipAddress=ip;
    }

    getIp():string{
    return this.ipAddress;
    }
}
