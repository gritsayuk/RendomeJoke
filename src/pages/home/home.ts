import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  apiUrl:string = "https://api.crmtour.com/api/joke/read_one.php";
  JokeBody: any;
  constructor(public navCtrl: NavController, public restapiService: RestapiServiceProvider) {
    this.JokeBody = JSON.parse('{"id":"1","text":"дкрни"}');
  }

  doRefresh(refresher){
    this.restapiService.runHttpPost(this.apiUrl,{"id":"1"})
    .then((result) => {
        this.JokeBody = JSON.parse(result._body);
        //console.log(JSON.parse(result._body).text);

        refresher.complete();
      }, (err) => {
        console.log(err);
        refresher.complete();
      });
  }

}
