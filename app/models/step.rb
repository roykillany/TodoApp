class Step < ActiveRecord::Base
	belongs_to :todo

	after_update :update_todo_completion
	after_create :update_todo_completion
	after_destroy :update_todo_completion

	def update_todo_completion
		# self.todo.update!({done: true}) if self.todo.is_completed?

		if self.todo.is_completed?
			self.todo.update!({done: true})
		else
			self.todo.update!({done: false})
		end
	end
end