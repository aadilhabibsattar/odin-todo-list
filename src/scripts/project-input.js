const addProjectButton = document.querySelector(
    ".sidebar-projects-section--add-project-button-plus-icon"
);

addProjectButton.addEventListener("click", () => {
    const projectDialog = document.querySelector(".project-dialog");
    const cancelBtn = document.querySelector(".project-input-cancel-btn");
    const submitBtn = document.querySelector(".project-input-submit-btn");

    projectDialog.showModal();
});
