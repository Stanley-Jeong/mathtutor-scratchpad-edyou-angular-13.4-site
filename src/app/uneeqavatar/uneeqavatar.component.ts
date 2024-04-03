import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, NgZone, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import { Persona, Scene } from '@soulmachines/smwebsdk'
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
declare var $: any;
//declare var RunTour: any
import { tour } from '../../assets/js/index.js';
import { LearningTour, TestPrepTour, noSchoolTour } from '../../assets/js/index.js';

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
  optionListTestprep: any = ['hello', 'test', 'slove the eauationtest', 'end this text'];
  timeoutDuration = 29000;
  fullScreen: boolean = false;
  userText: any
  connectionFailureCount = 0;
  elseConditionCount = 0;
  isSpinner: boolean = true
  iconShow: boolean = false
  contentCard: any;
  unmuteMicrophone: boolean = false
  user: any = [];
  isMobileNormalTrue: boolean = false
  uneeq: any
  showMic: boolean = false
  token: any = '';
  msgDisplay: any;
  avatarTextActive: any;
  isMobileTrue: boolean = false
  counting: number = 0
  QuestionListData: any;
  ccOnOff: boolean = true;
  videoMuted: boolean = false
  styleWidthSize: any;
  stleHeightSize: any
  ischatBoxOpen: boolean = false
  idleTimeout: any;
  messageForQueueAvatar: boolean = false;
  mobileAvatarOnOff: any = false;
  showImage: boolean = false;
  smallSizeImage: boolean = false
  bigSizeImage: boolean = true
  avatarHideOnOff: boolean = false
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
  accod1: boolean = true;
  accod2: boolean = false;
  CorrectAnswer: any;
  ImageData: any;
  linkDisData: any;
  dashboardTour: any
  followup: any;
  followName: any;
  feedback: boolean = false;
  openFeedbackForm: boolean = false;
  isClick: boolean = false;
  checkTestSeriespage: any;
  expandOn: boolean = false
  @Output() storedErrorCode = new EventEmitter<any>();
  mediaStream: any;
  audioTrack: any;
  pdfShow: any
  //= "https://pollydemo2022.s3.us-west-2.amazonaws.com/Presentation/49b4c467f429f846989cde5dbe9da95ffc.pdf";
  runLoderGPT: boolean = false;
  @ViewChild('childPdf') childPdf: any;
  @ViewChild('child') childMenu: any;
  userSpeakValue: any;
  pageReload: boolean = true;
  recognition: any;
  isListening = false;
  voiceActiveSectionDisabled: boolean = true;
  voiceActiveSectionError: boolean = false;
  voiceActiveSectionSuccess: boolean = false;
  voiceActiveSectionListening: boolean = false;
  voiceText: any;
  showGraph = true;
  tourGuideValueCheck: any;
  micToggle: boolean = true;
  microphone: MediaStreamAudioSourceNode | any
  //
  recognizer: SpeechRecognizer | any;
  subscriptionKey = '9a9e0a9d5d7e4cebb5deee50ed7aa3db';
  serviceRegion = 'eastus';
  language = 'en-US'; // e.g. 'en-US'
  recognizer2: any
  speechRecognizer: any;
  spaceBarActive: boolean = false;
  isMicButtonActive: boolean = false;
  lastRecognized: any;
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
  avatarAnswerContent: any;
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

  constructor(private router: Router, private ngZone: NgZone, private _location: Location, private elementRef: ElementRef, private renderer: Renderer2,
    private ser: UserService) {

  }


  ngAfterViewInit() {
    // MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

  }


  ngOnInit(): void {


    this.fullScreen = true
    this.isSpinner = true
    this.avatarName = this.ser.avatar
    this.onLoadCard('')

    this.user = JSON.parse(localStorage.getItem('user') || '[]')
    this.token = localStorage.getItem('token') 
    // this.fullScreen = true
    if (this.user.Presentation_View == "PPT with avatar") {
      //  this.startAvatarFunction()
    }
  
      this.fullScreen = false
      this.onLoadCard('id')
   
    this.checkDeviceAndColor()

    window.addEventListener('resize', this.resizeFun);

    if (window.innerWidth < 480) {
      //hide card
      $('#movableCard').addClass('showI')
      this.mobileAvatarOnOff = true
    }


    // remove item on page refresh 
    window.onbeforeunload = function () {
      localStorage.removeItem('Avatar');
      localStorage.removeItem('screen');
    
      localStorage.removeItem('learningId');
      localStorage.removeItem('mathtoggle');
    };


    this.avatarFunction()

 

   
  }


  startTours() {
    setTimeout(() => {
      tour()
    }, 2000)
  }


  isToggleOrAncestor(element: HTMLElement | null, toggleClassName: string): boolean {
    if (!element) return false;
    if (element.classList.contains(toggleClassName)) return true;
    return this.isToggleOrAncestor(element.parentElement, toggleClassName);
  }


  clickEvent(event: any) {
    //    const target = event.target as HTMLElement;
    // Get the target element by its id
    const target = document.getElementById('eventTest');
    if (target) {
      const rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Define the clickable range (50px to 60px from the right edge of the element)
      const clickableRangeStart = rect.width - 60; // 60px from the right edge
      const clickableRangeEnd = rect.width - 20;   // 50px from the right edge
      const targetE = event.target as HTMLElement;

      if (innerWidth >= 1367 && innerWidth < 1600) {
        console.log('Clicked within 1367 to 1600');
        if (x >= clickableRangeStart && x <= clickableRangeEnd) {
          console.log('Clicked within the clickable range');
          this.mathEventHit("")
        } else {
          // console.log('Clicked without the clickable range');
        }
      } else if (innerWidth >= 1601 && innerWidth < 3300) {
        console.log('Clicked within 1600 to 3300');
        if (x >= clickableRangeStart && x <= clickableRangeEnd) {
          console.log('Clicked within the clickable range');
          this.mathEventHit("")
        } else {
          // console.log('Clicked without the clickable range');
        }
      } else {
        this.mathEventHit("")
      }



    }


  }

  clickCount = 0;
  mathEventHit(event: any) {
    console.log('focus---------------on------------------------')
    this.clickCount++;


    if (this.isKeyboardOn === true) {
      console.log('yes')
      $('.box-1').css('margin-top', '');
      $('#textTourBox').css('background', '');
      $('.box-2').css('margin-top', '');
      $('#sendId1').css('background', '');
      $('#minimiseMathBTN').addClass('showI');
      this.mathsMininmizeBtn = false
      $('#minimiseMathBTN').css('margin-top', '');
      $('#stopspeakingID').css('z-index', '1400000');
    } else {

      // Trigger a click event on the CSS element
      //var mathFieldPart:any = document.querySelector(".math-field::part(virtual-keyboard-toggle)");
      // mf.mathVirtualKeyboardPolicy = "manual";
      // mf.addEventListener("focusin", () =>  mathVirtualKeyboard.show());



      if (window.innerWidth < 480) {
        $('.box-1').css('margin-top', '-430px');
        $('.box-2').css('margin-top', '-430px');
        this.mathsMininmizeBtn = true
        $('#minimiseMathBTN').removeClass('showI');
        $('#minimiseMathBTN').css('margin-top', '-480px');
        // $('#sendId1').css('background', '#4E576D');
        $('#stopspeakingID').css('z-index', '1400');
        $('#textTourBox').css('background', '#4E576D');
        console.log('no')

      } else if (innerWidth >= 600 && innerWidth <= 1024) {


        if ((innerHeight == 810 || innerHeight == 740) && (innerWidth == 1080)) {
          $('.box-1').css('margin-top', '-650px');
          $('.box-2').css('margin-top', '-650px');
          this.mathsMininmizeBtn = true
          $('#minimiseMathBTN').removeClass('showI');
          $('#minimiseMathBTN').css('margin-top', '-700px');
          // $('#sendId1').css('background', '#4E576D');
          $('#textTourBox').css('background', '#4E576D');
          console.log('no')
        } else {
          $('.box-1').css('margin-top', '-750px');
          $('.box-2').css('margin-top', '-750px');
          this.mathsMininmizeBtn = true
          $('#minimiseMathBTN').removeClass('showI');
          $('#minimiseMathBTN').css('margin-top', '-800px');
          // $('#sendId1').css('background', '#4E576D');
          $('#textTourBox').css('background', '#4E576D');
          console.log('no')
        }

      } else if (innerWidth >= 1025 && innerWidth < 1399) {
        console.log('range 1025 to 1399')
        $('#minimiseMathBTN').removeClass('showI');
        if ((innerHeight == 950 || innerHeight == 905 || innerHeight == 1024) && (innerWidth == 1366)) { // ipad pro
          $('.box-1').css('margin-top', '-720px');
          $('.box-2').css('margin-top', '-720px');
          // $('#sendId1').css('background', '#4E576D');
          $('#minimiseMathBTN').removeClass('showI');
          $('#minimiseMathBTN').css('margin-top', '-770px');
          $('#textTourBox').css('background', '#4E576D');
          console.log('range 1366 to 1024')
        } else if ((innerHeight == 746 || innerHeight == 820) && (innerWidth == 1180)) { // ipad 10
          $('.box-1').css('margin-top', '-600px');
          $('.box-2').css('margin-top', '-600px');
          // $('#sendId1').css('background', '#4E576D');
          $('#minimiseMathBTN').removeClass('showI');
          $('#minimiseMathBTN').css('margin-top', '-650px');
          $('#textTourBox').css('background', '#4E576D');
          console.log('no')

        } else if ((innerHeight == 746 || innerHeight == 834 || innerHeight == 760 || innerHeight == 727) && (innerWidth == 1194)) { // ipad prp 11
          $('.box-1').css('margin-top', '-650px');
          $('.box-2').css('margin-top', '-650px');
          // $('#sendId1').css('background', '#4E576D');
          $('#minimiseMathBTN').removeClass('showI');
          $('#minimiseMathBTN').css('margin-top', '-700px');
          $('#textTourBox').css('background', '#4E576D');
          console.log('no')
        }
        else {
          $('.box-1').css('margin-top', '-700px');
          $('.box-2').css('margin-top', '-700px');
          this.mathsMininmizeBtn = true
          $('#minimiseMathBTN').removeClass('showI');
          $('#minimiseMathBTN').css('margin-top', '-750px');
          $('#stopspeakingID').css('z-index', '1400');
          //  $('#sendId1').css('background', '#4E576D');
          $('#textTourBox').css('background', '#4E576D');
          console.log('no')
        }
      }
      else if (innerWidth >= 1400 && innerWidth < 1600) {

        this.mathsMininmizeBtn = true
        if (innerWidth == 1536) {
          $('.box-1').css('margin-top', '-500px');
          $('.box-2').css('margin-top', '-500px');
          $('#minimiseMathBTN').removeClass('showI');
          $('#minimiseMathBTN').css('margin-top', '-550px');
          // $('.box-1').css('margin-top', '-500px');
          // $('.box-2').css('margin-top', '-500px');
          $('#stopspeakingID').css('z-index', '1400');
          // $('#sendId1').css('background', '#4E576D');
          $('#textTourBox').css('background', '#4E576D');
          console.log('no')
        } else if (innerWidth == 1440) {
          $('.box-1').css('margin-top', '-500px');
          $('.box-2').css('margin-top', '-500px');
          $('#minimiseMathBTN').removeClass('showI');

          $('#minimiseMathBTN').css('margin-top', '-550px');
          // $('.box-1').css('margin-top', '-500px');
          // $('.box-2').css('margin-top', '-500px');
          $('#stopspeakingID').css('z-index', '1400');
          // $('#sendId1').css('background', '#4E576D');
          $('#textTourBox').css('background', '#4E576D');
        }
        else {
          $('.box-1').css('margin-top', '-600px');
          $('.box-2').css('margin-top', '-600px');

          $('#minimiseMathBTN').css('margin-top', '-650px');
          // $('.box-1').css('margin-top', '-500px');
          // $('.box-2').css('margin-top', '-500px');
          $('#stopspeakingID').css('z-index', '1400');
          // $('#sendId1').css('background', '#4E576D');
          $('#textTourBox').css('background', '#4E576D');
          console.log('no')
        }
      } else if (innerWidth >= 1601) {
        this.mathsMininmizeBtn = true
        $('.box-1').css('margin-top', '-700px');
        $('.box-2').css('margin-top', '-700px');
        $('#minimiseMathBTN').removeClass('showI');
        $('#minimiseMathBTN').css('margin-top', '-750px');
        $('#stopspeakingID').css('z-index', '1400');
        //  $('#sendId1').css('background', '#4E576D');
        $('#textTourBox').css('background', '#4E576D');
        console.log('no')
      }

    }
    this.isKeyboardOn = !this.isKeyboardOn


  }





  StartTourGuideSetting() {

    if (localStorage.getItem('screen') === "TestSeries") {
      console.log('test screen')
      TestPrepTour()
    } else if (localStorage.getItem('screen') === "LearningScreen") {
      console.log('learning screen')
      LearningTour()
    } else {
      console.log('normal screen')
      if (this.user.industryName == "School") {
        tour()
      } else {
        noSchoolTour()
      }

    }
  }


  naviagtionTOHelp() {
    this.oncrossTest();
    this.persona.stopSpeaking()
    this.router.navigate(['/user/help'])

  }


  dropSetting() {

    if (localStorage.getItem('screen') === "TestSeries" || localStorage.getItem('screen') === "LearningScreen") {
      this.hideHelpSetting = false
    } else {
      this.hideHelpSetting = true
    }

    const dropdown = this.elementRef.nativeElement.querySelector('#dropDownSetting');
    if (this.isDropDownSetting === true) {
      this.renderer.removeClass(dropdown, 'showMessage');
    } else if (this.isDropDownSetting === false) {
      this.renderer.addClass(dropdown, 'showMessage');
    }
    this.isDropDownSetting = !this.isDropDownSetting


  }



  checkDeviceAndColor() {


    const userAgent = window.navigator.userAgent;
    var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;
    var ipadMiniWidth = 768; // Assume 768px width for iPad Mini
    var ipadAirWidth = 1024; // Assume 1024px width for iPad Air
    var ipadProWidth = 1080; // Assume 1080px width for iPad Pro
    var largeIpadWidth = 1024; // Assume 1024px width for Large iPad
    var largeIpadHeight = 1366; // Assume 1366px height for Large iPad


    //const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf('Win') !== -1) {
      if (userAgent.indexOf('Chrome') !== -1) {
        this.backgroundColor = '#003A73';
      } else if (userAgent.indexOf('Firefox') !== -1) {
        this.backgroundColor = '#003e6f';
      } else {
        this.backgroundColor = '#003a73';
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
            this.backgroundColor = '#003e70';
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
            this.backgroundColor = '#00437e';
          }
        } else {
          this.backgroundColor = '#00437e';
        }
      }
      else {
        this.backgroundColor = '#00437e'; // iOS devices
      }
    } else if (/Android/.test(userAgent) || userAgent.includes("Android")) {
      this.backgroundColor = '#003b73'; // Android devices
    }

    // else if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
    //   this.backgroundColor = '#003b71'; // iOS devices
    // } else if (userAgent.match(/iPad/i)) {
    //   this.backgroundColor = '#003b71'; // iOS devices
    // }


  }


  cleanupSessionStorage() {
    sessionStorage.clear();
  }



  /***
   * soul machine test start -------
   */


  async avatarFunction() {
    this.cleanupSessionStorage();
    // for dev
   //  const apiKey = 'eyJzb3VsSWQiOiJkZG5hLWVkeW91LXRlY2hub2xvZ2llcy0tZWR5b3UiLCJhdXRoU2VydmVyIjoiaHR0cHM6Ly9kaC5zb3VsbWFjaGluZXMuY2xvdWQvYXBpL2p3dCIsImF1dGhUb2tlbiI6ImFwaWtleV92MV81MzdkMDkwNS05MDc1LTQ5YzgtYWIxOC1kZTJmMzVhYmM4NjEifQ=='
     
    // local test
    const apiKey = 'eyJzb3VsSWQiOiJkZG5hLWVkeW91LXRlY2hub2xvZ2llcy0tZWR5b3UiLCJhdXRoU2VydmVyIjoiaHR0cHM6Ly9kaC5zb3VsbWFjaGluZXMuY2xvdWQvYXBpL2p3dCIsImF1dGhUb2tlbiI6ImFwaWtleV92MV9lZDdhODEyNy05MmEyLTRhMmEtYmRmYy05YzBhZmY0MThlM2IifQ=='
    console.log('fun start')
    const videoEl: any = document.getElementById('smVideo');
    // create a new scene object


    this.scene = new Scene({
      apiKey: apiKey,
      videoElement: videoEl,
      requestedMediaDevices: { microphone: false, camera: false },
      requiredMediaDevices: { microphone: false, camera: false },
    });
    await this.scene
      .connect()
      .then((sessionId: any) => this.onConnectionSuccess(sessionId))
      .catch((error: any) => this.onConnectionError(error));



    // Disconnect from server
    this.scene.onDisconnectedEvent.addListener(() => {

    })

  }


  onConnectionSuccess(sessionId: any) {
    setTimeout(() => {
      $('#avatarLoaders').css('display', 'none')
    }, 1000)

    this._personaId = sessionId
    localStorage.setItem('sessionId', sessionId)

    this.persona = new Persona(this.scene, "1");
    console.info('success! session id:', sessionId);
    this.scene.startVideo().then((videoState: any) => {
      console.info('started video with state:', videoState)

      if (videoState && videoState.audio == false) {
        this.unmuteMicrophone = true
      }
      this.ser.updateSharedData(this.persona);
      this.ser.updateSoulMachineData(this.scene);
      //  console.log(this.scene)
      this.isvoiceAnimationOn = false
      this.soulMachineMessageHandler()

      if (this.scene.connectionState._connectionState['name'] == 'Connected') {
        this.customWelcomeMessge()
        if (this.user.Firstlogin == true) {
          this.setVideo(500, 300)
          console.log('small card pixel')
        } else if (this.user.Firstlogin == false) {
          if (window.innerWidth < 480) {
            this.setVideo(800, 900)
          }
        }
      }

      this.customLogger('')
      // console.log(this.scene)
      //   if (this.scene.connectionState._connectionState['name'] == 'Disconnected' && !this.hasDisconnected) {
      // console.log(this.scene.connectionState._connectionState['name'])
      //  this.scene.disconnect()
      //     this.scene.close()
      //     console.warn(' -----------   getting disconnected relaunching avatar -------------------------------------------------------')
      //     setTimeout(()=>{
      //       this.avatarFunction()
      //     },1000)
      //     this.hasDisconnected = true;

      //     }



    }
    ).catch((error: any) => {
      console.warn('could not start video:===>', error)
      console.warn('could check ========>', error)
      this.customLogger(error)
    });
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
    let ipAddress = localStorage.getItem('IPAdress');
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
      console.log(res);
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
            setTimeout(() => {
              window.location.reload();
            }, 0)
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





  soulMachineMessageHandler() {

    this.addSpacebarEventListeners()
    Scene.prototype.onSceneMessage = (message: any) => {
      var name = message.name
      var body = message.body
      console.warn('body', body)

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

          this.userInputText = 'User: ' + inputUser
          if (inputUser == 'get response' || inputUser == 'getting error' || inputUser == 'getting response' || inputUser == 'stop') {

          } else {
            this.userInputText = inputUser
          }

          // this.userInputText = inputUser
          this.DescAnswer = body.output['context']['public-context']?.display_message
          this.User_Question = body.output['context']['public-context']?.User_Question
          this.approachesList = body.output['context']['public-context']?.approaches
          this.mathsQuestion = body.output['context']['public-context']?.math_question
          // const userQues: any = document.getElementById('local-transcript')
          // userQues.innerHTML = 'User: ' + inputUser;
          this.handlingMessgeForMaths = body.output['context']['public-context']?.handlingMessge
          // test prep screen function
          this.testPrepMessgeHandler(body)
          // avatar message display
          this.avatarAnswerMessageHandler()
          // verbal command function
          this.verbalCommandNavigation(this.DescAnswer)

          if (this.handlingMessgeForMaths == "continue loading" || this.handlingMessgeForMaths == 'continue loading') {
            var m: any = document.getElementById('outputDesc')
            m.innerHTML = '.';
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

        if (state == 'speaking') {
          this.runLoderGPT = false
          $('#stopavatarId').removeClass('showI')
        } else if (state == 'animating') {

        } else if (state == 'idle') {
          $('#stopavatarId').addClass('showI')
        }
      }

    }




  }


  OpenAIMathematicsSoulMachine(body: any) {
    if (this.User_Question != '') {
      $('#MathameticsDisplay').addClass('showMessage')
      //  this.UserQuestion_Display = body.output['context']['public-context']?.User_Question
    }


    if (this.DescAnswer === 'Let me think a bit.') {
      this.runLoderGPT = true;
      var m: any = document.getElementById('outputDesc')
      m.innerHTML = '';
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
      value.innerHTML = this.UserQuestion_Display;

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
        value.innerHTML = this.UserQuestion_Display;
      }

    }
  }


  // allganize normal conversation OpenAI
  allganizeOpenAI() {

    if (this.DescAnswer === 'Let me think') {
      this.runLoderGPT = true;
      var m: any = document.getElementById('outputDesc')
      m.innerHTML = '';
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
    this.disableMicButton = false
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
          d.innerHTML = ''
        }
        else {
          d.innerHTML = this.DescAnswer;
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
  }


  mathsForm = new FormGroup({

    mathLive: new FormControl('', Validators.required),
  })


  /**
   * test prep logic to display and hide question and options and answer
   * 
   * @param body 
   */
  testPrepMessgeHandler(body: any) {
    this.questionList = body.output['context']['public-context']?.Question
    this.optionList = body.output['context']['public-context']?.options
    this.CorrectAnswer = body.output['context']['public-context']?.test_prep_response
    let nextButton = body.output['context']['public-context']?.next_button
    this.isClick = body.output['context']['public-context']?.click
    this.total_testseries_len = body.output['context']['public-context']?.total_testPrep_length
    this.current_testseries_len = body.output['context']['public-context']?.current_testPrep_length
    let resumeButton = body.output['context']['public-context']?.resume


    // if(this.total_testseries_len ==  this.current_testseries_len) {
    //   $('#parentQuestion').addClass('showI')
    // }else{
    //   $('#parentQuestion').removeClass('showI')
    // }

    if (this.total_testseries_len == this.current_testseries_len) {
      // Check if the first part of the split text starts with "You have completed the test"
      const splitText = this.DescAnswer.split(". ");
      if (splitText[0].startsWith("You have completed the test")) {
        $('#parentQuestion').addClass('showI')
      } else {
        $('#parentQuestion').removeClass('showI')
      }


    }else{
      $('#parentQuestion').removeClass('showI')
    }


    if (localStorage.getItem('screen') === "TestSeries") {
      console.warn('------ set time out for descAnswer ----------------')
      setTimeout(() => {
        if (window.innerWidth < 500) {
          console.warn('------ for mobile test series condition run  ----------------')
          $('#optionMessageMobile').removeClass('showI')
          $('#optionMessage').addClass('showI')


        } else {
          console.warn('------ for big screen  test series condition run  ----------------')
          $('#optionMessageMobile').addClass('showI')

          $('#optionMessage').removeClass('showI')
        }
      }, 0)

    }


     // check TestSereis screen is on
    if (localStorage.getItem('screen') === "TestSeries") {
      this.checkOptionColor = body.output['context']['public-context']?.color
      const position = body.output['context']['public-context']?.position
      const correctColor = body.output['context']['public-context']?.correctColor

      console.warn('selected option are == >', position, this.checkOptionColor)
      setTimeout(() => {
        if (this.checkOptionColor !== 'none') {
          this.addColorOnOption(this.checkOptionColor, position)

           // run when wrong answer click only 
          if(correctColor){
            const correctPosition = body.output['context']['public-context']?.correctPosition
            this.addColorOnOption(correctColor, correctPosition)
          }
        }
      }, 1200)
    }

    if (this.questionList != '') {
      this.accod1 = true
      $('#accod1').css('display', 'block')
      $('#accodH1').addClass('active')
      var aa: any = document.getElementById('QQ')
      aa.innerHTML = this.questionList;
      $('#questionDescription').scrollTop(0);
      //   let checkValueText = det.instructions.customData.PPT
      //   if (checkValueText == "NEW") {
      if (this.questionList.length >= 150) {
        //  console.log('auto scroll start ')
        //if (backButton == false) {
        this.isManualScrolling = false
        this.startScrollingForQuestionTestSeries()
        //    }
      }
      //  } else if (checkValueText == "continue") {
      ////
      //   }
    }

    if (this.optionList.length == 0) {
      $('#accod1').css('display', 'none')
      $('#accodH1').removeClass('active')
    }

    if (this.optionList != '') {
      this.testPrepList = true
      setTimeout(() => {
        var items = this.optionList
        items.forEach((item: any, i: any) => {
          let value: any = document.getElementById('colorbtnOption' + i)
          let valueMobile: any = document.getElementById('colorbtnOptionMobile' + i)

          if (window.innerWidth < 500) {
            valueMobile.innerHTML = item;
          } else {
            value.innerHTML = item;
          }
        });
      }, 0)
    } else {
      this.testPrepList = false
    }

    //  var option = det.instructions.customData.options
    if (this.CorrectAnswer != '') {
      setTimeout(() => {
        this.accod1 = false
        // $('#accod2').css('display', 'block')
        // $('#accodH2').addClass('active')
        $('#accod1').css('display', 'none')
        $('#accodH1').removeClass('active')
        var answer: any = document.getElementById('answerD')
        answer.innerHTML = this.CorrectAnswer;

        $('.answerDescription').scrollTop(0);
        //  let checkValueText = det.instructions.customData.PPT
        //  if (checkValueText == "NEW") {
        //    this.isManualScrolling = false
        if (this.CorrectAnswer.length >= 150) {
          //  console.log('auto scroll start ')
          //     if (backButton == false) {
          this.isManualScrolling = false
          this.startScrollingForANswerTestSeries()
          //   console.log('answer next scrol work')
          //     }
        }
        //  } else if (checkValueText == "continue") {

        //  }

      }, 1400)
    }

    if (nextButton === true) {
      this.nextButtonTestseries = nextButton
    } else {
      this.nextButtonTestseries = nextButton
    }

    if (resumeButton == true) {

      this.resumeButtonTestseries = true
    } else if (resumeButton == false) {

      this.resumeButtonTestseries = false
    }

  }





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
    this.isManualScrolling = true
    this.stopAvatarOnClick = !this.stopAvatarOnClick
    this.persona.stopSpeaking()
    this.stopSubtitleAnimation()

  }

  muteDigitalPerson() {
    this.unmuteMicrophone = false
    const videoEl: any = document.getElementById('smVideo');
    videoEl.muted = false;
  }


  customWelcomeMessge() {
    if (this.scene.connectionState._connectionState['name'] == 'Disconnected') {

    } else {

      this.setVariable()
      const personaInstance = this.persona
      let text = 'Welcome to edYOU'
      personaInstance.conversationSend(text, {}, { /* optionalArgs */ });
    }
  }


  clearAvatarContentBox() {
    this.runLoderGPT = true
    if ((localStorage.getItem('screen') === "TestSeries")) {

    } else {
      var m: any = document.getElementById('outputDesc')
      if (m) m.innerHTML = '';

    }

  }


  onEnter() {
    console.log('fffff')
  }

  sendTextToAvatar() {
    this.persona.stopSpeaking()
    const personaInstance = this.persona
    //let text = this.userText

    //var textSet: any = document.getElementById('local-transcript')

    this.clearAvatarContentBox()
    var completeText
    if (this.inputMathsValue !== "") {
      this.mathInputClear = true
      this.mathsValue(this.inputMathsValue2)
      completeText = this.inputMathsValue
      //  var textSet = 'User: ' + completeText
      var textSet = completeText
      this.userInputText = textSet
    } else {
      completeText = this.userText.trim();
      // var  textSet = 'User: ' + completeText
      var textSet = completeText
      this.userInputText = textSet
      console.log('user', this.userInputText)
    }


    this.stopSubtitleAnimation()
    if (completeText.length > 0) {
      const result = personaInstance.conversationSend(completeText, {}, { /* optionalArgs */ });;
    }
    this.inputMathsValue = ""
    this.userText = ""

    this.mathInputClear = false
    let value: any = document.getElementById('user_questionD')
    value.innerHTML = ''
    //this.persona.animateToNamedCameraWithOrbitPan('CloseUp', 1, 0, 0, 180, 0);
    //this.setVideo()
  }


  setVariable() {
    let payload = {
      "email": this.user.email,
      "display_message": "",
      "id":"",
      "Question": "",
      "options": "",
      "test_prep_response": "",
      "click": "",
      "next_button": "",
      "back_button": "",
      "color": "",
      "position": "",
      "current_testPrep_length": "",
      "autoScroll": "",
      "total_testPrep_length": "",
      "resume": false,
      "handlingMessge": "",
      "approaches": [],
      "User_Question": "",
      "math_Question": ""

    }

    console.log(payload)
    this.persona.conversationSetVariables(payload)
  }




  setVideo(videoWidth: any, videoHeight: any) {
    const deviceWidth = Math.round(videoWidth * window.devicePixelRatio);
    const deviceHeight = Math.round(videoHeight * window.devicePixelRatio);
    // const deviceWidth = videoWidth
    // const deviceHeight = videoHeight 

    console.log('height', deviceHeight, 'video bound', 'width', deviceWidth)
    this.scene.sendVideoBounds(deviceWidth, deviceHeight);
  }


  // Add push to talk spacebar key listeners
  addSpacebarEventListeners() {
    // When the user presses down on space bar, tell the digital human to start recording (start listening)
    document.addEventListener('keydown', (e: any) => {
      const isSpaceBar = e.code === 'Space' && !e.repeat;
      const isNotTextInput = e.target.type !== 'text';
      const isNotMathField = !e.target.classList.contains('math-field'); // Adjust the class name if needed
      const detailInput = !e.target.classList.contains('detailInput'); // Adjust the class name if needed

      if (isSpaceBar && isNotTextInput && isNotMathField && detailInput) {
        if (this.disableMicButton == true) {

        } else {
          this.onclickMic()
          this.persona.stopSpeaking()
          this.stopSubtitleAnimation()
        }

      }
    });
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


  toggleOnOff() {
    if ((localStorage.getItem('screen') === "TestSeries") || (localStorage.getItem('screen') === "LearningScreen")) {
      Swal.fire({
        title: 'Alert',
        text: 'Please exit the current module to access Mathematics module',
        timer: 5000,
        showConfirmButton: false
      })
    } else {

      console.log(this.toggleValue, 'k')
      if (this.toggleValue == false) {
        this.MathameticsToggleONOFF(true)

        this.userCCOnOf()
      } else if (this.toggleValue == true) {
        this.MathameticsToggleONOFF(false)

        this.userCCOnOf()
      }
      this.toggleValue = !this.toggleValue
    }


  }

  /**
   * maths button on avatar screen logic 
   * disbaled button on test series and learning module 
   * @param isChecked 
   * @returns 
   */
  MathameticsToggleONOFF(isChecked: any) {
    console.log(this.toggleValue, 'k')

    if ((localStorage.getItem('screen') === "TestSeries") || (localStorage.getItem('screen') === "LearningScreen")) {
      Swal.fire({
        title: 'Alert',
        text: 'Please exit the current module to access Mathematics module',
        timer: 5000,
        showConfirmButton: false
      })

    } else {
      // If the function is already running, don't execute it again
      if (this.mathematicsEnabled) {
        console.log('already running')
        return;
      }
      // Set the flag to indicate that the function is running
      this.mathematicsEnabled = true;
      var session = localStorage.getItem('sessionId')
      let payload = {
        // "email": this.user.email,
        "currentStatus": isChecked,
        "sessionId": session,
      }
      //  this.uneeq.stopSpeaking()
      this.ser.mathsOnOFFAPI(payload).subscribe({
        next: (res: any) => {
          if (res.statusCode == 200) {
            this.mathematicsEnabled = false
            localStorage.setItem("mathtoggle", isChecked);
            if (isChecked == true) {
              this.normalChatBar = false
              this.mathsChatBar = true
              this.persona.conversationSend('Turn on mathematics module', {}, {});;
              $('#mathsIndicator').addClass('showI')
              $('#mathsIndicatorONN').removeClass('showI')
              // setTimeout(()=>{
              //   $('.ML__virtual-keyboard-toggle').css('background-color','white')
              // },3000)

              // this.childMenu.addConditiontoToggle(true)
            } else if (isChecked == false) {
              this.mathsChatBar = false
              this.normalChatBar = true
              this.persona.conversationSend('Turn off mathematics module', {}, {});;
              // this.childMenu.addConditiontoToggle(false)
              $('#MathameticsDisplay').removeClass('showMessage')
              $('#mathsIndicator').removeClass('showI')
              $('#mathsIndicatorONN').addClass('showI')
              $('#mathApproach').removeClass('showMessage')
            }
            // var m: any = document.getElementById('snackbarText')
            // m.innerHTML = res.body
            // Get the snackbar DIV
            // var x: any = document.getElementById("snackbar");
            // x.className = "show";
            //  setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
          } else {
            this.mathematicsEnabled = false
          }
        },
        error: (e) => {
          this.mathematicsEnabled = false
        }
      })
    }



  }


  /**
   * Function for handling accordion question  on off button 
   */
  accordQestionhit() {
    if (this.accod1 === true) {
      // If accod1 is true, collapse the accordion panel
      $('#accod1').css('display', 'none')
      $('#accodH1').removeClass('active')
    } else if (this.accod1 === false) {
      $('#accod1').css('display', 'block')
      $('#accodH1').addClass('active')
    }
    // Toggle the value of accod1
    this.accod1 = !this.accod1
  }

  /**
 * Function for handling accordion response  on off button 
 */
  accordAnswerHit() {
    if (this.accod2 === true) {
      // If accod1 is true, collapse the accordion panel
      $('#accod2').css('display', 'none')
      $('#accodH2').removeClass('active')
    } else if (this.accod2 === false) {
      $('#accod2').css('display', 'block')
      $('#accodH2').addClass('active')
    }
    // Toggle the value of accod1
    this.accod2 = !this.accod2
  }


  recognizerSetup() {
  }


  checkMicPosition() {



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


  }


  /**
   * use azure STT 
   * Mic speak to text function
   * getting text and sending to uneeq function 
   */
  onclickMic() {
    this.checkMicPosition()
    if (this.isMicButtonActive === true) {
      this.stop();
      this.isMicButtonActive = false;
      this.isSubtitleAnimationRunning = false;
    }
    else {
      this.recognizerSetup()
      if (this.voiceText) {
        this.voiceText = ""
        // this.uneeq.stopSpeaking()
        this.persona.stopSpeaking()
        this.stopSubtitleAnimation()
      }

      this.showMic = true
      this.persona.stopSpeaking()
      this.isvoiceAnimationOn = true


      this.isMicButtonActive = true;

      const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
      const speechConfig = sdk.SpeechConfig.fromSubscription(this.subscriptionKey, this.serviceRegion);
      speechConfig.speechRecognitionLanguage = this.language;
      this.recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig)

      //  console.log(this.recognizer)
      this.recognizer.recognizing = (s: any, e: any) => {
         console.log(`RECOGNIZING: Text=${e.result.text}`);
         this.userInputText  = e.result.text
      };


      this.recognizer.recognized = (s: any, e: any) => {
        if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
          //  console.log(`RECOGNIZED: Text=${e.result.text}`);
          console.log('final', e.result.text);
          this.voiceText = e.result.text;
          this.userInputText = this.voiceText
          this.checkButton()
          this.UserQuestion_Display = ""
          //  this.uneeq.sendTranscript(this.voiceText)
          this.clearAvatarContentBox()
          this.persona.conversationSend(this.voiceText, {}, {});
          this.disableMicButton = true
          this.hideOptionOnlyFOrMobile()
          // this.recognizer.close();
          //this.recognizer.AudioConfig.turnOff()
          if (this.voiceText) {
            this.stop()

          }
        } else if (e.result.reason === sdk.ResultReason.NoMatch) {

          const noMatchDetail = sdk.NoMatchDetails.fromResult(e.result);
          console.log("No speech recognized." + " | NoMatchReason: " + sdk.NoMatchReason[noMatchDetail.reason]);
          // this.recognizer.AudioConfig.turnOff()
          // this.recognizer.close();
          this.isMicButtonActive = false;
          this.showMic = false
          this.isvoiceAnimationOn = false
          //  this.recognizer.stopContinuousRecognitionAsync(() => {
          //   this.recognizer.close();
          // })
          // Perform actions when no speech is recognized.
        } else {
          console.log(`ERROR: ${e.errorDetails}`);
        }
      };
      this.recognizer.canceled = (s: any, e: any) => {
        console.log(`CANCELED: Reason=${e.reason}`);
        if (e.reason == sdk.CancellationReason.Error) {
          console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
          console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
        }

        this.recognizer.stopContinuousRecognitionAsync();
      };

      this.recognizer.speechEndDetected = (s: any, e: any) => {
        //   console.log(`(speechEndDetected) SessionId: ${e.sessionId}`);
        this.recognizer.close();
        this.recognizer = undefined;
      };
      this.recognizer.sessionStopped = (s: any, e: any) => {
        //  console.log("\n    Session stopped event.");
        this.recognizer.stopContinuousRecognitionAsync();
        // Perform actions when speech ends, such as stopping the recognition or handling the final result.
      };
      this.recognizer.startContinuousRecognitionAsync();
      // }
    }
  }


  stopOnClick(){
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
    this.isMicButtonActive = false

  }


  stop() {
    this.showMic = false
    this.isvoiceAnimationOn = false
    this.recognizing = false;
    this.isMicButtonActive = false;
    this.recognizer.stopContinuousRecognitionAsync(
      this.stopRecognizer.bind(this),
    )
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
    this.ccOnOff = !this.ccOnOff
    localStorage.setItem('cc', JSON.stringify(this.ccOnOff))
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

    if (window.screen.width < 480) {
      const div1 = this.elementRef.nativeElement.querySelector('#movableCard');
      this.renderer.removeClass(div1, 'showI');
      this.fullScreen = true
      this.onLoadCard('')
    } else {
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
    }


  }

  // uneeq mic start function
  uneeqStartSpeak() {
    this.showMic = true
    this.uneeq.startRecording();
  }

  // uneeq mic stop function
  uneeqStopSpeak() {
    this.showMic = false
    this.uneeq.stopRecording();
  }





  // function for reset idle prompt when user active
  reset() {
    clearTimeout(this.idleTimeout);
    this.idleTimeout = setTimeout(() => {
      this.idleAvatarMessgePrompt()
      //  }, 10000)
    }, 5 * 60 * 1000)
  }


  /**
 * Prompt a message from the idle user.
 * This function is responsible for triggering a message or prompt from the avatar
 * when the user is in an idle state.
 */
  idleAvatarMessgePrompt() {
    var session = localStorage.getItem('sessionId')
    this.hideOptionTempraryFormobile = true
    let data = {
      "sessionId": session,
      "message": "Are you there?",
      // "email": this.user.email
    }
    this.ser.uneeqPromptBox(data).subscribe(res => { })
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
      if (localStorage.getItem('screen') === "TestSeries") {
        setTimeout(() => {
          var m: any = document.getElementById('outputDesc')
          m.innerHTML = '';
        }, 0)
      } else {
        var d: any = document.getElementById('outputDesc')
        d.innerHTML = '';
      }
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
    if (this.DescAnswer === 'Let me think') {
      this.runLoderGPT = true;
      var m: any = document.getElementById('outputDesc')
      m.innerHTML = '';
      this.callOpenAIMathematicsAPI()
      // this.OpenAIMathematicsSoulMAchine()
    } else {
      this.runLoderGPT = false;
    }
  }

  /**
 * Function to add color to an option at a specific position
 * @param {any} color - The color to be added to the option
 * @param {number} position - The position of the option to which the color should be added
 */
  addColorOnOption(color: any, position: number) {
    let buttonId: any
    let buttonId2: any
    if (window.innerWidth < 500) {
      buttonId = `#colorbtnOptionMobile` + position;
      buttonId2 = `#startColorMobile` + position;
    } else {
      buttonId = `#colorbtnOption` + position;
      buttonId2 = `#startColor` + position;
    }
    //  const buttonId = `#colorbtnOption` + position;
    // const buttonId2 = `#startColor` + position;
    const colorbtnOption: any = this.elementRef.nativeElement.querySelector(buttonId);
    const colorbtnOption2: any = this.elementRef.nativeElement.querySelector(buttonId2);

    if (color == 'green') {
      this.renderer.setStyle(colorbtnOption, 'background', 'green');
      this.renderer.setStyle(colorbtnOption, 'color', '#fff');
      this.renderer.setStyle(colorbtnOption, 'border', '2px solid green');
      this.renderer.setStyle(colorbtnOption2, 'background', 'green');
      this.renderer.setStyle(colorbtnOption2, 'color', '#fff');
      this.renderer.setStyle(colorbtnOption2, 'border', '2px solid green');
    } else {
      this.renderer.setStyle(colorbtnOption, 'background', '#d31010');
      this.renderer.setStyle(colorbtnOption, 'color', '#fff');
      this.renderer.setStyle(colorbtnOption, 'border', '2px solid #d31010');
      this.renderer.setStyle(colorbtnOption2, 'background', '#d31010');
      this.renderer.setStyle(colorbtnOption2, 'color', '#fff');
      this.renderer.setStyle(colorbtnOption2, 'border', '2px solid #d31010');
    }



  }

  /**
* Function to add color to an mathematices appraoch  option at a specific position
* @param {number} index - The position of the option to which the color should be added
*/
  addColorToApproach(index: any) {
    const DivId = `#colorApproachOption` + index;
    const colorOption = this.elementRef.nativeElement.querySelector(DivId);
    this.renderer.setStyle(colorOption, 'background', '#2A7CC7');
    this.renderer.setStyle(colorOption, 'color', 'white');
    this.renderer.setStyle(colorOption, 'border', '2px solid #2A7CC7');
  }


  /**
 * Function to handle the live session for avatar
 */
  sessionLiveForAvatar() {
    $('#avatarLoaders').css('display', 'none')
    $('#chat-widget-minimized').css('display', 'none');
    $('#chat-widget-container').css('height', '4px');
    this.isSpinner = false
    //  this.checkConnectionSpeed()
    this.avatarsizechangeonCall()
    // this.setVideo(window.screen.width, window.screen.height)

    // Add key listeners on spacebar for start and stop recording
    this.addPTTKeyListeners();
    localStorage.setItem('sessionId', this.uneeq.sessionId)
    let zoomPayload = {
      "sessionID": this.uneeq.sessionId,
      // "email": this.user.email,
      // token: this.token,
    }
    this.ser.zoomSetting(zoomPayload).subscribe((res: any) => {
    })
  }


  /**
 * Function to display user question text.
 * 
 * @param {any} msg - The message containing the user's question or input.
 * @returns {void} - This function does not return any value.
 */
  userAskQuestionDisplayText(msg: any) {  // user question show by mic 
    if (this.UserccOnOff == true) {
      $('#userText').removeClass('showI')
    }
    const userQues: any = document.getElementById('local-transcript')
    userQues.innerHTML = 'User: ' + msg;
    this.userSpeakValue = msg;
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
          window.location.reload();
        });
        break;

      case 'SessionEnded':
        if (localStorage.hasOwnProperty('sessionId')) {
          handleSwal('Session expired!', 'Oops! It seems like your session has expired, please log in again..', 'OK', () => {
            this.router.navigate(['/']);
          });
        }
        break;

      case 'SessionError':
        handleSwal('Session Error!', 'Oops! A session error has occurred, please retry', 'OK', () => {
          // this.router.navigate(['/']);
        });
        break;

      case 'AvatarUnavailable':
        this.messageForQueueAvatar = true;
        const IP = localStorage.getItem('IPAdress');
        const payloadC = {
          // email: this.user.email,
          name: this.user.name,
          ip_address: IP,
          status: 'Unavailable',
        };
        this.ser.avatarCounter(payloadC).subscribe(() => { });
        this.isSpinner = false;
        this.renderer.setStyle(document.getElementById('avatarLoaders'), 'display', 'none');
        break;

      case 'AvatarAvailable':

        if (this.tourGuideValueCheck == true) {
          if (this.user.Firstlogin == false) {
            setTimeout(() => {
              this.startTours()
            }, 6000)

          }
        }

        if (this.fullScreen === true) {
          // card minimize
          setTimeout(() => {
            $('#minimizeAvatar').addClass('showI');
            $('#maximizeAvatar').removeClass('showI');
          }, 1000)
        }

        this.messageForQueueAvatar = false
        var IPP = localStorage.getItem('IPAdress')
        let payloadAvaible = {
          // "email": this.user.email,
          "name": this.user.name,
          "ip_address": IPP,
          "status": 'Available'
        }

        this.ser.avatarCounter(payloadAvaible).subscribe(res => { })

        break;

      case 'Instructions':
        const message = 'Hi test test, welcome to the world of e-dee-YOU. I am ' + this.avatarName + '. How can I help you?';
        const sentences = message.split('.');
        setTimeout(() => {
          localStorage.setItem('Avatar', value);
        }, 2000);
        break;

      case 'DeviceError':
        console.log('----device error---')
        this.storedErrorCode.emit('DeviceError');
        break;
    }

  }


  startScrolling() {  /// start auto scrolling animation for learning modules
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


  startScrollingForQuestionTestSeries() {  /// start auto scrolling animation for test series Question 
    const lineHeight = 150;
    const scrollSpeed = 23000; // Total time for the scrolling animation (in milliseconds)
    const delayBetweenMovements = 0; // Time to wait between each 20% movement (in milliseconds)
    const totalMovements = 30; // Number of times to move down by 20%
    let animationInProgress = false;
    var scroll = $('#questionDescription');

    let isEventHandled = false;
    scroll.on('click mouseenter touchstart touchend', () => {
      if (!isEventHandled) {
        //  console.log('detect scroll inside function running')
        // this.isManualScrolling = true
        this.stopAutoscrollFun()

        // Set the flag to true to indicate that the event has been handled
        isEventHandled = true;
        console.log('++++++++++++++++++ scroll manual detect ++++++++++++++++++++++++++')
      }
    });


    const scrollToPositionQues = (position: any) => {
      if (isEventHandled == true) {
        console.log('Manual scrolling detected. Stopping the automatic scrolling.');
        return
      }

      if (!scroll.length) {
        //   console.log('Scroll element with id "outputDesc" not found. Cannot start auto-scrolling.');
        return; // Exit the function if the scroll element is not found
      }
      // if (this.isManualScrolling) {
      //   console.log('Manual scrolling detected. Stopping the automatic scrolling.');
      //   // If manual scrolling is detected, stop the automatic scrolling
      //   return;
      // }

      const newScrollTop = position * lineHeight;
      animationInProgress = true;
      scroll.animate({ scrollTop: newScrollTop }, scrollSpeed, function () {
        // Wait for the specified delay before triggering the next movement
        if (position < totalMovements && scroll.scrollTop() + scroll.innerHeight() < scroll[0].scrollHeight) {
          scrollToPositionQues(position + 1); // Move down by another 20%
          //   console.warn('========>', position + 1)
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
    setTimeout(function () {
      const t = 1
      scrollToPositionQues(t); // Start scrolling from the second position (20%)
      // console.log('run for Questions')
    }, 5000);

  }

  startScrollingForANswerTestSeries() {  /// start auto scrolling animation for test series response 

    const lineHeight = 150;
    const scrollSpeed = 23000; // Total time for the scrolling animation (in milliseconds)
    const delayBetweenMovements = 0; // Time to wait between each 20% movement (in milliseconds)
    const totalMovements = 30; // Number of times to move down by 20%
    let animationInProgress = false;

    var scroll = $('#answerDescription');

    let isEventHandled = false;
    scroll.on('click mouseenter touchstart touchend', () => {
      if (!isEventHandled) {
        //  console.log('detect scroll inside function running')
        // this.isManualScrolling = true
        this.stopAutoscrollFun()

        // Set the flag to true to indicate that the event has been handled
        isEventHandled = true;
        console.log('++++++++++++++++++ scroll manual detect ++++++++++++++++++++++++++')

      }
    });

    const scrollToPositionQues = (position: any) => {
      if (isEventHandled == true) {
        console.log('Manual scrolling detected. Stopping the automatic scrolling.');
        return
      }

      if (!scroll.length) {
        //  console.log('Scroll element with id "outputDesc" not found. Cannot start auto-scrolling.');
        return; // Exit the function if the scroll element is not found
      }

      if (this.isManualScrolling) {
        // console.log('Manual scrolling detected. Stopping the automatic scrolling.');
        // If manual scrolling is detected, stop the automatic scrolling
        return;
      }

      const newScrollTop = position * lineHeight;
      animationInProgress = true;
      scroll.animate({ scrollTop: newScrollTop }, scrollSpeed, function () {
        // Wait for the specified delay before triggering the next movement

        if (position < totalMovements && scroll.scrollTop() + scroll.innerHeight() < scroll[0].scrollHeight) {
          scrollToPositionQues(position + 1); // Move down by another 20%
          //   console.warn('========>', position + 1)
        } else {
          // Scrolling reached the bottom or the total number of movements, stop the animation
          //     console.warn('========> Scrolling animation stopped');
          scroll.stop()
          // scroll.off('scroll'); // Remove the scroll event listener when the animation stops
          animationInProgress = false;
        }
        // }, delayBetweenMovements);
      });
    }
    setTimeout(function () {
      const t = 1
      scrollToPositionQues(t); // Start scrolling from the second position (20%)
      // console.log('run for Questions')
    }, 5000);

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
  }


  // Function to stop the subtitle animation
  stopSubtitleAnimation() {
    this.isSubtitleAnimationRunning = false;
    this.stopAutoscrollFun()
  }


  stopAutoscrollFun() {
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
  }

  /**
 * Function to handle navigation based on verbal commands
 * @param {any} msg - The verbal command message
 */
  verbalCommandNavigation(msg: any) {

    switch (msg) {
      case 'Closing the quiz.':
        setTimeout(() => {
          //  this.router.navigate(['/user/testseries']);
          this._location.back();
          this.oncrossTest();

        }, 2000);
        break;

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

      case 'Opening the dashboard.':
        this.router.navigate(['/user/dashboard']);
        this.oncrossTest();
        break;

      case 'Opening the home page.':
        this.router.navigate(['/user/dashboard']);
        this.oncrossTest();
        break;

      case 'Ok, going to the profile page.':
        this.profile();
        this.oncrossTest();
        break;

      case 'Sure, opening the test series.':
        this.router.navigate(['/user/testseries']);
        this.oncrossTest();
        break;
      case 'Sure, opening the Test Prep.':

        this.router.navigate(['/user/testseries']);
        this.oncrossTest();
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

      case 'Showing the question.':
        // this.QuestionccOnOff = false;
        // this.QuestionCCOnOf();
        break;

      case 'Hiding the question.':
        // if (localStorage.getItem('screen') !== 'LearningScreen' ) {
        // this.QuestionccOnOff = true;
        // this.QuestionCCOnOf();
        // }
        break;

      case 'Opening the learning module':

        this.router.navigate(['/user/course']);
        this.oncrossTest();

        break;

      case 'Moving to the next slide':
        setTimeout(() => {
          this.childPdf.nextPage();
          var scroll = $('#outputDesc');
          scroll.stop();

          $('.avatarspeak-s').scrollTop(0);
        }, 2200)

        break;

      case 'Moving to the previous slide':
        setTimeout(() => {
          this.childPdf.prevPage()
          var scroll = $('#outputDesc');
          scroll.stop();

          $('.avatarspeak-s').scrollTop(0);
        }, 2200)

        break;

      case 'Sure, repeating the slide':
        setTimeout(() => {
          this.childPdf.refreshCurrentSlide()
          console.log('rrrrrkrkrkrkrkrk')
        }, 2600)

        break;

      case 'Closing the module':
        setTimeout(() => {
          this.exitpresentationFun()
        }, 1200)
        break;

      case 'Sure, turning on the mathematics module.':
        // this.onLoadCard("id")
        // this.runMathToggleFromParent()

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
    document.addEventListener('keydown', (e: any) => {
      if (e.code === 'Space' && !e.repeat && e.target.type !== 'text') {
        this.uneeq.stopSpeaking()
        this.onclickMic()
        this.stopSubtitleAnimation()
      }
    });
  }




  //Function to handle resizing operations
  resizeFun() {
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
        avatarCanvas.style.height = '220px'
        $('#message').css('width', '350px')
      }
    }


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
    this.isgraphLoaded = true
    $('#graphButton').removeClass('showMessage')
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
    if (window.screen.width < 480) {
      setTimeout(() => {
        this.hideOptionTempraryFormobile = true
      }, 1000)
    }
  }

  hideOptionOnlyFOrMobile() { // hide option for mobile screen
    if (window.screen.width < 480) {
      this.hideOptionTempraryFormobile = false
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
    const windowWidth = window.innerWidth;
    if (windowWidth < 480) {
      this.isMobileNormalTrue = true
      this.bottomPositionWidth = '81.5%'
      this.inputWidthSize = '160px';
      this.bottomPosition = 0
      // this.borderRadius = '0px 0px 20px 20px'
      this.borderRadius = '0px 0px 3px 3px'
      $('#settingId').addClass('showI');
      // this.inputmarginLeft = '35px'
      this.inputheightSize = '50px'
      this.bottomPositionheight = '60px'
      // this.stopBottomSize = '70%'
      this.inputMarginLeft = '-2px'
      // this.stopLeftSize = '8%'
      this.stopBottomSize = '75%'
      this.stopLeftSize = '10%'
      this.micWidth = '50'
      this.micWidthOnly = '50'
      this.micMarginleft = '0'
      this.micHeight = '50'
      this.micMarginLeft2 = '2px'
    } else {
      this.isMobileNormalTrue = false
      // this.bottomPosition = 67
      this.bottomPosition = 12
      //  this.borderRadius = '0px 0px 20px 20px'
      this.borderRadius = '0px 0px 9px 9px'
      // this.bottomPositionWidth = '90%'
      this.bottomPositionWidth = '77.5%'
      // this.inputWidthSize = '201px';
      this.inputWidthSize = '212px';
      $('#settingId').addClass('showI');
      this.inputheightSize = '50px'
      this.inputMarginLeft = '3px'
      this.bottomPositionheight = '60px'
      this.stopBottomSize = '75%'
      this.stopLeftSize = '10%'
      // this.micWidth = '50'
      this.micWidth = '120'
      // this.micWidthOnly = '50'
      this.micWidthOnly = '120'
      this.micMarginleft = '0'
      this.micHeight = '50'
      this.micMarginLeft2 = '0px'
    }




  }

  maximizeBoxCardUI() {
    if (window.screen.width < 480) {

      this.bottomPosition = 0
      this.borderRadius = '0px 0px 0px 0px'
      this.bottomPositionWidth = '100%'
      this.inputWidthSize = '100%'
      this.inputmarginLeft = '0px'
      this.inputheightSize = '55px'
      this.inputMarginLeft = '-2px'
      this.bottomPositionheight = '68px'
      this.stopBottomSize = '20%'
      this.stopLeftSize = '5%'
      this.micWidth = '60'
      this.micWidthOnly = '57'
      this.micMarginleft = '2'
      this.micHeight = '55'
      this.micMarginLeft2 = '0px'
    } else if ((innerHeight == 1180 || innerHeight == 1194 || innerHeight == 1112 || innerHeight == 1024 || innerHeight == 1106 || innerHeight == 1138 || innerHeight == 1120 || innerHeight == 1010 || innerHeight == 1061) && (innerWidth == 820 || innerWidth == 834 || innerWidth == 768 || innerWidth == 712 || innerWidth == 810)) { //ipad air , 10 , 9 , ipad pro 11
      this.stopBottomSize = '20%'
      this.stopLeftSize = '20%'
      this.bottomPosition = 0
      this.borderRadius = '0px 0px 0px 0px'
      this.bottomPositionWidth = '100%'
      this.inputWidthSize = '100%'

      this.inputmarginLeft = '0px'
      this.inputheightSize = '55px'
      this.bottomPositionheight = '68px'

      this.micWidth = '60'
      this.micWidthOnly = '57'
      this.micMarginleft = '2'
      this.micHeight = '55'
      this.micMarginLeft2 = '0px'
      //  } else if (innerHeight == 1024 && innerWidth == 1366) { // landscape ipad pro
    } else if ((innerHeight == 1366 || innerHeight == 1368 || innerHeight == 1000 || innerHeight == 1100 || innerHeight == 1292) && (innerWidth == 1366 || innerWidth == 912 || innerWidth == 1024 || innerWidth == 1500 || innerWidth == 1700)) { // ipad pro 12
      this.stopBottomSize = '20%'
      this.stopLeftSize = '20%'
      this.bottomPosition = 0
      this.borderRadius = '0px 0px 0px 0px'
      this.bottomPositionWidth = '100%'
      this.inputWidthSize = '100%'

      this.inputmarginLeft = '0px'
      this.inputheightSize = '55px'
      this.bottomPositionheight = '68px'

      this.micWidth = '60'
      this.micWidthOnly = '57'
      this.micMarginleft = '2'
      this.micHeight = '55'
    } else if (innerHeight == 1152 && innerWidth == 2048) {
      this.stopBottomSize = '30%'
      this.stopLeftSize = '65%'
      this.bottomPosition = 0
      this.borderRadius = '0px 0px 0px 0px'
      this.bottomPositionWidth = '100%'
      this.inputWidthSize = '100%'

      this.inputmarginLeft = '0px'
      this.inputheightSize = '55px'
      this.bottomPositionheight = '68px'

      this.micWidth = '60'
      this.micWidthOnly = '57'
      this.micMarginleft = '2'
      this.micHeight = '55'

    } else {
      this.bottomPosition = 0
      this.borderRadius = '0px 0px 0px 0px'
      this.bottomPositionWidth = '100%'
      this.inputWidthSize = '100%'
      this.inputmarginLeft = '0px'
      this.inputheightSize = '55px'

      this.bottomPositionheight = '68px'
      this.stopBottomSize = '35%'
      this.stopLeftSize = '31%'
      this.micWidth = '60'
      this.micWidthOnly = '57'
      this.micMarginleft = '2'
      this.micHeight = '55'
      this.micMarginLeft2 = '0px'
    }


  }

  hideAvatarForMobile() {
    const div1 = this.elementRef.nativeElement.querySelector('#movableCard');
    this.renderer.addClass(div1, 'showI');
  }

  // card expand button function  
  onLoadCard(id: any) {

    setTimeout(() => {
      if (this.fullScreen === true) {
        // condition for making small screen avatar card
        this.checkFullScreenB = true
        this.expandOn = true


        if (window.screen.width < 480) {
          this.hideAvatarForMobile()
        }

        if (this.toggleValue == true) {
          this.normalChatBar = true
          this.mathsChatBar = false
        }

        // $('#bottomShadowBox').addClass('bottomboxSizewithSmallBox');
        // $('#bottomShadowBox').removeClass('bottomboxSize');
        console.log('small')
        this.minimizeBoxCardUI()

        // $('#stopavatarId').addClass('showI');
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
        this.expandOn = false
        // card minimize
        this.maximizeBoxCardUI()



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
          $('#message').addClass('showMessage')
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


    // this.fullScreen = !this.fullScreen
    // console.log('normal condition', this.fullScreen)
  }



  /**
 * Function to change the size of the avatar
 */
  changeAvatarSize() {
    if (this.fullScreen === false) {
      // condition for making big screen avatar card
      console.warn('viewport width', window.innerWidth
        , 'viewport height', window.innerHeight)
      var t: any = document.querySelector('#sm-video')
      var videoTag: any = document.querySelector('#smVideo')
      // console.log('canvas',t)
      if (t) {
        t.style.width = '100%'
        if (window.innerWidth < 480) {
          //  this.setVideo(600, 650)
          this.setVideo(800, 900)
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
          console.log(' 600 and less then 1024')
          $(t).css('margin-left', '0px')
          $(t).css('margin-left', '0px')
          console.log('its a 768 and 1024')
          this.setVideo(750, 500)

        } else if (innerWidth >= 1025 && innerWidth < 2290) {
          t.style.width = '80%'
          console.log("full screen avatar for laptop below 2244")


          // for landscape

          // if ((innerHeight == 950 || innerHeight == 905 || innerHeight == 1024  || innerHeight == 956) && (innerWidth == 1366) || (window.screen.height == 1024 && window.screen.width == 1366) ) { //  landsvape ipad 12 
          if ((innerHeight >= 900 && innerHeight <= 1024) && (innerWidth == 1366)) { //  landsvape ipad 12
            t.style.width = '90%'
            console.log('landscape ipad 12')
            $(t).css('margin-left', '0px')

            this.setVideo(700, 250)
            //} else if ((innerHeight == 746 || innerHeight == 820 || innerHeight == 701) && (innerWidth == 1180)) {  // landsvape ipad  10 
          } else if ((innerHeight >= 700 && innerHeight <= 820) && (innerWidth == 1180)) {  // landsvape ipad  10 
            t.style.width = '90%'
            console.log('landscape ipad 10')
            $(t).css('margin-left', '0px')
            console.log('landscape one with ipad')
            this.setVideo(700, 300)

            // } else if ((innerHeight == 810 || innerHeight == 740 || innerHeight == 695) && (innerWidth == 1080)) {  // landsvape ipad 9 
          } else if ((innerHeight >= 680 && innerHeight <= 810) && (innerWidth == 1080)) {  // landsvape ipad 9 
            t.style.width = '90%'
            $(t).css('margin-left', '0px')
            console.log('landscape one with ipad 9')
            this.setVideo(650, 250)

            // } else if (innerHeight == 760 && innerWidth == 1194) { 
            // } else if ((innerHeight == 760 || innerHeight == 715) && (innerWidth == 1194)) {  // landscape ipad 11
          } else if ((innerHeight >= 700 && innerHeight <= 834) && (innerWidth == 1194)) {  // landscape ipad 11
            t.style.width = '90%'
            console.log('landscape ipad 11')
            $(t).css('margin-left', '0px')
            this.setVideo(700, 250)

          } else {
            $(t).css('margin-left', '0px')
            const width = window.screen.width
            const height = window.screen.height - 200
            this.setVideo(width, height)
            // this.setVideo(900, 390)
            console.warn('big screen')
          }



          // } else if (window.screen.height == 1080 && window.screen.width == 810) {
          //   t.style.width = '80%'
          //   $(t).css('margin-left', '0px')
          //   this.setVideo(550, 250)
          // }
          // else if (window.screen.height == 1366 && window.screen.width == 1024) {
          //   console.log('ipad pro portrait')
          //   t.style.width = '80%'
          //   $(t).css('margin-left', '0px')
          //   this.setVideo(850, 550)
          // }

          // else if (window.screen.height == 1180 && window.screen.width == 820) {
          //   t.style.width = '80%'
          //   $(t).css('margin-left', '0px')
          //   this.setVideo(750, 500)
          //   $(t).css('margin-left', '0px')
          // } else if (window.screen.height == 820 && window.screen.width == 1180) { // landscape
          //   $(t).css('margin-left', '0px')
          //   this.setVideo(500, 300)
          //   $(t).css('margin-left', '0px')
          // } else if (window.screen.height == 1024 && window.screen.width == 768) {
          //   this.setVideo(750, 500)
          //   $(t).css('margin-left', '0px')

          // }

        }
        else if (innerWidth >= 2300) {
          t.style.width = '90%'
          console.log("full screen avatar for laptop for 2300")
          $(t).css('margin-left', '0px')
          const width = window.screen.width
          const height = window.screen.height - 200
          this.setVideo(width, height)
          console.warn('big screen')

        }
        // else {



        //   if (window.innerWidth < 480) {
        //     this.setVideo(600, 650)
        //     console.log('else condi at 480')
        //     // t.style.height = '440px'
        //     t.style.width = '80%'
        //     $('#message').css('width', '')
        //     $(t).css('margin-left', '0px')
        //     $(videoTag).css('margin-left', '0px')
        //     videoTag.style.width = '100%'
        //     videoTag.style.height = '100%'
        //     // $(t).css('margin-left', '-60px')
        //     $('#sidebar').addClass(' sidebar_small')


        //   } else {
        //     console.log('ele consition where set on screen grater then 480')
        //       t.style.width = '80%'
        //       // t.style.height = '100%'
        //       $(t).css('margin-left', '0px')
        //       $(videoTag).css('margin-left', '0px')
        //       videoTag.style.width = '100%'
        //       videoTag.style.height = '100%'
        //       this.setVideo(window.screen.width, window.screen.height)
        //     }


        // }
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
      this.setVideo(500, 300)
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


      // if (window.innerWidth < 480) {
      //   if (t !== null) {
      //     t.style.width = '80%'

      //     $(t).css('margin-left', '-60px')
      //     $(videoTag).css('margin-left', '0px')
      //     videoTag.style.width = '100%'
      //     videoTag.style.height = '100%'
      //   }

      // } else {
      //   if (t !== null) {
      //     t.style.width = '80%'

      //     $(t).css('margin-left', '0px')
      //     $(videoTag).css('margin-left', '0px')
      //     videoTag.style.width = '100%'
      //     videoTag.style.height = '100%'
      //   }
      // }

      //console.log('canvas', 'else consition')

    }

    // 600 , 650 for mobile
    //  600 , 450  for ipad pro , ipad 

    //330 , 180 for small card view
  }




  smallcardSetPosition() {
    console.log('run when in small card view')
    var t: any = document.querySelector('#sm-video')
    var videoTag: any = document.querySelector('#smVideo')
    // this.setVideo(330, 180)
    this.setVideo(500, 300)
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




  avatarsizechangeonCall() {
    // setTimeout(() => {
    var t: any = document.querySelector('#sm-video video')
    // console.log('canvas',t)
    if (t !== null) {
      t.style.width = '100%';

      if (window.screen.height == 1180 && window.screen.width == 820) {
        if (this.user.Firstlogin == true) {
          t.style.height = '100%'
        } else if (this.user.Firstlogin == false) {
          t.style.height = '680px'
        }

        // $(t).css('margin-left', '20px')
      } else if (window.screen.height == 1194 && window.screen.width == 834) {
        if (this.user.Firstlogin == true) {
          t.style.height = '100%'
        } else if (this.user.Firstlogin == false) {
          t.style.height = '680px'
        }

      } else if (window.screen.height == 1133 && window.screen.width == 774) {
        if (this.user.Firstlogin == true) {
          t.style.height = '100%'
        } else if (this.user.Firstlogin == false) {
          t.style.height = '590px'
        }

      } else if (window.screen.height == 1024 && window.screen.width == 768) {
        if (this.user.Firstlogin == true) {
          t.style.height = '100%'
        } else if (this.user.Firstlogin == false) {
          t.style.height = '590px'
        }

        // $(t).css('margin-left', '20px')
      } else if (window.screen.height == 1366 && window.screen.width == 1024) {
        if (this.user.Firstlogin == true) {
          t.style.height = '100%'
        } else if (this.user.Firstlogin == false) {
          t.style.height = '760px'
        }

        // $(t).css('margin-left', '20px')
      } else if (window.screen.height == 1138 && window.screen.width == 712) {
        if (this.user.Firstlogin == true) {
          t.style.height = '100%'
        } else if (this.user.Firstlogin == false) {
          t.style.height = '600px'
        }

        // $(t).css('margin-left', '20px')
      } else if (window.screen.height == 720 && window.screen.width == 540) {
        if (this.user.Firstlogin == true) {
          t.style.height = '100%'
        } else if (this.user.Firstlogin == false) {
          t.style.height = '520px'
        }

        // $(t).css('margin-left', '20px')
      } else if (window.screen.height == 1368 && window.screen.width == 912) {
        if (this.user.Firstlogin == true) {
          t.style.height = '100%'
        } else if (this.user.Firstlogin == false) {
          t.style.height = '650px'
        }

        // $(t).css('margin-left', '20px')
      } else if (window.screen.height == 1280 && window.screen.width == 800) {
        if (this.user.Firstlogin == true) {
          t.style.height = '100%'
        } else if (this.user.Firstlogin == false) {
          t.style.height = '640px'
        }

        // $(t).css('margin-left', '20px')
      } else if (window.screen.height == 1440 && window.screen.width == 2560) {
        if (this.user.Firstlogin == true) {
          t.style.height = '100%'
        } else if (this.user.Firstlogin == false) {
          t.style.height = '900px'
        }

        // console.log('dfdfdfdfdfdfdfddf')
      }
      else if (window.screen.height == 960 && window.screen.width == 600) {
        if (this.user.Firstlogin == true) {
          t.style.height = '100%'
        } else if (this.user.Firstlogin == false) {
          t.style.height = '520px'
        }

        // $(t).css('margin-left', '20px')
      } else if (window.screen.height < 575) {
        // console.log('its landscape mode normal one')
        if (this.fullScreen === false) {
          // console.log('its landscape ==>  its on full screen')
          t.style.height = '270px'
        }
      }
      else if (window.screen.width < 480) {
        if (this.user.Firstlogin == true) {
          t.style.height = '100%'
          t.style.width = '100%'
          $('#sidebar').addClass(' sidebar_small')
        } else if (this.user.Firstlogin == false) {
          t.style.height = '440px'
          t.style.width = '100%'
          $('#sidebar').addClass(' sidebar_small')
        }


      }
    } else {
      // var t: any = document.querySelector('#sm-video canvas')
      // // console.log('canvas',t)
      if (t !== null) {
        t.style.width = '100%'
        t.style.height = '100%'
      }
    }

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
  }


  checkButton() {
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
  }

  //openAI API function call
  callOpenAIMathematicsAPI() {
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
    this.ser.OpenAIMathematics(payloadData).subscribe({
      next: (v) => {

        this.runLoderGPT = false
        this.disableMicButton = false
      },
      error: (e) => {
        console.error(e)
        this.runLoderGPT = false
        this.disableMicButton = false
      }
    })

  }


 


  // exit test series page button function
  exitTestSeries() {
    //  this.uneeq.sendTranscript('stop')
    var testprepId = localStorage.getItem('testprepId')
    let payload = {
      "id": testprepId,
      // "email": this.user.email,
      // "SessionID": this.sessionId,
      // "token": this.token,
      // "lastlogin": this.user.lastlogin,
      "trigger": "stop"
    }
    // Calling the startTestSeries API with the payload
    this.persona.stopSpeaking()
    // this.ser.startTestSeries(payload).subscribe((res: any) => {
    //   // this.router.navigate(['/user/testseries']);
    //   this._location.back();
    //   this.oncrossTest()
    // })
    //  this.persona.conversationSend('stop', { }, { })


    setTimeout(() => {
      if (this.user.industryName == "School") {
        this.notSchool = "school"
      }
    }, 3000)

    setTimeout(() => {

      $('#hambergerBar').addClass('showI');
    }, 3000)




  }


  /**
  * Function to handle the exit of a presentation
  * This function is called when the user wants to exit the presentation.
  */
  exitpresentationFun() {
    var learningid = localStorage.getItem('learningId')
    let exitpayload = {
      "learning_status": false,
      "time": this.user.lastlogin,
      // "email": this.user.email,
      "id": learningid,

    }
    localStorage.removeItem("learningId");
    this.persona.stopSpeaking()
    // this.uneeq.stopSpeaking();
    this.childPdf.clearPdfViewer()
    this.ser.IndexLearningNo = 1
    this.ser.stopPresentation(exitpayload).subscribe((res: any): any => {
      if (res.statusCode == 200) {
        if (this.user.industryName == "School") {
          this.notSchool = "school"
        } setTimeout(() => {
          $('#hambergerBar').addClass('showI');
        }, 1000)

        this.oncrossTest()
        this._location.back();
        // this.router.navigate(['user/learning'])
      } else {
        this.oncrossTest()
        this._location.back();
        // this.router.navigate(['user/learning'])
      }
    })



    this.persona.conversationSend('stop', {}, {})
  }


  /**
   * Check if the maths indicator is active
   * This function is responsible for determining whether the maths indicator is currently active.
   */
  checkMathsIndicatorActive() {
    if (localStorage.hasOwnProperty("mathtoggle")) {
      let toggle = JSON.parse(localStorage.getItem('mathtoggle') || 'undefined')
      if (toggle == true) {
        // this.mathsChatBar = true
        // this.normalChatBar = false

        if (this.toggleValue == true) {
          this.normalChatBar = true
          this.mathsChatBar = false
        }
        this.mathButtonDisabled = false
        this.toggleValue = true
        this.userCCOnOf()
        // $('#mathApproach').addClass('showMessage')
        $('#mathsIndicator').addClass('showI')
        $('#mathsIndicatorONN').removeClass('showI')
        $('#mathsIndicator').css('cursor', 'pointer')
        $('#mathsIndicator').addClass('mathsOffClass')
      } else {
        this.mathsChatBar = false
        this.normalChatBar = true

        this.mathButtonDisabled = true
        this.toggleValue = false

        this.userCCOnOf()
        $('#mathApproach').removeClass('showMessage')
        $('#mathsIndicator').removeClass('showI')
        $('#mathsIndicatorONN').addClass('showI')
        $('#mathsIndicator').css('cursor', 'pointer')
        $('#mathsIndicator').addClass('mathsOffClass')
      }
    } else {
      $('#mathsIndicator').removeClass('showI')
      $('#mathsIndicatorONN').addClass('showI')
      $('#mathsIndicator').css('cursor', 'pointer')
      $('#mathsIndicator').addClass('mathsOffClass')
    }

  }



  /**
 * Function called when the test or learning is crossed or closed
 * This function is triggered when the user crosses or closes the test.
 * @returns {void} - This function doesn't return anything.
 */
  oncrossTest() {
    this.pdfShow = ""
    console.log('true')
// this.optionList = []
// this.CorrectAnswer = ""
// this.questionList = ""

    this.expandOn = true
    this.mobileAvatarOnOff = false
    this.refreshBtnPPT = false

    if (window.screen.width < 480) {
      this.mobileAvatarOnOff = true
      this.hideAvatarForMobile()
    }

    var videoTag: any = document.querySelector('#smVideo')
    $(videoTag).css('margin-left', '0px')
    videoTag.style.width = '100%'
    videoTag.style.width = '100%'

    this.hideOptionTempraryFormobile = true
    localStorage.removeItem('screen')
    localStorage.setItem('AvatResCC', 'true')
    this.ser.updatePDFLinkData("");
    //  $('#hambergerBar').addClass('showI');
    $('#sidebarAvatar').css('display', 'none');
    $('#hambergerBar').addClass('showI');
    $('#pptPageLoad').addClass('hideMessage')

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



    if (window.screen.width < 480) {
      this.bottomPositionWidth = '81.5%'
      this.inputWidthSize = '160px';
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
      this.inputWidthSize = '204px';
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



  }


  // default message 
  defaultExitMessage() {
    const avatarCanvas: any = document.querySelector('#sm-video canvas')
    if (avatarCanvas !== null) {
      avatarCanvas.style.width = '100%'
      avatarCanvas.style.height = '100%'
      $(avatarCanvas).css('margin-left', '')
    }
    var aa: any = document.getElementById('outputDesc')
    if (aa) aa.innerHTML = 'welcome to the world of edYOU. I am ' + this.avatarName + '. How can I help you?';

  }


  /**
 * Display instructions for the Normal screen
 * This function is responsible for showing instructions related to the normal screen.
 * @returns {void} - This function doesn't return anything.
 */
  InstructionNormal() {
    var session = localStorage.getItem('sessionId')
    let data = {
      "sessionId": session,
      // "email": this.user.email,
      "message": `Following are a few instructions to interact with me.
      <ol type="1">
      <li>Click the microphone button or press the spacebar once to speak.</li>
      <li>You can also text me by clicking the button on the bottom right.</li>
      <li>Click the pause button on bottom left to interrupt me while I am speaking.</li>
      <li>For closed captions, click on the CC button on bottom left.</li>
      <li>To minimise or maximise, click on the top right square corner button.</li>
      <li>You can ask me about edYOU and questions related to the medical field. I can also quiz you on a medical topic.</li>
      <li>Click on the menu icon to enable the mathematics module for a better learning experience.</li>
      <li>Navigate to the menu and modify the speech speed of the AI by adjusting the speed settings.</li>
      </ol>`
    }
    this.ser.uneeqPromptBox(data).subscribe(res => {

    })
  }


  /**
   * Display instructions for the test series
   * This function is responsible for showing instructions related to the test series.
   * @returns {void} - This function doesn't return anything.
   */
  InstructionTestSeries() {
    var session = localStorage.getItem('sessionId')
    let data = {
      "sessionId": session,
      // "email": this.user.email,
      "message": ` 
      Following are a few instructions to interact with me.
      <ol type="1">
      <li>Click the microphone button or press the spacebar once to speak.</li>
      <li>You can also text me by clicking the button on the bottom right.</li>
      <li>Click the pause button on bottom left to interrupt me while I am speaking.</li>
      <li>For closed captions, click on the CC button on bottom left.</li>
      <li>To answer a question you can simply click, say or text an option.</li>
      
      <li>Say or text “Yes” or “Sure” after the answer is given to move to the next question.</li>
      <li>Say or text “Repeat” to repeat the question.</li>
      <li>Say or text “Stop” or click on the cross button to exit the test.</li>

      <li>Navigate to the menu and modify the speech speed of the AI by adjusting the speed settings.</li>
      </ol> `
    }
    this.ser.uneeqPromptBox(data).subscribe(res => {

    })


  }

  /**
 * Display instructions for the learning
 * This function is responsible for showing instructions related to the learning module.
 * @returns {void} - This function doesn't return anything.
 */
  InstructionLearning() {
    var session = localStorage.getItem('sessionId')
    let data = {
      "sessionId": session,
      // "email": this.user.email,
      "message": ` 
      Following are a few instructions to interact with me.
      <ol type="1">
      <li>Click the microphone button or press the spacebar once to speak.</li>
      <li>You can also text me by clicking the button on the bottom right.</li>
      <li>To move to the next slide, please click on the Next button or say/type - Next.</li>
      <li>To move to the previous slide, please click on the Previous button or say/type - Previous.</li>
      <li>If you wish to repeat the current slide, please click on the Repeat button or say/type - Repeat</li>
      <li>To close the presentation, please click on the Close button or say/type - Close.</li>
      <li>Click the pause button on bottom left to interrupt me while I am speaking.</li>
      <li>For closed captions, click on the CC button on bottom left.</li>
   
      <li>Navigate to the menu and modify the speech speed of the AI by adjusting the speed settings.</li>
 
      </ol> `
    }
    this.ser.uneeqPromptBox(data).subscribe(res => {

    })


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


  // @ViewChild('popupSetting')popup!: ElementRef;

  // @HostListener('document:click',['$event'])
  // clickout(event:any){
  //   if(this.popup.nativeElement.contains(event.target)){
  //     console.log('inside')
  //   }else{
  //   //  this.isMenuOpen = false
  //    // this.isDropDownSetting = true
  //     this.dropSetting()
  //     console.log('outside')
  //     // this.onCloseHandled()
  //   }
  // }


  refreshSlidePPT() {
    this.childPdf.refreshCurrentSlide()
  }


  clickFunction(value: any) {


    if (this.ccBox == true) {
      $('#panel1').css('display', 'block')
      // $('#panel2').css('display','none')
      // $('#panel3').css('display','none')
    } else {
      $('#panel1').css('display', 'none')
    }


    this.ccBox = !this.ccBox
    this.isDropDownSetting = false;
  }




  @ViewChild('popup') popup!: ElementRef;
  @ViewChild('popup2') popup2!: ElementRef;


  @HostListener('document:click', ['$event'])

  clickout(event: any) {
    // $('.box-1').css('margin-top', '0px');

    const isClickInsideMenu = this.popup.nativeElement.contains(event.target);
    const isClickInsideCaptionButton = this.popup2.nativeElement.contains(event.target);

    if (!isClickInsideMenu && !isClickInsideCaptionButton) {
      this.isDropDownSetting = true;
      this.dropSetting();
    }

    // if (this.isKeyboardOn === true) {
    //   console.log('on click')
    //   $('.box-1').css('margin-top', '0px');
    //   $('#textTourBox').css('background', '');
    //   this.isKeyboardOn  = false
    // }



    var target = $(event.target);

    // var isBoxVisible = $('.box-1').css('margin-top') === '-500px'; // Check if box is visible
    // if (!target.closest('.box-1').length && isBoxVisible  && !target.closest('.ML__keyboard').length && !target.closest('.MLK__backdrop').length && !target.closest('.MLK__layer').length) {
    var marginTop = $('.box-1').css('margin-top');
    var isBoxVisible = marginTop === '-430px' || marginTop === '-500px' || marginTop === '-550px' || marginTop === '-600px' || marginTop === '-720px' || marginTop === '-650px' || marginTop === '-700px' || marginTop === '-750px';
    if (!target.closest('.box-1').length && isBoxVisible && !target.closest('.MLK__backdrop').length && !target.closest('.MLK__layer').length) {
      console.warn('click event -------------')
      this.mathEventHit('');

    }
  }


  navigateToHelp() {

  }





}



