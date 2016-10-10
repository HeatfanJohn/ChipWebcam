#!/bin/bash
#
# Bash script to take the output image and decorate it with details about the camera, timestamp etc
#
# Syntax: decorate sourceimage
#
SOURCE=$1
 
#TEMP=/tmp/webcam.jpg
TEMP=$1.tmp
TEMP_THUMB=/tmp/webcam_t.jpg
#DEST=/var/www/webcam.jpg
#DEST=./webcam.jpg
DEST=$1.jpg
DEST_THUMB=/var/www/webcam_t.jpg
 
convert $SOURCE \
        -fill '#0008' -draw 'rectangle 0,0,640,12' \
        -fill white \
        -gravity NorthWest -annotate 0 "Masseria.org" \
        -gravity North -annotate 0 "Front door" \
        -gravity NorthEast -annotate 0 "$(date)" \
        $TEMP
 
#convert $TEMP -thumbnail 100x100 $TEMP_THUMB
 
mv $TEMP $DEST
#mv $TEMP_THUMB $DEST_THUMB

