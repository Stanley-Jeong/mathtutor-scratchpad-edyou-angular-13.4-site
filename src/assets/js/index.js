
var tg = new tourguide.TourGuideClient({
    targetPadding: 15,
    exitOnEscape: false,
    exitOnClickOutside: true,
    dialogClass: 'tg-dialog-btn , tg-dialog-body , tg-dialog-close-btn',
    closeButton: true,
    showStepProgress: false,

    dialogClass: 'ppp',
    steps: [
        {
            // content: "<b> Press and hold the spacebar or the microphone button to speak. </b>",
            content: "Click the microphone button or press the spacebar once to speak.",
            title: "Microphone Button",
            target: "#voiceId", // target element
            order: "0",

            group: "",

        },

        {
            content: "Use this button to send your text.",
            title: "Send Button",
            target: "#sendId1", // target element
            order: "2",
            group: "",
        },
        {
            // content: "<b> Press and hold the spacebar or the microphone button to speak. </b>",
            content: "Use this text box to ask a question.",
            title: "Text Input Box",
            target: "#textTourBox", // target element
            order: "1",
            Image: 'src/assets/interaction/arrow-left.svg',
            group: "",

        },
        {
            target: "#tourSetting",
            order: "2",
            // content: "You can turn on/off captions, restart tour guide as well as access help page from the settings option. <br><img src='https://pollydemo2022.s3.us-west-2.amazonaws.com/icons/settings.png'  style='width:290px' alt=''>", 
            content: "You can turn on/off captions, restart tour guide.",

            title: "Settings",
            group: "",
            targetPadding: 25,
            dialogPlacement: 'top',
            position: "top"

        },
        {

            order: "3",
            // order: "4",
            content: "You can interrupt AI being while speaking by clicking this button. <br><img src='https://pollydemo2022.s3.us-west-2.amazonaws.com/icons/Stop+speaking.png'  style='width:280px; padding:10px ; background:grey' alt=''>",
            title: "Stop Speaking Button",
            group: "",
            position: {
                top: '50%',
                left: '50%',
                translateX: '-50%',
                translateY: '-50%',
            }

        },
        {
            content: "It will close the interaction screen and take you to Home page. <br><img src='https://pollydemo2022.s3.us-west-2.amazonaws.com/icons/interaction+popup.png'  style='width:290px' alt=''>",
            title: "Exit Button",
            target: "#cross1",
            // order: "8",
            // order: "5",
            order:"4",
            group: "",
        },

    ],
})

export function tour() {
    new tourguide.TourGuideClient({
        targetPadding: 15,
        exitOnEscape: false,
        exitOnClickOutside: true,
        dialogClass: 'tg-dialog-btn , tg-dialog-body , tg-dialog-close-btn',
        closeButton: true,
        showStepProgress: false,
    
        dialogClass: 'ppp',
        steps: [
            {
                // content: "<b> Press and hold the spacebar or the microphone button to speak. </b>",
                content: "Click the microphone button or press the spacebar once to speak.",
                title: "Microphone Button",
                target: "#voiceId", // target element
                order: "0",
    
                group: "",
    
            },
    
            {
                content: "Use this button to send your text.",
                title: "Send Button",
                target: "#sendId1", // target element
                order: "2",
                group: "",
            },
            {
                // content: "<b> Press and hold the spacebar or the microphone button to speak. </b>",
                content: "Use this text box to ask a question.",
                title: "Text Input Box",
                target: "#textTourBox", // target element
                order: "1",
                Image: 'src/assets/interaction/arrow-left.svg',
                group: "",
    
            },
            {
                target: "#tourSetting",
                order: "2",
                // content: "You can turn on/off captions, restart tour guide as well as access help page from the settings option. <br><img src='https://pollydemo2022.s3.us-west-2.amazonaws.com/icons/settings.png'  style='width:290px' alt=''>", 
                content: "You can turn on/off captions, restart tour guide.",
    
                title: "Settings",
                group: "",
                targetPadding: 25,
                dialogPlacement: 'top',
                position: "top"
    
            },
            {
    
                order: "3",
                // order: "4",
                content: "You can interrupt AI being while speaking by clicking this button. <br><img src='https://pollydemo2022.s3.us-west-2.amazonaws.com/icons/Stop+speaking.png'  style='width:280px; padding:10px ; background:grey' alt=''>",
                title: "Stop Speaking Button",
                group: "",
                position: {
                    top: '50%',
                    left: '50%',
                    translateX: '-50%',
                    translateY: '-50%',
                }
    
            },
            {
                content: "It will close the interaction screen and take you to Home page.",
                title: "Exit Button",
                target: "#cross1",
                // order: "8",
                order: "4",
                group: "",
            },
    
        ],
    })
    
    // if (localStorage.getItem('tg_tours_complete') !== null) {
    //     localStorage.removeItem('tg_tours_complete');
    //     console.log('Item tg_tours_complete deleted from localStorage');
    // }



    // tg.refresh()
    tg.start()

    console.log('tg===', tg)


    //  preloadImages(imagesToPreload);
}


