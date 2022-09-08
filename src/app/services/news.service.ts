import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NewsResponse } from '../interfaces';

const apiKey = environment.apikey;
const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http:HttpClient) { }

getTopHeadlines(page:number,category:string){
 return this.http.get<NewsResponse>(`${url}/top-headlines`,{
  params :{
    apiKey:apiKey,
    category:category,
    country:'us',
    page:page



  }
 })
 }

}
