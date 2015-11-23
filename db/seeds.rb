# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

grocery = Todo.create({
	title: "Grocery Shopping",
	body: "Sister's birthday cake, house warming party, crockpot stuff",
})
Step.create({
	todo_id: grocery.id,
	content: "eggs"
})
Step.create({
	todo_id: grocery.id,
	content: "flour"
})
Step.create({
	todo_id: grocery.id,
	content: "lentils"
})
Step.create({
	todo_id: grocery.id,
	content: "carrots"
})
Step.create({
	todo_id: grocery.id,
	content: "chicken"
})
Step.create({
	todo_id: grocery.id,
	content: "beef tendon"
})
Step.create({
	todo_id: grocery.id,
	content: "tomatoes"
})
Step.create({
	todo_id: grocery.id,
	content: "potatoes"
})

gym = Todo.create({
	title: "Gym",
	body: "Back/Bi"
})
Step.create({
	todo_id: gym.id,
	content: "20x10 body squat"
})
Step.create({
	todo_id: gym.id,
	content: "10x10 squat"
});
Step.create({
	todo_id: gym.id,
	content: "10x10 reverse fly"
});
Step.create({
	todo_id: gym.id,
	content: "10x10 deadlift"
});
Step.create({
	todo_id: gym.id,
	content: "20x10 pullup"
});
Step.create({
	todo_id: gym.id,
	content: "5x10 muscle up"
});