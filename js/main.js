
//#region ===== HELPERS =====

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

//#endregion



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






//#region SLIDESHOWS

// Init
function initSlideshows() {
    document.querySelectorAll('.slideshow-container').forEach(container => {
        // Set index to 0 for every slideshow on page
        container.dataset.slideIndex = "0"; 
    });
}

initSlideshows();

function changeSlide(n, btn, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    // Find the specific container this button belongs to
    const container = btn.closest('.slideshow-container');
    const wrapper = container.querySelector('.slides-wrapper');
    const slides = container.querySelectorAll('.slide');
    
    if (!wrapper || slides.length === 0) return;

    // Get the current index for this slideshow
    let currentIndex = parseInt(container.dataset.slideIndex || 0);

    // New index
    let newIndex = currentIndex + n;

    // Looping
    if (newIndex >= slides.length) { newIndex = 0; }
    if (newIndex < 0) { newIndex = slides.length - 1; }

    // Save
    container.dataset.slideIndex = newIndex;

    // Move
    wrapper.style.transform = `translateX(-${newIndex * 100}%)`;
}
//#endregion