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
			render json: @step
		rescue => e
			p e.message
			p e.backtrace
			render json: { err: e.message }, status: 422
		end
	end

	def destroy
		@step = Step.find(params[:id])

		begin
			@step.destroy!
			render json: { ok: 1 }
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
			render json: @step
		rescue => e
			p e.message
			p e.backtrace
			render json: { err: e.message }, status: 304
		end
	end

	private

	def step_params
		params.require(:step).permit(:content, :todo_id)
	end
end