class Todo < ActiveRecord::Base
	validates_presence_of :title
	has_many :steps, dependent: :destroy

	def update_steps
		self.steps.update_all({done: self.done})
	end

	def is_completed?
		self.steps.all? { |step| step.done }
	end

	def update_completion
		if self.is_completed?
			self.update({done: true})
		else
			self.update({done: false})
		end
	end
end