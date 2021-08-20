import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSideBarState } from '../shared/store/selectors/side-bar.selector';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  store$: Subscription;
  initialNames = ['Orders', 'Catalog', 'Customers', 'Log out'];
  bodyStyle = { flex: '0 1 85%' };
  outletStyle = { flex: '0 1 15%' };
  logoActive: boolean;
  orderActive: boolean = false;
  catalogActive: boolean = false;
  customersActive: boolean = false;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    let sideElements = document.getElementsByClassName('main__link');
    this.store$ = this.store.select(selectSideBarState).subscribe((res) => {
      this.logoActive = res;
      if (this.logoActive) {
        setTimeout(() => {
          for (let i = 0; i < sideElements.length; ++i) {
            let item = sideElements[i];
            item.innerHTML = '';
          }
        }, 100);
        this.bodyStyle = { flex: '0 1 5%' };
        this.outletStyle = { flex: '0 1 95%' };
      } else {
        for (let i = 0; i < sideElements.length; ++i) {
          let item = sideElements[i];
          item.innerHTML = this.initialNames[i];
        }
        this.bodyStyle = { flex: '0 1 15%' };
        this.outletStyle = { flex: '0 1 85%' };
      }
    });
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  setActive(link: string): void {
    switch (link) {
      case 'order':
        this.orderActive = true;
        this.catalogActive = false;
        this.customersActive = false;
        break;
      case 'catalog':
        this.orderActive = false;
        this.catalogActive = true;
        this.customersActive = false;
        break;
      case 'customers':
        this.orderActive = false;
        this.catalogActive = false;
        this.customersActive = true;
        break;
    }
  }

  ngOnDestroy(): void {
    this.store$.unsubscribe();
  }
}
