(function(root) {
	var _todos = [];
	var CHANGE_EVENT = "change";
	var TodoStore = window.TodoStore = $.extend({}, EventEmitter.prototype);

	TodoStore.addChangeListener = function(callback) {
		this.on(CHANGE_EVENT, callback);
	};

	TodoStore.removeChangeListener = function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	};

	TodoStore.changed = function() {
		this.emit(CHANGE_EVENT);
	};

	TodoStore.all = function() {
		return _todos.slice(0);
	};

	TodoStore.unstartedAll = function() {
		return _todos.filter(function(td){return !td.done && !td.started;});
	};

	TodoStore.incompAll = function() {
		return _todos.filter(function(td){return td.started && !td.done;})
	};

	TodoStore.finishedAll = function() {
		return _todos.filter(function(td){return td.done;});
	};

	TodoStore.addNewTodo = function(todo) {
		_todos.push(todo);
	};

	TodoStore.removeTodo = function(todo) {
		var idx = _todos.indexOf(todo);
		if(idx > -1) {_todos.splice(idx, 1)};
	};

	TodoStore.updateTodo = function(todo) {
		var oldTodo = this.find(todo.id),
			oldIdx = _todos.indexOf(oldTodo);
		_todos[oldIdx] = todo;
	};

	TodoStore.resetTodos = function(todos) {
		_todos = todos;
	};

	TodoStore.find = function(id) {
		return _todos.filter(function(todo) { return todo.id === id; })[0];
	};

	TodoStore.dispatcherID = AppDispatcher.register(function(payload) {
		switch(payload.actionType) {
			case TodoConstants.TODOS_RECEIVED:
				TodoStore.resetTodos(payload.todos);
				TodoStore.changed();
				break;
			case TodoConstants.NEW_TODO_RECEIVED:
				TodoStore.addNewTodo(payload.todo);
				TodoStore.changed();
				break;
			case TodoConstants.TODO_REMOVED:
				TodoStore.removeTodo(payload.todo);
				TodoStore.changed();
				break;
			case TodoConstants.TODO_UPDATED:
				TodoStore.updateTodo(payload.todo);
				TodoStore.changed();
				break;
		}
	});

})(this);