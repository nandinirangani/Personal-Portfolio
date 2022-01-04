// Sticky Naviagation Menu Js

let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");

let val;

window.onscroll = function(){
    if(document.documentElement.scrollTop > 20){
        nav.classList.add("sticky");
        scrollBtn.style.display = "block";
    }else{
        nav.classList.remove("sticky");
        scrollBtn.style.display = "none";
    }
}

// Side Navigation Menu Js
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");

menuBtn.onclick = function() {
    console.log("add function");
    navBar.classList.add("active");
    menuBtn.style.opacity = "0";
    menuBtn.style.pointerEvents = "none";
    body.style.overflowX = "hidden";
    scrollBtn.style.pointerEvents = "none";
}

cancelBtn.onclick = function() {
    console.log("remove function")
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
    body.style.overflowX = "auto";
    scrollBtn.style.pointerEvents = "auto";
}

// side navigation bar close while we click on navigation links

let navLinks = document.querySelectorAll(".menu li a");
for (let i = 0; i < navLinks.length; i++){
    navLinks[i].addEventListener("click" , function() {
        navBar.classList.remove("active");
        console.log("remove function inside loop")
        menuBtn.style.opacity = "1";
        menuBtn.style.pointerEvents = "auto";
    })
}

//about section tabs

(()=>{ 
     const aboutSection = document.querySelector(".about-section"),
     tabsContainer = document.querySelector(".about-tabs");

     tabsContainer.addEventListener("click", (event)=>{
         /*if event.target conatins tab-item' class and not conatins 
         'active' class */
         if(event.target.classList.contains("tab-item") &&
         !event.target.classList.contains("active")){
          const target = event.target.getAttribute("data-target");
        //deactivate existing active 'tab-item'
        tabsContainer.querySelector(".active").classList.remove("outer-shadow","active");
        //activate new 'tab-item'
        event.target.classList.add("active","outer-shadow");
        //deactivate existing active 'tab-content'
        aboutSection.querySelector(".tab-content.active").classList.remove("active");
        //activate new 'tab-content'
        aboutSection.querySelector(target).classList.add("active");
         }
     })
})();

function bodyScrollingToggle(){
  document.body.classList.toggle("hidden-scrolling");
}
//Portfolio filter and popup 

(() =>{
        const filterContainer = document.querySelector(".portfolio-filter"),
        portfolioItemsContainer = document.querySelector(".portfolio-items"),
        portfolioItems = document.querySelectorAll(".portfolio-item"),
        popup = document.querySelector(".portfolio-popup"),
        prevBtn = popup.querySelector(".pp-prev"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = popup.querySelector(".pp-close");
        let itemIndex, slideIndex, screenshots;

        /*filter portfolio items*/
        filterContainer.addEventListener("click", (event)=>{
          if(event.target.classList.contains("filter-item") &&
          !event.target.classList.contains("active")){
            // deactivate existing active 'filter-item'
            filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
            //activate new 'filter-item'
            event.target.classList.add("active","outer-shadow");
            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item)=>{
              if(target === item.getAttribute("data-category") || target === 'all'){ 
                item.classList.remove("hide");
                 item.classList.add("show");
              }
              else{
                item.classList.remove("show");
                item.classList.add("hide");
              }
            })
          }
        })
        portfolioItemsContainer.addEventListener("click", () =>{
          if(event.target.closest(".portfolio-item-inner")){
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            //get the portfolioItem index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            screenshots = screenshots.split(",");
            if(screenshots.length === 1){
              prevBtn.style.display="none";
              nextBtn.style.display="none";
            }
            else{
              prevBtn.style.display="block";
              nextBtn.style.display="block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
          }
        })

        closeBtn.addEventListener("click", () =>{
          popupToggle();
        })

        function popupToggle(){
          popup.classList.toggle("open");
          bodyScrollingToggle();
        }

        function popupSlideshow(){
          const imgSrc = screenshots[slideIndex];
          const popupImg = popup.querySelector(".pp-img");
          /* activate loader untill the popupImg loaded */
          popupImg.src=imgSrc;
          popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + "of" + 
           screenshots.length;

        }

        //next slide
        nextBtn.addEventListener("click", () =>{
          if(slideIndex === screenshots.length-1){
            slideIndex = 0;
          }
          else{
            slideIndex++;
          }
          popupSlideshow();
        })

        //prev slide
        prevBtn.addEventListener("click", () =>{
          if(slideIndex === 0){
            slideIndex = screenshots.length-1;
          }
          else{
            slideIndex--;
          }
          popupSlideshow();
        })
})();