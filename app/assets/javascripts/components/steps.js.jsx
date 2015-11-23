Steps = React.createClass({
	getInitialState: function() {
		return { steps: this.props.steps };
	},

	componentDidMount: function() {
		StepStore.addChangeListener(this._onChange);
		StepStore.addSteps(this.props.steps);
	},

	_onChange: function() {
		console.log("CHANGE", this.state);
		this.setState({ steps: StepStore.todoSteps(this.props.todoId) });
		console.log("CHANGE2", this.state);
	},

	render: function() {
		var steps = this.state.steps ? this.state.steps.map(function(step) {
			return <li className="step-item">{step.content}</li>
		}) : [];

		return (
			<ul className="steps-container">
				<StepForm todoId={this.props.todoId}/>
				{steps}
			</ul>
		);
	}
});