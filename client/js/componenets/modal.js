const createListBtn =
document.getElementById(
    "createListBtn"
);

const modal =
document.getElementById(
    "listModal"
);

createListBtn.addEventListener(
    "click",
    () => {

        modal.classList.remove(
            "hidden"
        );

    }
);

document
.getElementById(
    "closeModalBtn"
)
.addEventListener(
    "click",
    () => {

        modal.classList.add(
            "hidden"
        );

    }
);

document
.getElementById(
    "saveListBtn"
)
.addEventListener(
    "click",
    async()=>{

        const name =
        document.getElementById(
            "listName"
        ).value.trim();

        const description =
        document.getElementById(
            "listDescription"
        ).value.trim();

        if(!name) return;

        const result =
        await createList(

            name,

            description

        );

        if(result.success){

            modal.classList.add(
                "hidden"
            );

            document.getElementById(
                "listName"
            ).value = "";

            document.getElementById(
                "listDescription"
            ).value = "";

            loadLists();

        }else{

            alert(
                result.message ||
                "Failed to create list"
            );

        }

    }
);