import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //apiUrl:string = "https://api.crmtour.com/api/joke/read_one.php";
  apiUrl:string = "https://api.crmtour.com/api/joke/read_paging.php?page=";
  JokeBody: Object[];//Масив шуток
  JokeNum: number;//Номер шутки
  JokePage: number;//Номер страницы
  JokePageLen: number;//Количество всех шуток

  JokeNumId: string;//Ид шутки
  JokeNumName: string;//Шутка
  constructor(public navCtrl: NavController, public restapiService: RestapiServiceProvider) {
    this.JokeNumId = "";
    this.JokeNumName = "";
    this.JokeNum = 0;
    this.JokePage = 0;
    this.JokePageLen = 0;
    this.SendRequest("");
    //this.JokeBody = JSON.parse('[{"id":"","text":""},{}]');
  }

  doRefresh(refresher){
    this.JokeNum++;
    if(this.JokeNum>=this.JokePageLen-1){
      this.SendRequest("");
    }
    this.JokeNumId = this.JokeBody[this.JokeNum]["id"];
    this.JokeNumName = this.JokeBody[this.JokeNum]["name"];
    //console.log(this.JokeNum);
    //this.SendRequest("");
    refresher.complete();
  }
  SendRequest(req){
    this.JokePage++;

    this.restapiService.runHttpPost(this.apiUrl+this.JokePage,req)
      .then((result) => {
        if (this.JokePageLen === 0){
          this.JokeBody = JSON.parse(result["_body"]).records;
        }
        else {
          for(var i=0;i<JSON.parse(result["_body"]).records.length;i++) {
            //console.log("++++++++++"+i);
            this.JokeBody.push(JSON.parse(result["_body"]).records[i]);
          }
        }
        //console.log("-----------"+this.JokeBody);
        this.JokePageLen = this.JokeBody.length;
        //console.log("-----------++"+this.JokePageLen);
        if(this.JokeNum == 0) {
          this.JokeNumId = this.JokeBody[this.JokeNum]["id"];
          this.JokeNumName = this.JokeBody[this.JokeNum]["name"];
        }
      }, (err) => {
        console.log(err);
      });
  }
}
