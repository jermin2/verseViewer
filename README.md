# Verse Viewer

Written in ReactJS.

## Features
* Fetches verses given their reference and loads them into the right panel.
* Will also format outlines by adding spaces between Roman Numerals (I. II. and A. B. etc)
* Writes verses into session storage for easier retrieving
* Verse Viewer will attempt to prefetch the verses, but if it fails to prefetch, it will attempt to load the verse again when you click on it.

## How to use
A live copy can be found here
https://jermin-verse-finder.herokuapp.com/

Paste in your ministry portion with verse references. Click the "go" button and it will find the verses for you.

You can then click on the <b>bold</b> verse to expand them out.

## API
Uses the Recovery Bible api to fetch verses
https://api.lsm.org/recver.php

