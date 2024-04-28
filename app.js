'use strict';

console.log("starting app.js");


function initProjects() {
    var currentFile = null;
    var currentText = null;
    var currentBox = null;
    $(".thumbnail").click(function(){
        var file = $(this).data("file");
        var text = $(this).next('h3');
        var box = $(this).parent();
        text.removeClass('big-text');
        box.removeClass('selected');
        if (currentFile == file) {
            $("#featured-project").slideUp(function() {
                console.log("slide up");
                $(this).empty();
            });
            currentFile = null;
            currentText = null;
            currentBox = null;
        } else if (currentFile != null) {
            currentText.removeClass('big-text');
            currentBox.removeClass('selected');
            $("#featured-project").slideUp(function() {
                $(this).empty();
                console.log("slide up");
                currentFile = file;
                currentText = text;
                currentBox = box;
                $(this).load(file, function() {
                    console.log("slide down");
                    $(this).slideDown();
                    text.addClass('big-text');
                    box.addClass('selected');
                });
            });
        } else {
            currentFile = file;
            currentText = text;
            currentBox = box;
            $("#featured-project").slideUp(function() {
                $(this).load(file, function() {
                    console.log("slide down");
                    $(this).slideDown();
                    text.addClass('big-text');
                    box.addClass('selected');
                });
            });
        }
    });
}

// Prevent clicking links during transitions
barba.hooks.before(() => {$('a').addClass('no-click');});
barba.hooks.after(() => {$('a').removeClass('no-click');});

// Prevent reload when the page's own link is clicked
var stopRefresh = function(e)
{
    if(e.currentTarget.href === window.location.href)
    {
        e.preventDefault();
        e.stopPropagation();
    }
};

$(document).ready(function(){
    // Load header and footer
    $("#header").load("header.html");
    $("#footer").load("footer.html");

    // Ensure links leaed to a different page
    $(document).on('click', 'a', stopRefresh);
});

document.addEventListener("DOMContentLoaded", function()
{
    barba.init
    ({
        debug: true,
        logLevel: 'error',
        views: [{
            namespace: 'projects',
            beforeEnter() {
                initProjects();
            }
        }],
        transitions:
        [{
            name: 'fade',
            from: {namespace: ['home', 'projects']},
            to: {namespace: ['home', 'projects']},
            sync: false,
            leave({current, next, trigger})
            {
                //leave animation
                console.log("leave "+current.namespace);
                return anime
                ({
                    targets: [current.container],
                    opacity: [1, 0],
                    easing: 'easeInOutQuad',
                    duration: 250,
                    complete: function()
                    {
                        current.container.style.pointerEvents = 'none';
                    }
                }).finished;
            },
            enter({current, next, trigger})
            {
                //enter animation
                console.log("enter "+next.namespace);
                next.container.style.visibility = 'visible';
                next.container.style.pointerEvents = 'all';
                return anime
                ({
                    targets: next.container,
                    opacity: [0, 1],
                    easing: 'easeInOutQuad',
                    duration: 250,
                }).finished;
            }
        }]
    });
});

function pause(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}