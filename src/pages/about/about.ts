import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  apiUrl:string = "https://api.crmtour.com/api/joke/create.php";
  JokeBody: any;
  TextJoke: string;
  Title: string;
  Response: string;
  constructor(public navCtrl: NavController, public restapiService: RestapiServiceProvider) {

  }
  SendJoke(){
    this.restapiService.runHttpPost(this.apiUrl,{"id":this.Title,"text":this.TextJoke})
      .then((result) => {
        this.JokeBody = JSON.parse(result._body);
        this.TextJoke="";
        this.Title="";
        this.Response=this.JokeBody.message;
        //console.log(this.TextJoke);
        //console.log(this.JokeBody.message);
        //refresher.complete();
      }, (err) => {
        Response=err;
        //console.log(err);
        //refresher.complete();
      });
  }
}
