TodoForm = React.createClass({
	getInitialState: function() {
		return { title: "", body: "" };
	},

	updateTitle: function(e) {
		this.setState({ title: e.currentTarget.value });
	},

	updateBody: function(e) {
		this.setState({ body: e.currentTarget.value });
	},

	saveTodo: function(e) {
		var title = this.state.title,
			body = this.state.body;
		this.setState({title: "", body: ""})
		ApiUtil.createTodo({ title: title, body: body });
	},

	render: function() {

		return (
			<div>
				<form onSubmit={this.saveTodo}>
					<label>
						<input onChange={this.updateTitle} value={this.state.title} placeholder="TITLE"/>
					</label>
					<label>
						<input onChange={this.updateBody} value={this.state.body} placeholder="BODY"/>
					</label>
					<button type="submit">Add ToDo</button>
				</form>
			</div>
		);
	}
});