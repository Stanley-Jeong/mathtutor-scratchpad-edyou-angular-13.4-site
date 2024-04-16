import {Component, OnInit } from '@angular/core';
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
    if(this.router.url.includes("main")){
      this.router.navigate(['/company']);
      setTimeout("",20)
      this.router.navigate(['/main']);
    }
  }
   
  constructor(private router: Router) {

    // Subscribe to NavigationStart event
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        window.scrollTo(0, 0); // Scroll to the top of the page
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
  

  highlightActiveLinkAndRemoveArrow(){

    const currentUrl = this.router.url;
    const component = this.extractTextFromUrl(currentUrl).toLowerCase();
    const menuItems = document.querySelectorAll(this.container + " .elementor-item");

    menuItems.forEach((menuItem) => {
      const menuItemElement = menuItem as HTMLAnchorElement;
      const menuItemText = menuItemElement.innerText.toLowerCase();
      

        // const componentsToAddSpan = ['company', 'labs', 'safety'];

        // // Check if the component contains "main"
        // const isMainComponent = component.includes("main");

        // // Check if the menuItem contains a sub-arrow span
        // const hasSubArrowSpan = menuItem.querySelector('.sub-arrow');

        // // Check if the menuItem is one of the components to which the arrow should be added
        // const isComponentToAdd = componentsToAddSpan.some(componentToAppend => menuItemText.includes(componentToAppend));

        // // If the component contains "main" and the menuItem doesn't have a sub-arrow span, add it
        // if (isMainComponent && !hasSubArrowSpan && isComponentToAdd) {
        //   this.addSubArrow(menuItemElement);
        // } 
        // // If the component doesn't contain "main" and the menuItem has a sub-arrow span, remove it
        // else if (!isMainComponent && hasSubArrowSpan) {
        //   menuItem.querySelector('.sub-arrow')?.remove();
        // }

      if(menuItemText.includes(component) || (component.includes("investor") && menuItemText.includes("investor"))){
        menuItemElement.style.fontWeight = 'bold';
      } else {
        menuItemElement.style.fontWeight = 'normal';
      }
    })
  }

  addSubArrow(menuItem: HTMLAnchorElement) {
    const subArrowSpan = document.createElement('span');
    subArrowSpan.classList.add('sub-arrow');
    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-caret-down');
    subArrowSpan.appendChild(icon);
    menuItem.appendChild(subArrowSpan);
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
    // Replace the image source here
    const imgElement = document.querySelector('.elementor-widget-container img');
    if (imgElement) {
      imgElement.setAttribute('src', 'https://edyouwebsite.s3.us-west-2.amazonaws.com/edyou-logo-horiz-empower-color.png');
      imgElement.setAttribute('height', '126');
      // imgElement.setAttribute('srcset', '../assets/logoSets/edyou-logo-color-secondary.webp 300w, ../assets/logoSets/edyou-logo-color-secondary-1024x428.webp 1024w, ../assets/logoSets/edyou-logo-color-secondary-768x321.webp 768w, ../assets/logoSets/edyou-logo-color-secondary.png 1200w');
    }

    jQuery(this.container + " a").css("color", "#0079A5"); // To change the font colours
    jQuery(this.container + " p").css("color", "#0079A5"); // To change the text under the logo to blue!
    document.body.style.backgroundColor = '#E7F9FF';
  }

  replaceToWhite(){
    const imgElement = document.querySelector('.elementor-widget-container img');
    if (imgElement) {
      imgElement.setAttribute('src', 'https://edyouwebsite.s3.us-west-2.amazonaws.com/edyou-logo-horiz-empower-white.png');
      imgElement.setAttribute('height', '126');
      // imgElement.setAttribute('srcset', '../assets/logoSets/edyou-logo-white-secondary.webp 300w, ../assets/logoSets/edyou-white-color-secondary-1024x428.webp 1024w, ../assets/logoSets/edyou-logo-white-secondary-768x321.webp 768w, ../assets/logoSets/edyou-logo-white-secondary.png 1200w');
    }
    jQuery(this.container + " a").css("color", "#FFFFFF");
    jQuery(this.container + " p").css("color", "#FFFFFF"); // To change the text under the logo to blue!
    document.body.style.backgroundColor = '';
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
    // jQuery(this.container + " .menu-item li").css("color", "blue");
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