import { Component } from '@angular/core';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  showComponentImage: boolean = true;

  title = 'my-store';
  urlForFather:string = "https://www.w3schools.com/howto/img_avatar.png";
  img:string = "Texto de ejemplo para input";

  onLoaded(image:string){
    // console.log("Event father!: ", image);
  }
  toggleImage(){
    this.showComponentImage = !this.showComponentImage;
  }
}
