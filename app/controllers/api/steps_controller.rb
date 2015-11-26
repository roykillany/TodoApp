class Api::StepsController < ApplicationController
	def index
		@steps = Step.all
		render json: @steps
	end

	def show
		@steps = Step.find(params[:id])
		if @step
			render json: @step
		else
			render json: { err: "There is no Step with that ID" }, status: 422
		end
	end

	def create
		@step = Step.new(step_params)
		begin
			@step.save!
			ActiveRecord::Associations::Preloader.new.preload(@step, {todo: :steps})
		rescue => e
			p e.message
			p e.backtrace
			render json: { err: e.message }, status: 422
		end
	end

	def destroy
		@step = Step.includes(todo: :steps).find(params[:id])
		todo_id = @step.todo_id

		begin
			@step.destroy!
			@todo = Todo.includes(:steps).find(todo_id)
			@todo.update_completion
		rescue => e
			p e.message
			p e.backtrace
			render json: { err: e.message }, status: 422
		end
	end

	def update
		@step = Step.find(params[:id])

		begin
			@step.update(step_params)
			@step.save!
			ActiveRecord::Associations::Preloader.new.preload(@step, {todo: :steps})
		rescue => e
			p e.message
			p e.backtrace
			render json: { err: e.message }, status: 304
		end
	end

	private

	def step_params
		params.require(:step).permit(:content, :todo_id, :done)
	end
end