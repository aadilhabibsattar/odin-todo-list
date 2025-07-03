import { Task, taskList } from "./task-generator.js";
import { addTasksToPage } from "./dom.js";

document.addEventListener("DOMContentLoaded", () => {
    const addTaskButton = document.querySelector(".add-task-button");
    const taskDialog = document.querySelector(".task-dialog");
    const closeModalButton = document.querySelector(".dialog-close-dialog-btn");
    const dialogAddTaskButton = document.querySelector(".dialog-add-task-btn");

    const titleInput = document.querySelector(".task-title-input");
    const descriptionInput = document.querySelector(".task-description-input");
    const dateInput = document.querySelector(".date-input");
    const priorityInput = document.querySelector(".priority-input");
    const projectInput = document.querySelector(".project-input");

    addTaskButton.addEventListener("click", () => {
        taskDialog.showModal();
    });

    closeModalButton.addEventListener("click", () => {
        resetTaskInputFields();
        taskDialog.close();
    });

    dialogAddTaskButton.addEventListener("click", () => {
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const dueDate = dateInput.value;
        const priority = priorityInput.value;
        const project = projectInput.value;

        if (title === "" || dueDate === "") {
            resetTaskInputFields();
            return;
        }

        const task = new Task(title, description, dueDate, priority, project);
        task.addTaskToList();
        addTasksToPage();
        resetTaskInputFields();
        taskDialog.close();
        addDeleteTaskListeners();
    });

    function resetTaskInputFields() {
        titleInput.value = "";
        descriptionInput.value = "";
        dateInput.value = "";
        priorityInput.selectedIndex = 0;
        projectInput.selectedIndex = 0;
    }
});

function addDeleteTaskListeners() {
    const deleteTaskIcons = document.querySelectorAll(
        ".delete-icon-container > svg"
    );

    deleteTaskIcons.forEach((icon, index) => {
        icon.addEventListener("click", (e) => {
            e.stopPropagation();
            taskList.splice(index, 1);
            addTasksToPage();
            addDeleteTaskListeners();
        });
    });
}
