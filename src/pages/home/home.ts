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
    this.JokeBody = JSON.parse('{"id":"","text":""}');
    this.SendRequest({"id":"1"});
  }

  doRefresh(refresher){
    this.SendRequest({"id":"6"});
    refresher.complete();
  }
  SendRequest(req){
    this.restapiService.runHttpPost(this.apiUrl,req)
      .then((result) => {
        this.JokeBody = JSON.parse(result._body);
        //console.log(JSON.parse(result._body).text);

      }, (err) => {
        //console.log(err);
      });
  }
}
