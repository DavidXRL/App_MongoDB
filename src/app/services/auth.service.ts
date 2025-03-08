import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:5001/api/auth';

  async register(user:any){
    return axios.post(`${this.baseUrl}/register`, user);
  }

  async login(user: any){
    const res = await axios.post(`${this.baseUrl}/login`, user);
    localStorage.setItem("token", res.data.token);
  }

  logout(){
    localStorage.removeItem("token");
  }
}
