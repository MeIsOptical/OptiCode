
// Function to dynamically load scripts
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}

// Function to add a stylesheet
function loadCSS(href, callback) {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;

    if (callback) {
        link.onload = callback;
        link.onerror = () => console.error(`Failed to load CSS: ${href}`);
    }

    document.head.appendChild(link);
}



// STYLESHEETS
loadCSS("styles/animations.css");



// AOS (SMOOTH TRANSITIONS)
loadCSS("https://unpkg.com/aos@2.3.1/dist/aos.css", () => {
    
    console.log("CSS Loaded. Now fetching Script...");

    loadScript("https://unpkg.com/aos@2.3.1/dist/aos.js", () => {
        console.log("Script Loaded. Initializing AOS...");
        
        AOS.init({ 
            offset: 100, 
            delay: 100 
        });
    });

});



// LENIS (SMOOTH SCROLL)
loadScript("https://unpkg.com/lenis@1.1.20/dist/lenis.min.js", () => {
    console.log("Lenis Loaded");
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
});




// DISPLAY HEADER & FOOTER
fetch("parts/header.html")
    .then(response => response.text())
    .then(data => {
         document.getElementById("header-placeholder").innerHTML = data;
    });

fetch("parts/footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer-placeholder").innerHTML = data;
    });