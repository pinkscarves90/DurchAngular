import { Component, OnInit, VERSION } from "@angular/core";
import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk";
import { AppService } from "./app.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  name = "Durch.net";
  users: any[] = [];
  userCount = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private appService: AppService, private httpClient: HttpClient) {
    this.buyNow();
    // new RampInstantSDK({
    //   hostAppName: "Durch.net",
    //   // URL to your app's logo
    //   hostLogoUrl: "https://yourdapp.com/yourlogo.png",
    //   //parameter that allows our system to properly recognize and count purchases made through your API integration.
    //   hostApiKey: ""
    // })
    //   .on("*", event => console.log(event))
    //   .show();
  }
  ngOnInit() {
  

  }
  buyNow(){
    console.log("Calling Wyre Reserve API on 3000  ")
    //const accountId = 'AC_28ZMELGWTUR' //Test
    const accountId = 'AC_2AZEYWPZZJ3' //Live
    return this.httpClient.post('https://us-central1-durch-834c0.cloudfunctions.net/expressApp/api/reserve', {
     // return this.httpClient.post('http://localhost:3000/api/reserve', {
      referrerAccountId: accountId,
      sourceCurrency: "USD",
    }).subscribe(response => {
      if (!!response) {
        console.log("Data final response", response)
        window.open((<any>response).url,"_self")
      }
    });
  }
}
