/**
 * slidermax
 * v1.0
 * MIT license (c) 2022 Maksym Synytskyi
 */

(function(){

  let images = document.querySelectorAll('.slider-line img');
  let sliderLine = document.querySelector('.slider-line');
  let sliderNext = document.querySelector(".slider-next");
  let sliderPrev = document.querySelector(".slider-prev");
  let startClientX;
  let endClientX;
  let count = 0;
  let width;


  function init(){ // calculation of the image size depending on the screen at startup
    width = document.querySelector('.slider').offsetWidth;
    sliderLine.style.width = width * images.length + 'px';
    images.forEach(item => {
      item.style.width = width + 'px';
      item.style.height = 'auto';
    });
    rollSlider()
  }
  window.addEventListener('resize', init); // calculation of the image size when you change the screen
  window.onload = init; // enabling the function after the page loads


  document.querySelector('.slider-prev').addEventListener('click', function (){ // back button
    count--;
    if (count < 0){
      count = images.length - 1;
    }
    currentSlide(count) // to toggle the radio buttons by pressing the arrow
    rollSlider()
  })

  document.querySelector('.slider-next').addEventListener('click', function (){ // forward button
    count++;
    if (count >= images.length){
      count = 0;
    }
    currentSlide(count)
    rollSlider()
  })

  function rollSlider(){ // motion rendering
    sliderLine.style.transform = 'translate(-'+count*width+'px)'
  }

    window.currentSlide = function currentSlide(n){ // radio button setup
      let dots = document.getElementsByClassName("slider-dots_item");
      count=n // slide equals index currentSlide(х)
      for (let i = 0; i < images.length; i++) {
        dots[i].classList.remove('active'); // class deletion
      }
      dots[n].classList.add('active');
      rollSlider();
    }


  function touchSlider(){
    sliderLine.addEventListener('touchstart', function(){
      startClientX = event.changedTouches[0].clientX;
    });
    sliderLine.addEventListener('touchend', function(){
      endClientX = event.changedTouches[0].clientX;
      if (startClientX>=endClientX){
        sliderNext.click();
      } else {sliderPrev.click();}
    });
  }
  touchSlider();
    
})();