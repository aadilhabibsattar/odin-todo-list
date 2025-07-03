const projectList = [];

document.addEventListener("DOMContentLoaded", () => {
    const addProjectButton = document.querySelector(
        ".sidebar-projects-section--add-project-button"
    );
    const projectDialog = document.querySelector(".project-dialog");
    const cancelBtn = document.querySelector(".project-input-cancel-btn");
    const submitBtn = document.querySelector(".project-input-submit-btn");
    const projectNameInput = document.querySelector(".project-name-input");

    addProjectButton.addEventListener("click", () => {
        projectDialog.showModal();
    });

    cancelBtn.addEventListener("click", () => {
        projectDialog.close();
        projectNameInput.value = "";
    });
    submitBtn.addEventListener("click", () => {
        const projectName = projectNameInput.value;
        projectList.push(projectName);
        addProjectToDOM();
        projectDialog.close();
        projectNameInput.value = "";
        addDeleteProjectListeners();
    });
});

function addProjectToDOM() {
    const projectContainer = document.querySelector(
        ".sidebar-projects-section--project-page-container"
    );
    const projectInput = document.querySelector(".project-input");

    projectContainer.innerHTML = "";
    projectInput.innerHTML = "";

    projectList.forEach((project) => {
        const projectDiv = `
        <div class="sidebar-projects-section--project-page sidebar-page">
            <div class="project-name">${project}</div>
            <div class="project-delete-icon-container">
                <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can-outline</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
            </div>
        </div>`;
        const projectOption = `<option value="${project}">${project}</option>`;
        projectContainer.innerHTML += projectDiv;
        projectInput.innerHTML += projectOption;
    });
}

function addDeleteProjectListeners() {
    const deleteProjectIcons = document.querySelectorAll(
        ".project-delete-icon-container > svg"
    );
    deleteProjectIcons.forEach((icon, index) => {
        icon.addEventListener("click", (e) => {
            e.stopPropagation();
            projectList.splice(index, 1);
            addProjectToDOM();
            addDeleteProjectListeners();
        });
    });
}
