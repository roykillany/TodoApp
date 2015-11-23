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

	updateTodo: function(todo) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_UPDATED,
			todo: todo
		});
		AppDispatcher.dispatch({
			actionType: StepConstants.TODO_UPDATED,
			todo: todo
		});
	},

	checkTodo: function(todo) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_UPDATED,
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
	},

	updateStep: function(step) {
		AppDispatcher.dispatch({
			actionType: StepConstants.STEP_UPDATED,
			step: step
		});
	}
}