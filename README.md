# InstaSencan

## Setup
1. Clone the instatest repository. 
2. In the terminal, navigate to the root directory of the project.
3. Make sure you have Node and npm installed, then run ``npm install``.  
4. Run ``gulp``.
4. Open your favorite browser and navigate to [http://localhost.com:3000](http://localhost.com:3000).

## Style guide
This angular app follows [John Papa Angularjs Style guide][1]. This is mainly for readability sake, but many reasons for the choices I made here are outlined in detail in this document.

## Directives
The meat of this slideshow exists in the slideshow directive. This also has some slideshow component directives within it, that mainly are little sections of the slide show such as likes, users, comments, etc. To simplify testing and not having to deal with $templateCache for a project of this size, the templates have been inlined in all these sections. Slide could probably also be its own directive, but I did not get a chance to implement it at this time. The directive only loads one image at a time, although it would be good to load both the previous and the next images at any one time to make that transition more smooth.

There are a couple animation directives in the animation folder that are utilized to easy transition between pictures. Please note the svg greyscale filters between transitions.... neat!

## Service
There is only one service, which handles the calls to the instagram API. I realized there is a black box bug with using $resource and failed JSONP requests that causes error messages not to be triggered, so a point of improvement here would be to fix that with possible just vanilla $http and handling those errors better. I usually wire up a custom exception handler for projects using Toastr.js (I have a version I use without), that would likely solve this problem.

## Gulp
I wired up karma to our local instance of Gulp so that we can run unit tests both one time and use test driven development if we so choose.

## Areas to improve
Given more time, these are the main things that I can see need improvement
1. Layout is not responsive. This could be an easy fix, but lacked the time
2. Error state is not properly triggered on JSONP request fail, just shows loading state endlessly
3. E2E testing needs to be written
4. Test the slideshow directive properly. Did not effectively run tests on that, and that is the gaping weakness of the repo.
5. The previous and next images should always be loaded concurrently with the current image.




[1]: https://github.com/johnpapa/angularjs-styleguide