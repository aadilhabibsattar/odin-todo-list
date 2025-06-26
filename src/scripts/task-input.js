import { Task, taskList } from "./task-generator.js";

document.addEventListener("DOMContentLoaded", () => {
    const addTaskButton = document.querySelector(".add-task-button");
    const dialog = document.querySelector(".dialog");
    const closeModalButton = document.querySelector(".dialog-close-dialog-btn");
    const dialogAddTaskButton = document.querySelector(".dialog-add-task-btn");

    const titleInput = document.querySelector(".task-title-input");
    const descriptionInput = document.querySelector(".task-description-input");
    const dateInput = document.querySelector(".date-input");
    const priorityInput = document.querySelector(".priority-input");

    addTaskButton.addEventListener("click", () => {
        dialog.showModal();
    });

    closeModalButton.addEventListener("click", () => {
        titleInput.value = "";
        descriptionInput.value = "";
        dateInput.value = "";
        priorityInput.selectedIndex = 0;
        dialog.close();
    });

    dialogAddTaskButton.addEventListener("click", () => {
        const title = titleInput.value;
        const description = descriptionInput.value;
        const dueDate = dateInput.value;
        const priority = priorityInput.value;

        const task = new Task(title, description, dueDate, priority);
        task.addTaskToList();
        console.log(task);
        console.log(taskList);

        titleInput.value = "";
        descriptionInput.value = "";
        dateInput.value = "";
        priorityInput.selectedIndex = 0;
        dialog.close();
    });
});
