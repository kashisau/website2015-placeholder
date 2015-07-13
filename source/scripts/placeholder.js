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

var contact = function() {
    var contactForm = document.querySelector('.ContactForm');
    
    contactForm.addEventListener('click', function(toggleFormEvent) {
        var contactForm = toggleFormEvent.currentTarget;
        contactForm.classList.toggle('ContactForm--expanded');
    });
    
}();