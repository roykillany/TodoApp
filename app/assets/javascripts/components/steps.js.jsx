Steps = React.createClass({
	getInitialState: function() {
		return { steps: this.props.steps };
	},

	componentDidMount: function() {
		StepStore.addChangeListener(this._onChange);
		if(this.props.steps) {StepStore.addSteps(this.props.steps);};
	},

	_onChange: function() {
		this.setState({ steps: StepStore.todoSteps(this.props.todoId) });
	},

	updateCompletion: function(e) {
		var id = $(e.currentTarget).parent().data("id"),
			step = this.find(id);
		step.done = !step.done
		ApiUtil.updateStep(step);
	},

	find: function(id) {
		return this.state.steps.filter(function(step) { return step.id === id; })[0];
	},

	render: function() {
		console.log(this.state.steps);
		var self = this;
		var steps = this.state.steps ? this.state.steps.map(function(step) {
			var checked = step.done ? "checked" : "",
				className = "step-item " + checked;
			return <li key={step.id} data-id={step.id} className={className}>
				<input type="checkbox" checked={checked} name="done" onChange={self.updateCompletion} value="true"/>
				{step.content}
				</li>
		}) : [];

		return (
			<ul className="steps-container">
				<StepForm todoId={this.props.todoId}/>
				{steps}
			</ul>
		);
	}
});