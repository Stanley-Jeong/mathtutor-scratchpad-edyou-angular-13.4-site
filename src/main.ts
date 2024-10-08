import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
//import * as Sentry from "@sentry/angular-ivy";


// Sentry.init({
//   // dsn: "https://e721cc67a6fee66e4ea69ad569170295@o4507298420228096.ingest.us.sentry.io/4507384416894976",
//   integrations: [
//     Sentry.browserTracingIntegration(),
//     Sentry.replayIntegration(),
//   ],
//   ignoreErrors: ['Cannot read properties of null','Cannot read properties of undefined','Cannot set properties of null',
//   'undefined is not an object','null is not an object','Cannot set properties of null','The object is in an invalid state',
//   'No value accessor for form control with unspecified name attribute', /^Exact Match Message$/],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, //  Capture 100% of the transactions
//   // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//   tracePropagationTargets: ["https://edyou.com", /^https:\/\/yourserver\.io\/api/],
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });


if (environment.production) {
  enableProdMode();
}

function bootstrap() {
     platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
   };


if (document.readyState === 'complete') {
  bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}

