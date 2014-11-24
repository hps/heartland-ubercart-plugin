## SecureSubmit UberCart Payment Gateway

This plugin allows Drupal 7.x users running Ubercart 3.x to take secure, PCI-DSS friendly credit card payments using Heartland Payment Systems.

## Installation
1. Add the SecureSubmit folder to the drupal modules folder.
2. Navigate to the store's Administration page, Configuration section, and enable the gateway under the Payment Gateways. (admin/store/settings/payment/edit/gateways)
3. Configure your public and secret API keys.
4. Download and install the latest version of the SecureSubmit PHP SDK from https://github.com/SecureSubmit/heartland-php and place it in sites/all/libraries/securesubmit

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request