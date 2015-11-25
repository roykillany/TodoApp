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
		var checked = $(e.currentTarget)[0].checked,
			stepItem = $(e.currentTarget).parent(),
			id = stepItem.data("id"),
			step = this.find(id);
		step.done = !step.done
		ApiUtil.updateStep(step);
		if(checked) {
			stepItem.addClass("flash-green");
			window.setTimeout(function() {
				stepItem.removeClass("flash-green");
			}, 1000);
		}
	},

	find: function(id) {
		return this.state.steps.filter(function(step) { return step.id === id; })[0];
	},

	render: function() {
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
				{steps}
				<StepForm todoId={this.props.todoId}/>
			</ul>
		);
	}
});