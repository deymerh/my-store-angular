import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';

// import { Product } from './models/product.model';
import { FilesService } from './services/files.service';

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
  imageUploaded: string = '';

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private filesService: FilesService,
    ){}
  
    onLoaded(image:string){
    // console.log("Event father!: ", image);
  }
  toggleImage(){
    this.showComponentImage = !this.showComponentImage;
  }

  createUser(){
    this.userService.create({
      name: 'Deymer',
      email: 'deymerh@deymerh.com',
      password: 'deymerh'
    }).subscribe()
  }

  login(email:string = 'deymerh@deymerh.com', password:string = 'deymerh'){
    this.authService.loginAndGetProfile(email, password).subscribe();
  }
 
  downloadFile(){
    console.log('hola')
    this.filesService.getFile(
      'my.pdf',
      'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
      'application/pdf'
      )
      .subscribe()
  }

  uploadImage(event:Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (!file) {
      window.alert('Debes seleccionar un archivo');
    }else{
      this.filesService.uoploadFile(file)
      .subscribe(res=>{
        this.imageUploaded = res.location;
      })
    }
  }
}
