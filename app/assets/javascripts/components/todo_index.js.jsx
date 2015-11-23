TodoIndex = React.createClass({
	getInitialState: function() {
		return { todos: TodoStore.all() };
	},

	componentDidMount: function() {
		TodoStore.addChangeListener(this._onChange);
		ApiUtil.fetchTodos();
	},

	componentWillUnmount: function () {
		TodoStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({ todos: TodoStore.all() });
	},

	deleteTodo: function(e) {
		var idx = e.currentTarget.id,
			todo = this.state.todos[idx];
			
		ApiUtil.removeTodo(todo);
	},

	updateCompletion: function(e) {
		var id = $(e.currentTarget).parent().data("id"),
			todo = this.find(id);
		todo.done = !todo.done
		ApiUtil.updateTodo(todo);
	},

	find: function(id) {
		return this.state.todos.filter(function(todo) { return todo.id === id; })[0];
	},

	render: function() {
		// console.log(this.state.todos);
		var self = this;
		var todos = this.state.todos.map(function(td, idx) {
			var checked = td.done ? "checked" : "",
				className = "todo-item " + checked;
			return <li key={td.id} data-id={td.id} className={className}>
				<input type="checkbox" checked={checked} name="done" onChange={self.updateCompletion} value="true"/>
				<div className="todo-info">
					<h3>{td.title}</h3>
					<div>{td.body}</div>
				</div>
				<div className="todo-close" id={idx} onClick={self.deleteTodo}>✘</div>
				<Steps steps={td.steps} todoId={td.id}/>
			</li>;
		});

		return (
			<div>
				<h1>ToDos Manager</h1>
				<div className="todo-form">
					<TodoForm />
				</div>
				<ul className="todo-container">
					{todos}
				</ul>
			</div>
		);
	}
});