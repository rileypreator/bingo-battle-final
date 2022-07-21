import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log("In Verify Code");
    this.router.navigate(['/games'])
  }

}
