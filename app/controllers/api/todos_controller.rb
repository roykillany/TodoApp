class Api::TodosController < ApplicationController
	def index
		@todos = Todo.includes(:steps).all
	end

	def show
		@todo = Todo.includes(:steps).find(params[:id])
		if @todo
			render json: @todo
		else
			render json: { err: "There is no Todo with that ID" }, status: 422
		end
	end

	def create
		@todo = Todo.new(todo_params)
		begin
			@todo.save!
			render json: @todo
		rescue => e
			p e.message
			p e.backtrace
			render json: { err: e.message }, status: 422
		end
	end

	def destroy
		@todo = Todo.find(params[:id])

		begin
			@todo.destroy!
			render json: { ok: 1 }
		rescue => e
			p e.message
			p e.backtrace
			render json: { err: e.message }, status: 422
		end
	end

	def update
		@todo = Todo.find(params[:id])

		begin
			@todo.update(todo_params)
			@todo.save!
			render json: @todo
		rescue => e
			p e.message
			p e.backtrace
			render json: { err: e.message }, status: 304
		end
	end

	private

	def todo_params
		params.require(:todo).permit(:title, :body, :done)
	end
end