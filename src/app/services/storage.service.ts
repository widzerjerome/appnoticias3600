import { Article } from 'src/app/interfaces';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private _localArticles:Article [] = [];

  get getlocalArticles(){
    return [...this._localArticles];

  }

  constructor(private storage:Storage) {
    this.init();

  }

    async init() {

    const storage = await this.storage.create();
    this._storage = storage;
    await this.loadFavorites();
  }

  async saveOrRemoveArticle(article:Article){
    const exist = this._localArticles.find(locaLArticle=>article.title===article.title);

    if(exist){
      this._localArticles = this._localArticles.filter(localArticle=>localArticle.title!==article.title);
    }else{
      this._localArticles = [article,...this._localArticles];
    }
    this._localArticles = [article,...this._localArticles];
    this._storage.set('articles',this._localArticles);
  }
  async loadFavorites(){
    try {
      const articles = await this._storage.get('articles');
      this._localArticles = articles || [];
    } catch (error) {
      console.log(error);

    }
  }
  articlesInFavorites(article:Article){
    return !! this._localArticles.find(locaLArticle=>article.title===article.title);
  }

}
