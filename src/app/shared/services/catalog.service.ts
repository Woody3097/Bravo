import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  _catalogAddUrl,
  _catalogDeleteUrl,
  _catalogEditUrl,
  _catalogGetUrl,
  _catalogReplaceUrl,
  _catalogSearchUrl,
  _catalogSortUrl,
} from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  constructor(private http: HttpClient) {}

  searchCatalog(searchStr: string): Observable<any> {
    let tmp = searchStr.split('');
    tmp.push('%');
    tmp.unshift('%');
    return this.http.post<any>(_catalogSearchUrl, {
      searchStr: tmp.join(''),
    });
  }

  deleteCatalogEl(id: number): Observable<any> {
    return this.http.post(_catalogDeleteUrl, { id });
  }

  editCatalogEl(catalogEl: any): Observable<any> {
    return this.http.put(_catalogEditUrl, { catalogEl });
  }

  addCatalogEl(catalogEl: any): Observable<any> {
    return this.http.post(_catalogAddUrl, { catalogEl });
  }

  getCatalog(token: any): Observable<any> {
    return this.http.post(_catalogGetUrl, token);
  }

  sortCatalog(sortParamsArray: string[]): Observable<any> {
    sortParamsArray.map((el) => {
      let tmp = el.split('');
      tmp.push('%');
      tmp.unshift('%');
      return tmp.join('');
    });
    return this.http.post(_catalogSortUrl, sortParamsArray);
  }

  replaceCatalog(replaceData: any): Observable<any> {
    return this.http.post(_catalogReplaceUrl, replaceData);
  }
}
