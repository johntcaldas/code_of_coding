this["templates"] = this["templates"] || {};

this["templates"]["handlebars/body_container.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<!-- Header -->\n<nav class=\"navbar navbar-default\" role=\"navigation\">\n    <div class=\"container-fluid\">\n        <div class=\"navbar-header\">\n            <a class=\"navbar-brand\" href=\"#\">Code Of Coding</a>\n        </div>\n\n        <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n            <ul class=\"nav navbar-nav\">\n                <li class=\"active\"><a href=\"#home\" data-toggle=\"pill\">Home</a></li>\n                <li><a href=\"#system_info\" data-toggle=\"pill\">System Info</a></li>\n                <li><a href=\"#story\" data-toggle=\"pill\">Story</a></li>\n            </ul>\n        </div><!-- /.navbar-collapse -->\n    </div><!-- /.container-fluid -->\n</nav>\n\n<!-- Content -->\n<div id=\"top_level_content\" class=\"tab-content\">\n    <div id=\"home\" class=\"tab-pane fade in active\">";
  stack1 = self.invokePartial(partials['handlebars/home.handlebars'], 'handlebars/home.handlebars', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    <div id=\"system_info\" class=\"tab-pane fade\">";
  stack1 = self.invokePartial(partials['handlebars/system_info.handlebars'], 'handlebars/system_info.handlebars', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    <div id=\"story\" class=\"tab-pane fade\">";
  stack1 = self.invokePartial(partials['handlebars/story.handlebars'], 'handlebars/story.handlebars', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n</div>\n";
  return buffer;
  });

this["templates"]["handlebars/home.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div>\n    <h1>In the Beginning</h1>\n    <p>\n        And I said, \"Let there be code.\" And <i>poof</i> here we are. Somewhere, that has to be why we love coding.\n        That notion of creating something from scratch, something that is entirely our brain child. Furthermore,\n        because\n        our code is language, the opportunity exists to create beauty not only in the final product but also in the\n        specification (the code). I could go on like this for hours, because it is what I do. However, perhaps\n        a word on the why of this site.\n    </p>\n    <h2>Why I Exist</h2>\n    <p>\n        The \"I\" here is the site, not the author. This site is my playground, testbed, and hobby. It is here because I'm\n        learning to use some new tools and I need a canvas on which to apply my lessons. My academic discipline was\n        operating systems, and although I spend plenty of time in my professional career dealing with the UI layer, the\n        majority of my from scratch architecture experience is on the back end. So, I'm learning some web technologies\n        I've been wanting to play with for a while and need some content to display.\n    </p>\n    <h2>What I've Got</h2>\n    <p>\n        Since I am not trying to sell you anything, and I am not an artist/writer/blogger/etc, I have to make up\n        some content. I guess it never hurts to get some practice writing, so I decided to generate some of my own.\n        I figured that writing about the experience of building this site would kill a couple of birds with one\n        stone:\n        <ul>\n            <li>By writing, I'll get better at writing.</li>\n            <li>Writing about the subject of my study will help me soak in what I am learning.</li>\n            <li>Possibly most importantly, it will give me something to display here.</li>\n        </ul>\n    </p>\n</div>";
  });

this["templates"]["handlebars/story.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div>\n    <h1>Story</h1>\n    <div class=\"panel panel-default\">\n        <div class=\"panel-heading\"><h4>In the Beginning</h4></div>\n        <div class=\"panel-body\">\n            <p>\n            First Post! <br>\n            I'm Typing right into the handlebars template for the entire \"Story\" section of the site. That means I'm\n            procrastinating building out a back end to support \"blogging\".\n            I've been doing enough wiring things together in the past couple of days to merit\n            splashing a bit of content onto the site. Also, I'm a fan of continuous refactoring, and in writing this\n                I'm signing myself up for some practice and learning.\n            If I build a little bit at each step of the way, then I'll be \"refactoring\" as the site\n            matures rather than trying to get the whole infrastucture wired together up front. The trick is to find\n            that sweet spot where there is enough going on so that the refactor results in the immediate perception of\n            benefit, but not quite so much as to make the refactoring a painfully time-intensive task. I do, after all,\n            have this thing called a \"day job\" to which much of my time is devoted.<br><br>\n            <i>Rewind</i>\n            If you read the home page at all, then you know this page you're looking exists because I needed a new\n            home project.\n            </p>\n        </div>\n        <div class=\"panel-footer\">Feb 16, 2014</div>\n    </div>\n</div>";
  });

this["templates"]["handlebars/system_info.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div>\n    <h1>System Information</h1>\n</div>";
  });