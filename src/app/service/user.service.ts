import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, catchError, Subject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { API } from '../service/restapi';
import { isPlatformBrowser } from '@angular/common';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;
  avatar = environment.Avatar
  dataVoice: any = []
  token: any
  headers: any;
  IndexLearningNo: any;
  buttonvalue: any;

  public buttonValueSubject = new BehaviorSubject<any>('Initial Button Value');
  buttonValue$ = this.buttonValueSubject.asObservable(); 

  private sharedData = new BehaviorSubject({});
  currentSharedData = this.sharedData.asObservable();

  private sharedPDFData = new BehaviorSubject("");
  currentPDFLinkData = this.sharedPDFData.asObservable();

  private audioFileData = new BehaviorSubject({});
  audioLinkData = this.audioFileData.asObservable();

  private sceneData = new BehaviorSubject({});
  soulMScene = this.sceneData.asObservable();

  private mathsInputField = new BehaviorSubject(null);
  checkMathsInput = this.mathsInputField.asObservable();



  private objectValue = new BehaviorSubject(null);
  objvalue = this.objectValue.asObservable();
  private isBrowser;

  constructor(
    private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // this.token = JSON.parse(localStorage.getItem('token') || '[]')
    // this.headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Token': this.token
    // })

    this.loadHeaders()



    console.log('token in service', this.token)
  }

  loadHeaders() {
    if (this.isBrowser) {
      this.token = JSON.parse(localStorage.getItem('token') || '[]')
    }
    // if (this.token) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Token': this.token
    });
    // } else {
    //   // Clear headers if token doesn't exist
    //   this.headers = new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   });
    // }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error--------: ${error.error.message}`;
      errorMessage = `Errordd--------: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.status === 403) {
        errorMessage = 'Token Invalid please re-login'
        // this.token = "" 
        // this.headerClear()

      } else if (error.status === 401) {
        errorMessage = 'Unauthorized'
        // this.token = "" 
        //  this.headerClear()
      } else {
        errorMessage = ` ${error.message}`;
      }
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  //------------- shared data -------------------
  updateSharedData(data: any) {
    this.sharedData.next(data);
    this.dataVoice = data
    // console.log('data coming ---',this.dataVoice)
  }

  updatePDFLinkData(link: any) {
    this.sharedPDFData.next(link);
  }

  updateObjectAvatar(link: any) {
    this.objectValue.next(link);
    console.log(link)
  }

  updateAudioLinkData(audio: any) {
    this.audioFileData.next(audio);
  }

  updateSoulMachineData(audio: any) {
    this.sceneData.next(audio);
  }

  updateMathsInputBoolean(checkInput: any) {
    this.mathsInputField.next(checkInput);
    console.log('service', checkInput)
  }

  //--------------- shared data --------------------


  defaultAPI(data: any) {
    return this.http.post(this.baseUrl + API.defaultOneTimeRun, data, { headers: this.headers })
  }


  mathsOnOFFAPI(data: any) {
    return this.http.post(this.baseUrl + API.mathsONOF, data, { headers: this.headers })
  }

  // OpenAI API call
  getColorAPI(data: any) {
    return this.http.post('https://3umx5ofo18.execute-api.us-west-2.amazonaws.com/Production/background_color_website', data)
  }





  // OpenAI API call
  openAICall(data: any) {
    return this.http.post(this.baseUrl + API.openAI, data)
  }

  // OpenAI API call
  OpenAIMathematics(data: any) {
    return this.http.post(this.baseUrl + API.OpenAIMathematics, data)
  }

  // OpenAI API call
  OpenAIMathematicsSoulMAchine(data: any) {
    return this.http.post(this.baseUrl + API.OpenAIMathematicsSoulMachine, data, { headers: this.headers })
  }

  // allganize API call
  allganizeSoulMAchineAPI(data: any) {
    return this.http.post(this.baseUrl + API.allganizeAPI, data)
  }

  // zoom link setup 
  zoomSetting(data: any) {
    return this.http.post(this.baseUrl + API.saveEmailData, data)
  }

  avatarCounter(data: any) {
    return this.http.post(this.baseUrl + API.avatarCounterLimit, data)
  }


  tourGuideCheck(data: any) {
    return this.http.post(this.baseUrl + API.check_tour_guide, data, { headers: this.headers })
  }


  apiLogService(data: any) {
    return this.http.post("https://v6w3mrkkya.execute-api.us-west-2.amazonaws.com/Development/APILog", data)
  }


  /// ----- dashboard -----


  recordTest(data: any) {
    return this.http.post(this.baseUrl + API.recordTestDAta, data, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  ////  -------------- end  Test series -----------------------

  ///
  uneeqPromptBox(data: any) {

    return this.http.post(this.baseUrl + API.uneeqPromptMessege, data)

  }





  stopPresentation(startPres: any) {
    return this.http.post(this.baseUrl + API.startPresentation, startPres, { headers: this.headers })

  }

  startPresentation(startPres: any) {
    return this.http.post(this.baseUrl + API.startPresentation, startPres, { headers: this.headers })
  }

  presentationSpeak(startPres: any) {
    return this.http.post(this.baseUrl + API.PresentationSpeakAPI, startPres)
  }

  audioCountSpeak(audiostartPres: any) {
    return this.http.post(this.baseUrl + API.audioCount, audiostartPres)
  }


  recordPresentation(data: any) {
    return this.http.post(this.baseUrl + API.recordLearningDAta, data, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }


  //------------------------------history----------------------------------------------


  // for scroll on top----------------------------------------------
  scrollPositions: { [key: string]: number } = {};

  saveScrollPosition(key: string, scrollY: number): void {
    this.scrollPositions[key] = scrollY;
  }

  getScrollPosition(key: string): number {
    return this.scrollPositions[key] || 0;
  }

  // scroll end------------------------------------------------------------------



  // ------------------------ end presentation API --------------------------------------------


  headerClear() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Token': ''

    })
  }

  storedLocalStorageData() {
    if (this.isBrowser) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("Avatar");
    }
    this.token = ""
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Token': ''

    })
  }

  getIp() {
    return this.http.get('https://api.ipify.org?format=json')
  }

  sendwaitlistData(data:any){
  // return this.http.post('https://qzxk7csj32.execute-api.us-west-2.amazonaws.com/Production/Waitlist_added',data)
    return this.http.post('https://qzxk7csj32.execute-api.us-west-2.amazonaws.com/Development/Waitlist_added',data)
  }
  //scnewtab


    private popupState = new Subject<boolean>();
    popupState$ = this.popupState.asObservable();
  
    private loggedIn = new BehaviorSubject<boolean>(false);
    loggedIn$ = this.loggedIn.asObservable();
  
    showPopup() {
      this.popupState.next(true);
    }
  
    hidePopup() {
      this.popupState.next(false);
    }
  
    login(oH:any) {
      //this.buttonvalue = localStorage.getItem('user');
     
     this.buttonvalue = oH;
     console.log(this.buttonvalue,'loh')
     this.buttonValueSubject.next(this.buttonvalue);
     this.loggedIn.next(true);
    }
  
    logout() {
      this.loggedIn.next(false);
    }
    signIn(data: any) {
      // Set headers
      const headers = new HttpHeaders({
        // 'x-api-key': 'nO3iMjSWCK8gR08y3jEPd4rGcSGSLz4YakPJsYWA',
        'Content-Type': 'application/json'
      });
      return this.http.post('https://qzxk7csj32.execute-api.us-west-2.amazonaws.com/Development/login', data, { headers: headers })
    }
  
  buttonName(){
    return this.buttonName
  }
  
   
  
    getTenant(data: any) {
      // Set headers
      const headers = new HttpHeaders({
        'x-api-key': 'nO3iMjSWCK8gR08y3jEPd4rGcSGSLz4YakPJsYWA',
        'Content-Type': 'application/json'
      });
      return this.http.post('https://qzxk7csj32.execute-api.us-west-2.amazonaws.com/default/get_Tenant_List', data, { headers: headers })
    }
  
    verifyOTP(data: any) {
      // Set headers
      const headers = new HttpHeaders({
      
        'Content-Type': 'application/json'
      });
      return this.http.post('https://qzxk7csj32.execute-api.us-west-2.amazonaws.com/Development/Verify_OTP', data, { headers: headers })
    }
  
    forgotAPI(data: any) {
      // Set headers
      const headers = new HttpHeaders({
      
        'Content-Type': 'application/json'
      });
      return this.http.post(  'https://qzxk7csj32.execute-api.us-west-2.amazonaws.com/Development/forgot_Password_edyou_website', data, { headers: headers })
    }
  
  
  
    ResetPassword(data: any) {
      // Set headers
      const headers = new HttpHeaders({
      
        'Content-Type': 'application/json'
      });
      return this.http.post('https://qzxk7csj32.execute-api.us-west-2.amazonaws.com/Development/set_Password_edyou_website' , data, { headers: headers })
    }
  
    getProfileAPI(data: any) {
      // Set headers
      const headers = new HttpHeaders({
      
        'Content-Type': 'application/json'
      });
      return this.http.post(  'https://qzxk7csj32.execute-api.us-west-2.amazonaws.com/Development/Profile/getProfile', data, { headers: headers })
    }
  
    updateProfileAPI(data: any) {
      // Set headers
      const headers = new HttpHeaders({
      
        'Content-Type': 'application/json'
      });
      return this.http.post('https://qzxk7csj32.execute-api.us-west-2.amazonaws.com/Development/Profile/updateProfile' , data, { headers: headers })
    }
  
  
  
    checkSession(data:any){
        // Set headers
        const headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
        return this.http.post('https://w9muye41uk.execute-api.us-west-2.amazonaws.com/Development/Stripe/checkout_session', data, { headers: headers })
      }
      cancelSubscription(data:any){
        // Set headers
        const headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
        return this.http.post('https://w9muye41uk.execute-api.us-west-2.amazonaws.com/Development/Stripe/cancel_subscription', data, { headers: headers })
      }
      
  scSchool(data: any) {
    //  return this.http.post('https://w9muye41uk.execute-api.us-west-2.amazonaws.com/Development/Stripe/checkout_seesion_sc',data)
    return this.http.post('https://w9muye41uk.execute-api.us-west-2.amazonaws.com/Production/Stripe/checkout_seesion_sc', data)

  }
  sendwaitlistDataSc(data: any) {
    //free users pre-enroll

    //return this.http.post('https://qzxk7csj32.execute-api.us-west-2.amazonaws.com/Development/Waitlist/waitlist_sc_new', data)
     return this.http.post('https://qzxk7csj32.execute-api.us-west-2.amazonaws.com/Production/Waitlist/waitlist_sc_new',data)
    //  return this.http.post('https://qzxk7csj32.execute-api.us-west-2.amazonaws.com/Development/Waitlist_added_SC',data)
  }
  signUp(data: any) {
    // Set headers
    const headers = new HttpHeaders({
      'x-api-key': 'nO3iMjSWCK8gR08y3jEPd4rGcSGSLz4YakPJsYWA',
      'Content-Type': 'application/json'
    });
    return this.http.post('https://qzxk7csj32.execute-api.us-west-2.amazonaws.com/default/B2C_Insert_New_User', data, { headers: headers })
  }

  getInvoice(data: any) {
    // Set headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('https://qzxk7csj32.execute-api.us-west-2.amazonaws.com/Development/stripe/getInvoice', data, { headers: headers })
  }

  signupNewsletter(data: any) {
   // return this.http.post('https://qzxk7csj32.execute-api.us-west-2.amazonaws.com/Development/website/newsletter_subscription', data)
     return this.http.post('https://qzxk7csj32.execute-api.us-west-2.amazonaws.com/Production/website/newsletter_subscription',data)
  }
}