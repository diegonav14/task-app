$(function () {
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
    };
    $.post("task-add.php", postData, function (response) {
      $("#task-form").trigger("reset");
      alert("The task have been added");
      fetchTasks();
    });
    e.preventDefault();
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
          template += `<tr>
            <td>${task.id}</td>
            <td>${task.name}</td>
            <td>${task.description}</td>
          </tr>`;
        });
        $("#tasks").html(template);
      },
    });
  }
});
