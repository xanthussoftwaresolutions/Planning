$(document).ready(function () {

    //Added eventListner to resize event
    window.addEventListener('resize', function () {
        var mq = window.matchMedia("(min-width: 768px)");
        if (mq.matches) {
            $("#sidebar-wrapper").addClass("in");
        }
    }, false);

    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
       isClosed = false;

    trigger.click(function () {
        hamburger_cross();
    });
    function hamburger_cross() {

        if (isClosed == true) {
            //overlay.hide();


            $("#page-wrapper").animate({ "margin-left": "250px" }, { duration: 800, queue: false });
            $(".sidebar").animate({ width: "250px" }, { duration: 100, queue: false });
            $(".hamburger").animate({ duration: 100, queue: false });


            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        }

        else {

            $("#page-wrapper").animate({ "margin-left": "0px" }, { duration: 500, queue: false });
            $(".sidebar").animate({ width: "0px" }, { duration: 100, queue: false });
            $(".hamburger").animate({ duration: 100, queue: false });

            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;

        }

    
    }

    /*$('[data-toggle="offcanvas"]').click(function () {
          $('#wrapper').toggleClass('toggled');
    });*/


});