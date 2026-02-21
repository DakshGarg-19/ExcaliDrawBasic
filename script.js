function generateId() {
  return crypto.randomUUID();
}

let currentTool = null;
let history = [];
let redoStack = [];

function undo() {
  if (history.length > 0) {
    const lastId = history.pop();
    const element = document.querySelector(`[data-id="${lastId}"]`);
    if (element) {
      redoStack.push(element);
      element.remove();
    }
  }
}

function redo() {
  if (redoStack.length > 0) {
    const element = redoStack.pop();
    document.body.appendChild(element);
    history.push(element.dataset.id);
  }
}

let tools = document.querySelectorAll(".tool");
tools.forEach((tool) => {
  tool.addEventListener("click", () => {
    if (tool.id === "undo") {
      undo();
      return;
    }
    if (tool.id === "redo") {
      redo();
      return;
    }
    tools.forEach((tool) => tool.classList.remove("active"));
    tool.classList.add("active");
    currentTool = tool.id;
    console.log(currentTool);
  });
});

let isDragging = false;
let draggedElement = null;
let offsetX = 0;
let offsetY = 0;

window.addEventListener("mousedown", (e) => {
  if (currentTool !== "move") return;

  const target = e.target.closest("[data-id]");
  if (!target) return;

  isDragging = true;
  draggedElement = target;

  const rect = target.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  document.body.style.cursor = "grabbing";
  document.body.style.userSelect = "none";
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging || !draggedElement) return;

  const x = e.clientX - offsetX + window.scrollX;
  const y = e.clientY - offsetY + window.scrollY;

  draggedElement.style.transform = "none";
  draggedElement.style.left = x + "px";
  draggedElement.style.top = y + "px";
});

window.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    draggedElement = null;
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
  }
});

window.addEventListener("click", (e) => {
  const creationTools = [
    "pen",
    "eraser",
    "line-vertical",
    "line-horizontal",
    "rectangle",
    "circle",
    "arrow",
    "text",
    "bucket",
  ];
  if (!creationTools.includes(currentTool)) {
    return;
  }

  if (currentTool === "bucket") {
    const target = e.target.closest("[data-id]");
    if (target) {
      let id = target.dataset.id;
      let index = history.indexOf(id);
      if (index !== -1) {
        history.splice(index, 1);
      }
      redoStack.push(target);
      target.remove();
    }
    return;
  }

  let div = document.createElement("div");
  div.style.position = "absolute";
  div.dataset.id = generateId();

  if (currentTool === "pen") {
    div.classList.add("pen");
  } else if (currentTool === "eraser") {
    div.classList.add("eraser");
  } else if (currentTool === "line-vertical") {
    div.classList.add("box");
    div.classList.add("vertical");
  } else if (currentTool === "line-horizontal") {
    div.classList.add("box");
    div.classList.add("horizontal");
  } else if (currentTool === "rectangle") {
    div.classList.add("box");
    div.classList.add("rectangle");
  } else if (currentTool === "circle") {
    div.classList.add("box");
    div.classList.add("circle");
  } else if (currentTool === "arrow") {
    div.innerHTML = "<i class='fa-solid fa-arrow-right'></i>";
    div.classList.add("arrow");
  } else if (currentTool === "text") {
    div.contentEditable = true;
    div.classList.add("box");
    div.classList.add("text");
    div.addEventListener("click", (e) => {
      if (currentTool !== "bucket") e.stopPropagation();
    });
  }

  document.body.appendChild(div);

  const rect = div.getBoundingClientRect();
  div.style.left = e.pageX - rect.width / 2 + "px";
  div.style.top = e.pageY - rect.height / 2 + "px";
  div.style.transform = "none";

  history.push(div.dataset.id);
  redoStack = [];
});

let toolBar = document.querySelector(".tools");
toolBar.addEventListener("click", (e) => {
  e.stopPropagation();
});
toolBar.addEventListener("mousedown", (e) => {
  e.stopPropagation();
});
