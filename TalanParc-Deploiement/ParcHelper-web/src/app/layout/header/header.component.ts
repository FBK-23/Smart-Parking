import { DOCUMENT } from "@angular/common";
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  AfterViewInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { ConfigService } from "src/app/config/config.service";
import { AuthService } from "src/app/core/service/auth.service";
import { RightSidebarService } from "src/app/core/service/rightsidebar.service";
import { LanguageService } from "src/app/core/service/language.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
const document: any = window.document;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"],
})
export class HeaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, AfterViewInit
{
  public config: any = {};
  userImg: string;
  homePage: string;
  isNavbarCollapsed = true;
  flagvalue;
  countryName;
  langStoreValue: string;
  defaultFlag: string;
  isOpenSidebar: boolean;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private rightSidebarService: RightSidebarService,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    public languageService: LanguageService
  ) {
    super();
  }
  
  notifications: any[] = [
    {
      userImg: "assets/images/pic.jpg",
      userName: "Sarah ",
      time: "14 mins ago",
      message: "J'ai bolqué une voiture",
    },
    {
      userImg: "assets/images/pic2.jpg",
      userName: " Feriel",
      time: "22 mins ago",
      message: "Je suis coincée !!!",
    },
    {
      userImg: "assets/images/pic3.jpg",
      userName: " Firas ",
      time: "3 hours ago",
      message: "Je peux pas sortir ",
    },
    {
      userImg: "assets/images/pic4.jpg",
      userName: " Mariem ",
      time: "5 hours ago",
      message: "Ma voiture en panne",
    },
    {
      userImg: "assets/images/pic.jpg",
      userName: "Ali",
      time: "14 mins ago",
      message: "Parking complet !!! ",
    },
    {
      userImg: "assets/images/pic3.jpg",
      userName: "Alia",
      time: "22 mins ago",
      message: "je suis coincée !!!",
    },
    {
      userImg: "assets/images/pic2.jpg",
      userName: "John Doe",
      time: "3 hours ago",
      message: "kindly help me for code.",
    },
  ];
  ngOnInit() {
    this.config = this.configService.configData;
   // const userRole = this.authService.currentUserValue.role;
   // this.userImg = this.authService.currentUserValue.img;

  //  if (userRole === "Admin") {
  //    this.homePage = "admin/dashboard/dashboard2";
  //  } else if (userRole === "User") {
  //    this.homePage = "doctor/dashboard";
  //  } else {
  //    this.homePage = "admin/dashboard/dashboard2";
  //  }

  }

  ngAfterViewInit() {
    // set theme on startup
    if (localStorage.getItem("theme")) {
      this.renderer.removeClass(this.document.body, this.config.layout.variant);
      this.renderer.addClass(this.document.body, localStorage.getItem("theme"));
    } else {
      this.renderer.addClass(this.document.body, this.config.layout.variant);
    }

    if (localStorage.getItem("menuOption")) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem("menuOption")
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        "menu_" + this.config.layout.sidebar.backgroundColor
      );
    }

    if (localStorage.getItem("choose_logoheader")) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem("choose_logoheader")
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        "logo-" + this.config.layout.logo_bg_color
      );
    }

    if (localStorage.getItem("sidebar_status")) {
      if (localStorage.getItem("sidebar_status") === "close") {
        this.renderer.addClass(this.document.body, "side-closed");
        this.renderer.addClass(this.document.body, "submenu-closed");
      } else {
        this.renderer.removeClass(this.document.body, "side-closed");
        this.renderer.removeClass(this.document.body, "submenu-closed");
      }
    } else {
      if (this.config.layout.sidebar.collapsed === true) {
        this.renderer.addClass(this.document.body, "side-closed");
        this.renderer.addClass(this.document.body, "submenu-closed");
      }
    }
  }
  callFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
  
  mobileMenuSidebarOpen(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }
  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains("side-closed");
    if (hasClass) {
      this.renderer.removeClass(this.document.body, "side-closed");
      this.renderer.removeClass(this.document.body, "submenu-closed");
    } else {
      this.renderer.addClass(this.document.body, "side-closed");
      this.renderer.addClass(this.document.body, "submenu-closed");
    }
  }
  public toggleRightSidebar(): void {
    this.subs.sink = this.rightSidebarService.sidebarState.subscribe(
      (isRunning) => {
        this.isOpenSidebar = isRunning;
      }
    );

    this.rightSidebarService.setRightSidebar(
      (this.isOpenSidebar = !this.isOpenSidebar)
    );
  }
  logout() {

    
    localStorage.clear();
    this.router.navigate(["/authentication/signin"]);
    
  }
}
