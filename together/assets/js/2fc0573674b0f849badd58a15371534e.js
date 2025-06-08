// Be sure to include JS, CSS and Font dependancies into the parent pen, e.g. GSAP!

console.clear();

let meSelect = e => document.querySelector(e);
let meSelectAll = e => document.querySelectorAll(e);

let meToggle = meSelect('.me-toggle');
let mePanel = meSelect('.me-panel');
let codepenLink = meSelect('.me-profile__link');
let meDisplay = false; // is the panel displayed?
let meIsAnimating = false; // is the panel (alone, not the content) animating?
let firstLoad = true;
let closePanelTime = 0.6;

let tlContentIn = new TimelineMax({
    onComplete: function() {
        codepenLink.classList.remove('me-profile__link-disabled');
    }
});

initMeOpenAnim();


meToggle.onclick = () => {
    if (!meIsAnimating) {
        if (meDisplay === true) {
            meClose();
        } else if (meDisplay === false) {
            meOpen()
        }
    }
};

meToggle.onmouseenter = () => {
    if (!meDisplay && !meIsAnimating) {
        TweenMax.to('.me-toggle__base', 0.6, { scaleX: 2, ease: Elastic.easeOut.config(0.9, 0.5), transformOrigin: "left top" });
        TweenMax.to('.me-logo__device-small', 0.3, { x: 6, y: -12, ease: Power4.easeOut });
        TweenMax.to('.me-toggle__info', 0.3, { x: 26, opacity: 1, ease: Expo.easeOut });
        // TweenMax.to("#turbwave", 1, {
        //   attr:{"baseFrequency":2},
        //   repeat:-1,
        //   yoyo:true
        // });
    } else {
        showMeCloseHover();
    }
};

meToggle.onmouseleave = () => {
    if (!meDisplay & !meIsAnimating) {
        TweenMax.to('.me-toggle__base', 0.6, { scaleX: 1, ease: Elastic.easeOut.config(0.7, 0.5) });
        TweenMax.to('.me-logo__device-small', 1, { x: 0, y: 0, ease: Elastic.easeOut.config(1, 0.4) });
        TweenMax.to('.me-toggle__info', 0.3, { x: 0, opacity: 0, ease: Power4.easeOut });
        // TweenMax.to("#turbwave", 0.2, {
        // 	attr:{"baseFrequency":0}
        // 	// ease: Power2.easeOut
        // });
    } else {
        showMeCloseOut();
    }
};

codepenLink.onmouseenter = () => {
    if (meDisplay & !meIsAnimating) {
        TweenMax.to('.me-profile__logo-circ', 0.6, { scale: 1.2, ease: Elastic.easeOut });
        TweenMax.to('.me-profile__codepen', 0.7, { scale: 1.1, ease: Elastic.easeOut });
        TweenMax.to('.me-profile__text', 0.4, { scale: 0, ease: Expo.easeInOut });
    } else {

    }
};

codepenLink.onmouseleave = () => {
    if (meDisplay & !meIsAnimating) {
        TweenMax.to('.me-profile__logo-circ', 0.4, { scale: 1, ease: Elastic.easeOut.config(0.7, 0.5) });
        TweenMax.to('.me-profile__codepen', 0.5, { scale: 1, ease: Elastic.easeOut });
        TweenMax.to('.me-profile__text', 0.3, { scale: 1, ease: Expo.easeOut });
    } else {

    }
};

function meHideToggleDefault() {
    TweenMax.to('.me-toggle__info', 0.3, { x: 0, opacity: 0, ease: Power4.easeOut });
    let tl = new TimelineMax({});
    tl.to('.me-toggle__base', 0.4, { scaleX: 0, ease: Back.easeIn }, 0.2)
        .to('.me-logo__device-small', 0.4, { x: 100, y: -200, opacity: 0, ease: Power4.easeIn }, 0)
        .to('.me-logo__device-large', 0.4, { x: -135, y: 280, opacity: 0, ease: Power4.easeIn }, 0)
        // .to("#turbwave", 0.2, {
        // 	attr:{"baseFrequency":0}
        // 	// ease: Power2.easeOut
        // });
        // .to('.me-toggle__base', 0.4, { x: -60, ease: Expo.easeIn}, 0)
}

function meShowToggleDefault() {
    let showDelay = 0.4;
    if (!firstLoad) {
        showDelay = closePanelTime;
    }
    let tl = new TimelineMax({
        delay: showDelay,
        onComplete: function() {
            meIsAnimating = false;
        }
    });
    tl.set('.me-toggle', { display: 'flex' })
        .fromTo('.me-toggle__base', 0.7, { scaleX: 0 }, { scaleX: 1, ease: Elastic.easeOut.config(0.7, 0.5), transformOrigin: "left top" }, 0.10)
        .fromTo('.me-logo__device-small', 0.4, { x: 100, y: -200, opacity: 0 }, { x: 0, y: 0, opacity: 1, ease: Expo.easeOut }, 0.2)
        .fromTo('.me-logo__device-large', 0.4, { x: -135, y: 280, opacity: 0 }, { x: 0, y: 0, opacity: 1, ease: Expo.easeOut }, 0.2)
    firstLoad = false;
}


function meOpen() {
    meHideToggleDefault();
    TweenMax.to(mePanel, 0.6, {
        x: "0%",
        ease: Expo.easeInOut,
        delay: 0.7,
        onComplete: function() {
            meIsAnimating = false;
            meOpenAnim();
            showMeCloseIcon();
        }
    });
    meDisplay = true;
    meIsAnimating = true;
}

