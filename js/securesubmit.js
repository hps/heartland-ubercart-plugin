
jQuery(function() {
    jQuery("#payment-details").hide();
    jQuery(".form-item-panes-payment-securesubmit-token").hide();

    var form = jQuery('#uc-cart-checkout-form');
    var submitButton = form.find('#edit-continue');

    var buttonClicked = false;

    submitButton.click(function(e) {
        if (buttonClicked == false) {
            e.preventDefault();
        } else {
            return true;
        }

        var card = jQuery('#edit-panes-payment-securesubmit-card-number').val().replace(/\D/g, '');
        var cvc = jQuery('#edit-panes-payment-securesubmit-card-cvc').val();
        var month = jQuery('#edit-panes-payment-securesubmit-card-month').val();
        var year = jQuery('#edit-panes-payment-securesubmit-card-year').val();

        hps.tokenize({
            data: {
                public_key: securesubmit_public_key,
                number: card,
                cvc: cvc,
                exp_month: month,
                exp_year: year
            },
            success: function(response) {
                jQuery("#edit-panes-payment-securesubmit-token").val(response.token_value);

                jQuery("#edit-panes-payment-details-cc-number").val('4111111111111111');
                jQuery("#edit-panes-payment-details-cc-exp-month").val(month);
                jQuery("#edit-panes-payment-details-cc-exp-year").val(year);
                jQuery("#edit-panes-payment-details-cc-cvv").val("123");

                buttonClicked = true;
                submitButton.click();
            },
            error: function(response) {
                jQuery('#uc_securesubmit_messages').removeClass("hidden");
                jQuery('#uc_securesubmit_messages').text(response.message);
                buttonClicked = false;
            }
        });

        return false;
    });
});