import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { AuthGuard } from './app/auth/auth.guard';
import { AuthService } from './app/auth/auth.service';
import { AuthResolver } from './app/auth/auth.resolver';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    AuthService, // Ensure AuthService is provided
    AuthGuard, // Ensure AuthGuard is provided
    AuthResolver, // Ensure AuthResolver is provided
  ],
});
