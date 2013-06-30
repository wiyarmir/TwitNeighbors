<?php

header('Content-type: application/json');
$nodes = array(
    array('id' => 123456, 'label' => '@wiyarmir', 'followers' => 800, 'following' => 400),
    array('id' => 123457, 'label' => '@eligretel', 'followers' => 800, 'following' => 400),
    array('id' => 123458, 'label' => '@guanangelo', 'followers' => 800, 'following' => 400)
);
$edges = array(
    array('target' => 123456, 'source' => 123457),
    array('target' => 123456, 'source' => 123458)
);
$data = array('nodes' => $nodes, 'edges' => $edges);
echo(json_encode($data));
?>
