import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, NgZone, OnInit, Output, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import { Persona, Scene } from '@soulmachines/smwebsdk'
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location, isPlatformBrowser } from '@angular/common';
declare var $: any;
declare var tour: any;
// import { tour } from '../../assets/js/index.js';
import { warn } from 'console';
import { ColorChangeService } from '../service/color-change.service';
// import { tour } from 'src/assets/js';


//declare var Persona: any; // Declare Persona class if not automatically available

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-uneeqavatar',
  templateUrl: './uneeqavatar.component.html',
  styleUrls: ['./uneeqavatar.component.css']
})


export class UneeqavatarComponent implements OnInit, AfterViewInit {
  stringRef = String;
  // Set the timeout duration in milliseconds (28 seconds)
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  @ViewChild('myInput', { static: false }) myInput!: ElementRef;
  fullScreen: boolean = false;
  userText: any
  connectionFailureCount = 0;
  elseConditionCount = 0;
  isSpinner: boolean = true
  iconShow: boolean = false
  ImageData: any
  unmuteMicrophone: boolean = false
  user: any = [];
  isMobileNormalTrue: boolean = false
  uneeq: any
  showMic: boolean = false
  token: any = '';
  ccOnOff: boolean = true;
  ischatBoxOpen: boolean = false
  idleTimeout: any;
  messageForQueueAvatar: boolean = false;
  mobileAvatarOnOff: any = false;
  showImage: boolean = false;
  smallSizeImage: boolean = false
  stopAvatarOnClick: boolean = false;
  mic: any
  isvoiceAnimationOn: boolean = false;
  UserccOnOff: boolean = true;
  questionList: any;
  optionList: any = [
    // 'A Give blood', 'B Look fff','C dgdgdgdgd' ,'D sssssssss'
  ];
  DescAnswer: any;
  QuestionccOnOff: boolean = true;
  hideHelpSetting: boolean = true
  checkFullScreenB: any = false
  CorrectAnswer: any;
  feedback: boolean = false;
  openFeedbackForm: boolean = false;
  isClick: boolean = false;

  expandOn: boolean = false
  @Output() storedErrorCode = new EventEmitter<any>();
  mediaStream: any;

  pdfShow: any
  //= "https://pollydemo2022.s3.us-west-2.amazonaws.com/Presentation/49b4c467f429f846989cde5dbe9da95ffc.pdf";
  runLoderGPT: boolean = false;
  @ViewChild('childPdf') childPdf: any;
  @ViewChild('child') childMenu: any;
  userSpeakValue: any;

  recognition: any;

  voiceText: any;

  tourGuideValueCheck: any;

  microphone: MediaStreamAudioSourceNode | any
  //
  recognizer: SpeechRecognizer | any;
  subscriptionKey = '9a9e0a9d5d7e4cebb5deee50ed7aa3db';
  serviceRegion = 'eastus';
  language = 'en-US'; // e.g. 'en-US'

  speechRecognizer: any;

  isMicButtonActive: boolean = false;

  recognizing: boolean = false;
  speechConfig: any;
  //
  timeoutID: any;
  isSubtitleAnimationRunning: boolean = false;
  isSubtitleON: boolean = true;
  SaveNewContData: any;
  isManualScrolling: any;
  nextButtonTestseries: boolean = false;
  hideOptionTempraryFormobile: boolean = true;
  checkOptionColor: any;
  avatarName: string = 'Hannah'
  total_testseries_len: any;
  current_testseries_len: any;
  approachesList: any = [1, 2, 3];
  User_Question: any;
  isgraphLoaded: boolean = false;
  normalGPT: boolean = false
  resumeButtonTestseries: boolean = false;
  disableMicButton: boolean = false;
  UserQuestion_Display: any;
  mathematicsEnabled: boolean = false;

  inputMathsValue: any = "";
  scene: any;
  isMicrophoneOn: boolean = false;
  _personaId: any;
  persona: any;
  testPrepList: boolean = false;
  userInputText: any;
  handlingMessgeForMaths: any;
  normalChatBar: boolean = true
  mathsChatBar: boolean = false
  inputMathsValue2: any = "";
  mathInputClear: boolean = false;
  toggleValue: boolean = false;
  isDropDownSetting: boolean = false;
  bottomPosition: any;
  borderRadius: any;
  bottomPositionWidth: any;
  inputWidthSize: any;
  inputmarginLeft: any;
  inputheightSize: any;
  bottomPositionheight: any
  mathsQuestion: any;
  refreshBtnPPT: boolean = false
  stopLeftSize: any
  stopBottomSize: any
  mathButtonDisabled: boolean = false
  ccBox: boolean = true;
  micWidth: any;
  micHeight: any;
  backgroundColor: any;
  micWidthOnly: any;
  micMarginleft: any
  deviceInfo: any
  micMarginLeft: any;
  micMarginLeft2: any;
  inputMarginLeft: any;
  notSchool: any;
  hasDisconnected = false;
  isKeyboardOn: boolean = false;
  mathsMininmizeBtn: boolean = false;
  inputmarginTop: string = 'none';
  winCrome: any;
  winEdge: any;
  iosChromeColor: any;
  macOSEdgeColor: any;
  windowsChromeColor: any;
  macOSSafariColor: any;
  windowsEdgeColor: any;
  androidColor: any;
  windowsFirefoxColor: any;
  macOSChromeColor: any;
  iOSsafariColor: any;
  windowUniversal: any;
  browserList: any = [];
  ipadColor: any;
  dotIndicatorAnimation: boolean = false
  storedChatBubbleMessage: any = [];
  showLoaderMess: boolean = false;
  colorBG: any;
  muteVoiceAvatar: boolean = false
  bubblewindowOnOff: boolean = true;
  blurEffect: boolean = false;
  box2MarginLeft: any;
  focusInput: any;
  mainClassBottomsize: any;
  stopIconWidthPosition: any;
  stopIconHeightPosition: any;
  private platformBrowser;
  hideMaximizeArrow: boolean = false;
  constructor(private router: Router, private ngZone: NgZone, private _location: Location, private elementRef: ElementRef, private renderer: Renderer2,
    private ser: UserService, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: any,
  private service: ColorChangeService) {
      this.platformBrowser = isPlatformBrowser(this.platformId);
  }


  ngAfterViewInit() {
    // MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

  }


  ngOnInit(): void {
    window.onbeforeunload = function () {
      localStorage.removeItem('Avatar');
      localStorage.removeItem('screen');
      localStorage.removeItem('browserList');
      localStorage.removeItem('learningId');
      localStorage.removeItem('mathtoggle');
    };
    this.removeSaveDate()
    this.fullScreen = true
    this.isSpinner = true
    this.avatarName = this.ser.avatar
    this.getColorAPI()
    // this.checkcolor()
    // this.onLoadCard('')
    if(this.platformBrowser){
    this.user = JSON.parse(localStorage.getItem('user') || '[]')
    this.token = localStorage.getItem('token')
    }
    // this.fullScreen = true
    if (this.user.Presentation_View == "PPT with avatar") {
      //  this.startAvatarFunction()
    }
    this.fullScreen = false
    this.onLoadCard('id')
    // this.checkDeviceAndColor()
    if(this.platformBrowser){
    window.addEventListener('resize', this.resizeFun);
    if (window.innerWidth < 480) {
      //hide card
    //  $('#movableCard').addClass('showI')
     // this.mobileAvatarOnOff = true
    }
    // remove item on page refresh 
   
    }

    this.avatarFunction()
    this.ser.getIp().subscribe((res: any) => {
      console.log(res.ip, "my ip----------------------------------------------")
      if(this.platformBrowser){
      localStorage.setItem("userIp", res.ip);
      }
    })


   
    // console.warn('Is GMT',isGMT )
    // console.warn('Time Zone Offset (in hours from GMT)',offsetHours )
  }



  onFocus(inputId: string) {
    // console.log('focus-------------------------------')
    this.focusInput = inputId;
  }

  onBlur() {
    this.focusInput = '';
  }



  startTours() {
    setTimeout(() => {
      // tour()
    }, 2000)
  }


  isToggleOrAncestor(element: HTMLElement | null, toggleClassName: string): boolean {
    if (!element) return false;
    if (element.classList.contains(toggleClassName)) return true;
    return this.isToggleOrAncestor(element.parentElement, toggleClassName);
  }


  StartTourGuideSetting() {
    console.log('normal screen')
    tour()

  }


  naviagtionTOHelp() {
    this.oncrossTest();
    this.persona.stopSpeaking()
    this.router.navigate(['/user/help'])

  }


  dropSetting() {
    if(this.platformBrowser){
    if (localStorage.getItem('screen') === "TestSeries" || localStorage.getItem('screen') === "LearningScreen") {
      this.hideHelpSetting = false
    } else {
      this.hideHelpSetting = true
    }
    }
    const dropdown = this.elementRef.nativeElement.querySelector('#dropDownSetting');
    if (this.isDropDownSetting === true) {
      this.renderer.removeClass(dropdown, 'showMessage');
    } else if (this.isDropDownSetting === false) {
      this.renderer.addClass(dropdown, 'showMessage');
    }
    this.isDropDownSetting = !this.isDropDownSetting


  }


  getColorAPI() {
    let p = {

    }
    this.ser.getColorAPI(p).subscribe({
      next: (res: any) => {
        //  console.log(res);
        this.browserList = res.body;
        localStorage.setItem("browserList", JSON.stringify(res.body));
        this.findColor();
        this.checkDeviceAndColor();
      },
      error: (err: any) => {
        this.checkDeviceAndColor();
      },
    })
  }

  findColor() {
   
    // console.log(this.browserList)
    this.browserList.forEach((item: any) => {
      // Check each item and assign colors based on conditions
      switch (Object.keys(item)[0]) {
        case 'iPad':
          this.ipadColor = item.iPad;
          console.log(this.ipadColor);
          break;
        case 'iOS_Chrome':
          this.iosChromeColor = item.iOS_Chrome;
          break;
        case 'MacOS_Edge':
          this.macOSEdgeColor = item.MacOS_Edge;
          break;
        case 'Windows_Chrome':
          this.windowsChromeColor = item.Windows_Chrome;
          console.log('browserList', this.windowsChromeColor);
          break;
        case 'MacOS_Safari':
          this.macOSSafariColor = item.MacOS_Safari;
          break;
        case 'Windows_Edge':
          this.windowsEdgeColor = item.Windows_Edge;
          break;
        case 'Android':
          this.androidColor = item.Android;
          break;
        case 'Windows_Firefox':
          this.windowsFirefoxColor = item.Windows_Firefox;
          break;
        case 'MacOS_Chrome':
          this.macOSChromeColor = item.MacOS_Chrome;
          break;
        case 'windowUniversal':
          this.windowUniversal = item.windowUniversal;
          break;
        case 'iOS_Safari':
          this.iOSsafariColor = item.iOS_Safari;
          break;
        default:
          // Handle cases where none of the conditions match
          break;
      }
    });
  }


