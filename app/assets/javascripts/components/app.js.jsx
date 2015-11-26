App = React.createClass({
	render: function() {
		return (
			<div className="todo-app">
				{this.props.children}
			</div>
		);
	}
});