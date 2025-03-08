import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

baseUrl = 'http://localhost:5001/api/products';

async getProducts(){
  return axios.get(this.baseUrl);
}

async addProduct(product:any)
{
  const res = await axios.post(this.baseUrl, product);
  return res.data;
}

async updateProduct(id:string, productData:any)
{
  const res = await axios.put(`${this.baseUrl}/${id}`, productData);
  return res.data; //devuelve el producto actualizado
}

async deleteProduct(id:string){
  return axios.delete(`${this.baseUrl}/${id}`);
}

  constructor() { }
}
