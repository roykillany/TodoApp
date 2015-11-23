class Step < ActiveRecord::Base
	belongs_to :todo

	after_update :update_todo_completion

	def update_todo_completion
		self.todo.update!({done: true}) if self.todo.is_completed?
	end
end