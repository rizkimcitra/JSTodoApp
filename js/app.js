document.addEventListener("DOMContentLoaded", () => {
  const submitForm = document.getElementById("form");

  submitForm.addEventListener("submit", (event) => {
    const backDropArea = document.querySelector("main > .backlit");
    const submitForm = document.getElementById("form");
    event.preventDefault();
    addTodo();
    backDropArea.remove();
    submitForm.reset();
    closeForm();
  });
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});
document.addEventListener("ondataloaded", () => {
  refreshDataFromTodos();
});
