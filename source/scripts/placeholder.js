/**
 * Kashi's Website 2015 (Placeholder)
 *
 * This is to ensure our fade-in effect only happens once. The code contained
 * was taken from MDN and modified to suit. The original method can be found at:
 *     https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 **/

var cookie = function() {
    if (!(document.cookie.replace(/(?:(?:^|.*;\s*)hasVisitedBefore\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true")) {
        var placeholder = document.querySelector('.Placeholder');
        placeholder.className = placeholder.className + ' Placeholder--dontAnimate';
    }
    document.cookie = "hasVisitedBefore=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
}();

/**
 * Button treatment. This snippet disables any dragging of buttons (including
 * those elements that should behave like buttons).
 */
var buttons = function() {
    var pageButtons = document.querySelectorAll('.Buttonesque, .Button');
    for (var button = 0, buttons = pageButtons.length; button < buttons; button++) {
        pageButtons[button].addEventListener('dragstart', 
            function(dragEvent) { dragEvent.preventDefault(); }
        ); 
    }
}();

/**
 * This contact form handler manages simple class switching to effect the state
 * of the contact form. All animations are done using CSS (see the sourcemaps
 * associated with the styles-all.css file).
 */
var contact = function() {
    var contactAPI = {};

    var contactForm = document.querySelector('.ContactForm'),
        contactFormLaunchBtn = document.querySelector('.ContactForm-launchBtn'),
        modalCloseBtn = document.querySelector('.ModalCloseBtn'),
        contactFormForm = document.querySelector('.ContactForm-form');

    // Expands the contact form modal.
    contactFormLaunchBtn.addEventListener('click', function(toggleFormEvent) {
        //var contactForm = toggleFormEvent.currentTarget;
        toggleFormEvent.preventDefault();
        contactForm.classList.toggle('ContactForm--expanded');
    });

    // Closes any model in which the button exists.
    modalCloseBtn.addEventListener('click', function(clickEvent) {
        clickEvent.preventDefault();
        contactForm.classList.remove('ContactForm--expanded');
    });

    // Check to see if the user is furiously pressing escape to kill it with
    // fire (the pop-up modal).
    document.addEventListener('keyup', function(keyPressEvent) {
        var escapePressed = keyPressEvent.which === 27;
        if (!escapePressed) return true;
        
        if (contactForm.classList.contains('ContactForm--expanded')) {
            contactForm.classList.remove('ContactForm--expanded');
        }
    });

    // Removes the classes that have been put in place to suppress page build
    // animations.
    window.addEventListener('load', function load() {
        window.removeEventListener('load', load, false);
        setTimeout(function() {
            document.body.classList.remove('load');
        }, 300);

    }, false);

    // Re-route the request via AJAX (cancelling the initial submission).
    contactFormForm.addEventListener('submit', function(submitEvent) {
        submitEvent.preventDefault();
        submitEvent.stopPropagation();

        return false;
    });



    return contactAPI;
}();