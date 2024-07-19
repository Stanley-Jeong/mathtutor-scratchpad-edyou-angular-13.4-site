import { isPlatformBrowser } from '@angular/common';
import {Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CacheCleanerService } from './service/cache-cleaner.service';
import { SwUpdate } from '@angular/service-worker';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  whiteLogo= "https://edyouwebsite.s3.us-west-2.amazonaws.com/edyou-logo-horiz-empower-white.png";
  colorLogo = "https://edyouwebsite.s3.us-west-2.amazonaws.com/edyou-logo-horiz-empower-color.png";
  container = ".global-nav-container";
  private isBrowser: boolean;

  constructor(private router:Router, @Inject(PLATFORM_ID) private platformId: Object,
    private cacheCleanerService: CacheCleanerService, private swUpdate: SwUpdate) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.isBrowser) {
          window.scrollTo(0, 0); 
        }
      }
      if (this.router.url.includes('/safety') || this.router.url === '/terms'|| this.router.url==='/privacy') {
        // Change background color to white
        this.replaceToColor();
      } else{
        this.replaceToWhite();
      }
      this.highlightActiveLinkAndRemoveArrow();
    });
  }


  ngOnInit(): void {
    this.initializeScrollListener();
    if(this.router.url.includes("main")){
      this.router.navigate(['/company']);
      setTimeout("",20)
      this.router.navigate(['/main']);
    }

    if (this.swUpdate.isEnabled) { console.log(this.swUpdate.isEnabled)
      this.swUpdate.available.subscribe(() => {
        this.swUpdate.activateUpdate().then(() => {
          this.cacheCleanerService.clearCache();
          document.location.reload();
        });
      });
    }else{
      console.log(this.swUpdate.isEnabled)
    }
  }
   

  

  highlightActiveLinkAndRemoveArrow(){
    if(this.isBrowser) {
    const currentUrl = this.router.url;
    const component = this.extractTextFromUrl(currentUrl).toLowerCase();
    let menuItems:any = document.querySelectorAll(this.container + " .elementor-item");
    menuItems.forEach((menuItem:any) => {
      const menuItemElement = menuItem as HTMLAnchorElement;
      const menuItemText = menuItemElement.innerText.toLowerCase();
      if(menuItemText.includes(component) || (component.includes("investor") && menuItemText.includes("investor"))){
        menuItemElement.style.fontWeight = 'bold';
      } else {
        menuItemElement.style.fontWeight = 'normal';
      }
    })
    }
  }

  addSubArrow(menuItem: HTMLAnchorElement) {
    if(this.isBrowser) {
    let subArrowSpan:any = document.createElement('span');
    subArrowSpan.classList.add('sub-arrow');
    let icon:any = document.createElement('i');
    icon.classList.add('fas', 'fa-caret-down');
    subArrowSpan.appendChild(icon);
    menuItem.appendChild(subArrowSpan);
    }
  }

  extractTextFromUrl(url: string): string {
    const urlParts = url.split('/');
    let lastPart = urlParts[urlParts.length - 1];
    // Remove any query parameters
    const queryIndex = lastPart.indexOf('?');
    if (queryIndex !== -1) {
      lastPart = lastPart.substring(0, queryIndex);
    }
    // Remove any hash fragments
    const hashIndex = lastPart.indexOf('#');
    if (hashIndex !== -1) {
      lastPart = lastPart.substring(0, hashIndex);
    }
    return lastPart;
  }
    
  replaceToColor() {
    if(this.isBrowser) {
    // Replace the image source here
    let imgElement:any = document.querySelector('.elementor-widget-container img');
    if (imgElement) {
      imgElement.setAttribute('src', 'https://edyouwebsite.s3.us-west-2.amazonaws.com/edyou-logo-horiz-empower-color.png');
      imgElement.setAttribute('height', '126');
    }

    jQuery(this.container + " a").css("color", "#0079A5"); // To change the font colours
    jQuery(this.container + " p").css("color", "#0079A5"); // To change the text under the logo to blue!
    document.body.style.backgroundColor = '#E7F9FF';
    }
  }

  replaceToWhite(){
    if(this.isBrowser) {
    let imgElement:any = document.querySelector('.elementor-widget-container img');
    if (imgElement) {
      imgElement.setAttribute('src', 'https://edyouwebsite.s3.us-west-2.amazonaws.com/edyou-logo-horiz-empower-white.png');
      imgElement.setAttribute('height', '126');
    }
    jQuery(this.container + " a").css("color", "#FFFFFF");
    jQuery(this.container + " p").css("color", "#FFFFFF"); // To change the text under the logo to blue!
    document.body.style.backgroundColor = '';
    }
  }

  findLogoName(){
    if(this.isBrowser) {
    let imgElement:any = document.querySelector('.elementor-widget-container img');
    const srcAttributeValue = imgElement?.getAttribute('src');
    const imageName = srcAttributeValue?.split('/').pop();
    return imageName;
    }
  }

  initializeScrollListener() {
    if (this.isBrowser) {
    jQuery(window).scroll(() => {
      const value = jQuery(window).scrollTop();

      if(this.findLogoName()?.includes('white')){
        if (value > 50) {
          this.applyWhiteScrollStyles();
        } else {
          this.applyWhiteTopStyles();
        }
      } else{
        if (value > 50) {
          this.applyColorScrollStyles();
        } else {
          this.applyColorTopStyles();
        }
      }
    });
    }
  }

  applyWhiteScrollStyles() {
    // White Navigation
    if (this.isBrowser) {
    jQuery(this.container).css("background-color", "rgba(0,0,0,0.2)");
    jQuery(this.container).css("backdrop-filter", "blur(5px)");
    jQuery(this.container + " .elementor-menu-toggle").css("color", "unset");
    jQuery(this.container + " .hamburger-menu .elementor-icon").css("color", "unset");
    jQuery(this.container + " .site-logo img").css("width", "100px");
    jQuery(this.container + " .tagline").css("font-size", "0.7rem");
    jQuery(this.container + " a").css("font-size", "0.75rem");
    }
    // Additional CSS styling
  }

  applyColorScrollStyles(){
    // Color Navigation
    if (this.isBrowser) {
    jQuery(this.container).css("background-color", "rgba(255,255,255,0.7)");
    jQuery(this.container).css("backdrop-filter", "blur(5px)");
    jQuery(this.container + " .site-logo img").css("width", "100px");
    jQuery(this.container + " .tagline").css("font-size", "0.7rem");
    jQuery(this.container + " a").css("font-size", "0.75rem");
    }
    // Additional CSS styling
  }
  applyCommonScroll(){

  }

  applyWhiteTopStyles() {
    if (this.isBrowser) {
    jQuery(this.container).css("background-color", "rgba(0,0,0,0)");
    // // CSS
    jQuery(this.container).css("background-color", "rgba(0,0,0,0)");
    jQuery(this.container + " .menu-item a").css("color", "#FFFFFF");
    jQuery(this.container).css("backdrop-filter", "none");
    jQuery(this.container + " .elementor-menu-toggle").css("color", "#FFFFFF");
    jQuery(this.container + " .hamburger-menu .elementor-icon").css("color", "#FFFFFF");
    jQuery(this.container + " .site-logo img").css("width", "125px");
    jQuery(this.container + " .tagline").css("font-size", "0.75rem");
    jQuery(this.container + " a").css("font-size", "1rem");
    }
  }

  applyColorTopStyles(){
    if (this.isBrowser) {
    jQuery(this.container).css("backdrop-filter", "none");
    jQuery(this.container).css("background-color", "rgba(255,255,255,0)");
    jQuery(this.container + " .site-logo img").css("width", "125px");
    jQuery(this.container + " .tagline").css("font-size", "0.75rem");
    jQuery(this.container + " a").css("font-size", "1rem");
    }
  }
}