App = React.createClass({
	render: function() {
		debugger
		console.log(this);
		return (
			<div className="todo-app">
				{TodoIndex}
				{this.props.children}
			</div>
		);
	}
});