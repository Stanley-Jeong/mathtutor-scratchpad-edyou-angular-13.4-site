import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { API } from '../service/restapi';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;
  avatar = environment.Avatar
  dataVoice: any = []
  token:any 
  headers:any;
  IndexLearningNo: any;
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
  private platformBrowser;
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any) {
    this.platformBrowser = isPlatformBrowser(this.platformId);
    this.loadHeaders()
    // console.log('token in service', this.token)
  }

   loadHeaders() {
    if(this.platformBrowser){
      this.token = JSON.parse(localStorage.getItem('token') || '[]')
    }
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Token': this.token
    });
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

      } else if(error.status === 401){
        errorMessage = 'Unauthorized'
       // this.token = "" 
      //  this.headerClear()
      }else{
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

  // defaultAPI(data: any) {
  //   return this.http.post(this.baseUrl + API.defaultOneTimeRun, data,{headers: this.headers})
  // }

  // mathsOnOFFAPI(data: any) {
  //   return this.http.post(this.baseUrl + API.mathsONOF, data,{headers: this.headers})
  // }

  // OpenAI API call
  getColorAPI(data: any) {
    return this.http.post('https://v8awnmd5cd.execute-api.us-west-2.amazonaws.com/Development/bg_color_get_and_update', data)
  }
  // OpenAI API call
  openAICall(data: any) {
    return this.http.post(this.baseUrl + API.openAI, data)
  }

  // OpenAI API call
  // OpenAIMathematics(data: any) {
  //   return this.http.post(this.baseUrl + API.OpenAIMathematics, data)
  // }

  // // OpenAI API call
  // OpenAIMathematicsSoulMAchine(data: any) {
  //   return this.http.post(this.baseUrl + API.OpenAIMathematicsSoulMachine, data,{headers: this.headers})
  // }

  // allganize API call
  allganizeSoulMAchineAPI(data: any) {
    return this.http.post(this.baseUrl + API.allganizeAPI, data)
  }


  // tourGuideCheck(data: any) {
  //   return this.http.post(this.baseUrl + API.check_tour_guide, data,{headers: this.headers})
  // }


  // apiLogService(data:any){
  //   return this.http.post("https://v6w3mrkkya.execute-api.us-west-2.amazonaws.com/Development/APILog", data)
  // }

  // for scroll on top----------------------------------------------
  scrollPositions: { [key: string]: number } = {};
  saveScrollPosition(key: string, scrollY: number): void {
    this.scrollPositions[key] = scrollY;
  }

  getScrollPosition(key: string): number {
    return this.scrollPositions[key] || 0;
  }

  // scroll end------------------------------------------------------------------
  // headerClear(){
  //   this.headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Token': ''
    
  //   })
  // }

  storedLocalStorageData() {
    if(this.platformBrowser){
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

  getIp(){
    return this.http.get('https://api.ipify.org?format=json')
  }


}



