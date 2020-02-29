import { Component, ChangeDetectorRef } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

declare let FB: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  user: any = null;

  constructor(public changeDetectorRef: ChangeDetectorRef) {

  }

 authFacebookNative(){
    let fbLoginOptions = {
      scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
      return_scopes: true,
      enable_profile_selector: true
    };
    let _this = this;
    FB.login((response: any) => {
      alert(JSON.stringify(response));
      if (response.authResponse) {
        let authResponse = response.authResponse;
        FB.api(`/me?fields=name,email,last_name,first_name,picture`, (fbUser: any) => {
          _this.user = {};

          _this.user.id = fbUser.id;
          _this.user.name = fbUser.name;
          _this.user.email = fbUser.email;
          _this.user.photoUrl = 'https://graph.facebook.com/' + fbUser.id + '/picture?type=normal';
          _this.user.firstName = fbUser.first_name;
          _this.user.lastName = fbUser.last_name;
          _this.user.authToken = authResponse.accessToken;

          _this.user.facebook = fbUser;

          _this.changeDetectorRef.detectChanges();

          alert(JSON.stringify(_this.user));
        });
      } else {
        // error
      }
    }, fbLoginOptions);
  }


}
