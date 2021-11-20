import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { concat, forkJoin, from, interval, merge, Observable, of } from 'rxjs';
import {
  first,
  flatMap,
  map,
  mergeMap,
  share,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Field } from './models/FieldList';
import { FormListService } from './services/form-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private title: Title,
    private formListServ: FormListService
  ) {}
  ngOnInit() {
    this.title.setTitle('Admin');
    let arr = [1, 2, 3, 4];
    let name = of('Ariyana');
    let observable1 = of(...arr);
    let observable2 = interval(2000);

    observable1
      .pipe(map((i) => i * i))
      .pipe(share())
      .pipe(first())
      .pipe(
        mergeMap(() => {
          return observable2;
        })
      )
      .pipe(switchMap((i) => of(i)));

    // .subscribe((res) => console.log(res));

    name.pipe(map((i) => i.toLocaleUpperCase()));
    // .subscribe(i=> console.log(i)
    // )

    let postObs = this.getPosts();
    let commObs = this.getComments();

    const combObs = postObs.pipe(
      switchMap((posts) => {
        return commObs.pipe(
          tap((comm) => {
            console.log('Posts :', posts);
            console.log('Comments :', comm);
          })
        );
      })
    );
    // combObs.subscribe();

    let todoObs = this.getTodos();
    // todoObs.subscribe(res => console.log(res))

    const colorObs = this.getColor();
    const sizeObs = this.getSize();

    const shoeObs = colorObs.pipe(
      flatMap((color) => {
        return sizeObs.pipe(
          map((size) => {
            const shoe = {
              color: color,
              size: size,
            };
            return shoe;
          })
        );
      })
    );

    // shoeObs.subscribe((data) => data.subscribe((res) => console.log(res)));// without mergeMap
    // shoeObs.subscribe((data) => console.log(data));// with mergeMap

    const concatObs = concat(sizeObs, colorObs);
    // concatObs.subscribe(i => console.log(i))

    const forkJoinObs = forkJoin(colorObs, sizeObs);
    // forkJoinObs.subscribe(i => console.log(i))

    const mergeObs = merge(colorObs, sizeObs);
    // mergeObs.subscribe((i) => console.log(i));

    const postData = {
      id: 1,
      title: 'foo',
      body: 'bar',
      userId: 1,
    };

    const putHttp = this.setPosts(postData);
    // putHttp.subscribe((i) => console.log(i));

    const tempFieldData: Field = {
      iconClass: 'fab fa-github',
      inputType: 'text',
      controlName: 'userName',
      inputPlaceHolder: 'Github Profile *',
    };
    // this.formListServ.setFieldList(tempFieldData).subscribe(i => console.log(i));

  }
  getPosts() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/1');
  }
  getComments() {
    return this.http.get('https://jsonplaceholder.typicode.com/comments/1');
  }
  getTodos() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }

  getColor() {
    const colorArr = [{ color: 'Black' }, { color: 'White' }];
    return of(...colorArr.slice(0, 1));
  }

  getSize() {
    const sizeArr = [{ size: 10 }, { size: 9 }];
    return of(sizeArr[0]);
  }

  setPosts(data) {
    return this.http.put('https://jsonplaceholder.typicode.com/posts/1', data);
  }
}
