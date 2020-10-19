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
    console.log("Calling Wyre Reserve API on 3000  ")
    this.httpClient.post('http://localhost:3000/api/reserve','',{})
            .subscribe(data => console.log("Data response",data)); 
            // console.log("Calling Wyre RateQuote API on 3000  ")
            // this.httpClient.post('http://localhost:3000/api/rateQuote','',{})
            //         .subscribe(data => console.log("Data response",data)); 
  }
}