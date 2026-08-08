// ===========================
// Universal Modal System
// ===========================

const Modal = {

    element:null,


    init(){

        this.element =
        document.getElementById(
            "globalModal"
        );


        if(!this.element){

            console.error(
                "globalModal container missing"
            );

            return;

        }


        this.element.innerHTML = `

        <div class="modal-overlay">

            <div class="modal-container">

                <div class="modal-header">

                    <h2 class="modal-title"></h2>

                    <button class="modal-close">
                        ×
                    </button>

                </div>


                <div class="modal-content"></div>


                <div class="modal-actions"></div>


            </div>

        </div>

        `;


        const overlay =
        this.element.querySelector(
            ".modal-overlay"
        );


        const closeBtn =
        this.element.querySelector(
            ".modal-close"
        );


        closeBtn.onclick =
        () => this.close();



        overlay.onclick =
        (event)=>{

            if(event.target === overlay){

                this.close();

            }

        };


        document.addEventListener(
            "keydown",
            (event)=>{

                if(event.key === "Escape"){

                    this.close();

                }

            }
        );


    },



    open(options={}){


        if(!this.element){

            this.init();

        }


        const overlay =
        this.element.querySelector(
            ".modal-overlay"
        );


        const title =
        this.element.querySelector(
            ".modal-title"
        );


        const content =
        this.element.querySelector(
            ".modal-content"
        );


        const actions =
        this.element.querySelector(
            ".modal-actions"
        );



        title.textContent =
        options.title || "";



        content.innerHTML =
        options.content || "";



        actions.innerHTML =
        options.actions || "";



        overlay.classList.add(
            "active"
        );


        document.body.style.overflow =
        "hidden";


    },



    close(){


        const overlay =
        this.element.querySelector(
            ".modal-overlay"
        );


        overlay.classList.remove(
            "active"
        );


        document.body.style.overflow =
        "";


    }


};





document.addEventListener(
"DOMContentLoaded",
()=>{

    Modal.init();

});



window.Modal = Modal;