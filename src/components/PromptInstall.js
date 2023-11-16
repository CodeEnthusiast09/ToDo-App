// Function to handle the custom install prompt
export const handleInstallPrompt = (deferredPrompt) => {
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }

      deferredPrompt = null;
    });
  }
};
