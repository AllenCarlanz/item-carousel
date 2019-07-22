// Initialize Carousel
$( "#item-carousel li" ).each(function( index ){
  var li_img = $(this).attr('data-img');
  var li_name = $(this).attr('data-name');
  var li_price = $(this).attr('data-price');
  var li_description = $(this).attr('data-description');
  $(this).parent().after(this);
  $(this).replaceWith("<div class='item-tile up-ctr'> <div class='up-item'> <a href='javascript:void(0)' class='resp-event' data-id='" + $(this).data('id') + "'> <div class='crsl-img-ctr'> <i class='fa fa-info-circle' aria-hidden='true'></i> <div class='div-hover'> <span> <strong style='display: block; padding-bottom: 3px;'>" + li_name + " </strong>" + li_description + " </span> </div> <img src='" + li_img + "' alt=''> </a> </div>" + "<div class='dark-bar'> <span>" + li_name + "</span> <span>" + li_price + "</span> <a href='javascript:void(0)' class='addon-add' onclick='itemEventTracking('"+ $(this).data('id') +"','li_name')' data-id='"+ $(this).data('id') +"'> <i class='fa fa-plus' aria-hidden='true'></i> Click to add</a> </div> </div> </div>");
});

var divs = $(".up-ctr");
var total_pages = 0;
var current_page = 1;
for(var i = 0; i < divs.length; i+=12) {
  divs.slice(i, i+12).wrapAll("<div class='crsl-set'></div>");
  total_pages++;
}

// Show next button based on page count
var show_next_btn = "display: inline-block;";
if(total_pages<=1){
    show_next_btn = "display: none;";
}


$(".crsl-set").wrapAll("<div class='crsl'> </div>");

$(".crsl").after("<div class='crsl-cntrl'><a href='#main' onClick='carouselToggle(); return false' id='crsl-previous' style='display:none;'><i class='fa fa-chevron-left' aria-hidden='true'></i></a> <span id='cur-pg' data-page='1'>"+ current_page +"</span> / <span id='total-pg' data-totalpg='"+ total_pages +"'>"+ total_pages +"</span> <a href='#main' onClick='carouselToggle(); return false' id='crsl-next' style='" + show_next_btn + "'><i class='fa fa-chevron-right' aria-hidden='true'></i></a></div>")

$('.crsl-set').slice(1).hide();
$("#item-carousel").remove();

//Determine carousel height
$(window).load(function(){
  var estimateHt = clientHeight($('.up-ctr').length , $(window).width());
  $('.crsl').height( estimateHt );
});



// Initialize Carousel end

// Carousel functions
function clientHeight(numOfItems , screenSize){
  var totalHeight = 0;

  if(numOfItems > 12){
    numOfItems = 12;
  }

  if(screenSize >= 900){
    // 201px per item
    totalHeight = (Math.ceil(numOfItems/3) * 3) * 201 / 3 + 70;
  }
  else if(screenSize >= 768){
    // 156px per item
    totalHeight = (Math.ceil(numOfItems/3) * 3) * 170 / 3 + 70;
  }
  else if(screenSize >= 425){
    // 345px per item
    totalHeight = (Math.ceil(numOfItems/3) * 3) * 345 + 160;
  }
  else if(screenSize >= 375){
    // 355px per item
    totalHeight = (Math.ceil(numOfItems/3) * 3) * 355 + 50;
  }
  else if(screenSize >= 320){
    // 295px per item
    totalHeight = (Math.ceil(numOfItems/3) * 3) * 295 + 160;
  }

  return totalHeight;
}

$('.crsl-cntrl a').click(function(){
  var direction = $(this).attr('id');

  var current_slide = $('.crsl-set:visible');
  var next_slide = '';
  var next_slide_height =0;
  current_slide.hide();

  var current_page = parseInt( $('#cur-pg').attr('data-page') , 10 );
  var total_pages = parseInt( $('#total-pg').attr('data-totalpg') , 10 );

  if(direction=='crsl-previous'){
    next_slide = current_slide.prev(".crsl-set");
    next_slide_height = next_slide.height();
    $('#cur-pg').attr('data-page' , current_page-1);
    $('#cur-pg').text(current_page-1);

    if(current_page-1 <= 1){
      $('#crsl-previous').hide();
    }
    $('#crsl-next').show();
  }
  else{
    next_slide = current_slide.next(".crsl-set");
    next_slide_height = next_slide.height();
    $('#cur-pg').attr('data-page' , current_page+1);
    $('#cur-pg').text(current_page+1);

    if(current_page+1 >= total_pages){
      $('#crsl-next').hide();
    }

    $('#crsl-previous').show();
  }

  // Change height of overall container
  $('.crsl').height(next_slide_height+40);
  next_slide.fadeIn(100).show();

  // Smooth scroll
  if (this.hash !== "") {
    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    var hash = this.hash;

    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800, function(){

      window.location.hash = hash;
    });
  }
});

//Add event on desktop
$(window).load(function(){
  if($(window).width()>768){
    $('.resp-event').addClass('addon-add');
  }
});
