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

	render: function() {
		var self = this;
		var todos = this.state.todos.map(function(td, idx) {
			return <li key={td.id} className="todo-item">
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