// ---- for no school -----

export function noSchoolTour() {
    new tourguide.TourGuideClient({
        targetPadding: 15,
        exitOnEscape: false,
        exitOnClickOutside: true,
        dialogClass: 'tg-dialog-btn , tg-dialog-body , tg-dialog-close-btn',
        closeButton: true,
        showStepProgress: false,
    
        dialogClass: 'ppp',
        steps: [
            {
                // content: "<b> Press and hold the spacebar or the microphone button to speak. </b>",
                content: "Click the microphone button or press the spacebar once to speak.",
                title: "Microphone Button",
                target: "#voiceId", // target element
                order: "0",
    
                group: "",
    
            },
    
            {
                content: "Use this button to send your text.",
                title: "Send Button",
                target: "#sendId1", // target element
                order: "2",
                group: "",
            },
            {
                // content: "<b> Press and hold the spacebar or the microphone button to speak. </b>",
                content: "Use this text box to ask a question.",
                title: "Text Input Box",
                target: "#textTourBox", // target element
                order: "1",
                Image: 'src/assets/interaction/arrow-left.svg',
                group: "",
    
            },
            {
                target: "#tourSetting",
                order: "2",
                // content: "You can turn on/off captions, restart tour guide as well as access help page from the settings option. <br><img src='https://pollydemo2022.s3.us-west-2.amazonaws.com/icons/settings.png'  style='width:290px' alt=''>", 
                content: "You can turn on/off captions, restart tour guide.",
    
                title: "Settings",
                group: "",
                targetPadding: 25,
                dialogPlacement: 'top',
                position: "top"
    
            },
           
            {
    
                // order: "3",
                order: "3",
                content: "You can interrupt AI being while speaking by clicking this button. <br><img src='https://pollydemo2022.s3.us-west-2.amazonaws.com/icons/Stop+speaking.png'  style='width:280px; padding:10px ; background:grey' alt=''>",
                title: "Stop Speaking Button",
                group: "",
                position: {
                    top: '50%',
                    left: '50%',
                    translateX: '-50%',
                    translateY: '-50%',
                }
    
            },
            {
                content: "It will close the interaction screen and take you to Home page. <br><img src='https://pollydemo2022.s3.us-west-2.amazonaws.com/icons/interaction+popup.png'  style='width:290px' alt=''>",
                title: "Exit Button",
                target: "#cross1",
                // order: "8",
                order: "4",
                group: "",
            },
    
        ],
    })

    // tg.refresh()
    tg.start()

}

//---------- learning -----


// if (tg.isFinished('tour')) {
//     tg.deleteFinishedTour('tour');
//     tg.destroyListeners() 
//     console.warn('----===============================')
// }

