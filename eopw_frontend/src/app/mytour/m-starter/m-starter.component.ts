import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-m-starter',
  templateUrl: './m-starter.component.html',
  styleUrls: ['./m-starter.component.css']
})
export class MStarterComponent implements OnInit {

  constructor(public userService:UserService) { }

  ngOnInit(): void {
  }

}
