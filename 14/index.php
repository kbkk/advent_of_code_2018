<?php

$input = (int)file_get_contents('./input.txt');

$board = '37';
$e1 = 0;
$e2 = 1;
$inputLengthPlusOne = strlen((string)$input) + 1;

do {
    $board .= ($board[$e1] + $board[$e2]);
    $len = strlen($board);
    $e1 = ($e1 + $board[$e1] + 1) % $len;
    $e2 = ($e2 + $board[$e2] + 1) % $len;
} while (strpos($board, (string)$input, $len - $inputLengthPlusOne) === false);

$part1 = substr($board, $input, 10);
$part2 = strpos($board, (string)$input);

echo "part 1: $part1" . PHP_EOL;
echo "part 2: $part2" . PHP_EOL;
