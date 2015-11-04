/**
 * Kashi's Website 2015 (Placeholder)
 *
 * This is to ensure our fade-in effect only happens once. The code contained
 * was taken from MDN and modified to suit. The original method can be found at:
 *     https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 **/
if (! (document.cookie.replace(/(?:(?:^|.*;\s*)hasVisitedBefore\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true")) {
    var placeholder = document.querySelector('.Placeholder');
    placeholder.className = placeholder.className + ' Placeholder--dontAnimate';
}
document.cookie = "hasVisitedBefore=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";

// Google Analytics Tracking
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-69736403-1', 'auto');
ga('send', 'pageview');