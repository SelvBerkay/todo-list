let toDoUl = document.querySelector("#todoUl")
const input = document.querySelector("#todoaddinput")
let gorevListesi = [];

if (localStorage.getItem("gorevListesi") !== null) {
  gorevListesi = JSON.parse(localStorage.getItem("gorevListesi"));
}


const addBtn = document.querySelector(".addbtn")
displayTasks("all")
function displayTasks(filter) {
  toDoUl.innerHTML = ""
  for (let gorev of gorevListesi) {
    let completed = gorev.status == "completed" ? "checked": "";
    if (filter == gorev.status || filter == "all") {
      let li = `
      <li class="list-group-item">
        <div>
          <input class="form-check-input me-1" ${completed} type="checkbox" value="" id="${gorev.id}" onclick="doneJob(this)">
          <label class="form-check-label ${completed}" for="${gorev.id}">${gorev.gorevAdi}</label>
        </div>
        <div class="dropdown">
          <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-ellipsis"></i>
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" onclick='editTasks(${gorev.id},"${gorev.gorevAdi}")'><i class="fa-solid fa-pen-to-square"></i> Düzenle</a></li>
            <li><a class="dropdown-item" href="#" onclick="deleteTasks(${gorev.id})"><i class="fa-solid fa-trash"></i> Sil</a></li>
          </ul>
        </div>
      </li>`
      toDoUl.insertAdjacentHTML("beforeend", li);
    }
  }
}

let editId;
let isEdit = false;

function addTask() {
  if (input.value == "") {
    alert("Bir görev girmelisiniz...")
  } else {
    if (!isEdit) {
      let newEleman = {
        "id": gorevListesi.length + 1,
        "gorevAdi": `${input.value}`,
        "status" : "pending"
      }
      gorevListesi.push(newEleman)
      } else {
        for(let gorev of gorevListesi) {
          if (gorev.id == editId) {
            gorev.gorevAdi = input.value;
          }
          isEdit = false;
        }
    }
    input.value = ""
    displayTasks(document.querySelector("span.active").id)
    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi)); 
  }
}

function doneJob(selectedTasks) {
  let label = selectedTasks.nextElementSibling;
  let durum;

  if (selectedTasks.checked) {
    label.classList.add("checked")
    durum = "completed"
  } else {
    label.classList.add("checked")
    durum = "pending"
  }

  for(let gorev of gorevListesi) {
    if (gorev.id == selectedTasks.id) {
      gorev.status = durum;
    }
  }
  localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi)); 
  displayTasks(document.querySelector("span.active").id)
}

function allClear() {
  gorevListesi.splice(0,gorevListesi.length)
  localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi)); 
  displayTasks(document.querySelector("span.active").id)
  toDoUl.innerHTML = "<p class='text-center mt-3 fw-bold'>Görev listeniz boş.</p>"
}

function deleteTasks(removeid) {
  for(let gorev of gorevListesi) {
    if (gorev.id == removeid) {
      gorevListesi.splice(removeid - 1, 1)
      localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi)); 
      displayTasks(document.querySelector("span.active").id)
    }
    if (gorevListesi.length == 0) {
      toDoUl.innerHTML = "<p class='text-center mt-3 fw-bold'>Görev listeniz boş.</p>"
    }
  }  
}

function editTasks(taskId, editTask) {
  editId = taskId;
  isEdit = true;
  input.value = editTask;
  input.focus();
  input.classList.add("active")  
}


const spans = document.querySelectorAll(".controls span")

for(let span of spans) {
  span.addEventListener("click", function() {
    document.querySelector("span.active").classList.remove("active")
    span.classList.add("active")
    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
    displayTasks(span.id)
    if (localStorage.gorevListesi == "[]") {
      allClear()
    } 
  })
}
if (localStorage.gorevListesi == "[]") {
  allClear()
} 

