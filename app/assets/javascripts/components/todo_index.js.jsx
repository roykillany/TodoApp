TodoIndex = React.createClass({
	getInitialState: function() {
		return { todos: TodoStore.all(), unstartedTodos: TodoStore.unstartedAll(), incompTodos: TodoStore.incompAll(), finishedTodos: TodoStore.finishedAll() };
	},

	componentDidMount: function() {
		TodoStore.addChangeListener(this._onChange);
		ApiUtil.fetchTodos();
	},

	componentWillUnmount: function () {
		TodoStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({ todos: TodoStore.all(), unstartedTodos: TodoStore.unstartedAll(), incompTodos: TodoStore.incompAll(), finishedTodos: TodoStore.finishedAll() });
	},

	deleteTodo: function(e) {
		var id = $(e.currentTarget).data("id"),
			todo = this.find(id);
		console.log("deleting", id, todo);
		ApiUtil.removeTodo(todo);
	},

	updateCompletion: function(e) {
		var id = $(e.currentTarget).parent().data("id"),
			todo = this.find(id);
		todo.done = !todo.done
		ApiUtil.updateTodo(todo);
	},

	showSteps: function(e) {
		var stepsContainer = $(e.currentTarget).siblings(".steps-container"),
			displayed = stepsContainer.hasClass("active");

		if(displayed) {
			stepsContainer.removeClass("active");
		} else {
			stepsContainer.addClass("active");
		}
	},

	find: function(id) {
		return this.state.todos.filter(function(todo) { return todo.id === id; })[0];
	},

	render: function() {
		var self = this,
			mapCB = function(td, idx) {
				var checked = td.done ? "checked" : "",
					className = "todo-item " + checked,
					todoKey = "todo-" + td.id;
				return <li key={td.id} data-id={td.id} className={className}>
					<input type="checkbox" checked={checked} name="done" onChange={self.updateCompletion} value="true"/>
					<div className="todo-info" onClick={self.showSteps}>
						<h3>{td.title} <div>({td.completion})</div></h3>
						<div>{td.body}</div>
					</div>
					<div className="todo-close" data-id={td.id} onClick={self.deleteTodo}>✘</div>
					<Steps steps={td.steps} todoId={td.id}/>
				</li>;
			},
			unstartedTodos = this.state.unstartedTodos.map(mapCB),
			incompTodos = this.state.incompTodos.map(mapCB),
			finishedTodos = this.state.finishedTodos.map(mapCB);

		return (
			<div>
				<h1>ToDos Manager</h1>
				<div className="todo-form">
					<TodoForm />
				</div>
				<div className="category-label">UNSTARTED {unstartedTodos.length}</div>
				<ul className="todo-container unstarted">
					{unstartedTodos}
				</ul>
				<div className="category-label">IN PROGRESS {incompTodos.length}</div>
				<ul className="todo-container progress">
					{incompTodos}
				</ul>
				<div className="category-label">COMPLETED {finishedTodos.length}</div>
				<ul className="todo-container done">
					{finishedTodos}
				</ul>
			</div>
		);
	}
});