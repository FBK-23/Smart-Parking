import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { SERVER_URL } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private http: HttpClient) { }

  public async capturePhoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 90
    });

    let blob = await fetch(capturedPhoto.webPath).then(r => r.blob());
    let formData = new FormData();
    formData.append('file', blob);
    
    return this.http.post(SERVER_URL + "api/user/userByCar/findByPlatePhoto", formData); 
  }

}


