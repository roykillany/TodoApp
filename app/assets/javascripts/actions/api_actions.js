ApiActions = {
	receiveAllTodos: function(todos) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODOS_RECEIVED,
			todos: todos
		});
	},

	receiveNewTodo: function(todo) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.NEW_TODO_RECEIVED,
			todo: todo
		})
	},

	removeTodo: function(todo) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_REMOVED,
			todo: todo
		});
	},

	receiveSteps: function(steps) {
		AppDispatcher.dispatch({
			actionType: StepConstants.STEPS_RECEIVED,
			steps: steps
		})
	},

	addStep: function(step) {
		AppDispatcher.dispatch({
			actionType: StepConstants.NEW_STEP_RECEIVED,
			step: step
		});
	}
}