export function LearningTour() {
    new tourguide.TourGuideClient({
        targetPadding: 15,
        exitOnEscape: false,
        exitOnClickOutside: true,
        dialogClass: 'tg-dialog-btn , tg-dialog-body , tg-dialog-close-btn',
        closeButton: true,
        showStepProgress: false,

        dialogClass: 'ppp',
        steps: [
            {
                // content: "<b> Press and hold the spacebar or the microphone button to speak. </b>",
                content: "Use the Previous button to navigate to the previous page.",
                title: "Previous Button",
                target: "#backTG", // target element
                order: "0",

                group: "",

            },

            {
                content: "Use the Next button to move to the next page.",
                title: "Next Button",
                target: "#nextTG", // target element
                order: "1",
                group: "",
            },
            {
                // content: "<b> Press and hold the spacebar or the microphone button to speak. </b>",
                content: "Click on the Download button to download the current presentation.",
                title: "Download Button",
                target: "#downloadTG", // target element
                order: "2",

                group: "",

            },
            {
                target: "#refreshTG",
                order: "3",
                content: "Click on the repeat button to replay the slide. ",

                title: "Repeat Button",
                group: "",
                targetPadding: 25,
                dialogPlacement: 'top',
                position: "top"

            },


        ],
    })

    // if (localStorage.getItem('tg_tours_complete') !== null) {
    //     localStorage.removeItem('tg_tours_complete');
    //     console.log('Item tg_tours_complete deleted from localStorage');
    // }
    // tg.refresh()
    tg.start()
    console.log(tg)

}


// ----test prep ---------

export function TestPrepTour() {
    new tourguide.TourGuideClient({
        targetPadding: 15,
        exitOnEscape: false,
        exitOnClickOutside: true,
        dialogClass: 'tg-dialog-btn , tg-dialog-body , tg-dialog-close-btn',
        closeButton: true,
        showStepProgress: false,

        dialogClass: 'ppp',
        steps: [
            {
                // content: "<b> Press and hold the spacebar or the microphone button to speak. </b>",
                content: "Select your answer by clicking on one of the options provided for the given question.",
                title: "Select Answer",
                target: "#testTour", // target element
                order: "0",

                group: "",

            },

            {
                content: "This will provide a brief explanation of your chosen answer, indicating whether it is correct or incorrect. <br><img src='https://pollydemo2022.s3.us-west-2.amazonaws.com/icons/explainBox.png'  style='width:290px' alt=''>",
                title: "Explanation Box",
                // target: "#explainTour", // target element
                order: "1",
                position: {
                    top: '50%',
                    left: '50%',
                    translateX: '-50%',
                    translateY: '-50%',
                },
                group: "",
            },
            {
                // content: "<b> Press and hold the spacebar or the microphone button to speak. </b>",
                content: "Click the Back button to move to the previous question, and use the Next button to proceed to the next question. <br><img src='https://pollydemo2022.s3.us-west-2.amazonaws.com/icons/buttonTest.png'  style='width:290px' alt=''>",
                title: "Navigation Buttons",
                // target: "#testBTNTOur", // target element
                order: "2",
                position: {
                    top: '50%',
                    left: '50%',
                    translateX: '-50%',
                    translateY: '-50%',
                },
                group: "",

            },

            //  {
            //      target: "#GuideMathametic", 
            //      order: "3",
            //       content: " This ------------", 

            //      title: "Mathematics Button",
            //      group: "",
            //      targetPadding: 25,
            //      dialogPlacement:  'top',
            //      position: "top"

            //  },

        ],
    })

    //  if (localStorage.getItem('tg_tours_complete') !== null) {
    //     localStorage.removeItem('tg_tours_complete');
    //     console.log('Item tg_tours_complete deleted from localStorage');
    // }
    tg.start()

}






// function preloadImages(images, callback) {
//     let loadedImages = 0;
//     const totalImages = images.length;

//     images.forEach(image => {
//         const img = new Image();
//         img.src = image;
//         img.onload = () => {
//             loadedImages++;
//             if (loadedImages === totalImages) {
//                 callback();
//             }
//         };
//     });
// }

// // Preload images
// const imagesToPreload = [
//     'https://pollydemo2022.s3.us-west-2.amazonaws.com/icons/settings.png'
// ];

