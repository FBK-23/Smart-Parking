import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightSidebarService } from './service/rightsidebar.service';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './service/auth.service';
import { DynamicScriptLoaderService } from './service/dynamic-script-loader.service';
import { throwIfAlreadyLoaded } from './guard/module-import.guard';
import { CarOwnerService } from './service/car-owner.service';
import { CarService } from './service/car.service';
import { UserCarService } from './service/usercar.service';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    RightSidebarService,
    AuthGuard,
    CarService,
    UserCarService,
    CarOwnerService,
    AuthService,
    DynamicScriptLoaderService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
