class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
    	t.string :title
    	t.string :body
    	t.boolean :done, presence: true, default: false

    	t.timestamps
    end
  end
end
