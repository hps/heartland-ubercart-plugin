/*global jQuery, hps, securesubmit_public_key*/
jQuery(function () {
  var form = jQuery('.uc-cart-checkout-form');
  var submitButton = form.find('#edit-continue');
  var buttonClicked = false;
  var prep = function () {
    jQuery("#payment-details").hide();
    jQuery(".form-item-panes-payment-securesubmit-token").hide();
  };

  prep();
  form.ajaxComplete(prep);

  submitButton.click(function (e) {
    if (buttonClicked === false) {
      e.preventDefault();
    } else {
      return true;
    }

    var cardSelector = '[id^="edit-panes-payment-securesubmit-card-number"]';
    var cvcSelector = '[id^="edit-panes-payment-securesubmit-card-cvc"]';
    var monthSelector = '[id^="edit-panes-payment-securesubmit-card-month"]';
    var yearSelector = '[id^="edit-panes-payment-securesubmit-card-year"]';
    var tokenSelector = '[id^="edit-panes-payment-securesubmit-token"]';
    var card = jQuery(cardSelector).val().replace(/\D/g, '');
    var cvc = jQuery(cvcSelector).val();
    var month = jQuery(monthSelector).val();
    var year = jQuery(yearSelector).val();

    hps.tokenize({
      data: {
        public_key: securesubmit_public_key,
        number: card,
        cvc: cvc,
        exp_month: month,
        exp_year: year
      },
      success: function (response) {
        jQuery(tokenSelector).val(response.token_value);

        // Construct a fake number with the correct last four.
        // Requires uc_credit 'Validate credit card numbers
        // at checkout' option to be disabled.
        jQuery('[id^="edit-panes-payment-details-cc-number"]')
          .val('411111111111' + response.card.number.replace(/\*/g, ''));

        // Work magic on expiration date select nodes
        jQuery('[name="panes[payment][details][cc_exp_month]"] option')
          .removeAttr('selected')
          .filter(function () {
            return parseInt(jQuery(this).val(), 10) === parseInt(response.exp_month, 10);
          })[0]
          .selected = true;
        jQuery('[name="panes[payment][details][cc_exp_year]"] option')
          .removeAttr('selected')
          .filter(function () {
            return parseInt(jQuery(this).val(), 10) === parseInt(response.exp_year, 10);
          })[0]
          .selected = true;

        // Dummy CVV
        jQuery('[id^="edit-panes-payment-details-cc-cvv"]')
          .val("123");

        buttonClicked = true;
        submitButton.click();
      },
      error: function (response) {
        jQuery('#uc_securesubmit_messages').removeClass("hidden");
        jQuery('#uc_securesubmit_messages').text(response.message);
        buttonClicked = false;
      }
    });

    return false;
  });
});
