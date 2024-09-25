import { Component, OnInit } from '@angular/core';
import { InvestorsService } from '../service/investors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consentsuccess',
  templateUrl: './consentsuccess.component.html',
  styleUrls: ['./consentsuccess.component.css']
})
export class ConsentsuccessComponent implements OnInit {
  email: string = '';
  showConfirmMessge: boolean = true;
  displayMessage:any

  constructor(private route: ActivatedRoute, private http: HttpClient, private router:Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      if (this.email) {
        this.sendEmailToApi(this.email);
      }
    });
  }


  sendEmailToApi(email: string): void {
    const apiUrl = 'https://qzxk7csj32.execute-api.us-west-2.amazonaws.com/Production/Parental_Consent'; // Replace with your API URL

    // Call the GET API with email as query parameter
    this.http.get(`${apiUrl}?email=${email}`)
      .subscribe((response:any) => {
        if(response.statusCode == 200){
          console.log('dddddddd')
          this.showConfirmMessge = false
          this.displayMessage = 'Thank you for approving your child’s edYOU account.'
        }
        console.log('API response:', response);
      }, error => {
        this.displayMessage = error || 'some error occured'
        console.error('Error calling API:', error);
      });
  }




  navigateToMain(){
    this.router.navigate(['/main']);
  }

}
