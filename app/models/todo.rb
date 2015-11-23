class Todo < ActiveRecord::Base
	has_many :steps, dependent: :destroy

	after_update :update_steps

	def update_steps
		self.steps.update_all({done: self.done})
	end

	def is_completed?
		self.steps.all? { |step| step.done }
	end
end