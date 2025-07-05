import { Task, taskList } from "./task-generator.js";
import { addTasksToPage } from "./dom.js";

document.addEventListener("DOMContentLoaded", () => {
    loadTasksFromStorage();
    addTasksToPage();

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

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    const todayStr = `${yyyy}-${mm}-${dd}`;

    dateInput.setAttribute("min", todayStr);

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
        saveTasksToStorage();
        addTasksToPage();
        resetTaskInputFields();
        taskDialog.close();
    });

    function resetTaskInputFields() {
        titleInput.value = "";
        descriptionInput.value = "";
        dateInput.value = "";
        priorityInput.selectedIndex = 0;
        projectInput.selectedIndex = 0;
    }
});

export function addDeleteTaskListeners() {
    const deleteTaskIcons = document.querySelectorAll(
        ".delete-icon-container > svg"
    );

    deleteTaskIcons.forEach((icon, index) => {
        icon.addEventListener("click", (e) => {
            e.stopPropagation();
            taskList.splice(index, 1);
            addTasksToPage();
            saveTasksToStorage();
            addDeleteTaskListeners();
        });
    });
}

export function saveTasksToStorage() {
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

function loadTasksFromStorage() {
    const storedTasks = JSON.parse(localStorage.getItem("taskList")) || [];
    storedTasks.forEach((taskData) => {
        const task = new Task(
            taskData.title,
            taskData.description,
            taskData.dueDate,
            taskData.priority,
            taskData.project
        );
        taskList.push(task);
    });
}
