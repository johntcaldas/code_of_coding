Code of Coding
==============

Getting Set Up:
---------------
(Instructions tested on Ubuntu)
+ Install Node JS
    sudo apt-get update
    sudo apt-get install -y python-software-properties python g++ make
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs
+ Install Grunt and project dependencies (defined in web/src/package.json)
    npm install -g grunt-cli
    cd web/src
    npm install

Using Grunt to Pre-compile Handlebars Templates:
------------------------------------------------
Run grunt from web/src (the directory containing gruntfile.js)
+ Run Grunt ` grunt `
+ Run Grunt, but watch for changes to filesystem, and re-run on-demand ` grunt watch `
+ When installing a new grunt plugin (node package): ` npm install <package> --save-dev `

  > This will update package.json with the new dependency


List of current Grunt tasks:


+ Pre-compile handlebar templates in web/src/handlebars/ into web/js/handlebars_templates.js

Intellij Setup and Plugins:
-----------------
Intellij is my IDE of choice, even for pure web development.
+ Set Right-Margin (line length) to 120 in Settings->Code Style->General
+ Download and install [JavaScript Libraries](https://www.jetbrains.com/idea/webhelp/configuring-javascript-libraries.html)
  in Settings->JavaScript->Libraries
    - Handlebars
    - Bootstrap
    - JQuery
    - HTML
    - HTML5
    - Backbone
    - Grunt
    - Underscore

Here are some plugins that play well with this project (Settings->Plugins):
+ Markdown: for editing this file.
+ Handlebars: for handlebars templates.
+