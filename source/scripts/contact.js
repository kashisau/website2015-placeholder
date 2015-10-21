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
com.kashis.frontend.contact = function(){
	
	var ContactAPI = {};
	
	var API_URL = 'http://localhost:3000/v1',
		PATH_VALIDATE = '/contact/validate.json',
		PATH_SUBMIT = '/contact/send.json';
	
	var _controls = {
		form: '.ContactForm-form',
		nameInput: '.ContactForm-form input[name="name"]',
		emailInput: '.ContactForm-form input[name="email"]',
		messageTextarea: '.ContactForm-form textarea[name="body"]',
		submitBtn: '.ContactForm-submitBtn'	
	},
	_authToken,
	_submissionJqXhr,
	$ = jQuery;
	
	/**
	 * Gathers the elements involved in making the contact form function, 
	 * binding event handlers as necessary.
	 */
	function _init() {
		var control,
			auth = com.kashis.frontend.auth;

		for (control in _controls)
			if (_controls.hasOwnProperty(control))
				_controls[control] = $(_controls[control])

		_controls.form.on('submit', _interceptSubmission);
		auth.observeAuthTokenChanges(
			function(newToken) {_authToken = newToken;},
			this
		);
	}
	
	/**
	 * Catches a native POST submission and replaces it with an AJAX process
	 * so that the API service can be used instead. As this is an event handler
	 * the submission method is surrounded by try..catch so that the navigation
	 * is cancelled regardless of success.
	 */
	function _interceptSubmission(submitEvent) {
		try {
			ContactAPI.submit();
		} catch (e) {}
		return false;
	}
	
	/**
	 * Processes the contact form submission using this library (rather than a
	 * typical HTTP POST). This method does not handle any events nor their
	 * cancellation (see _interceptSubmission).
	 */
	ContactAPI.submit = function() {
		var contactData;
		
		try {
			contactData = ContactAPI.getSubmissionData();
		} catch (e) {
			_controls.form.toggleClass('ContactForm--error', true);
			return false;
		}
		
		_controls.form.addClass('ContactForm--sending');
		_submissionJqXhr = $.ajax({
			url: API_URL + PATH_SUBMIT,
			type: 'post',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(contactData),
			headers: {
				"Authentication-token" : _authToken
			}
		});
		_submissionJqXhr.done(_sendSuccess);
		_submissionJqXhr.fail(_sendFail);
		
		return false;
	}
	
	/**
	 * Gathers the current values within the contact form and assembles them
	 * into an object wit key-value pairs.
	 * If there are validation errors (front-end only) then a JavaScript Error
	 * is thrown.
	 * @throws Error
	 */
	ContactAPI.getSubmissionData = function() {
		var name,
			email,
			body;
		
		name = _controls.nameInput.val();
		email = _controls.emailInput.val();
		body = _controls.messageTextarea.val();
		
		return {
			name: name,
			email: email,
			body: body
		}
	}
	
	// jQuery AJAX done
	function _sendSuccess(response, status, jqXhr) {
		_controls.form.removeClass('ContactForm--sending');

		console.log(response);
	}
	
	/**
	 * Promise implementation for the jQuery AJAX submission error. This method
	 * attempts to identify the error, conveying to the user the nature of the
	 * issue, defaulting to a generic 'server error' state.
	 * @param jqXhr jqXHR	The jQuery AJAX object that provides request data.
	 * @param textStatus string	The error title returned from the server.
	 * @param errorThrown string	The name of the error that has been thrown.
	 */
	function _sendFail(jqXhr, textStatus, errorThrown) {
		try {
			var serverResponse = jqXhr.responseJSON;
		} catch (error) {
			_controls.form.addClass('ContactForm--systemError');
		} finally {
			_controls.form.removeClass('ContactForm--sending');
			// Short-circuit if there's no data from the server.
			if (typeof(serverResponse) === "undefined")
				return false;
		}
		if (serverResponse.errors.code === "validation_failed")
			_showValidationErrors(serverResponse.errors);		
	}
	
	/**
	 * Updates the form to display the erroneous inputs to the user so that she
	 * may check them and submit again. This method takes the server's series
	 * of validation tests and iterates through them for each input.
	 * @param validationErrors {bool[]}	A series of validation tests that have
	 * 									been conducted by the contact send API.
	 */
	function _showValidationErrors(validationErrors) {
		var validationResults = validationErrors.meta,
			input;
			
		for (input in validationErrors.meta) {
			var inputResults = validationResults[input],
				inputResult = function(inputResults) {
					var i;
					for (i in inputResults) {
						if (inputResults.hasOwnProperty(i)
							&& inputResults[i] === false)
							return false;
					}
					return true;
				}(inputResults),
				formElement = _controls.form.find('[name="' + input + '"]');
			formElement.toggleClass('is-failingValidation', !inputResult);						
		}
	}
	
	$(document).ready(_init);
	
	return ContactAPI;
}();