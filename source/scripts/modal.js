/* global jQuery */
/**
 * Modal window handler
 * 
 * Manages modal windows layered within the DOM, making them available across
 * the website, indepedently of other components featured on the site.
 * Requires jQuery for AJAX and DOM manipulation.
 * @version 0.1.0
 * @author Kashi Samaraweera <kashi@kashis.com.au>
 */
/** Namespacing */
var com = com || {};
com.kashis = com.kashis || {};
com.kashis.frontend = com.kashis.frontend || {};
/** Payload */
com.kashis.frontend.modal = function(){
	
	var ModalAPI = {};
	
	var _controls = {
		body: 'body',
		modals: '.Modal',
		openBtns: '.Modal-openBtn',
		closeBtns: '.Modal-closeBtn'
	},
	$ = jQuery;
	
	/**
	 * Gathers the elements involved in displaying and hiding modal pop-ups,
	 * binding event handlers to them as necessary.
	 */
	function _init() {
		var control;
		for (control in _controls)
			if (_controls.hasOwnProperty(control))
				_controls[control] = $(_controls[control])
		
		_controls.openBtns.each(function (i, e) { ModalAPI.bindTrigger(e) });
		_controls.closeBtns.each(function (i, e) { ModalAPI.bindTrigger(e) });
		
		_controls.body.removeClass('load');
	}
	
	/**
	 * Takes a DOM element that functions as a trigger and binds it to its
	 * corresponding Modal component.
	 * This method will look for a data-modal elemental attribute, falling back
	 * to searching for siblings of the trigger. A failure to find an suitable
	 * Modal element will raise an Error.
	 * @param trigger Element	A DOM element that triggers the display of a
	 * 							modal pop-up. This element must either be an
	 * 							immediate sibling of a Modal object or specify
	 * 							the corresponding modal using the data-modal
	 * 							attribute.
	 * @param eventName string	(Optional) event to bind the trigger to.
	 * 							Default 'click'.
	 * @throws ReferenceError	Thrown if the corresponding modal object could
	 * 							not be identified.
	 */
	ModalAPI.bindTrigger = function(trigger, eventName) {
		var trigger = $(trigger),
			targetModal = trigger.data('targetModal'),
			triggerOpen = ! trigger.hasClass('Modal-closeBtn'),
			modal,
			bindEvent = eventName || 'click';
		
		if (targetModal) {
			modal = $(targetModal);
		} else {
			// The corresponding modal was not identified, lookup the heirarchy
			// for a parental modal window.
			modal = trigger.parents('.Modal');
		}
		
		if (modal.length === 0)
			throw new ReferenceError('The Modal trigger did not correctly ' +
				'identify its correspodning Modal object, nor was a Modal ' +
				'found as any of its parents.');

		trigger.data('modal', modal);
		if (triggerOpen)
			trigger.on(bindEvent, _triggerModal);
		else
			trigger.on(bindEvent, _closeModal);
	};
	
	/**
	 * Event handler for displaying a Modal pop-up. This will use the data
	 * procured in the bindTrigger method to determine which Modal to display.
	 * @param triggerEvent Event	The jQuery-wrapped Event containing data
	 * 								about the action taken by the user. This is
	 * 								used to figure out which trigger has been
	 * 								activated and subsequently which Modal to
	 * 								display.
	 */
	function _triggerModal(triggerEvent) {
		var trigger = $(triggerEvent.target),
			modal = trigger.data('modal');
		ModalAPI.showModal(modal);
		return false;
	}
	
	function _closeModal(closeEvent) {
		var closeInitiator = $(closeEvent.target),
			modal = closeInitiator.data('modal');
			
		ModalAPI.hideModal(modal);
		return false;
	}
	
	/**
	 * Applies the Modal--active class of a Modal element.
	 * @param modal Element	The DOM element of the modal being toggled.
	 */
	ModalAPI.showModal = function(modal) {
		var modal = $(modal);
		modal.toggleClass('Modal--active', true);
	}
	
	/**
	 * Removes the Modeal--active class from a Modal element.
	 * @param modal Element	The DOM element of the modal being toggled.
	 */
	ModalAPI.hideModal = function(modal) {
		var modal = $(modal);
		modal.toggleClass('Modal--active', false);
	}
	
	// Run the initialisation process once the DOM is ready.
	$(document).ready(_init);
	
	return ModalAPI;
}();