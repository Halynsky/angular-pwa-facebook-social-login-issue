import { Component } from '@angular/core';
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

 authFacebookNative(){
    let fbLoginOptions = {
      scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
      return_scopes: true,
      enable_profile_selector: true
    };
    FB.login((response: any) => {
      alert(JSON.stringify(response));
      if (response.authResponse) {
        let authResponse = response.authResponse;
        FB.api(`/me?fields=name,email,last_name,first_name,picture`, (fbUser: any) => {
          this.user = {};

          this.user.id = fbUser.id;
          this.user.name = fbUser.name;
          this.user.email = fbUser.email;
          this.user.photoUrl = 'https://graph.facebook.com/' + fbUser.id + '/picture?type=normal';
          this.user.firstName = fbUser.first_name;
          this.user.lastName = fbUser.last_name;
          this.user.authToken = authResponse.accessToken;

          this.user.facebook = fbUser;

          alert(JSON.stringify(this.user));
        });
      } else {
        // error
      }
    }, fbLoginOptions);
  }


}
