class CreateSteps < ActiveRecord::Migration
  def change
    create_table :steps do |t|
    	t.string :content
    	t.integer :todo_id, presence: true
    	
    	t.timestamps
    end
  end
end
