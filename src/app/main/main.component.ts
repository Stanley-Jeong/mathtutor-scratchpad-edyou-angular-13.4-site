import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, UrlTree } from '@angular/router';
import { filter, interval, Subject, Subscription } from 'rxjs';
import { UserService } from '../service/user.service';
import { ColorChangeService } from '../service/color-change.service';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;
  public iteCourses = [
  
    {
      title: 'Intro to Internal Medicine',
      id:'Intro-to-Internal-Medicine',
      image: '../../assets/course-icons/Internal Medicine.png',
      hoverImage: ''
    },
    
    {
      title: 'Intro to Neurology',
      id:'Intro-to-Neurology',
      image: '../../assets/course-icons/Framen.png',
      hoverImage: ''
    },
    
    {
      title: 'Intro to Family Medicine',
      id:'Intro-to-Family-Medicine',
      image: '../../assets/course-icons/Family Medicine.png',
      hoverImage: ''
    },
    {
      title: 'Intro to Surgery',
      id:'Intro-to-Surgery',
      image: '../../assets/course-icons/Surgery.png',
      hoverImage: ''
    },
    {
      title: 'Intro to Obstetrics/Gynaecology',
      id:'Intro-to-Obstetrics/Gynaecology',
      image: '../../assets/course-icons/gyno.png',
      hoverImage: ''
    },
    {
      title: 'Intro to  Pediatrics',
      id:'Intro-to-Pediatrics',
      image: '../../assets/course-icons/Pediatrics.png',
      hoverImage: ''
    },
    {
      title: 'Intro to Psychiatry',
      id:'Cardiology',
      image: '../../assets/course-icons/Psychiatry.png',
      hoverImage: ''
    },
    {
      title: 'Cardiology',
      id:'Cardiology',
      image: '../../assets/course-icons/Frame 3.png',
      hoverImage: ''
    },
    {
      title: 'Endocrinology',
      id:'Endocrinology',
      image: '../../assets/course-icons/Frame 20.png',
      hoverImage: ''
    },
    {
      title: 'Gastroenterology',
      id:'Gastroenterology',
      image: '../../assets/course-icons/Frame 21.png',
      hoverImage: ''
    },
    {
      title: 'Pulmonary and Critical Care Medicine',
      id:'Pulmonary-and-Critical-Care-Medicine',
      image: '../../assets/course-icons/Pulmonary & Critical Care Medicine.png',
      hoverImage: ''
    },
    {
      title: 'Rheumatology',
      id:'Rheumatology',
      image: '../../assets/course-icons/Framer.png',
      hoverImage: ''
    },
    {
      title: 'Geriatric Medicine',
      id:'Geriatric-Medicine',
      image: '../../assets/course-icons/Frame 19.png',
      hoverImage: ''
    },
    {
      title: 'Hematology and Oncology',
      id:'Hematology-and-Oncology',
      image: '../../assets/course-icons/Hematology and Oncology.png',
      hoverImage: ''
    },
    {
      title: 'Infectious Diseases',
      id:'Infectious-Diseases',
      image: '../../assets/course-icons/Frame 22.png',
      hoverImage: ''
    },
    {
      title: 'Nephrology',
      id:'Nephrology',
      image: '../../assets/course-icons/Frame 13.png',
      hoverImage: ''
    },
    // {
    //   title: 'USMLE Step 1',
    //   id:'USMLE-Step-1',
    //   image: '../../assets/course-icons/USMLE.png',
    //   hoverImage: ''
    // },
    // {
    //   title: 'USMLE Step 2',
    //   id:'USMLE-Step-2',
    //   image: '../../assets/course-icons/USMLE.png',
    //   hoverImage: ''
    // },
    // {
    //   title: 'USMLE Step 3',
    //   id:'USMLE-Step-3',
    //   image: '../../assets/course-icons/USMLE.png',
    //   hoverImage: ''
    // },
    {
      title: 'Toxicology',
      id:'Toxicology',
      image: '../../assets/course-icons/Framet.png',
      hoverImage: ''
    },
    {
      title: 'Neurology',
      id:'Neurology',
      image: '../../assets/course-icons/Framen.png',
      hoverImage: ''
    },
    {
      title: 'Sexually Transmitted Diseases',
      id:'Sexually-Transmitted-Diseases',
      image: '../../assets/course-icons/Frame s.png',
      hoverImage: ''
    },
    {
      title: 'Heart Failure',
      id:'Heart-Failure',
      image: '../../assets/course-icons/Frame 14 h.png',
      hoverImage: ''
    },
  ]

  
  public washingtonManualInspiredCourses = [
    {
      title: 'Toxicology',
      image: '../../assets/course-icons/Framet.png',
      hoverImage: ''
    },
    {
      title: 'Neurology',
      image: '../../assets/course-icons/Framen.png',
      hoverImage: ''
    },
    {
      title: 'Sexually Transmitted Diseases',
      image: '../../assets/course-icons/Frame s.png',
      hoverImage: ''
    },
    {
      title: 'Heart Failure',
      image: '../../assets/course-icons/Frame 14 h.png',
      hoverImage: ''
    },
  ]

 
  public SurgeryCourses = [
    {
      title: 'Patient Care',

      image: '../../assets/course-icons/Patient Care.png',
      hoverImage: ''
    },
    {
      title: 'Medical Knowledge',

      image: '../../assets/course-icons/Medical Knowledge.png',
      hoverImage: ''
    },
    {
      title: 'Radiology',

      image: '../../assets/course-icons/Radiology.png',
      hoverImage: ''
    },
    {
      title: 'Outcomes Ethics',
      image: '../../assets/course-icons/Outcome Ethics.png',
      hoverImage: ''

    },
  ]

  public PsychiatryCourses = [
    {
      title: 'Neuroscience',
      image: '../../assets/course-icons/Neurosciences.png',
      hoverImage: ''
    },
    {
      title: 'Clinical Neuro/Psych',
      image: '../../assets/course-icons/Clinical Neuro.png',
      hoverImage: ''
    },
    {
      title: 'Behavioral/Social Science',
      image: '../../assets/course-icons/Behavioral Sciences.png',
      hoverImage: ''
    },
    {
      title: 'Issues in Practice',
      image: '../../assets/course-icons/Issues in Practice.png',
      hoverImage: ''
    },
  ]

  public  AcademicUpcomingCourses = [
   
    {
      title: 'Mathematics',
      id:'Mathematics',
      image: '../../assets/course-icons/fmath.png',
      hoverImage: '../../assets/course-icons/hover 1.png'
    },
    {
      title: 'Biology',
      id:'Biology',
      image: '../../assets/course-icons/fbio.png',
      hoverImage: ''
    },
    {
      title: 'Poetry',
      id:'Poetry',
      image: '../../assets/course-icons/fpoetry.png',
      hoverImage: ''
    },
    {
      title: 'Writing',
      id:'Writing',
      image: '../../assets/course-icons/fwriting.png',
      hoverImage: ''
    },
    {
      title: 'Word Problems',
      id:'Word-Problems',
      image: '../../assets/course-icons/fwordproblem.png',
      hoverImage: ''
    },
    {
      title: 'Pre-Algebra',
      id:'Pre-Algebra',
      image: '../../assets/course-icons/Pre-Algebra.png',
      hoverImage: ''
    },
    {
      title: 'Politics',
      id:'Politics',
      image: '../../assets/course-icons/Politics.png',
      hoverImage: ''
    },
    // {
    //   title: 'Test prep',
    //   image: '../../assets/course-icons/Issues in Practice.png'
    // },
  ] 
  public  skillForLifeUpcomingCourses = [
    {
      title: 'Interview Prep',
      id: 'Interview-Prep',
      image: '../../assets/course-icons/Interview prep.png',
      hoverImage: ''
    },
    {
      title: 'Bully Help',
      id: 'Bully-Help',
      image: '../../assets/course-icons/Bully Help.png',
      hoverImage: ''
    },
    {
      title: 'Accent Reduction',
      id: 'Accent-Reduction',
      image: '../../assets/course-icons/Accent Reduction.png',
      hoverImage: ''
    },
    {
      title: 'Conflict Resolution',
      id: 'Conflict-Resolution',
      image: '../../assets/course-icons/Conflict Resolution.png',
      hoverImage: ''
    },
    {
      title: 'Time Management',
      id:'Time-Management',
      image: '../../assets/course-icons/Time Management.png',
      hoverImage: ''
    },
    {
      title: 'Self-Care',
      id:'Self-Care',
      image: '../../assets/course-icons/Self-Care.png',
      hoverImage: ''
    },
    {
      title: 'Test prep',
      id:'Test-Prep',
      image: '../../assets/course-icons/Test prep.png',
      hoverImage: ''
    },
    {
      title: 'Exam Anxiety Course',
      id: 'Exam-Anxiety-Course',
      image: '../../assets/course-icons/Exam anixty.png'
    },
    
  ] 

  public  tests = [
    {
      title: 'USMLE Step 1',
      id: 'USMLE-Step-1',
      image: '../../assets/course-icons/USMLE.png'
    },
    {
      title: 'USMLE Step 2',
      id: 'USMLE-Step-2',
      image: '../../assets/course-icons/USMLE.png'
    },
    {
      title: 'USMLE Step 3',
      id: 'USMLE-Step-3',
      image: '../../assets/course-icons/USMLE.png'
    },
    {
      title: 'High School SAT',
      id: 'High-School-SAT',
      image: '../../assets/course-icons/SAT.png'
    },
    {
      title: 'High School ACT',
      id: 'High-School-ACT',
      image: '../../assets/course-icons/ACT.png'
    },
    {
      title: 'GRE',
      id: 'GRE',
      image: '../../assets/course-icons/gre.png'
    },
    {
      title: 'LSAT',
      id: 'LSAT',
      image: '../../assets/course-icons/LSAT.png'
    },
  ]

  private ngUnsubscribe = new Subject();
  scrollKey: any;
  private isBrowser: boolean;
  subjectform!: FormGroup;
  // isHovered:boolean = false
  isHovered: { [key: string]: boolean } = {};

  isalgebra: boolean = false
  openSuccessPopup: boolean = false;
  openErrorPopup: boolean = false;

  isModalOpen = false;
  modalContent = {
    title: '',
    image: '',
    description: ''
  };
 
  isScDisabled: boolean =false;
  storedLogin: string | null ="s";
  email_id: any;
  subscribedbutton: any;
  newLoader: boolean = false;
  constructor(private router: Router, private service: UserService, private service2: ColorChangeService, @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title, private metaService: Meta, private fb: FormBuilder ,private route: ActivatedRoute) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    console.log(this.isBrowser,this.platformId)
    this.service.getIp().subscribe((res: any) => {
      console.log(res, "my ip----------------------------------------------")
   

    }) 

 

    
    // let id = localStorage.getItem('sessionId') 
    // console.log(id,'regettttttttttttttttttttttttttttttttttttttttt')
    this.subjectform = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.isHovered = {
      'us-history': false,
      'algebra': false,
      'english': false,
      'leadership': false,
      'communications': false,
      'entrepreneurship': false,
      'computer-science': false,
      'project-management': false,
    };

  }




  async ngAfterViewInit() {

    //kanx video changes 
    const video = this.heroVideo.nativeElement;
   
    // Set volume to 0
    video.volume = 0;
    video.muted = true;
    
    video.play().catch(error => {
      console.error('Video playback failed:', error);
    });
    video.addEventListener('volumechange', () => {
      this.handleVolumeChange(video);
    });
    this.navigateAndReplaceClass();
    // Autoplay the video by triggering a play event
    
    // if (this.isBrowser) {
    //   const videoIframe = document.getElementById('widget2') as HTMLIFrameElement;
    //   if (videoIframe) {
    //     console.log('hey');
    //     videoIframe.contentWindow?.postMessage('{"event":"command","func":"mute","args":""}', '*');
    //     videoIframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    //   }
    // }
  }
  handleVolumeChange(video: HTMLVideoElement) {
    // Check if the video is muted
    if (video.muted) {
      video.volume = 0;
    //  console.log('Video is muted');
    } else {
      video.volume = 1;
   //   console.log(`Video volume is set to ${video.volume}`);
    }}


  async navigateAndReplaceClass() {
    await this.router.navigateByUrl(this.router.url); // Trigger navigation event
    this.replaceClass("elementor-invisible", "");
  }

  private replaceClass(className: string, newClassName: string): void {
    const elements = document.querySelectorAll("." + className);
    elements.forEach(element => {
      element.classList.remove(className);
    });
  }

  public videoSource = "./assets/edyou-gen-video-placeholder.mp4"

  ngOnInit(): void {
    let user = localStorage.getItem('user') 
    if(user!==null){
    let sc = localStorage.getItem('url') 
    //this.router.url.includes('/sc')
    let subscribed = localStorage.getItem('subscription')
    if( subscribed){
      if(subscribed.length > 0){
        this.subscribedbutton = true
       // this.subscribedbutton  = truesub
      }else{
        this.subscribedbutton = false
        //this.subscribedbutton  = false
      }
    }
    //this.subscribedbutton  = 
    this.isScDisabled = sc && sc.includes('sc') ? true : false;
    }
    this.setTitle('edYOU - Transforming Education with AI');
    this.setMetaDescription('Discover edYOU, a groundbreaking AI platform that revolutionizes learning through personalized, engaging, and innovative educational experiences.')
    const image1 = document.getElementById('image1') as HTMLImageElement;
    const image2 = document.getElementById('image2') as HTMLImageElement;
    const image3 = document.getElementById('image3') as HTMLImageElement;
    const images: HTMLImageElement[] = [image1, image2, image3];
    this.startImageRotation(images);

    // countdown================
    this.subscription = interval(1000).subscribe(() => {
      this.updateCountdown();
    }); 


    
  }
  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  setMetaDescription(description: string) {
    this.metaService.updateTag({ name: 'description', content: description });
  }

  startImageRotation(images: HTMLImageElement[]): void {
    let currentImageIndex = 0;
    this.fadeIn(images[currentImageIndex]);
    setInterval(() => {
      this.fadeOut(images[currentImageIndex]);
      currentImageIndex = (currentImageIndex + 1) % images.length;
      this.fadeIn(images[currentImageIndex]);
    }, 5000);
  }

  fadeIn(imageElement: HTMLImageElement): void {
    imageElement.classList.add('fade-in');
    setTimeout(() => {
      this.fadeOut(imageElement);
    }, 5000);
  }

  fadeOut(imageElement: HTMLImageElement): void {
    imageElement.classList.remove('fade-in');
    imageElement.classList.add('fade-out');
    setTimeout(() => {
      imageElement.classList.remove('fade-out');
    }, 2000);
  }

  navigateToSafety() {
    this.router.navigate(['/safety']).then(() => {

    })
  }
  navigateToMain() {
    this.router.navigate(['/main']);
  }

  navigateToLabs() {
    this.router.navigate(['/labs']).then(() => {
    })
  }

  navigateToCompany() {
    this.router.navigate(['/company']);
  }

  navigateToEdyousAi() {
    if (this.isBrowser) {
      this.router.navigate(['/how-edyous-ai-is-reimagining-the-future-of-personalized-learning']).then(() => {
        window.scrollTo(0, 0);
      });
    }
  }

  navigateToRevolutionizingEducation() {
    if (this.isBrowser) {
      this.router.navigate(['/revolutionizing-education-with-edyou-bridging-the-post-pandemic-learning-gap']).then(() => {
        window.scrollTo(0, 0);
      });
    }
  }

  navigateToPayItForward() {
    if (this.isBrowser) {
      this.router.navigate(['/pay-it-forward']).then(() => {
        window.scrollTo(0, 0);
      });
    }
  }

  scrollToId(id: string) {
    // console.log("element id : ", id);
    this.service2.scrollToElementById(id);
  }


  /* COURSES NAVIGATION */
  navigateToCoursePage(url: string | UrlTree) {
    console.log(url)
    this.router.navigateByUrl(url);
    // this.router.navigate(['/us-history']);
  }




  // toggleGif(hovered: boolean) {
  //   this.isHovered = hovered;
  // }

  toggleGif(course: string, hovered: boolean) {
    this.isHovered[course] = hovered;
  }

  togglealgebra(hovered: boolean) {
    this.isalgebra = hovered
  }


  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }


  // for countdown

  private subscription: Subscription | undefined;
  public countdownText: string = '';
  private targetDate: Date = new Date('2024-10-01T08:00:00')
  // private targetDate: Date = new Date(new Date().setHours(17, 0, 0, 0));

  days: any
  hour: any
  miniute: any
  second: any
  isCountdownOver: boolean = false;
  openForm: boolean = false;
  isloading: boolean = false;
  sendEmail: any;

  updateCountdown(): void {
    
    const now = new Date().getTime();
    const nowUTC = new Date();

    // PST offset in milliseconds (UTC-8 hours)
    const timezoneOffset = -8 * 60 * 60 * 1000;
  
    // Convert current time to PST
    const nowPST = new Date(nowUTC.getTime() + timezoneOffset);
  
    // Calculate the distance between now (in PST) and the target date (assumed to be in PST)
    const distance = this.targetDate.getTime() - nowPST.getTime();

    if (distance < 0) {
      this.countdownText = 'Countdown is over!';
      this.isCountdownOver = true;
      return;
    } else {
      this.isCountdownOver = false;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //  console.log(minutes)
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      const formattedDays = this.formatTimeUnit(days);
      const formattedHours = this.formatTimeUnit(hours);
      const formattedMinutes = this.formatTimeUnit(minutes);
      const formattedSeconds = this.formatTimeUnit(seconds);
      this.days = formattedDays;
      this.hour = formattedHours;
      this.miniute = formattedMinutes;
      this.second = formattedSeconds;
    }


  }

  private formatTimeUnit(unit: number): string {
    return unit < 10 ? '0' + unit : unit.toString();
  }

  // openform(){
  //   this.openForm = !this.openForm
  // }
  choosedPlan: any;

  preEnroll(data: any,event: Event) {
    // window.open('https://buy.stripe.com/test_5kAdSpdiJcr8awEcMM', '_blank');
    // window.location.href = 'https://buy.stripe.com/test_5kAdSpdiJcr8awEcMM';
    this.storedLogin = localStorage.getItem('user');
    this.email_id = localStorage.getItem('email');
     console.log('state',this.storedLogin,this.email_id)
     this.choosedPlan = data
 
    
     if(this.storedLogin){
    //   this.buyPackage();
   
   this.closeForm
    this.planAPI(this.email_id ,this.choosedPlan) 
     //this.planAPI(this.email_id)
    
    
       
     }else{
      this.openLoginPopup(event)
     //this.openForm = !this.openForm
     }
   // this.openForm = !this.openForm
    
   // console.log(data)
  }
  navigateToLogin() {


  }
  navigateTocourse() {
    if (this.isBrowser) {
      this.router.navigate(['/']).then(() => {
        window.scrollTo(0, 0);
      });
    }
    this.closeModal()
  }
  openLoginPopup(event: any) {
    event.stopPropagation();
  this.service.showPopup();
  }
  openModal(caseId: any): void {
    this.isModalOpen = true;
    this.isModalOpen = true;

    // Set modal content based on caseId
    switch (caseId) {
      case 1:
        this.modalContent = {
          title: 'US History',
          image: '../assets/history-course.png',
          description: "Discover the fascinating journey of the United States with our engaging US history course! Designed for learners of all ages, this course brings history to life with captivating stories, interactive lessons, and insights that will leave you eager for more. Whether you're a student, a lifelong learner, or just curious about America's past, this course is tailored to be enjoyable and enlightening for everyone. Dive into history like never before and see how the events of the past shape the world we live in today!"
        };
        break;
      case 2:
        this.modalContent = {
          title: 'Algebra',
          image: '../assets/algebra-course.webp',
          description: "Unlock the power of mathematics with our engaging Algebra course! Whether you're just beginning or looking to strengthen your skills, this course breaks down complex concepts into easy-to-understand lessons. You'll explore everything from equations and inequalities to functions and graphing, all with step-by-step guidance and practical examples. Ideal for students at any level, this course will help you build a strong foundation in algebra, boosting your confidence and problem-solving abilities. Dive into the world of algebra and discover how fun and rewarding math can be!"
        };
        break;
      case 3:
        this.modalContent = {
          title: 'Introduction to English',
          image: '../assets/english-course.webp',
          description: "Master the art of communication with our comprehensive English course! Whether you're a beginner or looking to refine your skills, this course is designed to help you excel in reading, writing, speaking, and understanding English. Through engaging lessons, interactive activities, and personalized feedback, you'll build confidence and fluency in one of the world's most essential languages. Perfect for students, professionals, or anyone eager to improve their English, this course will empower you to express yourself clearly and effectively in any situation. Start your journey to English proficiency today!"
        };
        break;
      case 4:
        this.modalContent = {
          title: 'Leadership',
          image: '../assets/leadership-course.jpg',
          description: "Leadership Unlock your potential with our transformative leadership course! Whether you're a seasoned leader or just starting your journey, this course is designed to inspire and equip you with the skills and confidence to lead with impact. Through practical exercises, real-world examples, and expert guidance, you'll learn to motivate, influence, and drive positive change in any environment. Discover your unique leadership style and take charge of your future with the tools and insights you need to succeed. Lead with purpose, and make a difference today!"
        };
        break;
      case 5:
        this.modalContent = {
          title: 'Communications',
          image: '../assets/communication-cors.webp',
          description: "Communications Enhance your ability to connect and influence with our Communications course! Perfect for professionals, students, and anyone looking to improve their interpersonal skills, this course covers the essentials of effective communication in both personal and professional settings. You'll learn to articulate your ideas clearly, listen actively, and adapt your message to different audiences. With practical exercises and real-world scenarios, you'll build confidence in public speaking, negotiation, and digital communication. Unlock the power of clear, persuasive communication and make your voice heard in any situation!"
        };
        break; case 6:
        this.modalContent = {
          title: 'Entrepreneurship',
          image: '../assets/math-course.png',
          description: "No content"
        };
        break; case 7:
        this.modalContent = {
          title: 'Artificial Intelligence',
          image: '../assets/math-course.png',
          description: 'No content.'
        };
        break; case 8:
        this.modalContent = {
          title: 'Computer Science',
          image: '../assets/math-course.png',
          description: 'No content.'
        };
        break; case 9:
        this.modalContent = {
          title: 'Project Management',
          image: '../assets/PMM.webp',
          description: "Project Management Elevate your career with our dynamic Project Management course! Designed for aspiring and experienced project managers alike, this course equips you with the tools, techniques, and strategies to lead projects to success. From planning and execution to monitoring and closing, you'll learn to manage resources, meet deadlines, and deliver results with confidence. Through real-world case studies and hands-on practice, you'll gain the skills needed to navigate challenges and drive your projects forward. Whether you're managing small teams or large-scale initiatives, this course will help you achieve your goals and excel in the world of project management."
        };
        break;
      // Add more cases as needed
      default:
        this.modalContent = {
          title: 'Default Title',
          image: '../assets/default-course.png',
          description: 'Default description for the course.'
        };
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
  closeForm() {
    this.openForm = false
    this.subjectform.reset()
    this.isloading = false
  }
  // closeSuccessPopup() {
  //   this.openSuccessPopup = !this.openSuccessPopup
  // }
  closeErrorPopup() {
    this.openErrorPopup = !this.openErrorPopup
  }

  submitForm() {
    if (this.subjectform.valid) {
      console.log('valid')
      let pay = {
        "email": this.subjectform.value.email,
        "name": this.subjectform.value.firstName + ' ' + this.subjectform.value.lastName,
        "plan":this.choosedPlan
      }
      this.sendEmail = this.subjectform.value.email
      this.isloading = true
      console.log(pay)
      this.service.sendwaitlistData(pay).subscribe((res: any) => {
        console.log(res)
        if (res.statusCode == 200) {
          this.planAPI(this.subjectform.value.email,this.choosedPlan) 
          this.isloading = false
          
          
          // if (this.choosedPlan == 'Silver') {
          //   // window.location.href = 'https://buy.stripe.com/test_5kAdSpdiJcr8awEcMM';
          //   // window.open('https://buy.stripe.com/test_cN201zdiJ4YGeMUaEI', '_blank');
          //   const email = encodeURIComponent(this.sendEmail); // Encode the email
          //   console.log(email)
          //  // const platinumUrl = `https://buy.stripe.com/test_cN201zdiJ4YGeMUaEI?prefilled_email=${email}&client_reference_id=silver`;
          //     //prod
          //    const platinumUrl = `https://buy.stripe.com/4gw02Q79M4qT70A9AA?prefilled_email=${email}&client_reference_id=silver`;
          //   // window.open(platinumUrl, '_blank');
          //   window.location.href = platinumUrl
          // } else if (this.choosedPlan == 'Gold') {
          //   // window.open('https://buy.stripe.com/test_00g5lT4Md9eW8ow5km', '_blank');
            

          //   const email = encodeURIComponent(this.sendEmail); // Encode the email
          //   console.log(email)
          //  // const platinumUrl = `https://buy.stripe.com/test_00g5lT4Md9eW8ow5km?prefilled_email=${email}&client_reference_id=gold`;
          //  //prod
          //    const platinumUrl = `https://buy.stripe.com/cN27vi0Lo2iLet28wy?prefilled_email=${email}&client_reference_id=gold`;
          //   // window.open(platinumUrl, '_blank');
          //   window.location.href = platinumUrl
          // } else {

          //   // window.open('https://buy.stripe.com/test_7sIdSp6Ul8aSgV25kn', '_blank');
          //   const email = encodeURIComponent(this.sendEmail); // Encode the email
          //   console.log(email)
          //   //const platinumUrl = `https://buy.stripe.com/test_7sIdSp6Ul8aSgV25kn?prefilled_email=${email}&client_reference_id=platinum`;
          // //prod
          //    const platinumUrl = `https://buy.stripe.com/4gw4j665I2iLdoYeUV?prefilled_email=${email}&client_reference_id=platinum`;
          //   // window.open(platinumUrl, '_blank');
          //   window.location.href = platinumUrl
          // }

          // this.openSuccessPopup = true
          // setTimeout(()=>{
          //   this.openSuccessPopup = false
          // },2000)

        } else if (res.statusCode == 201) {
          this.openErrorPopup = true
          this.closeForm()
        }
      })
    } else {
      console.log('!valid')
      this.validateAllFormFields(this.subjectform)
    }
  }


  ngOnDestroy(): void {
    // this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    if (this.isBrowser) {
      this.service2.saveScrollPosition(this.scrollKey, window.scrollY);
    }

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
//   DEV
// platinum - prod_QvPcLe2x2J5JXO - price_1Q3YncALy7MM11rqdQIA8mTi
// gold - prod_QvPc1yzCUHcSCv - price_1Q3YmqALy7MM11rq84K4saZ2
// silver - prod_QvPYwWXIKFLUpK -price_1Q3YjZALy7MM11rqpdgvJvyM 

// Prod
// platinum - prod_QwygA7KuOOd0FQ - price_1Q54jNALy7MM11rqD8rNVuSC
// gold - prod_QwygmbTidgM5Ma - price_1Q54jIALy7MM11rqm10DW5la
// silver - prod_QwyfxUyiCMsQUh - price_1Q54iSALy7MM11rqsMbzYyOW

  planAPI(email: string,plan:string) {
    this.isloading = true;
    this.newLoader = true
    let payload
    switch (plan) {
      case 'Silver':
        plan = 'Silver';
         payload = {
          "email": email,
          "prod_id": "prod_QwyfxUyiCMsQUh",
        //  "prod_id": "prod_QmrFV8irjoWH9E",
          // "prod_id": "prod_Qkv0CvSnYSA23r",
          "plan": plan,
          "price_id": "price_1Q54iSALy7MM11rqsMbzYyOW",
         // "price_id": "price_1PxoBRALy7MM11rqkjD1f8DB",
          // "price_id": "price_1PxjA1ALy7MM11rqNsEDK3ke",
          "mode": "setup",
          "price": "price_1Q54iSALy7MM11rqsMbzYyOW",
          // "price": "price_1PxjA1ALy7MM11rqNsEDK3ke",
          "price_amount": "19.99",
          // "price_amount": "39",
          "belong_to" :"nonsc",

          "type":"payment"
        }
        break;
      case 'Gold':
        plan = 'Gold';
       payload = {
          "email": email,
          "prod_id": "prod_QwygmbTidgM5Ma",
         // "prod_id": "prod_QmrFLWOmU2oDzr",
          // "prod_id": "prod_Qkv5HTR2zZJ9Dd",
          "plan": plan,
          "price_id": "price_1Q54jIALy7MM11rqm10DW5la",
         // "price_id": "price_1Pxo9IALy7MM11rqfEWyUv4i",
          // "price_id": "price_1Pxj7tALy7MM11rqzdYpQN8y",
          "mode": "setup",
          "price": "price_1Q54jIALy7MM11rqm10DW5la",
          // "price": "price_1Pxj7tALy7MM11rqzdYpQN8y",
          "price_amount": "74.99",
          "belong_to" :"nonsc",
         
          "type":"subscription"
          
        }
        break;
        //package updated 27sep2024
        //platinum - prod_QvPcLe2x2J5JXO - price_1Q3YncALy7MM11rqdQIA8mTi
      //gold - prod_QvPc1yzCUHcSCv - price_1Q3YmqALy7MM11rq84K4saZ2
      //silver - prod_QvPYwWXIKFLUpK -price_1Q3YjZALy7MM11rqpdgvJvyM
      case 'Platinum':
        plan = 'Platinum';
        payload = {
          "email": email,
          "prod_id": "prod_QwygA7KuOOd0FQ",
         // "prod_id": "prod_QmrFZUGlrjAclG",
          // "prod_id": "prod_Qkv3dLCQOXIq0z",
          "plan": plan,
           "price_id": "price_1Q54jNALy7MM11rqD8rNVuSC",
         // "price_id": "price_1PxoB0ALy7MM11rqYdsqSzJN",
          // "price_id": "price_1PxjHqALy7MM11rqGyaxNJY1",
          "mode": "setup",
          "price": "price_1Q54jNALy7MM11rqD8rNVuSC",
          // "price": "price_1PxjHqALy7MM11rqGyaxNJY1",
          "price_amount": "199.99",
          // price_amount": "199",
          "belong_to" :"nonsc",
          
          "type":"subscription"
        }
        break;
        default:
        {}
       
        break;
    }
 
    this.service.stripe(payload).subscribe((res: any) => {
      
     
      if (res.statusCode == 303) {
       
        this.closeForm()
        this.newLoader = false
        window.location.href = res.headers.Location;
     
       
       
        this.isloading =false;
      }
    })

  }
  
  toggleActive(tabId: string) {
    if(this.isBrowser) {
    const tabContent = document.getElementById(`ae-tab-content-${tabId}`);
    const tabTitle = document.getElementById(`ae-tab-title-${tabId}`);
    if (tabContent && tabTitle) {
      tabContent.classList.toggle('ae-active');
      tabTitle.classList.toggle('ae-active');
      const iconElement = tabTitle.querySelector('.ae-accordion-icon-closed i');
      if (iconElement) {
        iconElement.classList.toggle('fa-caret-down');
        iconElement.classList.toggle('fa-caret-right');
      }
    }
    }
  }
  toggleHover(courseTitle: string, isHovering: boolean): void {
    this.isHovered[courseTitle] = isHovering;
  }
}

