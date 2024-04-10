import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  whiteLogo= "../../assets/logoSets/edyou-logo-white-secondary";
  colorLogo = "../../assets/logoSets/edyou-logo-color-secondary";
  container = ".global-nav-container";

  ngOnInit(): void {
    this.initializeScrollListener();
  }
   
  constructor(private router: Router) {

    // Subscribe to NavigationStart event
    this.router.events.subscribe(event => {

      
      if (event instanceof NavigationStart) {
        this.findLogoName();

        window.scrollTo(0, 0); // Scroll to the top of the page
      }

      if (this.router.url.includes('/safety') || this.router.url === '/terms'|| this.router.url==='/privacy') {
        // Change background color to white
        document.body.style.backgroundColor = '#E7F9FF';

        this.replaceToColorLogos();

      } else{
        document.body.style.backgroundColor = '';

        this.replaceToWhiteLogos();
      }
    });
  }
    
  replaceToColorLogos() {
    // Replace the image source here
    const imgElement = document.querySelector('.elementor-widget-container img');
    if (imgElement) {
      imgElement.setAttribute('src', '../assets/logoSets/edyou-logo-color-secondary.webp');
      imgElement.setAttribute('height', '126');
      imgElement.setAttribute('srcset', '../assets/logoSets/edyou-logo-color-secondary.webp 300w, ../assets/logoSets/edyou-logo-color-secondary-1024x428.webp 1024w, ../assets/logoSets/edyou-logo-color-secondary-768x321.webp 768w, ../assets/logoSets/edyou-logo-color-secondary.png 1200w');
    }

    jQuery(this.container + " a").css("color", "#0079A5"); // To change the font colours
  }

  replaceToWhiteLogos(){
    const imgElement = document.querySelector('.elementor-widget-container img');
    if (imgElement) {
      imgElement.setAttribute('src', '../assets/logoSets/edyou-logo-white-secondary.webp');
      imgElement.setAttribute('height', '126');
      imgElement.setAttribute('srcset', '../assets/logoSets/edyou-logo-white-secondary.webp 300w, ../assets/logoSets/edyou-white-color-secondary-1024x428.webp 1024w, ../assets/logoSets/edyou-logo-white-secondary-768x321.webp 768w, ../assets/logoSets/edyou-logo-white-secondary.png 1200w');
    }
  }

  findLogoName(){
    const imgElement = document.querySelector('.elementor-widget-container img');
    const srcAttributeValue = imgElement?.getAttribute('src');
    const imageName = srcAttributeValue?.split('/').pop();
    return imageName;
  }

  initializeScrollListener() {

    jQuery(window).scroll(() => {
      const value = jQuery(window).scrollTop();

      if(this.findLogoName() === 'edyou-logo-white-secondary.webp'){
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

  applyWhiteScrollStyles() {
    
    // White Navigation
    jQuery(this.container).css("background-color", "rgba(0,0,0,0.2)");
    jQuery(this.container).css("backdrop-filter", "blur(5px)");
    jQuery(this.container + " .elementor-menu-toggle").css("color", "unset");
    jQuery(this.container + " .hamburger-menu .elementor-icon").css("color", "unset");
    jQuery(this.container + " .site-logo img").css("width", "100px");
    jQuery(this.container + " .tagline").css("font-size", "0.7rem");
    jQuery(this.container + " a").css("font-size", "0.75rem");
  // Additional CSS styling
  }

  applyColorScrollStyles(){
    // Color Navigation
    jQuery(this.container).css("background-color", "rgba(255,255,255,0.7)");
    jQuery(this.container).css("backdrop-filter", "blur(5px)");
    jQuery(this.container + " .menu-item li").css("color", "blue");
    jQuery(this.container + " .site-logo img").css("width", "100px");
    jQuery(this.container + " .tagline").css("font-size", "0.7rem");
    jQuery(this.container + " a").css("font-size", "0.75rem");
    // Additional CSS styling
  }
  applyCommonScroll(){

  }

  applyWhiteTopStyles() {
    jQuery(this.container).css("background-color", "rgba(0,0,0,0)");

    jQuery(this.container + " .site-logo img").attr("src", this.whiteLogo + ".webp");
    jQuery(this.container + " .site-logo img").attr("srcset", this.whiteLogo + "-300x125.webp 300w, " + this.whiteLogo + "-768x319.webp 768w, " + this.whiteLogo + ".webp 1000w");
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

  applyColorTopStyles(){
    jQuery(this.container).css("backdrop-filter", "none");
    jQuery(this.container).css("background-color", "rgba(255,255,255,0)");
    jQuery(this.container + " .site-logo img").css("width", "125px");
    jQuery(this.container + " .tagline").css("font-size", "0.75rem");
    jQuery(this.container + " a").css("font-size", "1rem");
  }
  

}

