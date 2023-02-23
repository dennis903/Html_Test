// Creates anime timeline.
const animeScroll = anime({
  targets: '.slide-container .section',
  translateX: 500,
  opacity: [0, 1],
  elasticity: 200,
  easing: 'easeInOutSine',
  autoplay: false
});

// Adds transitions to the timeline.

// function checkVisible( element, check = 'above' ) {
//   const viewportHeight = $(window).height(); // Viewport Height
//   const scrolltop = $(window).scrollTop(); // Scroll Top
//   const y = element.offset().top;
//   const elementHeight = element.height();   

//   if (check == "visible") 
//     return ((y < (viewportHeight + scrolltop)) && (y > (scrolltop - elementHeight)));

//   if (check == "above") 
//     return ((y < (viewportHeight + scrolltop)));
//   }

$(function() {
  const $slideContainer = $('.slide-container');

  $(window).on('scroll', function () {
    // if (checkVisible($slideContainer)) {
      const offsetTop = $slideContainer.offset().top;
      const elementHeight = $slideContainer.height();
      const currentPos = $(window).scrollTop() + 500;
      const scrollPercent = Math.floor(((currentPos - offsetTop) / elementHeight) * 100) > 100 ? 100 : Math.floor(((currentPos - offsetTop) / elementHeight) * 100);

      animeScroll.seek(animeScroll.duration * (scrollPercent / 100));
   // }
  })
})