function meClose() {
    meShowToggleDefault();
    TweenMax.to(mePanel, closePanelTime, {
        x: "-101%",
        ease: Expo.easeInOut,
        delay: 0.3,
        onComplete: function() {

        }
    });
    meCloseAnim();
    meDisplay = false;
    meIsAnimating = true;
    hideMeCloseIcon();
    codepenLink.classList.add('me-profile__link-disabled');
}

function meOpenAnim() {
    TweenMax.set('.me-panel__content', { autoAlpha: 1 });
    tlContentIn.restart();
}

function initMeOpenAnim() {

    // TweenMax.set('.me-panel__content', { autoAlpha: 1 });
    TweenMax.set('.me-panel__content', { perspective: 300 });
    TweenMax.set(['.me-thanks__title', '.me-title'], { transformStyle: "preserve-3d" });
    TweenMax.set(['.me-profile__base-circ', '.me-profile__logo-circ', '.me-profile__codepen'], { transformOrigin: "50% 50%" });
    TweenMax.set('.me-profile__text', { transformOrigin: "50% 48px" });

    tlContentIn.fromTo('.me-logo__device', 2, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: Expo.easeOut }, 0)
        .fromTo('.me-title', 0.6, { rotationX: 90, opacity: 0 }, { rotationX: 0, opacity: 1, transformOrigin: "center center -45", ease: Expo.easeOut, force3D: true }, 0.1)
        .fromTo('.me-thanks__line1', 0.6, { scaleX: 0 }, { scaleX: 1, ease: Expo.easeOut }, 0.2)
        .fromTo('.me-thanks__line2', 0.6, { scaleX: 0 }, { scaleX: 1, ease: Expo.easeOut }, 0.3)
        .fromTo('.me-thanks__title', 1.0, { rotationX: 90, opacity: 0 }, { rotationX: 0, opacity: 1, transformOrigin: "center center -90", ease: Expo.easeOut, force3D: true }, 0.4)
        .fromTo('.me-intro', 1, { y: 40, opacity: 0 }, { y: 0, opacity: 1, ease: Expo.easeOut }, 0.7)
        .fromTo('.me-line-vert', 0.5, { scaleY: 0 }, { scaleY: 1, ease: Expo.easeIn, transformOrigin: "center top" }, "-=1.6")
        .fromTo('.me-links__line', 0.5, { scaleX: 0 }, { scaleX: 1, ease: Expo.easeOut, transformOrigin: "center center" }, "-=1.1")
        .fromTo('.me-profile__base-circ', 0.5, { scale: 0 }, { scale: 1, ease: Expo.easeOut }, "-=1.0")
        .fromTo('.me-profile__logo-circ', 0.8, { scale: 0 }, { scale: 1, ease: Elastic.easeOut.config(0.7, 0.5) }, "-=0.9")
        .fromTo('.me-profile__codepen', 0.5, { scale: 0 }, { scale: 1, ease: Elastic.easeOut.config(0.7, 0.5) }, "-=0.7")
        .fromTo('.me-profile__text', 0.5, { rotation: 180, opacity: 0 }, { rotation: 0, opacity: 1, ease: Elastic.easeOut.config(0.7, 0.5) }, "-=0.6")
        .staggerFromTo('.me-links__link', 0.8, { y: 20, opacity: 0 }, { y: 0, opacity: 1, ease: Expo.easeOut }, 0.05, "-=1.0")
        .pause();

}

function meCloseAnim() {
    TweenMax.to('.me-panel__content', 0.3, { autoAlpha: 0 });
}

function showMeCloseIcon() {
    TweenMax.set('.me-close', { autoAlpha: 1 })
    TweenMax.set(['.me-close__line1', '.me-close__line2'], { transformOrigin: "center center" })
    TweenMax.fromTo('.me-close__line1', 0.8, { opacity: 0, rotation: -90, scale: 0 }, { opacity: 1, rotation: 45, scale: 1, ease: Elastic.easeOut.config(1, 0.4) })
    TweenMax.fromTo('.me-close__line2', 0.8, { opacity: 0, rotation: 90, scale: 0 }, { opacity: 1, rotation: -45, scale: 1, ease: Elastic.easeOut.config(1, 0.4) })
}

function hideMeCloseIcon() {
    // TweenMax.set(['.me-close__line1', '.me-close__line2'], { transformOrigin: "50% 50%" })
    TweenMax.fromTo('.me-close__line1', 0.4, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0, ease: Expo.easeIn })
    TweenMax.fromTo('.me-close__line2', 0.4, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0, ease: Expo.easeIn })
}

function showMeCloseHover() {
    TweenMax.to('.me-close', 0.6, { rotation: 180, ease: Expo.easeInOut, transformOrigin: "50% 50%" });
}

function showMeCloseOut() {
    TweenMax.to('.me-close', 0.6, { rotation: -180, ease: Expo.easeInOut, transformOrigin: "50% 50%" });
}

meShowToggleDefault();


// Define our viewportWidth variable
var viewportWidth;

// Set/update the viewportWidth value
var setViewportWidth = function() {
    viewportWidth = window.innerWidth || document.documentElement.clientWidth;
}

// Log the viewport width into the console
var logWidth = function() {
    if (viewportWidth > 800) {
        TweenMax.set(meToggle, { display: 'flex' });
    } else {
        TweenMax.set(meToggle, { display: 'none' });
    }
}

// Set our initial width and log it
setViewportWidth();
logWidth();

// On resize events, recalculate and log
window.addEventListener('resize', function() {
    setViewportWidth();
    logWidth();
}, false);