<?php

include '../includes/tmhOauth/tmhOAuth.php';

$tmhOAuth = new tmhOAuth(array(
            'consumer_key' => 'maBcLkwXEvy52KgRqZg',
            'consumer_secret' => 'qi5L9C1VoHrAUWgYYImkhpnb09AsNSmtjC5S3MW6VIk',
            'user_token' => '12564382-oPvujyjUtpyurrT86dBqCxqmChoTspU1hOLnHTEjo',
            'user_secret' => '9IUaFXU02NRoZaXOqeDMavrqxb78iEou2rvNx3cE',
        ));

if (!isset($_GET['method'])) {
    die('{}');
}
switch ($_GET['method']) {
    case 'friendslist':
        if (isset($_GET['cursor'])) {
            $cursor = $_GET['cursor'];
        } else {
            $cursor = -1;
        }
        if (isset($_GET['screen_name'])) {
            $from = $_GET['screen_name'];
        } else {
            $from = 'twitter';
        }
        $databack = get_friend_list($tmhOAuth, $from, $cursor);
        break;
    case'userinfo':
        if (isset($_GET['screen_name'])) {
            $from = $_GET['screen_name'];
        } else {
            $from = 'twitter';
        }
        $databack = get_user_info($tmhOAuth, $from);
        break;
    default:
        die('[{}]');
        break;
}



echo json_encode($databack);
exit();

function check_rate_limit($response) {
    $headers = $response['headers'];
    if ($headers['X-Rate-Limit-Remaining'] == 0) {
        http_response_code(206);
        $reset = $headers['X-Rate-Limit-Reset'];
        $sleep = $reset - time();
        //var_dump($headers);
        die(json_encode(array('error' => 'Rate Limited', 'reset' => $reset, 'sleep' => $sleep)));
    }
}

function get_friend_list($oa, $from, $cursor) {
    $oa->request('GET', $oa->url('1.1/friends/list.json'), array(
        'cursor' => $cursor,
        'screen_name' => $from
    ));
    
    check_rate_limit($oa->response);
    
    if ($oa->response['code'] == 200) {
        $data = json_decode($oa->response['response'], true);
        $databack = array();
        $databack['users'] = array();
        $cursor = $data['next_cursor_str'];
        $databack['nextcursor'] = $cursor;

        foreach ($data['users'] as $user) {
            $u = array(
                'screen_name' => $user['screen_name'],
                'id' => $user['id_str'],
                'followers' => $user['followers_count'],
                'friends' => $user['friends_count']
            );
            $databack['users'][] = $u;
        }
    } else {
        return $oa->response['response'];
    }
    return $databack;
}

function get_user_info($oa, $from) {
    $oa->request('GET', $oa->url('1.1/users/show.json'), array(
        'screen_name' => $from
    ));
    
    check_rate_limit($oa->response);
    
    if ($oa->response['code'] == 200) {
        $data = json_decode($oa->response['response'], true);
        $databack = array();
        $databack['followers'] = $data['followers_count'];
        $databack['friends'] = $data['friends_count'];
    } else {
        die($oa->response['response']);
    }
    return $databack;
}

?>
