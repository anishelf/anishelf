// ========================================
// AniShelf
// File: slider.js
// Purpose: Horizontal slider controls
// ========================================

const sliderButtons =
document.querySelectorAll(".slider-btn");


sliderButtons.forEach(button => {


    button.addEventListener("click", () => {


        const targetId =
        button.dataset.target;


        const container =
        document.getElementById(targetId);


        const scrollAmount = 800;


        if(button.classList.contains("right")){


            container.scrollBy({

                left: scrollAmount,

                behavior: "smooth"

            });

        }


        if(button.classList.contains("left")){


            container.scrollBy({

                left: -scrollAmount,

                behavior: "smooth"

            });

        }


    });


});