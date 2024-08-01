if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (let registration of registrations) {
        registration.unregister().then(() => {
          console.log('Service worker unregistered:', registration);
        });
      }
    }).catch(error => {
      console.error('Error unregistering service workers:', error);
    });
}else{
    console.log('There is no service workder')
}