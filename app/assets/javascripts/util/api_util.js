ApiUtil = {
	fetchTodos: function() {
		$.ajax({
			url: "/api/todos",
			type: "GET",
			success: function(resp) {
				ApiActions.receiveAllTodos(resp);
			}
		});
	},

	createTodo: function(todo) {
		$.ajax({
			url: "/api/todos",
			type: "POST",
			data: { todo: todo },
			success: function(resp) {
				ApiActions.receiveNewTodo(resp);
			}
		});
	},

	removeTodo: function(todo) {
		$.ajax({
			url: "/api/todos/" + todo.id,
			type: "DELETE",
			success: function(resp) {
				ApiActions.removeTodo(todo);
			}
		});
	},

	updateTodo: function(todo) {
		$.ajax({
			url: "/api/todos/" + todo.id,
			type: "PATCH",
			data: { todo: todo },
			success: function(resp) {
				ApiActions.updateTodo(resp);
			}
		});
	},

	saveStep: function(step) {
		$.ajax({
			url: "/api/steps",
			type: "POST",
			data: { step: step },
			success: function(resp) {
				ApiActions.addStep(resp);
			}
		});
	},

	updateStep: function(step) {
		$.ajax({
			url: "/api/steps/" + step.id,
			type: "PATCH",
			data: { step: step },
			success: function(resp) {
				ApiActions.updateStep(resp);
			}
		});
	}
}