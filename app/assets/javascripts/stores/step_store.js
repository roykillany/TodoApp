(function(root) {
	var _steps = [];
	var CHANGE_EVENT = "change";
	var StepStore = window.StepStore = $.extend({}, EventEmitter.prototype);

	StepStore.addChangeListener = function(callback) {
		this.on(CHANGE_EVENT, callback);
	};

	StepStore.removeChangeListener = function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	};

	StepStore.changed = function() {
		this.emit(CHANGE_EVENT);
	};

	StepStore.all = function() {
		return _steps.slice(0);
	};

	StepStore.addSteps = function(steps) {
		console.log(steps);
		_steps = _steps.concat(steps);
	}

	StepStore.todoSteps = function(todoId) {
		console.log(_steps);
		console.log(todoId);
		return _steps.filter(function(step) { return step.todo_id === todoId; }).slice(0);
	};

	StepStore.addNewStep = function(step) {
		_steps.push(step);
	};

	StepStore.removeStep = function(step) {
		var idx = _steps.indexOf(step);
		if(idx > -1) {_steps.splice(idx, 1)};
	};

	StepStore.resetSteps = function(steps) {
		_steps = steps;
	};

	StepStore.dispatcherID = AppDispatcher.register(function(payload) {
		switch(payload.actionType) {
			case StepConstants.STEPS_RECEIVED:
				StepStore.addSteps(payload.steps);
				break;
			case StepConstants.NEW_STEP_RECEIVED:
				StepStore.addNewStep(payload.step);
				StepStore.changed();
				break;
			case StepConstants.STEP_REMOVED:
				StepStore.removeStep(payload.step);
				StepStore.changed();
		}
	});

})(this);