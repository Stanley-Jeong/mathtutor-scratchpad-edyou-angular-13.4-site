import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  // whiteLogo = "/wp-content/uploads/2023/02/edyou-logo-white-secondary";
  whiteLogo= "../../assets/edyou-logo-white-secondary";
  // colorLogo = "/wp-content/uploads/2023/02/edyou-logo-color-secondary";
  colorLogo = "../../assets/edyou-logo-color-secondary";
  clrContainer = ".global-nav-color-container";
  whtContainer = ".global-nav-container";

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    this.initializeScrollListener();
  }

  initializeScrollListener() {
    jQuery(window).scroll(() => {
      const value = jQuery(window).scrollTop();
      if (value > 50) {
        this.applyScrollStyles();
      } else {
        this.applyTopStyles();
      }
    });
  }

  applyScrollStyles() {
    // Color Navigation
    this.changeLogo(this.clrContainer, this.colorLogo);
    jQuery(this.clrContainer).css("background-color", "rgba(255,255,255,0.7)");
    jQuery(this.clrContainer).css("backdrop-filter", "blur(5px)");
    jQuery(this.clrContainer).css("height","20")

    jQuery(this.clrContainer + " .site-logo img").css("width", "100px");
			jQuery(this.clrContainer + " .tagline").css("font-size", "0.7rem");
			jQuery(this.clrContainer + " .global-nav a").css("font-size", "0.75rem");
    // // Additional CSS styling

    // White Navigation
    this.changeLogo(this.whtContainer, this.whiteLogo);
    jQuery(this.whtContainer).css("background-color", "rgba(0,0,0,0.2)");


			jQuery(this.whtContainer).css("backdrop-filter", "blur(5px)");
			jQuery(this.whtContainer + " .menu-item a").css("color", "unset");
			jQuery(this.whtContainer + " .elementor-menu-toggle").css("color", "unset");
			jQuery(this.whtContainer + " .hamburger-menu .elementor-icon").css("color", "unset");
			
			jQuery(this.whtContainer + " .site-logo img").css("width", "100px");
			jQuery(this.whtContainer + " .tagline").css("font-size", "0.7rem");
			jQuery(this.whtContainer + " a").css("font-size", "0.75rem");
    // Additional CSS styling
  }

  applyTopStyles() {
    // Color Navigation
    this.changeLogo(this.clrContainer, this.colorLogo);
    jQuery(this.clrContainer).css("backdrop-filter", "none");
    jQuery(this.clrContainer).css("background-color", "rgba(255,255,255,0)");
    // // Additional CSS styling

    // White Navigation
    this.changeLogo(this.whtContainer, this.whiteLogo);
    jQuery(this.whtContainer).css("background-color", "rgba(0,0,0,0)");

			jQuery(this.whtContainer + " .site-logo img").attr("src", this.whiteLogo + ".webp");
			jQuery(this.whtContainer + " .site-logo img").attr("srcset", this.whiteLogo + "-300x125.webp 300w, " + this.whiteLogo + "-768x319.webp 768w, " + this.whiteLogo + ".webp 1000w");
			// // CSS
			jQuery(this.whtContainer).css("background-color", "rgba(0,0,0,0)");
			jQuery(this.whtContainer + " .menu-item a").css("color", "#FFFFFF");
			jQuery(this.whtContainer).css("backdrop-filter", "none");
			jQuery(this.whtContainer + " .elementor-menu-toggle").css("color", "#FFFFFF");
			jQuery(this.whtContainer + " .hamburger-menu .elementor-icon").css("color", "#FFFFFF");
			
			jQuery(this.whtContainer + " .site-logo img").css("width", "125px");
			jQuery(this.whtContainer + " .tagline").css("font-size", "0.75rem");
			jQuery(this.whtContainer + " a").css("font-size", "1rem");


    // Additional CSS styling
  }







// TO BE USED LATER

//   var whiteLogo = "/wp-content/uploads/2023/02/edyou-logo-white-secondary";
// 	var colorLogo = "/wp-content/uploads/2023/02/edyou-logo-color-secondary";
	
// 	var clrContainer = ".global-nav-color-container";
// 	var whtContainer = ".global-nav-container";

