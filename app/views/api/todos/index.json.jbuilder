json.array!(@todos) do |todo|
	json.merge! todo.attributes
	json.steps todo.steps
end