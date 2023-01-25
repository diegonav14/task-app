$(function () {
  let edit = false;
  let editID;
  console.log("Jquery esta funcionando");
  $("#task-result").hide();
  fetchTasks();

  // Buscar tarea Ajax
  $("#search").keyup(function () {
    if ($("#search").val()) {
      let search = $("#search").val();
      $.ajax({
        url: "task-search.php",
        type: "POST",
        data: { search },
        success: function (response) {
          let tasks = JSON.parse(response);
          let template = "";
          tasks.forEach((task) => {
            template += `<li>
                       ${task.name}
                       </li>`;
          });
          $("#container").html(template);
          $("#task-result").show();
        },
      });
    }
  });

  // Agregar tarea Ajax
  $("#task-form").submit(function (e) {
    const postData = {
      name: $("#name").val(),
      description: $("#description").val(),
      id: editID,
    };

    let url = edit === false ? 'task-add.php' : 'task-edit.php'; 

    $.post(url, postData, function (response) {
      $("#task-form").trigger("reset");
      alert("The task has been added");
      fetchTasks();
      console.log(response);
    });
    e.preventDefault();
    edit = false;
  });

  //Listar tareas Ajax
  function fetchTasks() {
    $.ajax({
      type: "GET",
      url: "task-list.php",
      success: function (response) {
        let tasks = JSON.parse(response);
        let template = "";
        tasks.forEach((task) => {
          template += `<tr taskID=${task.id}>
            <td>${task.id}</td>
            <td>
              <a href="#" class="task-item">
                ${task.name}
              </a>
            </td>
            <td>${task.description}</td>
            <td>
              <button class='btn btn-danger task-delete'>
              Delete
              </button>
            </td>
          </tr>`;
        });
        $("#tasks").html(template);
      },
    });
  }


  //Borrar tarea Ajax
  $(document).on("click", ".task-delete", function () {
    if (confirm("Are you sure you want to delete it ?")) {
      let element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr("taskID");
      $.post("task-delete.php", { id }, function (response) {
        fetchTasks();
      });
    }
  });


  $(document).on("click", ".task-item", function () {
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr("taskID");
    editID = id;
    $.post("task-single.php", { id }, function (response) {
      const task = JSON.parse(response);
      $('#name').val(task.name);
      $('#description').val(task.description);
      edit = true;
    });
  });
  

});
