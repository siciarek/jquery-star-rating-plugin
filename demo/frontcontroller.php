<?php
/**
 * Server logic Mock
 * User: jsiciarek
 * Date: 20.08.12
 * Time: 00:04
 */

$frames['ok'] = array(
    'success'  => true,
    'type'     => 'info',
    'msg'      => 'OK',
    'datetime' => date('Y-m-d H:i:s'),
    'data'     => array(

    ),
);

$frames['error'] = array(
    'success'  => false,
    'type'     => 'error',
    'msg'      => 'Unexpected exception',
    'datetime' => date('Y-m-d H:i:s'),
    'data'     => array(

    ),
);

try {
    sleep(rand(1, 3));

    if (rand(0, 100) < 40) {
        throw new Exception('Rates cannot be updated');
    }

    $frame = $frames['ok'];
} catch (Exception $e) {
    $msg          = $e->getMessage();
    $frame        = $frames['error'];
    $frame['msg'] = $msg;
}

header('Content-type: application/json');
echo json_encode($frame);
