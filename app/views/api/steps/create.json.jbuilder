json.merge! @step.attributes
json.todo do
	json.partial! "api/todos/todo_partial", todo: @step.todo
end