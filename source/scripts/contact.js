/**
 * Contact handler
 * 
 * This object interfaces with api.kashis.com.au for contact form submissions,
 * processing validation information and also submitting the eventual entry.
 * Requires jQuery for AJAX and DOM manipulation.
 * @version 0.1.0
 * @author Kashi Samaraweera <kashi@kashis.com.au>
 */
/** Namespacing */
var com = com || {};
com.kashis = com.kashis || {};
com.kashis.frontend = com.kashis.frontend || {};
/** Payload */
com.kashis.frontend.contact = (function(){
	
	var ContactAPI = {};
	
	var API_URL = 'http://localhost:3000/v1',
		PATH_TOKEN = '/auth/tokens.json',
		PATH_VALIDATE = '/contact/validate.json',
		PATH_SUBMIT = '/contact/send.json';
	
	var _controls = {
		form: '.ContactForm-form',
		submitBtn: '.ContactForm-submitBtn'	
	},
	$ = jQuery;
	
	/**
	 * Gathers the elements involved in making the contact form function, 
	 * binding event handlers as necessary.
	 */
	function _init() {
		var control;
		for (control in _controls)
			if (_controls.hasOwnProperty(control))
				_controls[control] = $(_controls[control])

		_controls.form.on('submit', _interceptSubmission);
	}
	
	/**
	 * Catches a native POST submission and replaces it with an AJAX process
	 * so that the API service can be used instead.
	 */
	function _interceptSubmission(submitEvent) {
		ContactAPI.submit();
		return false;
	}
	
	/**
	 * Processes the contact form submission using this library (rather than a
	 * typical HTTP POST). This method does not handle any events nor their
	 * cancellation (see _interceptSubmission).
	 */
	ContactAPI.submit = function() {
		console.log("Submitting!");
		$.ajax({
			url: URL_SUBMIT,
			method: 'POST'
		});
	}
	
	// jQuery AJAX done
	function _sendDone() {
		
	}
	
	// jQuery AJAX fail
	function _sendFail() {
		
	}
	
	$(document).ready(_init);
	
}());