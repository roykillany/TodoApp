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
		_steps = _steps.concat(steps);
	}

	StepStore.todoSteps = function(todoId) {
		return _steps.filter(function(step) { return step.todo_id === todoId; }).slice(0);
	};

	StepStore.addNewStep = function(step) {
		_steps.push(step);
	};

	StepStore.removeStep = function(stepId) {
		var idx = _steps.indexOf(StepStore.find(stepId));
		if(idx > -1) {_steps.splice(idx, 1)};
	};

	StepStore.resetSteps = function(steps) {
		_steps = steps;
	};

	StepStore.updateStep = function(step) {
		var oldStep = this.find(step.id),
			oldIdx = _steps.indexOf(oldStep);
		_steps[oldIdx] = step;
	};

	StepStore.updateStepsCompletion = function(todo) {
		var id = todo.id,
			done = todo.done;

		_steps.map(function(step) {
			if(step.todo_id === id) {
				step.done = done;
				return step;
			} else {
				return step;
			}
		});
	};

	StepStore.updateSteps = function(steps) {
		var id = steps[0].todo_id;

		_steps = _steps.filter(function(step) {
			return step !== id;
		}).concat(steps);
	};

	StepStore.find = function(id) {
		return _steps.filter(function(step) { return step.id === id; })[0];
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
				StepStore.removeStep(payload.stepId);
				StepStore.changed();
				break;
			case StepConstants.STEP_UPDATED:
				StepStore.updateStep(payload.step);
				StepStore.changed();
				break;
			case StepConstants.STEPS_UPDATED:
				StepStore.updateSteps(payload.steps);
				break;
			case StepConstants.TODO_UPDATED_STEPS:
				StepStore.updateStepsCompletion(payload.todo);
				StepStore.changed();
				break;
		}
	});

})(this);