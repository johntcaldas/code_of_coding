// Right now there are 3 js files that load themselves: globals.js, router.js, and main.js (this file).

"use strict";

$(document).ready(function() {

    // Check to see if we have a session token stored in a cookie. If so, auto-login.
    var session_token = $.cookie('session_token');
    if (session_token !== undefined) {
        COC.session_token = session_token;
        $('#post_blog_nav_li').removeClass('hidden');
    }

    // Initialize collection of posts.
    COC.data.posts = new COC.models.PostCollection();
    COC.data.posts.fetch();
});
