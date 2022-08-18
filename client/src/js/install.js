const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    console.log("👍", "beforeinstallprompt", event);
    window.deferredPrompt = event;
    // show the button
    butInstall.classList.toggle("hidden", false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
    
    console.log("👍", "butInstall-clicked");

    const prompt = window.deferredPrompt;
    if (!prompt) {
        // deferred prompt isnt available
        return;
    }
    // show install prompt
    prompt.prompt();
    // Log the result
    const result = await prompt.userChoice;
    console.log("👍", "userChoice", result);
    window.deferredPrompt = null;
    // hide the button 
    butInstall.classList.toggle("hidden",true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
    console.log("👍", "appinstalled", event);
    // hide the button
    butInstall.classList.toggle("hidden", true);
    // Clear the deferredPrompt so it can be garbage collected
    window.deferredPrompt = null;
});
