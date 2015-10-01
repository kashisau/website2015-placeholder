/**
 * Front-end authenticator
 * 
 * In order for this website to interface with the API server the client must
 * be authenticated to an appropriate level by the server. This library is used
 * to automatically gather an authentication token and make it available to
 * other modules of the front-end.
 * @version 0.1.0
 * @author Kashi Samaraweera <kashi@kashis.com.au>
 */
/** Namespacing */
var com = com || {};
com.kashis = com.kashis || {};
com.kashis.frontend = com.kashis.frontend || {};
/** Payload */
com.kashis.frontend.auth = (function(){
	
	var AuthAPI = {},
		$ = jQuery;
	
	var API_SERVER_URL = 'http://localhost:3000/v1',
		PATH_AUTH_TOKEN = '/auth/tokens.json';
		
	var authToken;
	
	// 1. Check to see if there's an existing authentication token
	function _init() {
		authToken = localStorage.getItem('authenticationToken');
		if (typeof(authToken) === "undefined")
			authToken = _newAuthToken();
	}
	/**
	 * Default method for requesting a new authentication token from the API
	 * server. This method will request just a basic authentication token
	 * without using any special privileges.
	 * @returns string	Returns the server-generated authentication token as a
	 * 					JWT string.
	 */
	function _newAuthToken() {
		var tokenRequestUrl = API_SERVER_URL + PATH_AUTH_TOKEN;
		localStorage.removeItem('authenticationToken');
		$.ajax({
			url: tokenRequestUrl,
			error: _newAuthTokenError,
			success: _newAuthTokenSuccess
		});
	}
	
	/**
	 * Error handling callback method for the authentication token request.
	 * @param jqXhr object	jQuery's AJAX request object.
	 * @param textStatus string	The AJAX error's status code (HTTP status).
	 * @param errorMessage string	The actual error message supplied by the
	 * 								server responding to the request.
	 */
	function _newAuthTokenError(jqXhr, textStatus, errorMessage) {
		console.log('Error requesting a new authentication token: ' +
			textStatus + ': ' + errorMessage);
	}
	
	/**
	 * New authentication token callback for when the server responds with an
	 * authentication token for use. This method will process the response and
	 * save the generated token into the localStorage of the client.
	 */
	function _newAuthTokenSuccess(data, textStatus, jqXhr) {
		var tokenString = data.authenticationToken;
		authToken = tokenString;
		localStorage.setItem('authenticationToken', tokenString);
	}
	
	/**
	 * Retrieves the current authentication token that has been assigned to 
	 * the client, or requests a new one from the server.
	 * This method takes an optional set of parameters that may be used with
	 * the API token request to issue a token with greater privileges.
	 * @param authTokenCallback function(string)	A function that will be
	 * 												called once an
	 * 												authentication token has
	 * 												been initialised.
	 * @param authSettings {*}	(Optional) set of parametres that can be
	 * 							supplied to the API server when requesting a
	 * 							new authentication token.
	 */
	AuthAPI.getAuthenticationToken = function(authTokenCallback, 
		authSettings) {
		
	}
	// 2. Request a new auth token
	
	// 3. Save the auth token for local availability
	
	// 4. Notify subscribers of authentication token availability
	
	// a. (Optional) allow requests for credentialled authentication tokens.

})();