  checkDeviceAndColor() {
    if(this.platformBrowser){
    const userAgent = window.navigator.userAgent;
    var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;

    // Key you want to check in local storage
    const keyToCheck = 'browserList';
    if (localStorage.hasOwnProperty(keyToCheck)) {
      // The key is present
      console.log('The key is present in local storage');
      //
      //const userAgent = window.navigator.userAgent;
      if (userAgent.indexOf('Win') !== -1) {
        // if (userAgent.indexOf('Chrome') !== -1) {
        if (userAgent.indexOf('Chrome') !== -1) {
          //if (userAgent.indexOf('chrome') !== -1 ) {
          console.log('crome case')
          //this.backgroundColor = '#003e6f';
          this.backgroundColor = this.windowsChromeColor
          console.warn(this.backgroundColor, 'dfdfdfdfddf')
        } else if (userAgent.indexOf('Firefox') !== -1) {
          console.log('firefox case')
          // this.backgroundColor = '#003e6f';
          this.backgroundColor = this.windowsFirefoxColor
          // } else if (navigator.userAgent.indexOf('Edge') !== -1) {
        } else if (userAgent.indexOf("Edg") !== -1) {
          console.log('edge case')
          this.backgroundColor = this.windowsEdgeColor
          // Code for Edge
        } else {
          console.log('universal case')
          // this.backgroundColor = '#003a73';
          this.backgroundColor = this.windowUniversal
        }
      } else if (userAgent.indexOf('Mac') !== -1) {
        if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1) {
          if (innerWidth < 767) {
            // this.backgroundColor = '#003b71';
            console.log('mac mobile case')
            this.backgroundColor = this.iOSsafariColor
            console.log('bg mobile ')
          } else if (innerWidth >= 768 && innerWidth <= 1024) {

            //this.backgroundColor = '#003b72';
            this.backgroundColor = this.ipadColor
            console.log(' bg ipad portrait', this.backgroundColor)
          } else if (innerWidth >= 1025 && innerWidth < 2244) {
            // for landscape
            if ((innerHeight == 950 || innerHeight == 905) && (innerWidth == 1366)) { //  landsvape ipad 12

              //   this.backgroundColor = '#003b72';
              this.backgroundColor = this.ipadColor
              console.log(' bg ipad pro landscape safari', this.backgroundColor)
            } else if ((innerHeight == 746 || innerHeight == 820) && (innerWidth == 1180)) {  // landsvape ipad  10 

              // this.backgroundColor = '#003b72';
              this.backgroundColor = this.ipadColor
              console.log(' bg ipad 10 landscape safari', this.backgroundColor)
            } else if ((innerHeight == 810 || innerHeight == 740) && (innerWidth == 1080)) {  // landsvape ipad 9 

              // this.backgroundColor = '#003b72';
              this.backgroundColor = this.ipadColor
              console.log('bg ipad 9 landscape safari', this.backgroundColor)
            } else if (innerHeight == 760 && innerWidth == 1194) { // landscape ipad 11

              //  this.backgroundColor = '#003b72';
              this.backgroundColor = this.ipadColor
              console.log(' bg ipad 11 landscape safari', this.backgroundColor)
            } else {
              console.log('mac safari case')
              this.backgroundColor = '#003e70';
            }
          } else {
            //  this.backgroundColor = '#003e70';
            this.backgroundColor = this.macOSSafariColor
          }

        } else if (userAgent.indexOf('Chrome') !== -1) {
          //  this.backgroundColor = '#00437e';
          if (window.innerWidth < 767) {
            //  this.backgroundColor = '#003b71';
            this.backgroundColor = this.iosChromeColor
          } else if (innerWidth >= 768 && innerWidth <= 1024) {

            //  this.backgroundColor = '#003b72';
            this.backgroundColor = this.ipadColor
            console.log('bg ipad protrait', this.backgroundColor)
          } else if (innerWidth >= 1025 && innerWidth < 2244) {
            // for landscape
            if ((innerHeight == 950 || innerHeight == 905) && (innerWidth == 1366)) { //  landsvape ipad 12

              // this.backgroundColor = '#003b72';
              this.backgroundColor = this.ipadColor
              console.log('bg ipad pro landscape crome', this.backgroundColor)
            } else if ((innerHeight == 746 || innerHeight == 820) && (innerWidth == 1180)) {  // landsvape ipad  10 

              // this.backgroundColor = '#003b72';
              this.backgroundColor = this.ipadColor
              console.log('bg ipad 10 landscape crome', this.backgroundColor)
            } else if ((innerHeight == 810 || innerHeight == 740) && (innerWidth == 1080)) {  // landsvape ipad 9 

              //  this.backgroundColor = '#003b72';
              this.backgroundColor = this.ipadColor
              console.log('bg ipad 9 landscape crome', this.backgroundColor)
            } else if (innerHeight == 760 && innerWidth == 1194) { // landscape ipad 11

              // this.backgroundColor = '#003b72';
              this.backgroundColor = this.ipadColor
              console.log(' bg ipad 11 landscape crome', this.backgroundColor)
            } else {
              // this.backgroundColor = '#003e70';
              console.log('mac crome case')
              this.backgroundColor = this.macOSChromeColor
              // this.backgroundColor = '#00437e';
            }
          } else {
            //  this.backgroundColor = '#00437e';
            this.backgroundColor = this.macOSChromeColor

          }
        }
        else {
          // this.backgroundColor = '#00437e'; // iOS devices
          // this.backgroundColor = this.iosChromeColor
        }
      } else if (/Android/.test(userAgent) || userAgent.includes("Android")) {
        //  this.backgroundColor = '#003b73'; // Android devices
        this.backgroundColor = this.androidColor
      }
    } else {
      // The key is not present
      console.log('The key is not present in local storage');
      //
      //const userAgent = window.navigator.userAgent;
      if (userAgent.indexOf('Win') !== -1) {
        if (userAgent.indexOf('Chrome') !== -1) {
          // this.backgroundColor = '#003A73';
          this.backgroundColor = '#003E6F';
        } else if (userAgent.indexOf('Firefox') !== -1) {
          this.backgroundColor = '#003e6f';
        } else if (userAgent.indexOf("Edg") !== -1) {
          console.log('edge case')
          this.backgroundColor = '#003b72'
          // Code for Edge
        } else {
          this.backgroundColor = '#003e6f';
        }
      } else if (userAgent.indexOf('Mac') !== -1) {
        if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1) {
          if (innerWidth < 767) {
            this.backgroundColor = '#003b71';
            console.log('bg mobile ')
          } else if (innerWidth >= 768 && innerWidth <= 1024) {

            this.backgroundColor = '#003b72';
            console.log(' bg ipad portrait', this.backgroundColor)
          } else if (innerWidth >= 1025 && innerWidth < 2244) {
            // for landscape
            if ((innerHeight == 950 || innerHeight == 905) && (innerWidth == 1366)) { //  landsvape ipad 12

              // this.backgroundColor = '#013a75';
              this.backgroundColor = '#003b72';
              console.log(' bg ipad pro landscape safari', this.backgroundColor)
            } else if ((innerHeight == 746 || innerHeight == 820) && (innerWidth == 1180)) {  // landsvape ipad  10 

              this.backgroundColor = '#003b72';
              console.log(' bg ipad 10 landscape safari', this.backgroundColor)
            } else if ((innerHeight == 810 || innerHeight == 740) && (innerWidth == 1080)) {  // landsvape ipad 9 

              this.backgroundColor = '#003b72';
              console.log('bg ipad 9 landscape safari', this.backgroundColor)
            } else if (innerHeight == 760 && innerWidth == 1194) { // landscape ipad 11

              this.backgroundColor = '#003b72';
              console.log(' bg ipad 11 landscape safari', this.backgroundColor)
            } else {
              this.backgroundColor = '#003E6F';
            }
          } else {
            this.backgroundColor = '#003e70';
          }

        } else if (userAgent.indexOf('Chrome') !== -1) {
          //  this.backgroundColor = '#00437e';
          if (window.innerWidth < 767) {
            this.backgroundColor = '#003b71';
          } else if (innerWidth >= 768 && innerWidth <= 1024) {

            this.backgroundColor = '#003b72';
            console.log('bg ipad protrait', this.backgroundColor)
          } else if (innerWidth >= 1025 && innerWidth < 2244) {
            // for landscape
            if ((innerHeight == 950 || innerHeight == 905) && (innerWidth == 1366)) { //  landsvape ipad 12

              this.backgroundColor = '#003b72';
              console.log('bg ipad pro landscape crome', this.backgroundColor)
            } else if ((innerHeight == 746 || innerHeight == 820) && (innerWidth == 1180)) {  // landsvape ipad  10 

              this.backgroundColor = '#003b72';
              console.log('bg ipad 10 landscape crome', this.backgroundColor)
            } else if ((innerHeight == 810 || innerHeight == 740) && (innerWidth == 1080)) {  // landsvape ipad 9 

              this.backgroundColor = '#003b72';
              console.log('bg ipad 9 landscape crome', this.backgroundColor)
            } else if (innerHeight == 760 && innerWidth == 1194) { // landscape ipad 11

              this.backgroundColor = '#003b72';
              console.log(' bg ipad 11 landscape crome', this.backgroundColor)
            } else {
              //  this.backgroundColor = '#003e70';
              this.backgroundColor = '#003E6F';

            }
          } else {
            this.backgroundColor = '#003E6F';
            // this.backgroundColor = '#003a73';
          }
        } else if (userAgent.indexOf('Edg') !== -1) {
          this.backgroundColor = '#00437e';
          // Your code for Edge on Mac
        } else {
          this.backgroundColor = '#003E6F'; // iOS devices
        }
      } else if (/Android/.test(userAgent) || userAgent.includes("Android")) {
        this.backgroundColor = '#003b73'; // Android devices
      }


    }
    }





  }

  cleanupSessionStorage() {
    if(this.platformBrowser){
    sessionStorage.clear();
    }
  }



  /***
   * soul machine test start -------
   */


  async avatarFunction() {
    this.cleanupSessionStorage();
    // for dev
    const apiKey = 'eyJzb3VsSWQiOiJkZG5hLWVkeW91LXRlY2hub2xvZ2llcy0tZWR5b3Utd2Vic2l0ZSIsImF1dGhTZXJ2ZXIiOiJodHRwczovL2RoLmF6LnNvdWxtYWNoaW5lcy5jbG91ZC9hcGkvand0IiwiYXV0aFRva2VuIjoiYXBpa2V5X3YxXzVkZTFmMDY5LTlkYTMtNDNhOS04NTNlLWEyMzU1MjljZjQzOCJ9'

    // local test
   // const apiKey = 'eyJzb3VsSWQiOiJkZG5hLWVkeW91LXRlY2hub2xvZ2llcy0tZWR5b3Utd2Vic2l0ZSIsImF1dGhTZXJ2ZXIiOiJodHRwczovL2RoLnNvdWxtYWNoaW5lcy5jbG91ZC9hcGkvand0IiwiYXV0aFRva2VuIjoiYXBpa2V5X3YxX2U4NTdiOGFiLTkxZDEtNDJjZS05ZTgxLTZlN2I3MmI4ZTlmYyJ9'
    console.log('fun start')
    if(this.platformBrowser){
    const videoEl: any = document.getElementById('smVideo');
    // create a new scene object


    this.scene = new Scene({
      apiKey: apiKey,
      videoElement: videoEl,
      requestedMediaDevices: { microphone: false, camera: false },
      requiredMediaDevices: { microphone: false, camera: false },
    });
    }
    await this.scene
      .connect()
      .then((sessionId: any) => this.onConnectionSuccess(sessionId))
      .catch((error: any) => this.onConnectionError(error));



    // Disconnect from server
    this.scene.onDisconnectedEvent.addListener(() => {

    })

  }



  onConnectionSuccess(sessionId: any) {
    // if(this.platformBrowser){
    // setTimeout(() => {
    $('#avatarLoaders').css('display', 'none')
    this.hideMaximizeArrow = true
 
    // }, 1000)

    if (this.messageForQueueAvatar == true) {
      // this.onLoadCard('')
      //  console.log(this.fullScreen,'onLoad--------')
      if (this.fullScreen == true) {
        //   console.log(this.fullScreen,'onLoad ------ inner--------')
        setTimeout(() => {
          $('#tourIcon').addClass('showI');
          $('#minimizeAvatar').addClass('showI');
          $('#maximizeAvatar').removeClass('showI');
        }, 0)

      } else {
        $('#tourIcon').removeClass('showI');
        $('#minimizeAvatar').removeClass('showI');
        $('#maximizeAvatar').addClass('showI');
      }
    }

    this.messageForQueueAvatar = false
    this._personaId = sessionId
    localStorage.setItem('sessionId', sessionId)

    this.persona = new Persona(this.scene, "1");
    console.info('success! session id:', sessionId);
    this.scene.startVideo().then((videoState: any) => {
      console.info('started video with state:', videoState)

      if (videoState && videoState.audio == false) {
        this.muteFun();
        this.unmuteMicrophone = true
      }
      this.ser.updateSharedData(this.persona);
      this.ser.updateSoulMachineData(this.scene);
      //  console.log(this.scene)
      this.isvoiceAnimationOn = false
      this.soulMachineMessageHandler()

      // setTimeout(() => {
      //   this.customWelcomeMessge()
      // }, 200)
      console.log('state==',this.scene.connectionState._connectionState['name'])
      if (this.scene.connectionState._connectionState['name'] == 'Connected') {

       // setTimeout(() => {
          this.customWelcomeMessge()
        //}, 200)
        // if (this.user.Firstlogin == true) {
        //   this.setVideo(600, 400)
        //   console.log('small card pixel')
        // } else if (this.user.Firstlogin == false) {
        //   if (window.innerWidth < 480) {
        //     this.setVideo(800, 900)
        //   }
        // }

        if (this.fullScreen === false) {

        } else {
          // this.setVideo(600, 400)
          // this.setVideo(700, 500)
          this.setVideo(700, 480)
        }
      }

      this.customLogger('')

      this.scene.onDisconnectedEvent.addListener((error: any) => {
        let states = this.scene.connectionState._connectionState['name']
        console.log('scene disconnected:', states);

        if (states == "Disconnected") {

          // this.reconnectAvatar()
          this.messageForQueueAvatar = true
          console.warn('reconnect ++++++++++++++++++++++++++++++++++++++++')
          this.avatarFunction()
        }



      });


    }
    ).catch((error: any) => {
      console.warn('could not start video:===>', error)
      console.warn('could check ========>', error)
      this.customLogger(error)
    });
    // }
  }



  handleSwal = (title: string, text: string, confirmButtonText: string, callback: () => void) => {
    Swal.fire({
      title: title,
      text: text,
      confirmButtonText: confirmButtonText,
      confirmButtonColor: '#2a7cc7',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  };

  customLogger(error: any) {
    let ipAddress:any;
    // if(this.platformBrowser){
    ipAddress = localStorage.getItem('IPAdress');
    // }
    let p = {
      state: this.scene.connectionState._connectionState['name'],
      session: this._personaId,
      // email: this.user.email,
      IpAdress: '',
      error: error
    };

    if (ipAddress) {
      p.IpAdress = ipAddress;
    }

    this.ser.apiLogService(p).subscribe((res: any) => {
      //  console.log(res);
    });
  }


  onConnectionError(error: any) {
    this.customLogger(error)
    switch (error.name) {
      case 'mediaStreamFailed':
        console.warn('mediaStreamFailed  test');
        break;
      case 'noUserMedia':
        console.warn('user blocked device access');
        break;
      case 'noScene':
      case 'serverConnectionFailed':
        console.log(this.scene)
        console.error('DEBUG:', error.name, error.message)
        // console.log(this.scene.connectionResult['message'])
        console.warn('noScene serverConnectionFailed failed', 'testing');
        if (this.connectionFailureCount < 5) {
          this.avatarFunction();
          console.log(this.connectionFailureCount, 'counter')
          this.connectionFailureCount++;
        } else if (this.elseConditionCount === 0) {

          console.error('Maximum connection failure attempts reached.');
          // Display your error message here
          Swal.fire({
            title: 'Server Connection Failed!',
            text: ' Please try after sometime or connect with edYOU support if issue persists.',
            confirmButtonText: 'Ok',
            showConfirmButton: true,
            confirmButtonColor: '#2a7cc7',
            allowOutsideClick: false,
          }).then((result) => {
            this.router.navigate(['/'])
            if(this.platformBrowser){
            setTimeout(() => {
              window.location.reload();
            }, 0)
            }
          });
          this.elseConditionCount++;
        }
        break;
      case 'noSessionToResume':
        console.warn('noSessionToResume failed', 'testing');
        console.log(this.scene.connectionResult['message'])

        this.avatarFunction()
        console.log(this.scene)

        break;
      case 'sessionTimeout':
        //  console.log(this.scene)
        this.avatarFunction()
        console.warn('Session erroro');
        break;
      case 'noSession':
        console.warn('Session fail=====');
        break;
      case 'onDisconnected':
        this.scene.disconnect()
        this.avatarFunction
        console.warn('dissconnect =====');
        break;
      default:
        console.warn('unhandled error: ==>', error);
    }
  }


  getCurrentTime(): string {
    // const now = new Date();
    // const hours = now.getHours().toString().padStart(2, '0');
    // const minutes = now.getMinutes().toString().padStart(2, '0');
    // return hours + ':' + minutes;


    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const hoursStr = hours.toString()
    return hoursStr + ':' + minutes + ' ' + ampm;

  }


  soulMachineMessageHandler() {
    this.addSpacebarEventListeners();
    let sessonId:any;
    // if(this.platformBrowser){
    sessonId = localStorage.getItem('sessionId')
    // }
    if (sessonId) {
      console.log('session id received----------------', sessonId)
    } else {
      console.log('session id not received----------------', sessonId)
    }
    let receivedConversationResult = false;
    const conversationResultTimeout = setTimeout(() => {
      if (!receivedConversationResult) {
          // this.showPopup('No conversation result received within 4 seconds.');
      //  this.avatarFunction()
      this.customWelcomeMessge()
      }
  }, 7000);
    console.log(Scene,'this is scene for websdk-------------------------')
    console.log(Scene.prototype,'this is scene for websdk-------------------------')
    console.log(Scene.prototype.onSceneMessage ,'this is scene for websdk-------------------------')
    Scene.prototype.onSceneMessage = (message: any) => {
      var name = message.name
      var body = message.body
      console.log( name ,'get item--------------------------------------2');
      console.log(body,'get item--------------------------------------');
      // console.warn('message',message)
      console.warn('body', body)
      if (name === 'conversationResult') {
        receivedConversationResult = true;
        clearTimeout(conversationResultTimeout); // Clear the timeout if conversationResult is received
      }
      switch (name) {
        case 'state':
          break;
        case 'personaResponse':
          if (message.body.currentSpeech) {
            let output = message.body.currentSpeech
          }
          break;
        case 'close': {
          console.log('dissconnect!!!!!!!')
          this.scene.disconnect()
          break;
        }

        case 'conversationResult':

          let inputUser = body.input['text']
          let question_time = body.output['context']['public-context']?.question_time

        //  this.userInputText = 'User: ' + inputUser
          if (inputUser == 'get response' || inputUser == 'getting error' || inputUser == 'getting response' || inputUser == 'stop') {

          } else {
            this.userInputText = inputUser
            // if (this.userInputText == 'Welcome edYOU') {
            //   let time = this.getCurrentTime()
            //   this.chatBubbleMessage('user', inputUser, time)
            //   //  this.storedChatBubbleMessage.push({ source: 'user', text: inputUser });
            // }

            // if (this.userInputText == 'Welcome') {

            // } else {

            //   this.chatBubbleMessage('user', inputUser, question_time)
            // }

          }

          // this.userInputText = inputUser
          this.DescAnswer = body.output['context']['public-context']?.display_message
          this.User_Question = body.output['context']['public-context']?.User_Question
          this.approachesList = body.output['context']['public-context']?.approaches
          this.mathsQuestion = body.output['context']['public-context']?.math_question
          let avatarTime = body.output['context']['public-context']?.answer_time
          // const userQues: any = document.getElementById('local-transcript')
          // userQues.innerHTML = 'User: ' + inputUser;
          this.handlingMessgeForMaths = body.output['context']['public-context']?.handlingMessge
          // test prep screen function
          //  this.testPrepMessgeHandler(body)
          // avatar message display
          this.avatarAnswerMessageHandler()
          let time = this.getCurrentTime()
          this.chatBubbleMessage('persona', this.DescAnswer, time)
          // verbal command function
          this.verbalCommandNavigation(this.DescAnswer)
          if (this.DescAnswer) {
            this.showLoaderMess = false
          }

          if (this.handlingMessgeForMaths == "continue loading" || this.handlingMessgeForMaths == 'continue loading') {
            if(this.platformBrowser){
              var m: any = document.getElementById('outputDesc')
              if (m) m.innerHTML = '.';
            }
            this.runLoderGPT = true
            setTimeout(() => {
              this.persona.conversationSend('get response', {}, {});
            }, 10000)

          } else if (this.handlingMessgeForMaths == "") {
            this.runLoderGPT = false
          }

          // openAI maths
          this.OpenAIMathematicsSoulMachine(body)

          // allganize OpenAI 
          //  this.allganizeOpenAI()
          break;
        case 'speechMarker':

          break;

      }



      if (body.persona[1] && body.persona[1]["speechState"]) {
        let state = body.persona[1]?.speechState
        console.warn('state', state)
        // if(this.platformBrowser){
          if (state == 'speaking') {
            this.runLoderGPT = false

            this.dotIndicatorAnimation = true
            $('#stopavatarId').removeClass('showI')
          } else if (state == 'animating') {

          } else if (state == 'idle') {
            this.dotIndicatorAnimation = false
        
              $('#stopavatarId').addClass('showI')
          
          
          }
        // }
      }

    }




  }
  // showPopup(message: string) {
  //   // Implement your popup logic here
  //   alert(message); // Example using alert, replace with your custom popup logic
  // }

  scrollToBottom() {

    // const messages:any = document.getElementById('message');
    // messages.scrollTop = messages.scrollHeight;
    if(this.platformBrowser){
    var messageContainer = document.getElementById('chatbubblemessage');
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
    }


  }

  chatBubbleMessage(source: any, text: any, time: any) {

    if (this.userInputText == 'Welcome') {

    } else {

      this.storedChatBubbleMessage.push({ source: source, text: text, time: time });
      //this.scrollToBottom();
      setTimeout(() => {
        this.scrollToBottom()
        //  $('#messageContainer').animate({scrollTop: document.body.scrollHeight},"fast");
      }, 1000)

      // $(".chatbubbleBox").scrollTop(1000);
    }

  }

  OpenAIMathematicsSoulMachine(body: any) {
    // if(this.platformBrowser){
    if (this.User_Question != '') {
      $('#MathameticsDisplay').addClass('showMessage')
      //  this.UserQuestion_Display = body.output['context']['public-context']?.User_Question
    }


    if (this.DescAnswer === 'Let me think a bit.') {
      this.runLoderGPT = true;
      var m: any = document.getElementById('outputDesc')
      if (m) m.innerHTML = '';
      let payload = {
        "data": this.userInputText,
        "gptPrompt": "Everything",
        // "email": this.user.email,
        "time": this.user.lastlogin
      }
      this.disableMicButton = true
      this.ser.OpenAIMathematicsSoulMAchine(payload).subscribe(
        (res: any) => {
          // Successful response
          if (res.statusCode == 200) {
            this.disableMicButton = false
            console.log('running 200 verified')
            this.persona.conversationSend('get response', {}, {});
            this.runLoderGPT = false;
          }
        },
        (error: any) => {
          // Handle error here
          this.disableMicButton = false
          console.error('API call failed:======>', error);
          // this.runLoderGPT = false;
          this.persona.conversationSend('get response', {}, {});
          // You can add additional error handling logic here if needed
        }
      );
    }

    if (this.approachesList == undefined || this.approachesList == '[]') {
      $('#mathApproach').removeClass('showMessage')
    } else if (this.approachesList.length > 0) {
      // if(this.User_Question !== undefined){
      //   this.UserQuestion_Display = det.instructions.customData?.User_Question
      // }
      this.UserQuestion_Display = body.output['context']['public-context']?.User_Question
      let value: any = document.getElementById('user_questionD')
      if (value) value.innerHTML = this.UserQuestion_Display;

      // this.User_Question = det.instructions.customData?.User_Question
      // console.log('appraches work and has value')
      setTimeout(() => {
        $('#mathApproach').addClass('showMessage')
      }, 2500)

      // color apprach apply method
      this.checkOptionColor = body.output['context']['public-context']?.color
      setTimeout(() => {
        if (this.checkOptionColor !== 'none') {
          this.addColorToApproach(this.checkOptionColor)
        }
      }, 1200)

    } else {
      if (this.User_Question != '') {
        this.UserQuestion_Display = body.output['context']['public-context']?.User_Question
        let value: any = document.getElementById('user_questionD')
        if (value) value.innerHTML = this.UserQuestion_Display;
      }

    }
    // }
  }


  // allganize normal conversation OpenAI
  allganizeOpenAI() {

    if (this.DescAnswer === 'Let me think') {
      this.runLoderGPT = true;
      if(this.platformBrowser){
      var m: any = document.getElementById('outputDesc')
      if (m) m.innerHTML = '';
      }
      let payload = {
        "question": this.userInputText,
        // "email": this.user.email,
      }

      this.disableMicButton = true
      this.ser.allganizeSoulMAchineAPI(payload).subscribe(
        (res: any) => {
          if (res.statusCode == 200) {
            this.disableMicButton = false
            this.persona.conversationSend('getting response', {}, {});
            this.runLoderGPT = false;
          } else if (res.errorType) {
            this.persona.conversationSend('getting error', {}, {});
            this.isSpinner = false;
            Swal.fire({
              icon: "error",
              title: 'Some error occured',
              text: 'Please try again',
              showDenyButton: false,
              showCancelButton: false,
              showConfirmButton: false,
              allowOutsideClick: false,
              timer: 4000
            })
          }
        },
        (error: any) => {
          this.isSpinner = false;
          this.disableMicButton = false
          this.persona.conversationSend('getting error', {}, {});
          console.log('API fail ---------', error)
        }
      );
    }

  }


  /**
   * avatar message display on screen logic 
   */
  avatarAnswerMessageHandler() {
    this.disableMicButton = false;
    // if(this.platformBrowser){
    if (this.DescAnswer != '') {
      setTimeout(() => {
        if (this.ccOnOff == true) {
          var item: any = localStorage.getItem('AvatResCC')
          this.checkFullScreenB = item
          if (this.checkFullScreenB == 'false') {
            $('#message').addClass('showMessage')
          }
        }
        var d: any = document.getElementById('outputDesc')
        //  $('.avatarspeak-s').scrollTop(0);
        if (this.DescAnswer === 'Let me think a bit.' || this.DescAnswer === 'Let me think') {
          if (d) d.innerHTML = ''
        }
        else {
          if (d) d.innerHTML = this.DescAnswer;
          this.isSubtitleAnimationRunning = true
          //   this.subtitleAnimationRun(this.DescAnswer)
          if (localStorage.hasOwnProperty("learningId")) {

            //   var checkValueText = det.instructions.customData.PPT
            var checkValueText = "NEW"
            if (checkValueText == "NEW") {
              if (this.DescAnswer === "Moving to the next slide" || this.DescAnswer === "Moving to the previous slide" ||
                this.DescAnswer === "Sure, repeating the slide") {
              } else {
                this.isManualScrolling = false
                if (this.DescAnswer.length >= 140) {
                  this.startScrolling();
                }
              }
            } else if (checkValueText == "continue") {
              // no need to run 
            }
          } else {
            var checkValueText = "NEW"
            if (checkValueText == "NEW") {
              if (this.DescAnswer.length >= 195) {
                this.isManualScrolling = false
                this.startScrolling();

              }
            } else if (checkValueText == "continue") {

            }
          }
        }

      }, 1000)

    }
    // }
  }


  mathsForm = new FormGroup({

    mathLive: new FormControl('', Validators.required),
  })


  toggleUserMicrophone() {
    if (this.scene) {
      const active = this.scene.isMicrophoneActive();
      this.scene.setMediaDeviceActive({
        microphone: !active,
      });
      console.log('off')
    } else {

    }

    this.isMicrophoneOn = !this.isMicrophoneOn

    if (this.isMicrophoneOn == true) {
      this.isvoiceAnimationOn = false
    } else {
      this.isvoiceAnimationOn = true
    }


    this.checkMicPosition()

    // this.clearAvatarContentBox()
    // this.toggleUserMicrophone()

  }

  stopDigitalPerson() {
    console.log('stop speaking' ,this.stopAvatarOnClick)
    this.isManualScrolling = true
    this.dotIndicatorAnimation = false
    this.stopAvatarOnClick = !this.stopAvatarOnClick
    this.persona.stopSpeaking()
    this.stopSubtitleAnimation()

  }

  muteDigitalPerson() {
    this.unmuteMicrophone = false;
   // if(this.platformBrowser){
    const videoEl: any = document.getElementById('smVideo');
    videoEl.muted = false;
   // }
  }

  muteunmuteVoice() {
    this.muteVoiceAvatar = !this.muteVoiceAvatar

    //  if (videoVoice) {

    //     videoVoice.muted = !videoVoice.muted

    //     console.log('muted', videoVoice.muted)
    // }
    // if(this.platformBrowser){
    const videoEl: any = document.getElementById('smVideo');
    if (videoEl) videoEl.muted = this.muteVoiceAvatar
    // }

  }

  customWelcomeMessge() {
   // if(this.platformBrowser){
    const savedDate: any = localStorage.getItem('savedDate3');
    console.log('saveData',savedDate)
    if (savedDate) {

      if (this.scene.connectionState._connectionState['name'] == 'Disconnected') {
        console.log('console 1')
      } else {
        console.log('console 2')
        // let curTime = body.output['context']['public-context']?.Time
        // let userIP = body.output['context']['public-context']?.IP_address
        // // this.persona.conversationSend('', { 'Time': curTime, 'IP_address': userIP }, {  });

        this.setVariable()
        const personaInstance = this.persona
        let text = 'Welcome edYOU'
        personaInstance.conversationSend(text, {}, { /* optionalArgs */ });
      }
      this.isDateOlderThan3Days(savedDate)


    } else {


      console.log('saDate not found')
      if (this.scene.connectionState._connectionState['name'] == 'Disconnected') {

      } else {

        this.setVariable()
        const personaInstance = this.persona
        let text = 'Welcome to edYOU'
        personaInstance.conversationSend(text, {}, { /* optionalArgs */ });
        const savedDate2: any = localStorage.getItem('savedDate3');
        if (savedDate2 == null) {
          let date: any = new Date();
          let newDate: any = date.setHours(0, 0, 0, 0);
          console.log(date);
          localStorage.setItem('savedDate3', date);
        }

      }
    }
  //  }

  }


  clearAvatarContentBox() {
    this.runLoderGPT = true;
    // if(this.platformBrowser){
    if ((localStorage.getItem('screen') === "TestSeries")) {

    } else {
      var m: any = document.getElementById('outputDesc')
      if (m) m.innerHTML = '';

    }
    // }
  }


  onEnter() {
    console.log('fffff')
  }

  sendTextToAvatar() {
    this.persona.stopSpeaking()
    const personaInstance = this.persona
    //let text = this.userText
    this.stop();
    //var textSet: any = document.getElementById('local-transcript')


    var completeText
    let time = this.getCurrentTime()
    if (this.userText) {
      this.clearAvatarContentBox()
      const completeText = this.userText.trim();
      this.showLoaderMess = true

      this.chatBubbleMessage('user', completeText, time)

      if (completeText) {

        this.userInputText = completeText;
        console.log('user', this.userInputText);
        const result = personaInstance.conversationSend(completeText, {}, { /* optionalArgs */ });
      }
    }
    // var  textSet = 'User: ' + completeText
    this.stopSubtitleAnimation()

    this.inputMathsValue = ""
    this.userText = ""

    this.mathInputClear = false;
    // if(this.platformBrowser){
    let value: any = document.getElementById('user_questionD')
    if (value) value.innerHTML = ''
    // }
    //this.persona.animateToNamedCameraWithOrbitPan('CloseUp', 1, 0, 0, 180, 0);
    //this.setVideo()
  }


  setVariable() {
    const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.warn('Time Zone', timeZoneName)
    let getip = localStorage.getItem("userIp");
    let payload = {
      "IP_address":getip,
      "Time":this.getCurrentTimeInGMT(),
      "email": this.user.email,
      'timeZone': timeZoneName,
      "display_message": "",
      "id": "",
      "autoScroll": "",
      "resume": false,
      "handlingMessge": ""
    }

    console.log(payload)
    this.persona.conversationSetVariables(payload)
  }

getCurrentTimeInGMT() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(now.getUTCDate()).padStart(2, '0');
  const hour = String(now.getUTCHours()).padStart(2, '0');
  const minute = String(now.getUTCMinutes()).padStart(2, '0');
  const second = String(now.getUTCSeconds()).padStart(2, '0');
  return `${year}-${month}-${day},${hour}:${minute}:${second}`;
}


  setVideo(videoWidth: any, videoHeight: any) {
    // if(this.platformBrowser){
    const deviceWidth = Math.round(videoWidth * window.devicePixelRatio);
    const deviceHeight = Math.round(videoHeight * window.devicePixelRatio);
    // const deviceWidth = videoWidth
    // const deviceHeight = videoHeight 

    console.log('height', deviceHeight, 'video bound', 'width', deviceWidth)
    this.scene.sendVideoBounds(deviceWidth, deviceHeight);
    // }
  }


  // Add push to talk spacebar key listeners
  addSpacebarEventListeners() {
    // When the user presses down on space bar, tell the digital human to start recording (start listening)
    // if(this.platformBrowser){
    document.addEventListener('keydown', (e: any) => {
      const isSpaceBar = e.code === 'Space' && !e.repeat;
      const isNotTextInput = e.target.type !== 'text';
      const isNotMathField = !e.target.classList.contains('math-field'); // Adjust the class name if needed
      const detailInput = !e.target.classList.contains('detailInput'); // Adjust the class name if needed
      const textArea = !e.target.classList.contains('textArea12'); // Adjust the class name if needed

      if (isSpaceBar && isNotTextInput && isNotMathField && detailInput && textArea) {
        if (this.disableMicButton == true) {

        } else {
          this.onclickMic()
          this.persona.stopSpeaking()
          this.stopSubtitleAnimation()
        }

      }
    });
    // }
  }



  /*****************************************************************************************
 ************************************************* soul machine test  end -------
 */

  //  setVideoDimensions





  // form group
  form = new FormGroup({

    mathValues: new FormControl('', Validators.required),

  })



  mathsValue(event: any) {

    //  console.log('inputMathsValue ',this.inputMathsValue)
    //     // Clear the input value
    //  this.inputMathsValue = '';
    if (this.mathInputClear == true) {
      console.log('true state call', event)
      event.target.value = ''
    } else if (this.mathInputClear == false) {
      console.log('math', event)
      this.inputMathsValue2 = event
      this.inputMathsValue = event.target.value
      this.inputMathsValue = this.inputMathsValue.replace(/\\text\{(.*?)\}/g, '$1');
    }


  }


  runMathToggleFromParent() {
    this.childMenu.checkMethodSidebarOpen();
  }




  recognizerSetup() {
  }


  checkMicPosition() {


    // if(this.platformBrowser){
    setTimeout(() => {
      if (this.fullScreen === true) {
        if ((localStorage.getItem('screen') === "TestSeries") || (localStorage.getItem('screen') === "LearningScreen")) {
          $('#zoomMic').removeClass('microphoneMobile');
          $('#zoomMic').addClass('microphoneOn');
        } else {
          $('#zoomMic').addClass('microphoneMobile');
          $('#zoomMic').removeClass('microphoneOn');
        }


      } else {

        $('#zoomMic').removeClass('microphoneMobile');
        $('#zoomMic').addClass('microphoneOn');
      }
    }, 0)
    // }

  }


  /**
   * use azure STT 
   * Mic speak to text function
   * getting text and sending to uneeq function 
   */
  // onclickMic() {
  //   this.checkMicPosition()
  //   if (this.isMicButtonActive === true) {
  //     this.stop();
  //     this.isMicButtonActive = false;
  //     this.isSubtitleAnimationRunning = false;
  //   }
  //   else {
  //     this.recognizerSetup()
  //     if (this.voiceText) {
  //       this.voiceText = ""
  //       // this.uneeq.stopSpeaking()
  //       this.persona.stopSpeaking()
  //       this.stopSubtitleAnimation()
  //     }

  //     this.showMic = true
  //     this.persona.stopSpeaking()
  //     this.isvoiceAnimationOn = true
  //     this.dotIndicatorAnimation = true


  //     this.isMicButtonActive = true;

  //     const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
  //     const speechConfig = sdk.SpeechConfig.fromSubscription(this.subscriptionKey, this.serviceRegion);
  //     speechConfig.speechRecognitionLanguage = this.language;
  //     this.recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig)

  //     //  console.log(this.recognizer)
  //     this.recognizer.recognizing = (s: any, e: any) => {
  //        console.log(`RECOGNIZING: Text=${e.result.text}`);
  //        this.userInputText  = e.result.text
  //     };


  //     this.recognizer.recognized = (s: any, e: any) => {
  //       if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
  //         //  console.log(`RECOGNIZED: Text=${e.result.text}`);
  //         console.log('final', e.result.text);
  //         this.voiceText = e.result.text;
  //         this.userInputText = this.voiceText
  //         this.checkButton()
  //         this.UserQuestion_Display = ""
  //         //  this.uneeq.sendTranscript(this.voiceText)
  //         this.clearAvatarContentBox()
  //         this.persona.conversationSend(this.voiceText, {}, {});
  //         this.disableMicButton = true
  //         this.hideOptionOnlyFOrMobile()
  //         // this.recognizer.close();
  //         //this.recognizer.AudioConfig.turnOff()
  //         if (this.voiceText) {
  //           this.stop()

  //         }
  //       } else if (e.result.reason === sdk.ResultReason.NoMatch) {

  //         const noMatchDetail = sdk.NoMatchDetails.fromResult(e.result);
  //         console.log("No speech recognized." + " | NoMatchReason: " + sdk.NoMatchReason[noMatchDetail.reason]);
  //         // this.recognizer.AudioConfig.turnOff()
  //         // this.recognizer.close();
  //         this.isMicButtonActive = false;
  //         this.showMic = false
  //         this.isvoiceAnimationOn = false
  //         this.dotIndicatorAnimation = false
  //         //  this.recognizer.stopContinuousRecognitionAsync(() => {
  //         //   this.recognizer.close();
  //         // })
  //         // Perform actions when no speech is recognized.
  //       } else {
  //         console.log(`ERROR: ${e.errorDetails}`);
  //       }
  //     };
  //     this.recognizer.canceled = (s: any, e: any) => {
  //       console.log(`CANCELED: Reason=${e.reason}`);
  //       if (e.reason == sdk.CancellationReason.Error) {
  //         console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
  //         console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
  //       }

  //       this.recognizer.stopContinuousRecognitionAsync();
  //     };

  //     this.recognizer.speechEndDetected = (s: any, e: any) => {
  //       //   console.log(`(speechEndDetected) SessionId: ${e.sessionId}`);
  //       this.recognizer.close();
  //       this.recognizer = undefined;
  //     };
  //     this.recognizer.sessionStopped = (s: any, e: any) => {
  //       //  console.log("\n    Session stopped event.");
  //       this.recognizer.stopContinuousRecognitionAsync();
  //       // Perform actions when speech ends, such as stopping the recognition or handling the final result.
  //     };
  //     this.recognizer.startContinuousRecognitionAsync();
  //     // }
  //   }
  // }

  async onclickMic() {
    this.checkMicPosition();
    if (this.isMicButtonActive === true) {
      this.stop();
      this.isMicButtonActive = false;
      this.isSubtitleAnimationRunning = false;
    } else {
      this.recognizerSetup();
      if (this.voiceText) {
        this.voiceText = "";
        this.persona.stopSpeaking();
        this.stopSubtitleAnimation();
      }

      this.showMic = true;
      this.persona.stopSpeaking();
      this.isvoiceAnimationOn = true;
      this.dotIndicatorAnimation = true

      this.isMicButtonActive = true;

      const getAudioConfig = async () => {
        try {
          // Request permission to access the microphone
          await navigator.mediaDevices.getUserMedia({ audio: true });
          console.log('Microphone access granted.');

          // Enumerate audio input devices
          const devices = await navigator.mediaDevices.enumerateDevices();
          const audioInputDevices = devices.filter(device => device.kind === 'audioinput');
          let selectedDeviceId = null;

          // Find AirPods or another specific device if desired
          audioInputDevices.forEach((device: MediaDeviceInfo) => {
            console.log("Device name: ${device.label}, id: ${device.deviceId}");
            if (device.label.includes("AirPods")) { // Adjust condition as necessary
              selectedDeviceId = device.deviceId;
            }
          });

          if (selectedDeviceId) {
            console.log("Selected device: ${selectedDeviceId}");
            return sdk.AudioConfig.fromMicrophoneInput(selectedDeviceId);
          } else {
            console.log('Using default microphone.');
            return sdk.AudioConfig.fromDefaultMicrophoneInput();
          }
        } catch (err) {
          console.error('Microphone access denied or error:', err);
          throw err; // Ensure the error is propagated
        }
      };

      const audioConfig = await getAudioConfig();
      const speechConfig = sdk.SpeechConfig.fromSubscription(this.subscriptionKey, this.serviceRegion);
      speechConfig.speechRecognitionLanguage = this.language;
      this.recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

      this.recognizer.recognizing = (s: any, e: any) => {
        this.userInputText = e.result.text;
        this.userText = e.result.text
      };
      this.recognizer.recognized = (s: any, e: any) => {
        if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
          console.log('final', e.result.text);
          this.voiceText = e.result.text;
          this.userInputText = this.voiceText;
          let time = this.getCurrentTime()
          this.showLoaderMess = true
          this.chatBubbleMessage('user', this.voiceText, time)
          this.checkButton();
          this.UserQuestion_Display = "";
          this.clearAvatarContentBox();
          this.persona.conversationSend(this.voiceText, {}, {});
          this.userText = ""
          this.disableMicButton = true;
          this.hideOptionOnlyFOrMobile();
          if (this.voiceText) {
            this.stop();
          }
        } else if (e.result.reason === sdk.ResultReason.NoMatch) {
          const noMatchDetail = sdk.NoMatchDetails.fromResult(e.result);
          console.log("No speech recognized." + " | NoMatchReason: " + sdk.NoMatchReason[noMatchDetail.reason]);
          this.isMicButtonActive = false;
          this.showMic = false;
          this.isvoiceAnimationOn = false;
        } else {
          // console.log(ERROR: ${e.errorDetails});
        }
      };

      this.recognizer.canceled = (s: any, e: any) => {
        console.log("CANCELED: Reason=${e.reason}");
        if (e.reason === sdk.CancellationReason.Error) {
          console.log("CANCELED: ErrorCode=${e.errorCode}")
          // console.log("CANCELED: ErrorDetails=${e.errorDetails});
        }
        this.recognizer.stopContinuousRecognitionAsync();
      };

      this.recognizer.speechEndDetected = (s: any, e: any) => {
        this.recognizer.close();
        this.recognizer = undefined;
      };

      this.recognizer.sessionStopped = (s: any, e: any) => {
        this.recognizer.stopContinuousRecognitionAsync();
      };

      this.recognizer.startContinuousRecognitionAsync();
    }
  }



  stopOnClick() {
    this.stop()
  }

  /**
   * stop mic function 
   * 
   */
  stopOnclickMic() {
    this.recognizer.stopContinuousRecognitionAsync(
      () => {
        //    console.log("Speech recognition stopped.");
      },
      (error: any) => {
        //   console.log(`Error stopping recognition: ${error}`);
      }
    );
    this.showMic = false
    this.isvoiceAnimationOn = false
    this.dotIndicatorAnimation = false
    this.isMicButtonActive = false

  }


  stop() {
    this.showMic = false
    this.isvoiceAnimationOn = false
    this.dotIndicatorAnimation = false
    this.recognizing = false;
    this.isMicButtonActive = false;
    // this.recognizer.stopContinuousRecognitionAsync(
    //   this.stopRecognizer.bind(this),
    // )
    if (this.recognizer) {
      this.recognizer.stopContinuousRecognitionAsync(
        this.stopRecognizer.bind(this),
      )
    } else {
      console.error('Recognizer is undefined');
    }
  }


  stopRecognizer() {
    this.recognizer.close()
    this.recognizer = undefined
    console.log('stopped')
  }



  /**
 * Manage chat bar functionality.
 * This function is responsible for handling interactions and functionality
 * related to the chat bar.
 * Note: Implement the specific chat-related actions within the function's logic.
 */
  chatbar() {
    const chatB = this.elementRef.nativeElement.querySelector('#chat-bar');
    if (this.ischatBoxOpen === true) {
      chatB.style.display = 'none';
    } else if (this.ischatBoxOpen === false) {
      chatB.style.display = 'block';
    }
    this.ischatBoxOpen = !this.ischatBoxOpen
  }


  /**
   * Toggle user's Closed Captions (CC) setting.
   * This function is responsible for toggling the user's Closed Captions setting
   * on or off, providing control over the display of captions for content.
   */
  userCCOnOf() {
    // let toggle = JSON.parse(localStorage.getItem('mathtoggle') || 'undefined')
    // if (toggle == true) {

    // }else{
    console.log('else consition ')
    const userText = this.elementRef.nativeElement.querySelector('#userText');
    if (this.UserccOnOff == true) {
      this.renderer.addClass(userText, 'showI');
    } else if (this.UserccOnOff == false) {
      this.renderer.removeClass(userText, 'showI');
    }
    this.UserccOnOff = !this.UserccOnOff
    // localStorage.setItem('cc', JSON.stringify(this.ccOnOff))
    // }

  }




  /**
   * Toggle test prep Question card Closed Captions (CC) setting.
   * This function is responsible for toggling the question card Closed Captions setting
   * on or off, providing control over the display of captions for content.
   */
  QuestionCCOnOf() {
    const QuestionDisplay = this.elementRef.nativeElement.querySelector('#QuestionDisplay');
    if (this.QuestionccOnOff == true) {
      this.renderer.addClass(QuestionDisplay, 'hideMessage');
    } else if (this.QuestionccOnOff == false) {
      this.renderer.removeClass(QuestionDisplay, 'hideMessage');
    }
    this.QuestionccOnOff = !this.QuestionccOnOff
  }



  /**
   * Toggle Closed Captions (CC) for the avatar.
   * This function is responsible for toggling the Closed Captions setting
   * for the avatar, controlling the display of captions associated with
   * avatar interactions or messages.
   */
  avatarCCOnOf() {
    const message22 = this.elementRef.nativeElement.querySelector('#message');
    if (this.ccOnOff == true) {
      this.renderer.removeClass(message22, 'showMessage');
    } else if (this.ccOnOff == false) {
      this.renderer.addClass(message22, 'showMessage');
    }
    this.ccOnOff = !this.ccOnOff;
    // if(this.platformBrowser){
    localStorage.setItem('cc', JSON.stringify(this.ccOnOff))
    // }
  }

  /**
* Toggle chat bubble  for the avatar.
*/
  chatBubbleFun() {
    // if(this.platformBrowser){
    const message22 = this.elementRef.nativeElement.querySelector('#chatbubblemessage');
    const normalMessage = this.elementRef.nativeElement.querySelector('#message');
    const screen = localStorage.getItem('screen');


    if (screen == "TestSeries" || screen == "LearningScreen") {

      if (this.bubblewindowOnOff == true) {
        console.log('----if learning  ------', ' if', this.bubblewindowOnOff)
        this.renderer.removeClass(message22, 'showMessage');
        $('#chatbubblemessage').css('margin-top', '8px')
        $('#chatbubblemessage').removeClass('learningchatBOx');
        this.blurEffect = false
      } else if (this.bubblewindowOnOff == false) {
        console.log('----if learning  ------', 'else if', this.bubblewindowOnOff)
        this.renderer.addClass(message22, 'showMessage');
        $('#chatbubblemessage').addClass('learningchatBOx');
        this.blurEffect = true
      }

    }
    else {
      console.log('----else ------')
      if (this.bubblewindowOnOff == true) {
        console.log('----if learning  ------', ' if', this.bubblewindowOnOff)
        this.renderer.removeClass(message22, 'showMessage');
      } else if (this.bubblewindowOnOff == false) {
        console.log('----if learning  ------', 'else if', this.bubblewindowOnOff)
        this.renderer.addClass(message22, 'showMessage');
      }
      this.blurEffect = false
    }
    console.log(this.bubblewindowOnOff, 'fffbb')
    // this.ccOnOff = !this.ccOnOff
    this.bubblewindowOnOff = !this.bubblewindowOnOff
    console.log(this.bubblewindowOnOff, 'fffbb')
    localStorage.setItem('cc', JSON.stringify(this.ccOnOff))
    // }
  }

  checkHideCondition() {
    const div1 = this.elementRef.nativeElement.querySelector('#movableCard');
    const div2 = this.elementRef.nativeElement.querySelector('#centerDiv');

    this.renderer.removeClass(div1, 'showI');
    this.renderer.removeClass(div2, 'showI');
    this.mobileAvatarOnOff = false
  }


  hideCardForMobile() {

  }

  /**
 * Hide the avatar card on the user interface.
 * This function is responsible for hiding the avatar card, making it
 * invisible or removing it from the UI display.
 */
  hideMethod() {

    // if (window.screen.width < 480) {
    //   const div1 = this.elementRef.nativeElement.querySelector('#movableCard');
    //   this.renderer.removeClass(div1, 'showI');
    //   this.fullScreen = true
    //   this.onLoadCard('')
    // } else {
      // if(this.platformBrowser){
      const div1 = this.elementRef.nativeElement.querySelector('#movableCard');
      const div2 = this.elementRef.nativeElement.querySelector('#centerDiv');
      if (this.mobileAvatarOnOff === true) {
        this.renderer.removeClass(div1, 'showI');
        this.renderer.removeClass(div2, 'showI');
      } else if (this.mobileAvatarOnOff === false) {
        this.renderer.addClass(div1, 'showI');
        this.renderer.addClass(div2, 'showI');
      }
      this.mobileAvatarOnOff = !this.mobileAvatarOnOff
      // }
   // }


  }





  // function for reset idle prompt when user active
  reset() {
    clearTimeout(this.idleTimeout);
    this.idleTimeout = setTimeout(() => {
     // this.idleAvatarMessgePrompt()
      //  }, 10000)
    }, 5 * 60 * 1000)
  }








  /**
 * Function to make a call normal  OpenAI API
 */
  OpenAICall() {
    if (this.DescAnswer == "Let me ponder regarding this." ||
      this.DescAnswer == "Let me think a bit." ||
      this.DescAnswer == "Getting the answer from other data sources." ||
      this.DescAnswer == "Allow me a moment to think." ||
      this.DescAnswer == "I'll need a moment to access the data." ||
      this.DescAnswer == "Give me few seconds to gather my thoughts."
    ) {
      this.normalGPT = true
      // if(this.platformBrowser){
      if (localStorage.getItem('screen') === "TestSeries") {
        setTimeout(() => {
          var m: any = document.getElementById('outputDesc')
          if (m) m.innerHTML = '';
        }, 0)
      } else {
        var d: any = document.getElementById('outputDesc')
        if (d) d.innerHTML = '';
      }
      // }
      this.normalGPT = true
      this.callOpenAI()
    } else {
      this.runLoderGPT = false;
    }
  }

  /**
* Function to make a call mathematics  OpenAI API
*/
  OpenAIMathematics() {
    // if(this.platformBrowser){
    if (this.DescAnswer === 'Let me think') {
      this.runLoderGPT = true;
      var m: any = document.getElementById('outputDesc')
      if (m) m.innerHTML = '';
      this.callOpenAIMathematicsAPI()
      // this.OpenAIMathematicsSoulMAchine()
    } else {
      this.runLoderGPT = false;
    }
    // }
  }


  addColorOnOption(color: any, position: number) {
   
  }

  /**
* Function to add color to an mathematices appraoch  option at a specific position
* @param {number} index - The position of the option to which the color should be added
*/
  addColorToApproach(index: any) {

  }





  /**
 * Function to display user question text.
 * 
 * @param {any} msg - The message containing the user's question or input.
 * @returns {void} - This function does not return any value.
 */
  userAskQuestionDisplayText(msg: any) {  // user question show by mic 
    // if(this.platformBrowser){
    if (this.UserccOnOff == true) {
      $('#userText').removeClass('showI')
    }
    const userQues: any = document.getElementById('local-transcript')
    userQues.innerHTML = 'User: ' + msg;
    this.userSpeakValue = msg;
    // }
  }


  /**
 * Function to handle the connection status for the avatar
 * @param {any} value - The value representing the connection status
 */
  avatarConnectionStatus(value: any) {

    const handleSwal = (title: string, text: string, confirmButtonText: string, callback: () => void) => {
      Swal.fire({
        title: title,
        text: text,
        confirmButtonText: confirmButtonText,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          callback();
        }
      });
    };


    switch (value) {
      case 'ConnectionLost':
        handleSwal('Connection lost!', 'Sorry the connection is lost, please click the button below to refresh.', 'Refresh', () => {
          // if(this.platformBrowser){
            window.location.reload();
          // }
        });
        break;

      case 'SessionEnded':
        // if(this.platformBrowser){
        if (localStorage.hasOwnProperty('sessionId')) {
          handleSwal('Session expired!', 'Oops! It seems like your session has expired, please log in again..', 'OK', () => {
            this.router.navigate(['/']);
          });
        }
        // }
        break;

      case 'SessionError':
        handleSwal('Session Error!', 'Oops! A session error has occurred, please retry', 'OK', () => {
          // this.router.navigate(['/']);
        });
        break;

      case 'AvatarUnavailable':
        this.messageForQueueAvatar = true;
        // if(this.platformBrowser){
        const IP = localStorage.getItem('IPAdress');
        const payloadC = {
          // email: this.user.email,
          name: this.user.name,
          ip_address: IP,
          status: 'Unavailable',
        };
        this.ser.avatarCounter(payloadC).subscribe(() => { });
        // }
        this.isSpinner = false;
        // if(this.platformBrowser){
        this.renderer.setStyle(document.getElementById('avatarLoaders'), 'display', 'none');
        // }
        break;

      case 'AvatarAvailable':

        // if (this.tourGuideValueCheck == true) {
        //   if (this.user.Firstlogin == false) {
        //     setTimeout(() => {
        //       this.startTours()
        //     }, 6000)

        //   }
        // }

        if (this.fullScreen === true) {
          // card minimize
          // if(this.platformBrowser){
          setTimeout(() => {
            $('#minimizeAvatar').addClass('showI');
            $('#maximizeAvatar').removeClass('showI');
          }, 1000)
          // }
        }

        this.messageForQueueAvatar = false;
        // if(this.platformBrowser){
        var IPP = localStorage.getItem('IPAdress')
        let payloadAvaible = {
          // "email": this.user.email,
          "name": this.user.name,
          "ip_address": IPP,
          "status": 'Available'
        }
        // }
        // this.ser.avatarCounter(payloadAvaible).subscribe(res => { })

        break;

      case 'Instructions':
        const message = 'Hi test test, welcome to the world of e-dee-YOU. I am ' + this.avatarName + '. How can I help you?';
        const sentences = message.split('.');
        // if(this.platformBrowser){
        setTimeout(() => {
          localStorage.setItem('Avatar', value);
        }, 2000);
        // }
        break;

      case 'DeviceError':
        console.log('----device error---')
        this.storedErrorCode.emit('DeviceError');
        break;
    }

  }


  startScrolling() {  /// start auto scrolling animation for learning modules
    if(this.platformBrowser){
    const lineHeight = 150;
    // const scrollSpeed = 23000; // Total time for the scrolling animation (in milliseconds)
    const scrollSpeed = 20000; // Total time for the scrolling animation (in milliseconds)
    const totalMovements = 30; // Number of times to move down by 20%
    //let isManualScrolling = false; // Flag to indicate manual scrolling
    let animationInProgress = false;
    let scroll = $('#outputDesc');
    let isEventHandled = false;
    scroll.on('click mouseenter touchstart touchend', () => {
      if (!isEventHandled) {
        this.stopAutoscrollFun();
        // Set the flag to true to indicate that the event has been handled
        isEventHandled = true;
        console.log('++++++++++++++++++ scroll manual detect ++++++++++++++++++++++++++')

      }
    });

    const scrollToPosition = (position: any) => {

      if (isEventHandled == true) {
        console.log('stopped', 'Manual scrolling detected touched detect ');
        return
      }

      if (!scroll.length) {
        // console.log('Scroll element with id "outputDesc" not found. Cannot start auto-scrolling.');
        return; // Exit the function if the scroll element is not found
      }

      if (this.isManualScrolling) {
        console.log('Manual scrolling detected. Stopping the automatic scrolling.');
        this.isManualScrolling = false
        return;
      }

      const newScrollTop = position * lineHeight;
      animationInProgress = true;
      scroll.animate({ scrollTop: newScrollTop }, scrollSpeed, function () {
        // Wait for the specified delay before triggering the next movement
        if (position < totalMovements && scroll.scrollTop() + scroll.innerHeight() < scroll[0].scrollHeight) {
          scrollToPosition(position + 1); // Move down by another 20%
          //  console.warn('========>', position + 1)
        } else {
          // Scrolling reached the bottom or the total number of movements, stop the animation
          //   console.warn('========> Scrolling animation stopped');
          scroll.stop()
          // scroll.off('scroll'); // Remove the scroll event listener when the animation stops
          animationInProgress = false;
        }
        // }, delayBetweenMovements);
      });
    }
    // if (!animationStarted) {
    //   animationStarted = true;
    setTimeout(function () {
      const t = 1
      scrollToPosition(t); // Start scrolling from the second position (20%)
    }, 4000);
    // }, 5000);
    // }
    }
  }






  subtitleAnimationRun(result: any) {
    //  if(this.UserccOnOff == true){  // check subtitle cc off 
    var splitResult = result.split(' ');
    var finalStr: any = [];
    for (var i = 0; i < splitResult.length; i += 6) {
      finalStr.push(splitResult.slice(i, i + 6).join(' '));
    }
    //console.log(finalStr);
    this.displaySubtitles(finalStr);
    // }

  }

  displaySubtitles(final: any) {
    // if(this.platformBrowser) {
    var container: any = document.getElementById('local-transcript')
    let delay = 0;
    let index = 0;
    const displaySubtitle = (data: any) => {
      container.innerHTML = this.avatarName + ':' + data;
    };

    const animateSubtitles = () => {
      if (!this.isSubtitleAnimationRunning) return; // Stop if flag is set to false

      if (index < final.length) {
        displaySubtitle(final[index]);

        index++;
        setTimeout(animateSubtitles, delay); // Delay in milliseconds between each subtitle
        delay += 1800;
        delay = Math.min(delay, 2300); // Limit the maximum delay to 1800 milliseconds
        //  console.log(delay)
        // 1700 and 2200
      }
    };
    animateSubtitles();
    // }
  }


  // Function to stop the subtitle animation
  stopSubtitleAnimation() {
    this.isSubtitleAnimationRunning = false;
    this.stopAutoscrollFun()
  }


  stopAutoscrollFun() {
    // if(this.platformBrowser) {
    if (localStorage.hasOwnProperty("learningId")) {
      this.isManualScrolling = true
      var scroll = $('#outputDesc');
      scroll.stop();
      $('.avatarspeak-s').scrollTop(0);
    } else {
      var scroll = $('#outputDesc');
      scroll.stop();
      $('.avatarspeak-s').scrollTop(0);
    }

    if (localStorage.hasOwnProperty("screen")) {
      //this.isManualScrolling = true
      var scroll = $('#questionDescription');
      scroll.stop();
      $('#questionDescription').scrollTop(0);

      var scroll = $('#answerDescription');
      scroll.stop();
      $('#answerDescription').scrollTop(0);
    }
    // }
  }

  /**
 * Function to handle navigation based on verbal commands
 * @param {any} msg - The verbal command message
 */
  verbalCommandNavigation(msg: any) {
    switch (msg) {

      case 'Sure, hiding myself.':
        this.oncrossTest();
        this.mobileAvatarOnOff = false;
        this.hideMethod();
        break;

      case 'Here I am.':
        this.mobileAvatarOnOff = true;
        this.hideMethod();
        break;

      case 'Turning to full screen mode.':
        this.fullScreen = false;
        this.fullScreen = true;
        this.onLoadCard('');
        break;

      case 'Changing to smaller view.':
        this.fullScreen = true;
        this.fullScreen = false;
        this.onLoadCard('');
        break;



      case 'Sure, turning on your subtitles.':
        this.UserccOnOff = false;
        this.userCCOnOf();
        break;

      case 'Sure, turning off your subtitles.':
        this.UserccOnOff = true;
        this.userCCOnOf();
        break;

      case 'Sure, turning on my subtitles.':
        this.ccOnOff = false;
        this.avatarCCOnOf();
        break;

      case 'Sure, turning off my subtitles.':
        this.ccOnOff = true;
        this.avatarCCOnOf();
        break;
      case 'Opening the company page.':
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }
        this.router.navigate(['/company']);
        break;
      case 'Opening the pay it forward page':
        // this.onLoadCard("id")
        // this.runMathToggleFromParent()
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }
        this.router.navigate(['/pay-it-forward']);

        break;
      case 'Opening the press page':
        this.router.navigate(['/press']);
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }
        break;
      case 'Opening the safety page':
        this.router.navigate(['/safety']);
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }
        break;
      case 'Opening lab page':
        this.router.navigate(['/labs']);
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }
        break;
      case 'Opening the blog page':
        this.router.navigate(['/blog']);
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }
        break;
      case 'Opening the Investor page':
        this.router.navigate(['/investors']);
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }
        break;
      case 'Opening the support area':
        // if(this.platformBrowser) {
        window.scrollTo(0, document.body.scrollHeight);
        // }
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }

        break;
      case 'Opening team page':
        this.router.navigate(['/company'], { fragment: 'team' }).then(() => {

          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            // if(this.platformBrowser) {
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                // Scroll the element into view
                element.scrollIntoView({ behavior: 'smooth' });

                // Additional check to ensure element is visible if it is just outside the view
                if (elementTop < 0 || elementTop > viewportHeight) {
                  window.scrollBy({
                    top: elementTop < 0 ? elementTop : elementTop - viewportHeight + element.offsetHeight,
                    behavior: 'smooth'
                  });
                }
              }
            }, 100);
            // }
          }
        });
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }

        break;
      case 'Opening the FAQ':
        this.router.navigate(['/company'], { fragment: 'faq' }).then(() => {

          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            // if(this.platformBrowser) {
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                // Scroll the element into view
                element.scrollIntoView({ behavior: 'smooth' });

                // Additional check to ensure element is visible if it is just outside the view
                if (elementTop < 0 || elementTop > viewportHeight) {
                  window.scrollBy({
                    top: elementTop < 0 ? elementTop : elementTop - viewportHeight + element.offsetHeight,
                    behavior: 'smooth'
                  });
                }
              }
            }, 100);
            // }
          }
        });
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }

        break;
      case 'Opening the edYOU lab':
        this.router.navigate(['/labs']);
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }

        break;
      case 'Opening intellectual property':
        this.router.navigate(['/labs'], { fragment: 'ip' }).then(() => {

          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            // if(this.platformBrowser) {
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                // Scroll the element into view
                element.scrollIntoView({ behavior: 'smooth' });

                // Additional check to ensure element is visible if it is just outside the view
                if (elementTop < 0 || elementTop > viewportHeight) {
                  window.scrollBy({
                    top: elementTop < 0 ? elementTop : elementTop - viewportHeight + element.offsetHeight,
                    behavior: 'smooth'
                  });
                }
              }
            }, 100);
            // }
          }
        });
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }

        break;
      case 'Opening the request access page':
        this.router.navigate(['/investors'], { fragment: 'signin' }).then(() => {

          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            // if(this.platformBrowser) {
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                // Scroll the element into view
                element.scrollIntoView({ behavior: 'smooth' });

                // Additional check to ensure element is visible if it is just outside the view
                if (elementTop < 0 || elementTop > viewportHeight) {
                  window.scrollBy({
                    top: elementTop < 0 ? elementTop : elementTop - viewportHeight + element.offsetHeight,
                    behavior: 'smooth'
                  });
                }
              }
            }, 100);
            // }
          }
        });
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }

        break;

      case 'Opening physical safety':
        this.router.navigate(['/safety'], { fragment: 'physical-safety' }).then(() => {

          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            // if(this.platformBrowser) {
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                // Scroll the element into view
                element.scrollIntoView({ behavior: 'smooth' });

                // Additional check to ensure element is visible if it is just outside the view
                if (elementTop < 0 || elementTop > viewportHeight) {
                  window.scrollBy({
                    top: elementTop < 0 ? elementTop : elementTop - viewportHeight + element.offsetHeight,
                    behavior: 'smooth'
                  });
                }
              }
            }, 100);
            // }
          }
        });
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }


        break;

      case 'Opening emotional wellbeing':
        this.router.navigate(['/safety'], { fragment: 'emotional-wellbeing' }).then(() => {

          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            // if(this.platformBrowser) {
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                // Scroll the element into view
                element.scrollIntoView({ behavior: 'smooth' });

                // Additional check to ensure element is visible if it is just outside the view
                if (elementTop < 0 || elementTop > viewportHeight) {
                  window.scrollBy({
                    top: elementTop < 0 ? elementTop : elementTop - viewportHeight + element.offsetHeight,
                    behavior: 'smooth'
                  });
                }
              }
            }, 100);
            // }
          }
        });
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }
        break;

      case 'Opening ongoing human oversight':
        this.router.navigate(['/safety'], { fragment: 'ongoing-human-oversight' }).then(() => {

          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            // if(this.platformBrowser) {
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                // Scroll the element into view
                element.scrollIntoView({ behavior: 'smooth' });

                // Additional check to ensure element is visible if it is just outside the view
                if (elementTop < 0 || elementTop > viewportHeight) {
                  window.scrollBy({
                    top: elementTop < 0 ? elementTop : elementTop - viewportHeight + element.offsetHeight,
                    behavior: 'smooth'
                  });
                }
              }
            }, 100);
            // }
          }
        });
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }
        break
      case 'Opening research':
        this.router.navigate(['/labs'], { fragment: 'research' }).then(() => {

          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            // if(this.platformBrowser) {
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                // Scroll the element into view
                element.scrollIntoView({ behavior: 'smooth' });

                // Additional check to ensure element is visible if it is just outside the view
                if (elementTop < 0 || elementTop > viewportHeight) {
                  window.scrollBy({
                    top: elementTop < 0 ? elementTop : elementTop - viewportHeight + element.offsetHeight,
                    behavior: 'smooth'
                  });
                }
              }
            }, 100);
            // }
          }
        });
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }
        break;
      case 'Opening Conversational AI Beings':
        this.router.navigate(['/labs'], { fragment: 'cab' }).then(() => {

          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            // if(this.platformBrowser) {
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                // Scroll the element into view
                element.scrollIntoView({ behavior: 'smooth' });

                // Additional check to ensure element is visible if it is just outside the view
                if (elementTop < 0 || elementTop > viewportHeight) {
                  window.scrollBy({
                    top: elementTop < 0 ? elementTop : elementTop - viewportHeight + element.offsetHeight,
                    behavior: 'smooth'
                  });
                }
              }
            }, 100);
            // }
          }
        });
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }

        break;
      case 'Opening Personalized AI':
        this.router.navigate(['/labs'], { fragment: 'pai' }).then(() => {

          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            // if(this.platformBrowser) {
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                // Scroll the element into view
                element.scrollIntoView({ behavior: 'smooth' });

                // Additional check to ensure element is visible if it is just outside the view
                if (elementTop < 0 || elementTop > viewportHeight) {
                  window.scrollBy({
                    top: elementTop < 0 ? elementTop : elementTop - viewportHeight + element.offsetHeight,
                    behavior: 'smooth'
                  });
                }
              }
            }, 100);
            // }
          }
        });
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }

        break;
      case 'Opening Proprietary Ingestion Engine':
        this.router.navigate(['/labs'], { fragment: 'pie' }).then(() => {

          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            // if(this.platformBrowser) {
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                // Scroll the element into view
                element.scrollIntoView({ behavior: 'smooth' });

                // Additional check to ensure element is visible if it is just outside the view
                if (elementTop < 0 || elementTop > viewportHeight) {
                  window.scrollBy({
                    top: elementTop < 0 ? elementTop : elementTop - viewportHeight + element.offsetHeight,
                    behavior: 'smooth'
                  });
                }
              }
            }, 100);
            // }
          }
        });
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }
        break;
      case 'Opening Intelligent Curation Engine':
        this.router.navigate(['/labs'], { fragment: 'ice' }).then(() => {

          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            // if(this.platformBrowser) {
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                // Scroll the element into view
                element.scrollIntoView({ behavior: 'smooth' });

                // Additional check to ensure element is visible if it is just outside the view
                if (elementTop < 0 || elementTop > viewportHeight) {
                  window.scrollBy({
                    top: elementTop < 0 ? elementTop : elementTop - viewportHeight + element.offsetHeight,
                    behavior: 'smooth'
                  });
                }
              }
            }, 100);
            // }
          }
        });
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }
        break;
      case 'Opening academic integrity':
        this.router.navigate(['/academic-integrity']);
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }

        break;
      case 'Owain Yeoman is the Chief Commercial Officer for edYOU technologies, where he advances education by facilitating partnerships between edYOU and academic institutions. He previously built an acclaimed acting career over 20 years, starring in shows like “The Mentalist” and films including “Troy”.':
        this.router.navigate(['/company'], { fragment: 'oy' }).then(() => {

          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            // if(this.platformBrowser) {
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                // Scroll the element into view
                element.scrollIntoView({ behavior: 'smooth' });

                // Additional check to ensure element is visible if it is just outside the view
                if (elementTop < 0 || elementTop > viewportHeight) {
                  window.scrollBy({
                    top: elementTop < 0 ? elementTop : elementTop - viewportHeight + element.offsetHeight,
                    behavior: 'smooth'
                  });
                }
              }
            }, 100);
            // }
          }
        });
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }
        break;
      case 'To request access from our Investor Area, please fill out the form https://edyou.com/investor-access/. We will reach out to you shortly with additional information.':
        this.router.navigate(['/investors'], { fragment: 'signin' }).then(() => {

          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            // if(this.platformBrowser) {
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                // Scroll the element into view
                element.scrollIntoView({ behavior: 'smooth' });

                // Additional check to ensure element is visible if it is just outside the view
                if (elementTop < 0 || elementTop > viewportHeight) {
                  window.scrollBy({
                    top: elementTop < 0 ? elementTop : elementTop - viewportHeight + element.offsetHeight,
                    behavior: 'smooth'
                  });
                }
              }
            }, 100);
            // }
          }
        });
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }

        break;

      case 'With a dual doctorate including a PhD in education, Dr. Everest has dedicated his life to making a difference in the world. Using just a $1,500 loan, Dr. Everest founded Residents Medical, a company that quickly skyrocketed to success, generating high seven figure revenues in its first year alone. Driven by his desire to revolutionize education, Dr. Everest went on to found edYOU Technologies.':
        this.router.navigate(['/company'], { fragment: 'team' }).then(() => {

          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            // if(this.platformBrowser) {
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                // Scroll the element into view
                element.scrollIntoView({ behavior: 'smooth' });

                // Additional check to ensure element is visible if it is just outside the view
                if (elementTop < 0 || elementTop > viewportHeight) {
                  window.scrollBy({
                    top: elementTop < 0 ? elementTop : elementTop - viewportHeight + element.offsetHeight,
                    behavior: 'smooth'
                  });
                }
              }
            }, 100);
            // }
          }
        });
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }
        break;
      case 'edYOU is a patented learning and wellness platform that helps individuals and institutions alike. We help humans learn more and help humans increase their overall health by providing conversational help to improve mental and physical wellness. My AI beings and I are available around the clock to help you learn and feel better. With edYOU, we are your support system 24/7 in real-time.':
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }
        this.router.navigate(['/company']);
        break;
      case 'edYOU is creating a better future by revolutionizing learning, empowering individuals and enterprise, and boosting wellness, by driving innovation through our artificial intelligence platform, while paying it forward.':
        this.router.navigate(['/company'], { fragment: 'vision' }).then(() => {

          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            // if(this.platformBrowser) {
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                // Scroll the element into view
                element.scrollIntoView({ behavior: 'smooth' });

                // Additional check to ensure element is visible if it is just outside the view
                if (elementTop < 0 || elementTop > viewportHeight) {
                  window.scrollBy({
                    top: elementTop < 0 ? elementTop : elementTop - viewportHeight + element.offsetHeight,
                    behavior: 'smooth'
                  });
                }
              }
            }, 100);
            // }
          }
        });
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }
        break;
      case 'The mission of edYOU is to continue growth as a research-backed, world leader in personalized AI, focused on wellness and transforming how individuals and enterprise learn. Our patented, safe technology, delivered through humanlike AI Being, enables humans to unleash their full potential through self-improvement in an augmented real-time, conversational experience.':
        this.router.navigate(['/company'], { fragment: 'vision' }).then(() => {

          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            // if(this.platformBrowser) {
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                // Scroll the element into view
                element.scrollIntoView({ behavior: 'smooth' });

                // Additional check to ensure element is visible if it is just outside the view
                if (elementTop < 0 || elementTop > viewportHeight) {
                  window.scrollBy({
                    top: elementTop < 0 ? elementTop : elementTop - viewportHeight + element.offsetHeight,
                    behavior: 'smooth'
                  });
                }
              }
            }, 100);
            // }
          }
        });
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }
        break;

      case 'At edYOU Labs, the future of learning and wellness takes shape. Our team pushes boundaries in AI and wellness to create the next generation of personalized  experiences. Come explore the possibilities! edYOU Labs develops breakthroughs that reimagine the role of AI in learning and mental health.':
        this.router.navigate(['/labs']);
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }
        break;

      case 'The Proprietary Ingestion Engine (PIE) is the frontline of our cutting-edge learning and wellness platform. PIE intelligently processes massive amounts of data, structuring and filtering information to enable personalized education experiences. PIE combines machine learning with human insight to ingest data from diverse global sources.':
        this.router.navigate(['/labs'], { fragment: 'pie' }).then(() => {
          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            // if(this.platformBrowser) {
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                // Scroll the element into view
                element.scrollIntoView({ behavior: 'smooth' });

                // Additional check to ensure element is visible if it is just outside the view
                if (elementTop < 0 || elementTop > viewportHeight) {
                  window.scrollBy({
                    top: elementTop < 0 ? elementTop : elementTop - viewportHeight + element.offsetHeight,
                    behavior: 'smooth'
                  });
                }
              }
            }, 100);
            // }
          }
        });
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }
        break;

      case 'The Personalized AI (PAI) module is the brainpower behind edYOU’s groundbreaking approach to learning. PAI enables truly customized conversations and content tailored to each individual user. Through edYOU’s proprietary EDNLP natural language processing technology, PAI understands learners’ unique contexts, interests, and knowledge. It fosters an engaging dialogue where users feel heard and understood at a personal level.':
        this.router.navigate(['/labs'], { fragment: 'pai' }).then(() => {

          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            // if(this.platformBrowser) {
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                // Scroll the element into view
                element.scrollIntoView({ behavior: 'smooth' });

                // Additional check to ensure element is visible if it is just outside the view
                if (elementTop < 0 || elementTop > viewportHeight) {
                  window.scrollBy({
                    top: elementTop < 0 ? elementTop : elementTop - viewportHeight + element.offsetHeight,
                    behavior: 'smooth'
                  });
                }
              }
            }, 100);
            // }
          }
        });
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }

        break;

      case "Some of edYOU's clients are the Hospital Corporations of America,  California Northstate University College of Medicine, Sierra Canyon School, and Residents Medical.":
        this.router.navigate(['/main'], { fragment: 'cp' }).then(() => {

          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            // if(this.platformBrowser) {
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                // Scroll the element into view
                element.scrollIntoView({ behavior: 'smooth' });

                // Additional check to ensure element is visible if it is just outside the view
                if (elementTop < 0 || elementTop > viewportHeight) {
                  window.scrollBy({
                    top: elementTop < 0 ? elementTop : elementTop - viewportHeight + element.offsetHeight,
                    behavior: 'smooth'
                  });
                }
              }
            }, 100);
            // }
          }
        });
        if (this.fullScreen == false) {
          this.onLoadCard('')
        }

        break;



    }

  }



  // navigate to profile page
  profile() {
    this.router.navigate(['user/profile'])
  }


  // uneeq end senssion
  endSession() {
    this.uneeq.endSession();
  }

  //stop hand button function
  stopSpeak() {
    this.uneeq.uneeqStopSpeaking()

  }


  // Add push to talk spacebar key listeners
  addPTTKeyListeners() {
    // When the user presses down on space bar, tell the digital human to start recording (start listening)
    // if(this.platformBrowser) {
    document.addEventListener('keydown', (e: any) => {
      if (e.code === 'Space' && !e.repeat && e.target.type !== 'text') {
        this.uneeq.stopSpeaking()
        this.onclickMic()
        this.stopSubtitleAnimation()
      }
    });
    // }
  }




  //Function to handle resizing operations
  resizeFun() {
    // if(this.platformBrowser) {
    var avatarCanvas: any = document.querySelector('#sm-video canvas');
    const windowWidth = window.innerWidth;
    //this.minimizeBoxCardUI()
    // this.changeAvatarSize()
    // window.screen.width < 480
    if (windowWidth < 480) {



      $('#mainData').addClass('main-content_large')
      $('#sidebar').addClass('sidebar_small')
      $('#movableCard').addClass('mobile_speaking')
      $('#sidebar').addClass('showI')    // this is for mobile responsive
      this.showImage = false
      if (localStorage.getItem('AvatResCC') === "false") {
        // console.warn('its avatar component and resize ')
        avatarCanvas.style.height = '490px'
        avatarCanvas.style.width = '100%'
      }

      if (localStorage.getItem('screen') === "TestSeries") {
        avatarCanvas.style.height = '230px'
        avatarCanvas.style.width = '100%'

        setTimeout(() => {
          $('#optionMessage').css('margin-top', '2px')
          $('#QuestionDisplay').css('margin-top', '6px')
        }, 4000)
      }

    } else {

      $('#mainData').removeClass('main-content_large')
      $('#sidebar').removeClass('sidebar_small')
      $('#movableCard').removeClass('mobile_speaking')
      $('#sidebar').removeClass('showI')    // this is for mobile responsive
      this.showImage = true
    }
    // window.screen.height
    const windowHeight = window.innerHeight;
    if (windowHeight < 575) {
      if (localStorage.getItem('AvatResCC') === "false") {
        //   console.log('its landscape mode normal one' , )
        //  console.log('its landscape ==>  its on full screen')
        avatarCanvas.style.height = '250px'
        $('#message').css('width', '350px')
      }
    }

    // }
    // this.minimizeBoxCardUI()
    // this.smallcardSetPosition()

  }




  /**
   * Function to handle the selection of an option in the Maths List
   * @param {any} event - The event associated with the selection
   * @param {any} index - The index of the selected option
   */
  selectMathsListOption(event: any, index: any) {
    if (this.voiceText) {
      this.voiceText = ""

      this.stopSubtitleAnimation()
    }
    //  this.uneeq.stopSpeaking()
    this.persona.stopSpeaking()
    this.userInputText = ""
    var textData = this.mathsQuestion + " by " + event
    this.userInputText = textData
    // this.uneeq.sendTranscript(tt)
    this.persona.conversationSend(textData, {}, {});
  }

  loadGraphDataForMaths() {
    this.isgraphLoaded = true;
    // if(this.platformBrowser) {
    $('#graphButton').removeClass('showMessage')
    // }
  }


  // Function to handle sending text to uneeq
  sendTextFun() {


    var completeText
    if (this.inputMathsValue !== "") {
      this.mathInputClear = true
      this.mathsValue('')
      completeText = this.inputMathsValue

    } else {
      completeText = this.userText.trim();
    }
    this.inputMathsValue = ""
    console.warn('dd', completeText)
    this.stopSubtitleAnimation()
    this.UserQuestion_Display = ""
    this.uneeq.stopSpeaking()
    this.hideOptionOnlyFOrMobile()
    //  var completeText = this.userText.trim();
    // this.userText.trim();
    if (completeText.length > 0) {
      this.uneeq.sendTranscript(completeText)
      this.userText = ''
    }
    this.userText = ''
    this.mathInputClear = false


  }

  // Function to navigate to the next question
  nextQuestion() {
    if (this.voiceText) {
      this.voiceText = ""
      //  this.uneeq.stopSpeaking()
      this.stopSubtitleAnimation()
    }
    this.optionList = []
    // this.uneeq.stopSpeaking()
    this.persona.stopSpeaking()
    this.showOptionOnlyFOrMobile()
    var nextQ = "next"
    this.persona.conversationSend(nextQ, {}, {});
    // this.uneeq.sendTranscript(nextQ)
  }

  // Function to navigate to the same question
  resumeQuestion() {
    if (this.voiceText) {
      this.voiceText = ""
      // this.uneeq.stopSpeaking()
      this.stopSubtitleAnimation()
    }
    // this.uneeq.stopSpeaking()
    this.persona.stopSpeaking()
    this.showOptionOnlyFOrMobile()
    //  var resumeQ = "resume"
    this.persona.conversationSend('next', {}, {});
    //  this.uneeq.sendTranscript(resumeQ)
  }

  // Function to navigate to the previous question
  previousQuestion() {
    if (this.voiceText) {
      this.voiceText = ""
      //  this.uneeq.stopSpeaking()
      this.stopSubtitleAnimation()
    }
    this.persona.stopSpeaking()
    // this.uneeq.stopSpeaking()
    this.showOptionOnlyFOrMobile()
    var backQ = "back"
    this.persona.conversationSend(backQ, {}, {});
    // this.uneeq.sendTranscript(backQ)
  }


  showOptionOnlyFOrMobile() {  // show only for on mibile screen
    if(this.platformBrowser) {
    if (window.screen.width < 480) {
      setTimeout(() => {
        this.hideOptionTempraryFormobile = true
      }, 1000)
    }
    }
  }

  hideOptionOnlyFOrMobile() { // hide option for mobile screen
    if(this.platformBrowser) {
    if (window.screen.width < 480) {
      this.hideOptionTempraryFormobile = false
    }
    }
  }


  // stop speaking uneeq function
  stopSpeaking() {
    this.isManualScrolling = true
    this.stopAvatarOnClick = !this.stopAvatarOnClick
    this.uneeq.stopSpeaking()
    this.stopSubtitleAnimation()

  }



  minimizeBoxCardUI() {
    // if(this.platformBrowser) {
    const windowWidth = window.innerWidth;
    if (windowWidth < 480) {
      this.isMobileNormalTrue = true
      this.bottomPositionWidth = '81.5%'
      this.inputWidthSize = '210px';
      this.bottomPosition = 0
      // this.borderRadius = '0px 0px 20px 20px'
      this.borderRadius = '0px 0px 3px 3px'
      $('#settingId').addClass('showI');
      // this.inputmarginLeft = '35px'
      this.inputheightSize = '48px'
      this.bottomPositionheight = '60px'
      // this.stopBottomSize = '70%'
      this.inputMarginLeft = '-2px'
      // this.stopLeftSize = '8%'
      this.stopBottomSize = '75%'
      this.stopLeftSize = '10%'
      this.micWidth = '48'
      this.micWidthOnly = '48'
      this.micMarginleft = '0'
      this.micHeight = '48'
      this.micMarginLeft2 = '2px'
      this.box2MarginLeft = '4px'
      this.mainClassBottomsize = 2
    } else {
      this.isMobileNormalTrue = false
      // this.bottomPosition = 67
      this.bottomPosition = 10
      //  this.borderRadius = '0px 0px 20px 20px'
      this.borderRadius = '0px 0px 9px 9px'
      // this.bottomPositionWidth = '90%'
      // this.bottomPositionWidth = '77.5%' 
       this.bottomPositionWidth = '79%'
      // this.inputWidthSize = '201px';
      this.inputWidthSize = '250px';
      $('#settingId').addClass('showI');
      this.inputheightSize = '48px'
      this.inputMarginLeft = '3px'
      this.bottomPositionheight = '60px'
      this.stopBottomSize = '75%'
      this.stopLeftSize = '10%'
      this.micWidth = '48'
      this.micWidthOnly = '48'
      this.micMarginleft = '0'
      this.micHeight = '48'
      this.micMarginLeft2 = '0px'
      this.box2MarginLeft = '6px'
      // stopicon
      //this.stopIconRightPosition = '116'
      // this.stopIconBottomPosition = '95'
      this.mainClassBottomsize = 2
      this.stopIconWidthPosition = '50'
      this.stopIconHeightPosition = '50'
    }
    // }


  }

  maximizeBoxCardUI() {
    // if(this.platformBrowser) {
    if (window.screen.width < 480) {

      this.bottomPosition = 7
      this.borderRadius = '0px 0px 0px 0px'
      this.bottomPositionWidth = '100%'
      this.inputWidthSize = '100%'
      this.inputmarginLeft = '0px'
      this.inputheightSize = '50px'
      this.inputMarginLeft = '-2px'
      this.bottomPositionheight = '55px'
      this.stopBottomSize = '20%'
      this.stopLeftSize = '5%'
      this.micWidth = '50'
      this.micWidthOnly = '50'
      this.micMarginleft = '0'
      this.micHeight = '50'
      this.micMarginLeft2 = '0px'
      this.box2MarginLeft = '3px'
      this.stopIconWidthPosition = '40'
      this.stopIconHeightPosition = '40'
      this.mainClassBottomsize = 0
    }


    else if (innerHeight == 1152 && innerWidth == 2048) {
      this.stopBottomSize = '30%'
      this.stopLeftSize = '65%'
      this.bottomPosition = 0
      this.borderRadius = '0px 0px 0px 0px'
      this.bottomPositionWidth = '100%'
      this.inputWidthSize = '100%'

      this.inputmarginLeft = '0px'
      this.inputheightSize = '60px'
      this.bottomPositionheight = '68px'

      this.micWidth = '60'
      this.micWidthOnly = '57'
      this.micMarginleft = '0'
      this.micHeight = '60'

    } else {
      this.bottomPosition = 15
      this.borderRadius = '0px 0px 0px 0px'
      this.bottomPositionWidth = '100%'
      this.inputWidthSize = '100%'
      this.inputmarginLeft = '0px'
      this.inputheightSize = '55px !important'

      this.bottomPositionheight = '58px'
      this.stopBottomSize = '35%'
      this.stopLeftSize = '31%'
      this.micWidth = '55'
      this.micWidthOnly = '55'
      this.micMarginleft = '0'
      this.micHeight = '55'
      this.micMarginLeft2 = '0px'
      this.box2MarginLeft = '9px'
      // this.stopIconRightPosition = '30'
      // this.stopIconBottomPosition = '125'
      this.mainClassBottomsize = 0
      this.stopIconWidthPosition = '60'
      this.stopIconHeightPosition = '60'
    }

    // }
  }

  hideAvatarForMobile() {
    // const div1 = this.elementRef.nativeElement.querySelector('#movableCard');
    // this.renderer.addClass(div1, 'showI');
  }



  // card expand button function  
  onLoadCard(id: any) {
    // if(this.platformBrowser) {
    setTimeout(() => {
      if (this.fullScreen === true) {
        // condition for making small screen avatar card
        this.checkFullScreenB = true
        this.expandOn = true
        $('#bottomBar').removeClass('baseChatBottom');

        if (window.screen.width < 480) {
        //  this.hideAvatarForMobile()
          $('#bottomBar').addClass('baseChatBottom');
          $('#mobileDotAni').addClass('showI');
        }

        if (this.toggleValue == true) {
          this.normalChatBar = true
          this.mathsChatBar = false
        }


        // $('#bottomShadowBox').addClass('bottomboxSizewithSmallBox');
        // $('#bottomShadowBox').removeClass('bottomboxSize');
        console.log('small')
        this.minimizeBoxCardUI()
        $('#box3Main').addClass('showI');
        $('#muteVoiceId').addClass('showI');

        $('#tourIcon').addClass('showI');
        // $('#stopavatarId').addClass('showI');
        //
        $('#stopavatarId').addClass('stopHandIconSmallScreen');
        $('#stopavatarId').removeClass('stopHandIcon');
        $('#stopSoundId').addClass('stopIConsmallscreenImg');
        $('#stopSoundId').removeClass('stopIConImg');
        // mic icons
        $('#zoomMic').addClass('microphoneMobile');
        $('#zoomMic').removeClass('microphoneOn');


        // $('#voiceId').removeClass('newIconSize');
        // $('#voiceId').addClass('newIconSizeMobile');
        // end mic icons
        // card minimize
        $('#minimizeAvatar').addClass('showI');
        $('#maximizeAvatar').removeClass('showI');
        //
        $('#hambergerBar').addClass('showI');
        $('#sidebarAvatar').css('display', 'none');
        $('#MathameticsDisplay').removeClass('showMessage')
        if (window.screen.width < 480) {

          $('#movableCard').addClass('mobile_speaking')


        }
        this.openFeedbackForm = false
        localStorage.setItem('AvatResCC', this.checkFullScreenB)
        $('#iconShow').addClass('showI')
        $('#sm-video').removeClass('uneeqAv')
        $('#sm-video').addClass('uneeqAvatar')
        $('#message').removeClass('showMessage')
        $('#ImageDisplay').removeClass('showMessage')
        $('#textDisplay').removeClass('showMessage')
        $('#userCC').removeClass('showMessage')
        $('#movableCard').removeClass('full_screen')

        // $('#movableCard').css('border-radius', '30px')
        $('#movableCard').css('border-radius', '8px')

        $('#movableCard-main').removeClass('full_screen')
        $('#stopIcon').removeClass('bottomleft-large')
        $('#stopIcon').addClass('bottomleft')
        $('#isvideo').removeClass('rightDiv-large')
        $('#isvideo').addClass('rightDIv')
        $('#ccSubtitle').addClass('showI')
        $('#chatbarOnly').addClass('showI')
        $('#chat-bar').css('display', 'block')
        $('#mobileAvatarButton').removeClass('showI')
        $('#cross').removeClass('speakingsss_large')
        $('#ruleSeries').addClass('showI')
        $('#feedback').addClass('showI')
        $('#audioMicBut').css('background-color', '#d9e9fd')
        $('#chatbubblemessage').removeClass('showMessage')
        $('#messDescription').addClass('hideMessage')
        this.changeAvatarSize()
        this.ischatBoxOpen = false
        // this.ischatBoxOpen === true
        this.iconShow = false


        var t: any = document.querySelector('#sm-video canvas')
        $(t).css('margin-left', '0px')


      } else if (this.fullScreen === false) {
        // condition for making big screen avatar card
        this.checkFullScreenB = false

        $('#bottomBar').addClass('baseChatBottom');
        this.expandOn = false
        // card minimize
        this.maximizeBoxCardUI()
        $('#box3Main').removeClass('showI');
        $('#muteVoiceId').removeClass('showI');
        $('#tourIcon').removeClass('showI');
        if (window.screen.width < 480) {
          $('#box3Main').addClass('showI');
          $('#bottomBar').removeClass('baseChatBottom');
          $('#mobileDotAni').removeClass('showI');
        }
        if (this.toggleValue == true) {
          this.normalChatBar = false
          this.mathsChatBar = true
        }
        // $('#stopavatarId').removeClass('showI');
        $('#settingId').removeClass('showI');
        //  this.setVideo(window.screen.width, window.screen.height)
        // mic icons
        $('#zoomMic').addClass('microphoneOn');
        $('#zoomMic').removeClass('microphoneMobile');
        // $('#sendId').addClass('newIconSize');
        // $('#sendId').removeClass('newIconSizeMobile');
        $('#stopavatarId').removeClass('stopHandIconSmallScreen');
        $('#stopavatarId').addClass('stopHandIcon');
        $('#stopSoundId').removeClass('stopIConsmallscreenImg');
        $('#stopSoundId').addClass('stopIConImg');
        // $('#voiceId').addClass('newIconSize');
        // $('#voiceId').removeClass('newIconSizeMobile');
        // end mic icons

        // for mobile
        //  this.setVideo(745, 845)

        $('#minimizeAvatar').removeClass('showI');
        $('#maximizeAvatar').addClass('showI');
        //
        $('#hambergerBar').removeClass('showI');
        $('#sidebarAvatar').css('display', 'none');
        localStorage.setItem('AvatResCC', this.checkFullScreenB)
        //  setTimeout(()=>{
        // $("iframe").contents().find("#chat-widget-minimized").css('display','none');
        $('#chat-widget-container').css('z-index', '11000');
        $('#chat-widget-minimized').css('display', 'none');
        $('#chat-widget-container').css('height', '4px');
        //  $('#chat-widget-minimized').css('z-index', '100');
        // },2000)
        $('#iconShow').removeClass('showI')
        $('#sm-video').removeClass('uneeqAvatar')
        //  $('#message').addClass('showMessage') 
        $('#userCC').addClass('showMessage')
        $('#sm-video').addClass('uneeqAv')
        $('#stopIcon').addClass('bottomleft-large')
        $('#stopIcon').removeClass('bottomleft')
        $('#movableCard').addClass('full_screen')

        $('#movableCard-main').addClass('full_screen')
        $('#isvideo').addClass('rightDiv-large')
        $('#isvideo').removeClass('rightDIv')

        $('#movableCard').css('border-radius', '0px')

        $('#ccSubtitle').removeClass('showI')
        $('#chatbarOnly').removeClass('showI')
        $('#chat-bar').css('display', 'none')
        $('#mobileAvatarButton').addClass('showI')
        $('#ruleSeries').removeClass('showI')
        $('#feedback').removeClass('showI')
        $('#audioMicBut').css('background-color', '#7393c4')

        $('#messDescription').removeClass('hideMessage')
        $('#cross').addClass('speakingsss_large')
        //this.setvideoWiths()
        this.iconShow = true
        this.changeAvatarSize()
        if (this.ccOnOff == true) {
          // $('#message').addClass('showMessage')
          console.log('cc check bubble ')
          this.checkBubbleOpen()
        }
      }
    }, 0)


    if (localStorage.hasOwnProperty("mathsSidebarClick")) {
      this.fullScreen = true
      localStorage.removeItem('mathsSidebarClick');
      //console.log('mathsSidebarClick', 'making it true ', this.fullScreen)
    } else {
      this.fullScreen = !this.fullScreen
      //  console.log('normal condition', this.fullScreen)
    }
    // }

    // this.fullScreen = !this.fullScreen
    // console.log('normal condition', this.fullScreen)
  }


  checkBubbleOpen() {
    // if(this.platformBrowser) {
    if (localStorage.hasOwnProperty("mathtoggle")) {
      let toggle = JSON.parse(localStorage.getItem('mathtoggle') || 'undefined')
      if (toggle == true) {
        $('#message').addClass('showMessage')
        $('#chatbubblemessage').removeClass('showMessage')
      } else {
        $('#chatbubblemessage').addClass('showMessage')
      }
    } else {
      console.log('else case chat bubble ')
      $('#chatbubblemessage').addClass('showMessage')
    }
    // }
  }


  /**
 * Function to change the size of the avatar
 */
  changeAvatarSize() {
    // if(this.platformBrowser) {
    if (this.fullScreen === false) {
      // condition for making big screen avatar card
      console.warn('viewport width', window.innerWidth
        , 'viewport height', window.innerHeight)
      const width = window.screen.width
      const height = window.screen.height
      var t: any = document.querySelector('#sm-video')
      var videoTag: any = document.querySelector('#smVideo')
      // console.log('canvas',t)
      if (t) {
        t.style.width = '100%'
        if (window.innerWidth < 480) {
          //  this.setVideo(600, 650)
          // this.setVideo(700, 600)
          this.setVideo(600, 700)
          console.log('when the fulldcreen variable false mobile')
          // t.style.height = '440px'
          t.style.width = '80%'
          $('#message').css('width', '')
          $(t).css('margin-left', '0px')
          $(videoTag).css('margin-left', '0px')
          videoTag.style.width = '100%'
          videoTag.style.height = '100%'
          // $(t).css('margin-left', '-60px')
          $('#sidebar').addClass(' sidebar_small')


        } else if (innerWidth >= 600 && innerWidth <= 1024) {
          t.style.width = '80%'
          // console.log(' 600 and less then 1024')
          $(t).css('margin-left', '0px')
          $(t).css('margin-left', '0px')
          //  $(videoTag).css('margin-left', '0px')
          console.log('its a 768 and 1024')
          this.setVideo(750, 500)

        } else if (innerWidth >= 1025 && innerWidth < 2290) {
          t.style.width = '80%'
          console.log("full screen avatar for laptop below 2244")
          // $(videoTag).css('margin-left', '-140px')

          // for landscape

          // if ((innerHeight == 950 || innerHeight == 905 || innerHeight == 1024  || innerHeight == 956) && (innerWidth == 1366) || (window.screen.height == 1024 && window.screen.width == 1366) ) { //  landsvape ipad 12 
          if ((innerHeight >= 900 && innerHeight <= 1024) && (innerWidth == 1366)) { //  landsvape ipad 12
            t.style.width = '90%'
            console.log('landscape ipad 12')
            //   $(videoTag).css('margin-left', '0px')
            $(t).css('margin-left', '0px')
            //  $(videoTag).css('margin-left', '0px')
            this.setVideo(700, 250)
            //} else if ((innerHeight == 746 || innerHeight == 820 || innerHeight == 701) && (innerWidth == 1180)) {  // landsvape ipad  10 
          } else if ((innerHeight >= 700 && innerHeight <= 820) && (innerWidth == 1180)) {  // landsvape ipad  10 
            t.style.width = '90%'
            $(videoTag).css('margin-left', '0px')
            console.log('landscape ipad 10')
            $(t).css('margin-left', '0px')
            console.log('landscape one with ipad')
            this.setVideo(700, 300)

            // } else if ((innerHeight == 810 || innerHeight == 740 || innerHeight == 695) && (innerWidth == 1080)) {  // landsvape ipad 9 
          } else if ((innerHeight >= 680 && innerHeight <= 810) && (innerWidth == 1080)) {  // landsvape ipad 9 
            t.style.width = '90%'
            $(videoTag).css('margin-left', '0px')
            $(t).css('margin-left', '0px')
            console.log('landscape one with ipad 9')
            this.setVideo(650, 250)

            // } else if (innerHeight == 760 && innerWidth == 1194) { 
            // } else if ((innerHeight == 760 || innerHeight == 715) && (innerWidth == 1194)) {  // landscape ipad 11
          } else if ((innerHeight >= 700 && innerHeight <= 834) && (innerWidth == 1194)) {  // landscape ipad 11
            t.style.width = '90%'
            console.log('landscape ipad 11')
            //   $(videoTag).css('margin-left', '0px')
            $(t).css('margin-left', '0px')
            //  $(videoTag).css('margin-left', '0px')
            this.setVideo(700, 250)

          } else if ((innerHeight >= 1100 && innerHeight <= 1500) && (innerWidth == 1024)) { // landscape ipad 11
            console.log('----- ipad 12 inside ---------------')

          } else if ((height >= 1150 && height <= 1450) && (width == 1024)) {
            console.log('----- ipad 12 inside ---------------')
            t.style.width = '90%'
            console.log('landscape ipad 12')
            $(videoTag).css('margin-left', '0px !impotant')
            $(t).css('margin-left', '0px')
            this.setVideo(900, 550)

          } else {
            $(t).css('margin-left', '0px')
            //  $(videoTag).css('margin-left', '-140px')
            let width = window.screen.width
            // let height = window.screen.height - 200
            let height = window.screen.height - 60

            // this.setVideo(900, 390)
            console.warn('big screen')
            console.log('========', width, height)

            this.setVideo(width, height)

          }


        }
        else if (innerWidth >= 2300) {
          t.style.width = '90%'
          console.log("full screen avatar for laptop for 2300")
          $(t).css('margin-left', '0px')
          const width = window.screen.width
          const height = window.screen.height - 200
          this.setVideo(width, height)
          console.warn('big screen for 2300')

        }

      }

    } else {
      // condition for making small screen avatar card
      console.log('run when in small card view', 'else')
      var t: any = document.querySelector('#sm-video')
      var videoTag: any = document.querySelector('#smVideo')
      // this.setVideo(330, 180)
      // this.setVideo(600, 300)
      // setTimeout(()=>{
      //   this.setVideo(500, 300)
      // })
      this.setVideo(600, 400)
      console.log('small screen run pixel for avavtar')
      if (window.innerWidth < 480) {
        if (t !== null) {
          t.style.width = '80%'
          // t.style.height = '100%'
          $(t).css('margin-left', '-60px')
          $(videoTag).css('margin-left', '0px')
          videoTag.style.width = '100%'
          videoTag.style.height = '100%'
        }

      } else {
        if (t !== null) {

          // t.style.width = '90%'
          t.style.width = '70%'
          $(t).css('margin-left', '-80px')
          // $(t).css('margin-left', '-39px')
          $(videoTag).css('margin-left', '0px')
          videoTag.style.width = '100%'
          videoTag.style.height = '100%'
        }
      }
    }
    // }
  }




  smallcardSetPosition() {
    // if(this.platformBrowser) {
    console.log('run when in small card view')
    var t: any = document.querySelector('#sm-video')
    var videoTag: any = document.querySelector('#smVideo')
    // this.setVideo(330, 180)
    this.setVideo(600, 400)
    if (window.innerWidth < 480) {
      if (t !== null) {
        t.style.width = '80%'
        // t.style.height = '100%'
        $(t).css('margin-left', '-60px')
        $(videoTag).css('margin-left', '0px')
        videoTag.style.width = '100%'
        videoTag.style.height = '100%'
      }

    } else {
      if (t !== null) {
        // t.style.width = '90%'
        t.style.width = '70%'
        $(t).css('margin-left', '-80px')
        // $(t).css('margin-left', '-39px')
        $(videoTag).css('margin-left', '0px')
        videoTag.style.width = '100%'
        videoTag.style.height = '100%'
      }
    }
    // }
  }





  // select from the option 
  selectOptionForTest(answer: any) {

    let list = [
      { 0: "a" },
      { 1: "b" },
      { 2: "c" },
      { 3: "d" },
      { 4: "e" },
    ];
    this.isClick = true
    this.hideOptionOnlyFOrMobile()
    //  this.uneeq.stopSpeaking()
    this.persona.stopSpeaking()
    this.stopSubtitleAnimation()
    let answerAsString = answer.toString();
    var getOrderList: any = list[answerAsString]
    var final = getOrderList[answerAsString]
    this.persona.conversationSend(final, {}, {});
    //  this.uneeq.sendTranscript(final)
  }




  //openAI API function call
  callOpenAI() {
    // if(this.platformBrowser) {
    var session = localStorage.getItem('sessionId')
    let payloadData = {
      "data": this.userSpeakValue,
      "gptPrompt": this.user.gptPrompt,
      "sessionID": session,
      // "email": this.user.email,
      "time": this.user.lastlogin,
      "instance_pvt_ip": this.user.instance_pvt_ip
    }
    if (localStorage.hasOwnProperty("learningId")) {
      // var scroll = $('#outputDesc');
      // scroll.stop();
      $('.avatarspeak-s').scrollTop(0);
    }

    this.disableMicButton = true
    this.ser.openAICall(payloadData).subscribe({
      next: (v) => {
        this.normalGPT = false;
        this.disableMicButton = false
      },
      error: (e) => {
        console.error(e);
        this.normalGPT = false;
        this.disableMicButton = false
      }

    })
    // }
  }


  checkButton() {
    // if(this.platformBrowser) {
    setTimeout(() => {
      if (this.fullScreen == true) {
        console.log('adding color when true')
        $('.bcolorMic').css('background-color', '#d9e9fd')
        if (localStorage.getItem('screen') === "TestSeries" || (localStorage.getItem('screen') === "LearningScreen")) {
          $('.bcolorMic').css('background-color', '#7393c4')
        }

      } else if (this.fullScreen == false) {
        console.log('adding color when false')
        $('.bcolorMic').css('background-color', '#7393c4')
      }
    }, 1)
    // }
  }

  //openAI API function call
  callOpenAIMathematicsAPI() {
    // if(this.platformBrowser) {
    var session = localStorage.getItem('sessionId')
    let payloadData = {
      "data": this.userSpeakValue,
      "gptPrompt": this.user.gptPrompt,
      "sessionID": session,
      // "email": this.user.email,
      "time": this.user.lastlogin,
      "instance_pvt_ip": this.user.instance_pvt_ip
    }
    if (localStorage.hasOwnProperty("learningId")) {
      $('.avatarspeak-s').scrollTop(0);
    }

    this.disableMicButton = true
    // this.ser.OpenAIMathematics(payloadData).subscribe({
    //   next: (v) => {

    //     this.runLoderGPT = false
    //     this.disableMicButton = false
    //   },
    //   error: (e) => {
    //     console.error(e)
    //     this.runLoderGPT = false
    //     this.disableMicButton = false
    //   }
    // })
    // }
  }









  /**
   * Check if the maths indicator is active
   * This function is responsible for determining whether the maths indicator is currently active.
   */
  checkMathsIndicatorActive() {
 
  }


  /**
 * Function called when the test or learning is crossed or closed
 * This function is triggered when the user crosses or closes the test.
 * @returns {void} - This function doesn't return anything.
 */
  oncrossTest() {
    // if(this.platformBrowser) {
    this.pdfShow = ""
    console.log('true')
    // this.optionList = []
    // this.CorrectAnswer = ""
    // this.questionList = ""

    this.expandOn = true
    this.mobileAvatarOnOff = false
    this.refreshBtnPPT = false
this.bubblewindowOnOff = true
    // if (window.screen.width < 480) {
    // this.mobileAvatarOnOff = true
    // this.hideAvatarForMobile()
    $('#chat-widget-minimized').css('display', 'block');
    $('#chat-widget-container').css('z-index', '11000');
    $('#chat-widget-container').css('height', '84px');
    //  }

    var videoTag: any = document.querySelector('#smVideo')
    $(videoTag).css('margin-left', '0px')
    videoTag.style.width = '100%'
    videoTag.style.width = '100%'

    this.hideOptionTempraryFormobile = true
    localStorage.removeItem('screen')
    localStorage.setItem('AvatResCC', 'true')
    this.ser.updatePDFLinkData("");
    //  $('#hambergerBar').addClass('showI');
    $('#stopavatarId').addClass('stopHandIconSmallScreen');
    $('#stopavatarId').removeClass('stopHandIcon');
    $('#stopSoundId').addClass('stopIConsmallscreenImg');
    $('#stopSoundId').removeClass('stopIConImg');
    //
    $('#sidebarAvatar').css('display', 'none');
    $('#hambergerBar').addClass('showI');
    $('#pptPageLoad').addClass('hideMessage')
    $('#chatbubblemessage').css('margin-top', '8px')
    $('#chatbubblemessage').removeClass('learningchatBOx');
    // chat btn 
    // $('#sendId').removeClass('newIconSize')
    // $('#sendId').addClass('newIconSizeMobile ')
    // $('#voiceId').removeClass('newIconSize')
    // $('#voiceId').addClass('newIconSizeMobile ')

    // test series
    $('#showTestPrepItem').removeClass('showMessage')

    $('#optionMessage').css('margin-top', '0px')
    // $('#optionMessage').css('margin-top', '20px')
    // $('#movableCard').css('border-radius', '30px')
    $('#movableCard').css('border-radius', '8px')
    $('#QuestionDisplay').css('margin-top', '21px')
    // $('#pdfDataSet').css('margin-top', '15px')
    $('#pdfDataSet').css('margin-top', '25px')
    $('#muteVoiceId').addClass('showI');
    $('#box3Main').addClass('showI');
    $('#mobileDotAni').addClass('showI');


    if (window.screen.width < 480) {
      this.bottomPositionWidth = '81.5%'
      this.inputWidthSize = '210px';
      this.bottomPosition = 0
      this.micMarginLeft2 = '2px'
      //  this.borderRadius = '0px 0px 20px 20px'
      this.borderRadius = '0px 0px 3px 3px'
      $('#settingId').addClass('showI');
      // this.inputmarginLeft = '35px'
      this.inputheightSize = '50px'
      this.bottomPositionheight = '60px'
      this.inputMarginLeft = '-2px'
      // this.stopBottomSize = '70%'
      // this.stopLeftSize = '8%'
      this.stopBottomSize = '75%'
      this.stopLeftSize = '10%'
      this.micWidth = '50'
      this.micWidthOnly = '50'
      this.micMarginleft = '0'
      this.micHeight = '50'
      this.micMarginLeft2 = '2px'
    } else {
      // this.bottomPosition = 67
      this.bottomPosition = 12
      //  this.borderRadius = '0px 0px 20px 20px'
      this.borderRadius = '0px 0px 9px 9px'
      // this.bottomPositionWidth = '90%'
      this.bottomPositionWidth = '77.5%'
      // this.inputWidthSize = '201px';
      this.inputWidthSize = '220px';
      $('#settingId').addClass('showI');
      this.inputheightSize = '50px'
      this.micMarginLeft2 = '0px'
      this.inputMarginLeft = '3px'
      this.bottomPositionheight = '60px'
      this.stopBottomSize = '75%'
      this.stopLeftSize = '10%'
      this.micWidth = '50'

      this.micWidthOnly = '50'
      this.micMarginleft = '0'
      this.micHeight = '50'
      this.micMarginLeft2 = '0px'
    }


    $('#refreshBtn').addClass('hideMessage')
    // $('#sendId').removeClass('newIconSize');
    // $('#sendId').addClass('newIconSizeMobile');

    // $('#voiceId').removeClass('newIconSize');
    // $('#voiceId').addClass('newIconSizeMobile');
    // end mic icons

    // card minimize

    $('#tourIcon').addClass('showI');
    $('#tourIcon').css('z-index', '1');
    $('#minimizeAvatar').addClass('showI');
    $('#maximizeAvatar').removeClass('showI');

    // $('#chat-widget-minimized').css('display', 'block');
    // $('#chat-widget-container').css('height', '84px');
    // $('#message').css('margin-top', '32px')
    $('#message').css('margin-top', '22px')
    $('#message').css('width', '')
    $('#iconShow').addClass('showI')
    $('#ImageDisplay').removeClass('showMessage')
    $('#pdfDataSet').addClass('hideMessage')
    $('#sm-video').removeClass('uneeqAv')
    $('#sm-video').addClass('uneeqAvatar')
    $('#message').removeClass('showMessage')
    $('#chatbubblemessage').removeClass('showMessage')
    //  $('#message').addClass('hideMessage')
    $('#movableCard').removeClass('full_screen')
    $('#movableCard-main').removeClass('full_screen')
    $('#stopIcon').removeClass('bottomleft-large')
    $('#stopIcon').addClass('bottomleft')
    $('#isvideo').removeClass('rightDiv-large')
    $('#isvideo').addClass('rightDIv')
    $('#ruleSeries').addClass('showI')
    $('#feedback').addClass('showI')
    $('#ccSubtitle').addClass('showI')
    this.changeAvatarSize()
    this.smallcardSetPosition()
    $('#cross').removeClass('showI')
    $('#cross-test').addClass('showI')
    $('#chatbarOnly').addClass('showI')
    $('#chat-bar').css('display', 'block')
    $('#mobileAvatarButton').removeClass('showI')
    $('#exitExam').addClass('showI')
    $('#exitpresentation').addClass('showI')
    $('#downloadpdf').addClass('showI')
    $('#userCC').removeClass('showMessage')
    $('#cross').removeClass('speakingsss_large')
    $('#openOnTestOnly').addClass('showI')
    $('#openOnLearningOnly').addClass('showI')
    $('#normalOpen').removeClass('showI')
    $('#OnlyDisplayOnTest').addClass('showI')
    $('#audioMicBut').css('background-color', '#d9e9fd')
    $('#QuestionDisplay').addClass('hideMessage')
    $('#optionMessage').addClass('hideMessage')
    //mathematice
    this.ischatBoxOpen = false
    this.iconShow = false
    this.defaultExitMessage()
    this.checkMathsIndicatorActive()
  // }


  }

  // default message 
  defaultExitMessage() {
    // if(this.platformBrowser) {
    const avatarCanvas: any = document.querySelector('#sm-video canvas')
    if (avatarCanvas !== null) {
      avatarCanvas.style.width = '100%'
      avatarCanvas.style.height = '100%'
      $(avatarCanvas).css('margin-left', '')
    }
    var aa: any = document.getElementById('outputDesc')
    if (aa) aa.innerHTML = 'welcome to the world of edYOU. I am ' + this.avatarName + '. How can I help you?';
    // }
  }






  // function to open feedback form
  openFeedback() {
    if (this.feedback == true) {
      this.openFeedbackForm = false
    } else if (this.feedback == false) {
      this.openFeedbackForm = true
    }
    this.feedback = !this.feedback
  }


  // close feedbackForm 
  closeFeedback(d: any) {
    this.openFeedbackForm = d
    this.feedback = false
  }





  refreshSlidePPT() {
    this.childPdf.refreshCurrentSlide()
  }


  clickFunction(value: any) {

    // if(this.platformBrowser) {
    if (this.ccBox == true) {
      $('#panel1').css('display', 'block')
      // $('#panel2').css('display','none')
      // $('#panel3').css('display','none')
    } else {
      $('#panel1').css('display', 'none')
    }


    this.ccBox = !this.ccBox
    this.isDropDownSetting = false;
    // }
  }




  @ViewChild('popup') popup!: ElementRef;
  @ViewChild('popup2') popup2!: ElementRef;


  @HostListener('document:click', ['$event'])

  clickout(event: any) {
    // $('.box-1').css('margin-top', '0px');
console.log("Atif------ ",this.popup, this.popup2, event?.target);
    if(event?.target?.getAttribute('fragment') != null){
      this.scrollToId(event?.target?.getAttribute('fragment'))
    }
    if(this.popup != undefined && this.popup2 != undefined){
      const isClickInsideMenu = this.popup?.nativeElement?.contains(event?.target);
      const isClickInsideCaptionButton = this.popup2?.nativeElement?.contains(event?.target);

      if (!isClickInsideMenu && !isClickInsideCaptionButton) {
        this.isDropDownSetting = true;
        this.dropSetting();
      }
      var target = $(event.target);
    }
    

  }

  scrollToId(id: string) {
    console.log("element id : ", id);
    this.service.scrollToElementById(id);
  }

  navigateToHelp() {

  }

  // Method to check if the saved date is older than 3 days
  isDateOlderThan3Days(savedDate: string): boolean {
    const currentDate = new Date();
    const saved = new Date(savedDate)
    const differenceInTime = currentDate.getTime() - saved.getTime();
    const differenceInDays = Math.floor((differenceInTime) / (1000 * 3600 * 24));
 
    return differenceInDays > 6;

  }

  removeSaveDate() {
    // if(this.platformBrowser) {
    let saveDate1: any = localStorage.getItem('savedDate3');
    const currentDate = new Date();
    const saved = new Date(saveDate1)
    const differenceInTime = currentDate.getTime() - saved.getTime();
    const differenceInDays = Math.floor((differenceInTime) / (1000 * 3600 * 24));
    if (differenceInDays > 6) {
      console.log('greater than 0')
      localStorage.removeItem('savedDate3');

    } else {
      console.log('less than or equal than 0')
    }
    // }
  }


  @HostListener('document:keydown.enter', ['$event'])
  onEnterPress(event: KeyboardEvent) { 

    this.sendTextToAvatar() 
  
  
  }

  muteFun() {
    // this.isSwal = true;
    // this.type = 'welcome';
    // this.swalFireData = {title: "Welcome",text: 'Please click the button below to get started.',confirmButtonText: "Start ",showConfirmButton: true,confirmButtonColor: '#2a7cc7',allowOutsideClick: false};
    // this.payload = '' 

    console.log('mute function call state ++++++')

    Swal.fire({
      title: "Welcome",
      text: 'Please click the button below to get started.',
      confirmButtonText: "Start ",
      showConfirmButton: true,
      confirmButtonColor: '#2a7cc7',
      allowOutsideClick: false,
    }).then((result) => {
      let p = {
        name: 'Avatar start speaking.',
      }
      // this.customWelcomeMessge()
      this.customLogger(p)
      this.muteDigitalPerson()
    });
  }

