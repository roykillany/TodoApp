App = React.createClass({
	render: function() {
		debugger
		console.log(this.props.children);
		return (
			<div className="todo-app">
				{this.props.children}
			</div>
		);
	}
});