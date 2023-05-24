import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  
  constructor() { }
  length:number=8;
  password:string="";
  generate(){
      this.timer=0;
      if(this.length<4 || this.length>32)
      window.alert("should be >=4 and <=32");
      else{
          this.password="";
          let special=['!','@','#','$','%','{','}','&','*','?','^'];
          let allCharacters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%{}&*^?";
          let a=String.fromCharCode(Math.floor(Math.random()*26+65));
          let b=String.fromCharCode(Math.floor(Math.random()*26+97));
          let c=special[Math.floor(Math.random()*11)];
          this.password=this.password+a+b+c +Math.floor(Math.random()*10);

          for(let i=4;i<this.length;i++)
          {
            this.password+=allCharacters[Math.floor(Math.random()*73)];
          }
      }
  }

  async copy()
  {
      try {
        await navigator.clipboard.writeText(this.password);
        console.log('Text copied to clipboard');
        this.timer=1;
      } catch (error) {
        console.error('Error copying text to clipboard:', error);
      }
  }
  timer:number=0;


  ngOnInit(): void {
  }

}
