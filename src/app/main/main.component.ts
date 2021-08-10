import { Component, OnInit, OnDestroy } from '@angular/core';
import {Store} from "@ngrx/store";
import {selectSideBarState} from "../shared/selectors/side-bar.selector";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  store$: Subscription;
  initialNames = ['Orders', 'Catalog', 'Customers', 'Log out'];
  bodyStyle = {flex: '0 1 85%'};
  outletStyle = {flex: '0 1 15%'}
  logoActive: boolean;

  constructor(private store: Store) { }

  ngOnInit(): void {
    let sideElements = document.getElementsByClassName('main__link');
    this.store$ = this.store.select(selectSideBarState).subscribe(res => {
      this.logoActive = res;
      if(this.logoActive) {
        setTimeout(() => {
          for (let i = 0; i < sideElements.length; ++i) {
            let item = sideElements[i];
            item.innerHTML = '';
          }
        }, 100)
        this.bodyStyle = {flex: '0 1 5%'};
        this.outletStyle = {flex: '0 1 95%'}
      }
      else {
        for (let i = 0; i < sideElements.length; ++i) {
          let item = sideElements[i];
          item.innerHTML = this.initialNames[i];
        }
        this.bodyStyle = {flex: '0 1 15%'};
        this.outletStyle = {flex: '0 1 85%'}
      }
    })
  }

  ngOnDestroy(): void {
    this.store$.unsubscribe();
  }
}
