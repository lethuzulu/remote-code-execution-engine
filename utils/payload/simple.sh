#!/bin/bash

LANG=$1
FILE=$2

exec 1>> output.txt

$LANG $FILE