StepForm = React.createClass({
	getInitialState: function() {
		return { content: "" };
	},

	updateContent: function(e) {
		this.setState({ content: e.currentTarget.value });
	},

	saveStep: function(e) {
		var key = e.key,
			content = e.currentTarget.value,
			todo_id = this.props.todoId;
		if(key === "Enter") {
			ApiUtil.saveStep({todo_id: todo_id, content: content});
		}
	},

	render: function() {
		return (
			<form className="step-form">
				<input onChange={this.updateContent} onKeyPress={this.saveStep} value={this.state.content} placeholder="CONTENT"/>
			</form>
		);
	}
});