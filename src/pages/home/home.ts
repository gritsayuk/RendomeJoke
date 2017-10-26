import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public http: Http) {

  }
  doRefresh(refresher){
    //alert("refresh!");
    /*setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);*/
/////
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    let postParams = {
      id: '6'
    }

    this.http.post("https://api.crmtour.com/api/joke/read_one.php", postParams, options)
      .subscribe(data => {
        alert("data");
        refresher.complete();
      }, error => {
        alert(error);// Error getting the data
        refresher.complete();
      });
  }
/////


}