// 	jQuery(window).scroll(function() {
// 		var value = jQuery(this).scrollTop();
// 		if (value > 50) {
// 			/** SCROLLING **/
// 			// COLOR NAV
// 			// LOGO
// // 			console.log ("SCROLLING")
// 			jQuery(clrContainer + " .site-logo img").attr("src", colorLogo + ".png");
// 			jQuery(clrContainer + " .site-logo img").attr("srcset", colorLogo + "-300x126.png 300w, " + colorLogo + "-768x321.png 768w, " + colorLogo + ".png 1000w");
// 			// CSS
// 			jQuery(clrContainer).css("background-color", "rgba(255,255,255,0.7)");
// 			jQuery(clrContainer).css("backdrop-filter", "blur(5px)");
// 			jQuery(clrContainer + " .site-logo img").css("width", "100px");
// 			jQuery(clrContainer + " .tagline").css("font-size", "0.7rem");
// 			jQuery(clrContainer + " .global-nav a").css("font-size", "0.75rem");
// // 			
			
			
// 			// WHITE NAV
// 			// LOGO
// 			jQuery(whtContainer + " .site-logo img").attr("src", whiteLogo + ".png");
// 			jQuery(whtContainer + " .site-logo img").attr("srcset", whiteLogo + "-300x125.png 300w, " + whiteLogo + "-768x319.png 768w, " + whiteLogo + ".png 1000w");
// 			// CSS
// 			jQuery(whtContainer).css("background-color", "rgba(0,0,0,0.2)");
// 			jQuery(whtContainer).css("backdrop-filter", "blur(5px)");
// 			jQuery(whtContainer + " .menu-item a").css("color", "unset");
// 			jQuery(whtContainer + " .elementor-menu-toggle").css("color", "unset");
// 			jQuery(whtContainer + " .hamburger-menu .elementor-icon").css("color", "unset");
			
// 			jQuery(whtContainer + " .site-logo img").css("width", "100px");
// 			jQuery(whtContainer + " .tagline").css("font-size", "0.7rem");
// 			jQuery(whtContainer + " .global-nav a").css("font-size", "0.75rem");
// 		} else {
// 			/** TOP **/
// 			// COLOR NAV
// 			// LOGO
// 			jQuery(clrContainer + " .site-logo img").attr("src", colorLogo + ".png");
// 			jQuery(clrContainer + " .site-logo img").attr("srcset", colorLogo + "-300x126.png 300w, " + colorLogo + "-768x321.png 768w, " + colorLogo + ".png 1000w");
// 			// CSS
// 			jQuery(clrContainer).css("backdrop-filter", "none");
// 			jQuery(clrContainer).css("background-color", "rgba(255,255,255,0)");
// 			jQuery(clrContainer + " .site-logo img").css("width", "125px");
// 			jQuery(clrContainer + " .tagline").css("font-size", "0.75rem");
// 			jQuery(clrContainer + " .global-nav a").css("font-size", "1rem");
			

			
// 			// WHITE NAV
// 			jQuery(whtContainer + " .site-logo img").attr("src", whiteLogo + ".png");
// 			jQuery(whtContainer + " .site-logo img").attr("srcset", whiteLogo + "-300x125.png 300w, " + whiteLogo + "-768x319.png 768w, " + whiteLogo + ".png 1000w");
// 			// CSS
// 			jQuery(whtContainer).css("background-color", "rgba(0,0,0,0)");
// 			jQuery(whtContainer + " .menu-item a").css("color", "#FFFFFF");
// 			jQuery(whtContainer).css("backdrop-filter", "none");
// 			jQuery(whtContainer + " .elementor-menu-toggle").css("color", "#FFFFFF");
// 			jQuery(whtContainer + " .hamburger-menu .elementor-icon").css("color", "#FFFFFF");
			
// 			jQuery(whtContainer + " .site-logo img").css("width", "125px");
// 			jQuery(whtContainer + " .tagline").css("font-size", "0.75rem");
// 			jQuery(whtContainer + " .global-nav a").css("font-size", "1rem");
// 		}
// 	});

//     jQuery('.back-btn').on('click', function() {
//       window.history.back();
//       return false;
//     });



















  changeLogo(container: string, logo: string) {
    jQuery(`${container} .site-logo img`).attr("src", `${logo}.webp`);
    jQuery(`${container} .site-logo img`).attr("srcset", `${logo}-300x125.webp 300w, ${logo}-768x319.webp 768w, ${logo}.webp 1000w`);
  }

  navigateToCompany() {
    this.router.navigate(['/company']).then(()=> {
      // window.location.reload();
    })
  }  

  navigateToSafety() {
    this.router.navigate(['/safety']).then(()=> {
      // window.location.reload();
    })
  }    

  navigateToLabs() {
    this.router.navigate(['/labs']).then(()=> {
        // window.location.reload();
      })
  }
  
  navigateToPayItForward() {
    this.router.navigate(['/pay-it-forward']).then(()=> {
        // window.location.reload();
      })
  }

  navigateToPress(){
    this.router.navigate(['/press'])
  }

  navigateToAcademicIntegrity(){
    this.router.navigate(['/academic-integrity']);
  }

  navigateToBlog(){
    this.router.navigate(['/blog']);
  }
}