// Function to get the browser name
getBrowserName() {
  var userAgent = navigator.userAgent;
  var browsers:any = {
    Chrome: /Chrome/i,
    Safari: /Safari/i,
    Firefox: /Firefox/i,
    IE: /Internet Explorer/i,
    Edge: /Edge/i,
    Opera: /Opera|OPR/i
  };

  for (var key in browsers) {
    if (browsers[key].test(userAgent)) {
      return key;
    }
  }
  
  return "Unknown";
}

// Function to get the device type
 getDeviceType() {
  var userAgent = navigator.userAgent;
  if (/(iPhone|iPod)/.test(userAgent)) {
    return "iOS";
  }else if (/iPad/.test(userAgent)) {
    return "iPad";
  } else if (/Android/.test(userAgent)) {
    return "Android";
  } else if (/Mac/.test(userAgent)) {
    return "Mac OS";
  } else if (/Windows/.test(userAgent)) {
    return "Windows";
  } else {
    return "windowUniversal";
  }
}
  // checkcolor(){
  //   var browserName = this.getBrowserName();
  //   var deviceType = this.getDeviceType();  
  //   // let DeviceInfo = {
  //   //   browser: browserName,
  //   //   device: deviceType
  //   // };
  //   let device
  //   if(deviceType == "iPad" || deviceType == "Android" || deviceType == "windowUniversal"){
  //     device  = deviceType
  //   }else{
  //     device  = deviceType +'_' + browserName
  //   }
   
  //   let pay={
  //     "device":device
  //   }
  //   console.log(pay)
  //   this.ser.change_backgroundcolor(pay).subscribe((res:any)=>{
  //     console.log(res)
  //     if(res.statusCode == 200){
  //       this.backgroundColor = res.body.color
  //       console.log(this.backgroundColor,'set background color only----------------------------------===============================-------------')
  //       // this.findColor()
  //       // this.checkDeviceAndColor()
  //     }
  //   })
  // }
  forinputpadding(){
    const screen = localStorage.getItem('screen')
    // if(screen){
    //   console.log(true)
    // }else{
    //   console.log(false)
    // }
    if (window.innerWidth > 768 && window.innerWidth < 1025 && this.fullScreen == false  ) {
      console.log("condition satisfied")
      this.myInput.nativeElement.style.paddingRight = '80px';
    }else if(window.innerWidth > 768 && window.innerWidth < 1025 && screen){
      this.myInput.nativeElement.style.paddingRight = '80px';
    }else if(window.innerWidth < 601){
      this.myInput.nativeElement.style.paddingRight = '75px';
      console.log('mobile')
    }else{
      console.log("!condition satisfied")
      this.myInput.nativeElement.style.paddingRight = '10px';
    }}
}