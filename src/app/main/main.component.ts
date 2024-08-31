import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { interval, Subject, Subscription } from 'rxjs';
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

  public iteCourses = [
    {
      title: 'Cardiology',
      image: '../../assets/course-icons/Frame 3.png'
    },
    {
      title: 'Endocrinology',
      image: '../../assets/course-icons/Frame 20.png'
    },
    {
      title: 'Gastroenterology',
      image: '../../assets/course-icons/Frame 21.png'
    },
    {
      title: 'General Internal Medicine',
      image: '../../assets/course-icons/Frame 14.png'
    },
    {
      title: 'Geriatric Medicine',
      image: '../../assets/course-icons/Frame 19.png'
    },
    {
      title: 'Hematology and Oncology',
      image: '../../assets/course-icons/Hematology and Oncology.png'
    },
    {
      title: 'Infectious Diseases',
      image: '../../assets/course-icons/Frame 22.png'
    },
    {
      title: 'Nephrology',
      image: '../../assets/course-icons/Frame 13.png'
    },
    {
      title: 'Neurology',
      image: '../../assets/course-icons/Framen.png'
    },
    {
      title: 'Pulmonary and Critical Care Medicine',
      image: '../../assets/course-icons/Pulmonary & Critical Care Medicine.png'
    },
    {
      title: 'Rheumatology',
      image: '../../assets/course-icons/Framer.png'
    },
  ]

  public washingtonManualInspiredCourses = [
    {
      title: 'Toxicology',
      image: '../../assets/course-icons/Framet.png'
    },
    {
      title: 'Neurology',
      image: '../../assets/course-icons/Framen.png'
    },
    {
      title: 'Sexually Transmitted Diseases',
      image: '../../assets/course-icons/Frame s.png'
    },
    {
      title: 'Heart Failure',
      image: '../../assets/course-icons/Frame 14 h.png'
    },
  ]


  public SurgeryCourses = [
    {
      title: 'Patient Care',

      image: '../../assets/course-icons/Patient Care.png'
    },
    {
      title: ' Medical Knowledge',

      image: '../../assets/course-icons/Medical Knowledge.png'
    },
    {
      title: 'Radiology',

      image: '../../assets/course-icons/Radiology.png'
    },
    {
      title: 'Outcomes Ethics',
      image: '../../assets/course-icons/Outcome Ethics.png'

    },
  ]

  public PsychiatryCourses = [
    {
      title: 'Neurosciences',
      image: '../../assets/course-icons/Neurosciences.png'
    },
    {
      title: 'Clinical Neuro/Psych',
      image: '../../assets/course-icons/Clinical Neuro.png'
    },
    {
      title: 'Behavioral/Social Sciences',
      image: '../../assets/course-icons/Behavioral Sciences.png'
    },
    {
      title: 'Issues in Practice',
      image: '../../assets/course-icons/Issues in Practice.png'
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
  constructor(private router: Router, private service: UserService, private service2: ColorChangeService, @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title, private metaService: Meta, private fb: FormBuilder) {
    this.isBrowser = isPlatformBrowser(this.platformId);
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
    this.navigateAndReplaceClass();
    // Autoplay the video by triggering a play event
    if (this.isBrowser) {
      const videoIframe = document.getElementById('widget2') as HTMLIFrameElement;
      if (videoIframe) {
        console.log('hey');
        videoIframe.contentWindow?.postMessage('{"event":"command","func":"mute","args":""}', '*');
        videoIframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
    }
  }



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
  private targetDate: Date = new Date('2024-09-09T08:00:00')
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
    const distance = this.targetDate.getTime() - now;

    if (distance < 0) {
      this.countdownText = 'Countdown is over!';
      this.isCountdownOver = true;
      return;
    } else {
      this.isCountdownOver = false;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
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

  preEnroll(data: any) {
    // window.open('https://buy.stripe.com/test_5kAdSpdiJcr8awEcMM', '_blank');
    // window.location.href = 'https://buy.stripe.com/test_5kAdSpdiJcr8awEcMM';
    this.openForm = !this.openForm
    this.choosedPlan = data
    console.log(data)
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
    this.openForm = !this.openForm
    this.subjectform.reset()
    this.isloading = false
  }
  closeSuccessPopup() {
    this.openSuccessPopup = !this.openSuccessPopup
  }
  closeErrorPopup() {
    this.openErrorPopup = !this.openErrorPopup
  }

  submitForm() {
    if (this.subjectform.valid) {
      console.log('valid')
      let pay = {
        "email": this.subjectform.value.email,
        "name": this.subjectform.value.firstName + ' ' + this.subjectform.value.lastName
      }
      this.sendEmail = this.subjectform.value.email
      this.isloading = true
      console.log(pay)
      this.service.sendwaitlistData(pay).subscribe((res: any) => {
        console.log(res)
        if (res.statusCode == 200) {
          this.isloading = false
          this.closeForm()
          if (this.choosedPlan == 'Silver') {
            // window.location.href = 'https://buy.stripe.com/test_5kAdSpdiJcr8awEcMM';
            // window.open('https://buy.stripe.com/test_cN201zdiJ4YGeMUaEI', '_blank');
            const email = encodeURIComponent(this.sendEmail); // Encode the email
            console.log(email)
            const platinumUrl = `https://buy.stripe.com/test_cN201zdiJ4YGeMUaEI?prefilled_email=${email}&client_reference_id=silver`;
            // window.open(platinumUrl, '_blank');
            window.location.href = platinumUrl
          } else if (this.choosedPlan == 'Gold') {
            // window.open('https://buy.stripe.com/test_00g5lT4Md9eW8ow5km', '_blank');
            const email = encodeURIComponent(this.sendEmail); // Encode the email
            console.log(email)
            const platinumUrl = `https://buy.stripe.com/test_00g5lT4Md9eW8ow5km?prefilled_email=${email}&client_reference_id=gold`;
            // window.open(platinumUrl, '_blank');
            window.location.href = platinumUrl
          } else {

            // window.open('https://buy.stripe.com/test_7sIdSp6Ul8aSgV25kn', '_blank');
            const email = encodeURIComponent(this.sendEmail); // Encode the email
            console.log(email)
            const platinumUrl = `https://buy.stripe.com/test_7sIdSp6Ul8aSgV25kn?prefilled_email=${email}&client_reference_id=platinum`;
            // window.open(platinumUrl, '_blank');
            window.location.href = platinumUrl
          }

          this.openSuccessPopup = true
          // setTimeout(()=>{
          //   this.openSuccessPopup = false
          // },5000)

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
}

