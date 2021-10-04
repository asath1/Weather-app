$(document).ready(()=>{
    $(this).scrollTop(0)
//slides 
    $('#slides').superslides({
        animation: "fade",
        play: 5000,
        pagination: false
    })

    var typed = new Typed(".typed", {
        strings: ["Software Engineer", "Full-Stack Developer", "Traveler.."],
        typeSpeed: 70,
        loop: true,
        startDelay: 1500,
        showCursor: false
    })

    $('.owl-carousel').owlCarousel({
        loop:true,
        nav: true,
        responsive:{
            0:{
                items:1
            },
            488:{
                items:2
            },
            768:{
                items:3
            },
            938:{
                items:4
            }
        }
    })


//pie chart
    var skillsTopOffset = $(".skillsSection").offset().top

    $(window).scroll(function(){
        if(window.pageYOffset > skillsTopOffset - $(window).height() + 200) {
            $('.chart').easyPieChart({
                easing: 'easeInOut',
                barColor: 'black',
                trackColor: false,
                scaleColor: false,
                lineWidth: 4,
                size: 152,
                onStep: function(from,to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent))
                }
            });
        }
    })

//contact
    var contactOffset = $(".contactSection").offset().top
    $(window).scroll(function(){
        if(window.pageYOffset > contactOffset - $(window).height() + 200) {
            $('.top').addClass('open');
            $('.message').addClass('pull');
        }else {
            $('.openForm').click(function(){
                $('.top').addClass('open');
                $('.message').addClass('pull');
            })
        }
    })
    
//sticky navigation
    const nav = $("#navigation");
    const navTop = nav.offset().top

    $(window).on("scroll", stickyNavigation)

    function stickyNavigation() {
        var body = $("body");
        if($(window).scrollTop() >= navTop) {
            body.css("padding-top", nav.outerHeight() + "px")
            body.addClass("fixedNav")
        }else {
            body.css("padding-top", 0)

            body.removeClass("fixedNav")
        }
    }


    $("#navigation li a").click(function(e) {
        e.preventDefault()
        var targetElement = $(this).attr("href")
        var targetPosition = $(targetElement).offset().top
        $("html, body").animate({scrollTop: targetPosition - 60}, "slow")
    });

// nav active
    $(".nav-item").click(function(){
        $(".nav-item").removeClass("active");
        $(this).addClass("active"); 
    })
//message

$('#form').on('submit', handleSignup)
function handleSignup (e) {
  e.preventDefault()
  const options = {
    method: $(this).attr('method'),
    url: $(this).attr('action'),
    data: $(this).serialize()
  }
  $.ajax(options).done(response => {
    alert(JSON.stringify(response))
  })
}

    $('.send').click(function(e){
        if (!validateForm()) {
            return
        }
        $('.top').addClass('closed');
            $('.message').addClass('push');
        }
    )
})

function validateForm() {
    let form = document.querySelector('#form')
    let inputs = form.children
    console.log(form)
    for (let i = 0; i < inputs.length-1 ; i++) {
        if (inputs[i].value == "" && inputs[i].hasAttribute("required")) {
            return false
        }
    }
    return true
}


function sendMessage(form) {

    let payload = {}
    let inputs = form.children

    for (let i = 0; i < inputs.length; i++) {
        console.log(inputs[i].name)
        if (inputs[i].name == "name") {
            payload["name"] = inputs[i].value
        } else if (inputs[i].name == "email") {
            payload["email"] = inputs[i].value
        } else if (inputs[i].name == "phone") {
            payload["mobile"] = inputs[i].value
        }else if (inputs[i].name == "message") {
            payload["message"] = inputs[i].value
        }
    }

    console.log(JSON.stringify(payload))

    fetch("http://localhost:3000/addUser", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }).then((response) => {
        console.log(response)
    }).catch((response) => {
        console.log(response)
    })
}






