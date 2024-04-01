export const API = {
  // dashboard
  learningDashboardData: "/Dashboard/Investor_Dashboard",
  defaultOneTimeRun:"/SMDEMO/set_default_variables_soulmachine",
  //sso 
  ssoRedirectVerify: "/CommonAPI/Verify_Api",
  //
  check_tour_guide:'/Soulmachine/check_tour_guide',
  login: "/crudInvestor/InvestorLogin",
  logout: "/crudInvestor/investorLogout",
  feedback: "/feedback/submitFeedback",
  signUp: "/CommonAPI/Signup",
  deleteprofilepicture: "/CommonAPI/deleteprofilepicture",
  forget: "/CommonAPI/forgotPasswordUser",
  setPassword: "/CommonAPI/setPasswordLinkUser",
  setPasswordTimer: "/CommonAPI/setOnlyOnceUser",
  getProfile: "/CommonAPI/userProfile",
  updateProfile: "/CommonAPI/userEditProfile",
  changePassword: "/CommonAPI/changePassword",
  avatarCounterLimit: "/CommonAPI/counter",
 // mathsONOF: "/CommonAPI/Update_Mathematics_Module",
  mathsONOF: "/openAI/Update_Mathematics_Module_Soulmachine",
  speechSpedd: "/CommonAPI/Speech_Speed_API",
  //book a slot API 
  slotLogin: "/Slot/slotLogin",
  slotPage: "/Slot/slotPage",
  bookSlot: "/Slot/SlotUpdate",
  verifySlotBokking: "/Slot/slot_update_by_email_verification",
  //openAI API
  openAI: "/crudInvestor/openAIInvestor",
  OpenAIMathematics: "/openAI/OpenAIMathematics",
  OpenAIMathematicsSoulMachine:"/openAI/OpenAIMathematics_SoulMachine",
  allganizeAPI:"/openAI/openAI_SoulMachine",
  // avatar
  uneeqAvatarToken: "/crudInvestor/initToken",
  // test series 
  getSeriesData: "/Soulmachine/TestPrepQuestionforAvatar",
  uneeqStartTest: "/uneeq/uneeqQuestionStart",
  recordTestDAta: "/Soulmachine/check_TestPrep_Status",
  uneeqPromptMessege: "/uneeq/promptUser",
  startTestPrep:"/SMDEMO/SoulMachine_TestPrep_Init",
  InvestorUneeqQuestionInit: '/crudInvestor/InvestorUneeqQuestionInit',
  //
  getTopic: "/Topic/getTopicHeader",
  getByTopicID: "/Topic/getTopic",
  // presentation
  getPresentation: "/Soulmachine/Get_Learning_For_Avatar_Soulmachine",
  startPresentation: "/SMDEMO/PresentationEvents_soulmachine",
  start1Presentation: "/Presentation/PresentationEvents",
  PresentationSpeakAPI: "/Presentation/presentation_speak",
  audioCount: "/Presentation/audiodownload",
  recordLearningDAta: "/Soulmachine/check_Learning_Status",
  getAllSubjectList: "/CheckRecords/Get_Subject",
  //zoom link setup API 
  // history conversation 
  investerLoginHistory: "/crudInvestor/investerLoginHistory",
  InvestorloginChatHistory: "/crudInvestor/InvestorloginChatHistory",
  saveEmailData: "/CommonAPI/InvestorZoomEmail",
  conversationSaveData: "/CommonAPI/apiResponse",

  // new api

  get_courses:"/CommonAPI/get_courses",
  get_chapterwise_data:"/CommonAPI/get_chapterwise_data",
  get_chapter:"/CommonAPI/get_chapter"
  // contact support 
  

}