'use strict';

console.log("starting app.js");

var color = 'green';
var lightMode = 'light';
var decorMode = 'doodle';
var decorSrc = '"images/decor/'+lightMode+color+decorMode+'.png"';

var navBar;
var decor;

document.addEventListener("DOMContentLoaded", function()
{
    // add listeners to allow smooth image transitions
    decor = document.getElementById('decor');
    decor.addEventListener('load', function()
    {
        console.log('reappear decor');
        anime
        ({
            targets: decor,
            opacity: [0,1],
            duration: 125,
            easing: 'linear'
        });
    });

    navBar = document.getElementById('navBar');
    // const lightToggle = document.getElementById('lightToggleImg');
    // lightToggle.addEventListener('load', function()
    // {
    //     console.log('reappear toggle button');
    //     anime
    //     ({
    //         targets: lightToggle,
    //         opacity: [0,1],
    //         duration: 200,
    //         easing: 'linear'
    //     });
    // });

    // prevent reload on links to same page or during transition
    var links = document.querySelectorAll('a[href]');
    var isTransitioning = false;
    barba.hooks.beforeLeave(() => {isTransitioning = true});
    barba.hooks.afterEnter(() => {isTransitioning = false});
    var stopRefresh = function(e)
    {
        if(e.currentTarget.href === window.location.href || isTransitioning)
        {
            e.preventDefault();
            e.stopPropagation();
        }
    };
    for(var i=0; i<links.length; i++)
    {
        links[i].addEventListener('click', stopRefresh);
    }

    barba.init
    ({
        debug: true,
        logLevel: 'error',
        transitions:
        [{
            name: 'slide-right',
            from: {namespace: ['about', 'project']},
            to: {namespace: ['home', 'about']},
            sync: true,
            leave({current, next, trigger})
            {
                //leave animation
                console.log("leave "+current.namespace);
                return anime
                ({
                    targets: current.container,
                    translateX: '120%',
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

                // switch (next.container.namespace)
                // {
                //     case 'home':
                //         color = 'pink'; break;
                //     case 'about':
                //         color = 'green'; break;
                //     case 'project':
                //         color = 'purple'; break;
                // }

                next.container.style.visibility = 'visible';
                next.container.style.pointerEvents = 'all';
                return anime
                ({
                    targets: next.container,
                    translateX: ['-120%', '0'],
                    easing: 'easeInOutQuad',
                    duration: 250
                }).finished;
            }
        },
        {
            name: 'slide-left',
            from: {namespace: ['home', 'about']},
            to: {namespace: ['about', 'project']},
            sync: true,
            leave({current, next, trigger})
            {
                //leave animation
                console.log("leave "+current.namespace);
                return anime
                ({
                    targets: current.container,
                    translateX: '-120%',
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

                // switch (next.container.namespace)
                // {
                //     case 'home':
                //         color = 'pink'; break;
                //     case 'about':
                //         color = 'green'; break;
                //     case 'project':
                //         color = 'purple'; break;
                // }

                next.container.style.visibility = 'visible';
                next.container.style.pointerEvents = 'all';
                return anime
                ({
                    targets: next.container,
                    translateX: ['120%', '0'],
                    easing: 'easeInOutQuad',
                    duration: 250
                }).finished;
            }
        }]
    });
});

function pause(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

function toggleDarkMode()
{
    var body = document.body;
    var navBox = document.getElementsByClassName('navBox');
    var midBox = navBox[1];

    body.classList.toggle('darkMode');
    navBox[0].classList.toggle('lightText');
    navBox[1].classList.toggle('lightText');
    navBox[2].classList.toggle('lightText');

    if (lightMode == 'dark')
    {
        lightMode = 'light';
        decorSrc = 'images/decor/'+lightMode+color+decorMode+'.png';
        anime
        ({
            targets: decor,
            opacity: [1, 0],
            duration: 125,
            easing: 'linear',
            complete: function() {decor.src = decorSrc}
        });
        
        console.log(lightMode);
        console.log(color);

        lightToggle.innerHTML = '<img src="images/decor/night.png">';
        // anime
        // ({
        //     targets: lightToggle,
        //     opacity: [1, 0],
        //     duration: 200,
        //     easing: 'linear',
        //     complete: function() {console.log("changing button"); lightToggle.src = 'images/decor/night.png'}
        // });
        
        midBox.style.borderLeftColor = '#222222';
        midBox.style.borderRightColor = '#222222';
        navBar.style.borderTopColor = '#222222';
        navBar.style.borderBottomColor = '#222222';
    }
    else
    {
        lightMode = 'dark';
        decorSrc = 'images/decor/'+lightMode+color+decorMode+'.png';
        anime
        ({
            targets: decor,
            opacity: [1, 0],
            duration: 125,
            easing: 'linear',
            complete: function() {decor.src = decorSrc}
        });

        console.log(lightMode);
        console.log(color);

        lightToggle.innerHTML = '<img src="images/decor/light.png">';
        // anime
        // ({
        //     targets: lightToggle,
        //     opacity: [1, 0],
        //     duration: 200,
        //     easing: 'linear',
        //     complete: function() {console.log("changing button"); lightToggle.src = 'images/decor/light.png'}
        // });
        
        midBox.style.borderLeftColor = '#dddddd';
        midBox.style.borderRightColor = '#dddddd';
        navBar.style.borderTopColor = '#dddddd';
        navBar.style.borderBottomColor = '#dddddd';
    }
}