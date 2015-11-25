json.array!(@todos) do |todo|
	json.partial! "api/todos/todo_partial", todo: todo
end