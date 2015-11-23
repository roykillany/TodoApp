json.merge! @step.attributes
json.todo do
	json.merge! @step.todo.attributes
	json.steps @step.todo.steps
end