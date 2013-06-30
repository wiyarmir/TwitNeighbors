<?php

/**
 * Verify the user token and secret works. If successful we will be given the
 * details of the user. If not an error explaining why will be returned.
 *
 * Although this example uses your user token/secret, you can use
 * the user token/secret of any user who has authorised your application.
 *
 * Instructions:
 * 1) If you don't have one already, create a Twitter application on
 *      https://dev.twitter.com/apps
 * 2) From the application details page copy the consumer key and consumer
 *      secret into the place in this code marked with (YOUR_CONSUMER_KEY
 *      and YOUR_CONSUMER_SECRET)
 * 3) From the application details page copy the access token and access token
 *      secret into the place in this code marked with (A_USER_TOKEN
 *      and A_USER_SECRET)
 * 4) Visit this page using your web browser.
 *
 * @author themattharris
 */

require '../tmhOAuth.php';
require '../tmhUtilities.php';
$tmhOAuth = new tmhOAuth(array(
            'consumer_key' => 'maBcLkwXEvy52KgRqZg',
            'consumer_secret' => 'qi5L9C1VoHrAUWgYYImkhpnb09AsNSmtjC5S3MW6VIk',
            'user_token' => '12564382-oPvujyjUtpyurrT86dBqCxqmChoTspU1hOLnHTEjo',
            'user_secret' => '9IUaFXU02NRoZaXOqeDMavrqxb78iEou2rvNx3cE',
        ));

$code = $tmhOAuth->request('GET', $tmhOAuth->url('1/account/verify_credentials'));

if ($code == 200) {
  echo 'The access level of this token is: ' . $tmhOAuth->response['headers']['x_access_level'] . PHP_EOL;
  tmhUtilities::pr($tmhOAuth->response);
} else {
  tmhUtilities::pr(htmlentities($tmhOAuth->response['response']));
}