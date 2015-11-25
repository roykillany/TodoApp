json.merge! todo.attributes
json.completion todo.steps.select { |step| step.done }.count.to_s + "/#{todo.steps.count}"
json.started todo.steps.any? { |step| step.done }
json.steps todo.steps