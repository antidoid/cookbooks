USE cookbooks;

CREATE TABLE recipe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    preparetime TIME,
    serves INT,
    difficulty VARCHAR(50),
    recipetype VARCHAR(50),
    category VARCHAR(50),
    instruction TEXT,
    videolink VARCHAR(255),
    imagelink VARCHAR(255)
);

CREATE TABLE ingredient (
    ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT,
    name VARCHAR(255) NOT NULL,
    amt VARCHAR(50),
    FOREIGN KEY (recipe_id) REFERENCES recipe(id) ON DELETE CASCADE  
);


INSERT INTO recipe (name, description, preparetime, serves, difficulty, recipetype, category, instruction, videolink, imagelink) 
VALUES ('Mango Salsa', 'A refreshing and flavorful mango salsa recipe', '00:15:00', 4, 'Easy', 'veg', 'Appetizer', 'Peel and dice ripe mangoes. Chop red onion, bell peppers, and cilantro. Combine all the chopped ingredients in a bowl. Squeeze fresh lime juice and add salt to taste. Mix well and refrigerate for at least 30 minutes before serving.', 'https://www.youtube.com/watch?v=your-video-id', 'https://your-image-url.com/mango-salsa.jpg');

INSERT INTO ingredient (recipe_id, name, amt) VALUES 
(LAST_INSERT_ID(), 'Ripe Mangoes', '2'),
(LAST_INSERT_ID(), 'Red Onion', '1/2 cup'),
(LAST_INSERT_ID(), 'Bell Peppers (mixed colors)', '1/2 cup'),
(LAST_INSERT_ID(), 'Fresh Cilantro', '1/4 cup'),
(LAST_INSERT_ID(), 'Fresh Lime Juice', '2 tablespoons'),
(LAST_INSERT_ID(), 'Salt', '1/2 teaspoon'),
(LAST_INSERT_ID(), 'Jalapeno (optional)', '1 small, finely chopped');


INSERT INTO recipe (name, description, preparetime, serves, difficulty, recipetype, category, instruction, videolink, imagelink) 
VALUES ('Classic Margherita Pizza', 'A delicious homemade Margherita pizza recipe', '01:00:00', 2, 'Medium', 'veg', 'Main Course', 'Preheat oven to 475°F (245°C). Roll out the pizza dough and place it on a pizza stone or baking sheet. Spread tomato sauce evenly over the dough. Arrange sliced mozzarella cheese on top of the sauce. Sprinkle torn fresh basil leaves. Drizzle olive oil and add salt and pepper to taste. Bake for 10-15 minutes until the crust is golden and the cheese is bubbly.', 'https://www.youtube.com/watch?v=your-video-id', 'https://your-image-url.com/margherita-pizza.jpg');

INSERT INTO ingredient (recipe_id, name, amt) VALUES 
(LAST_INSERT_ID(), 'Pizza Dough', '1'),
(LAST_INSERT_ID(), 'Tomato Sauce', '1/2 cup'),
(LAST_INSERT_ID(), 'Fresh Mozzarella', '8 oz, sliced'),
(LAST_INSERT_ID(), 'Fresh Basil', '1/4 cup, torn'),
(LAST_INSERT_ID(), 'Olive Oil', '2 tablespoons'),
(LAST_INSERT_ID(), 'Salt', 'to taste'),
(LAST_INSERT_ID(), 'Black Pepper', 'to taste');


INSERT INTO recipe (name, description, preparetime, serves, difficulty, recipetype, category, instruction, videolink, imagelink) 
VALUES ('Chocolate Chip Cookies', 'A classic chocolate chip cookie recipe', '00:25:00', 24, 'Easy', 'veg', 'Dessert', 'Preheat oven to 350°F (175°C). In a bowl, cream together butter, white sugar, and brown sugar until smooth. Beat in the eggs one at a time, then stir in the vanilla. Dissolve baking soda in hot water and add to the batter along with salt. Stir in flour and chocolate chips. Drop by large spoonfuls onto ungreased pans. Bake for about 10 minutes in the preheated oven, or until edges are nicely browned.', 'https://www.youtube.com/watch?v=your-video-id', 'https://your-image-url.com/chocolate-chip-cookies.jpg');

INSERT INTO ingredient (recipe_id, name, amt) VALUES 
(LAST_INSERT_ID(), 'Butter', '1 cup'),
(LAST_INSERT_ID(), 'White Sugar', '1 cup'),
(LAST_INSERT_ID(), 'Brown Sugar', '1 cup, packed'),
(LAST_INSERT_ID(), 'Eggs', '2'),
(LAST_INSERT_ID(), 'Vanilla Extract', '2 teaspoons'),
(LAST_INSERT_ID(), 'Baking Soda', '1 teaspoon'),
(LAST_INSERT_ID(), 'Hot Water', '2 teaspoons'),
(LAST_INSERT_ID(), 'Salt', '1/2 teaspoon'),
(LAST_INSERT_ID(), 'All-Purpose Flour', '3 cups'),
(LAST_INSERT_ID(), 'Semisweet Chocolate Chips', '2 cups');



INSERT INTO recipe (name, description, preparetime, serves, difficulty, recipetype, category, instruction, videolink, imagelink) 
VALUES ('Spaghetti Carbonara', 'A creamy and savory spaghetti carbonara recipe', '00:20:00', 4, 'Medium', 'non-veg', 'Main Course', 'Cook spaghetti according to package instructions. In a separate pan, cook pancetta until crispy. Beat eggs in a bowl and mix with grated Parmesan cheese. Drain spaghetti and return to pot. Quickly mix in the pancetta, egg mixture, and some reserved pasta water to create a creamy sauce. Season with salt and black pepper. Serve immediately.', 'https://www.youtube.com/watch?v=your-video-id', 'https://your-image-url.com/spaghetti-carbonara.jpg');

INSERT INTO ingredient (recipe_id, name, amt) VALUES 
(LAST_INSERT_ID(), 'Spaghetti', '400g'),
(LAST_INSERT_ID(), 'Pancetta', '150g, diced'),
(LAST_INSERT_ID(), 'Eggs', '2'),
(LAST_INSERT_ID(), 'Grated Parmesan Cheese', '1 cup'),
(LAST_INSERT_ID(), 'Salt', 'to taste'),
(LAST_INSERT_ID(), 'Black Pepper', 'to taste');


INSERT INTO recipe (name, description, preparetime, serves, difficulty, recipetype, category, instruction, videolink, imagelink) 
VALUES ('Greek Salad', 'A fresh and healthy Greek salad recipe', '00:15:00', 4, 'Easy', 'veg', 'Salad', 'Chop the cucumber, tomatoes, and red onion. Combine in a bowl with Kalamata olives and crumbled feta cheese. In a small bowl, whisk together olive oil, red wine vinegar, oregano, salt, and black pepper. Pour the dressing over the salad and toss to combine. Serve immediately.', 'https://www.youtube.com/watch?v=your-video-id', 'https://your-image-url.com/greek-salad.jpg');

INSERT INTO ingredient (recipe_id, name, amt) VALUES 
(LAST_INSERT_ID(), 'Cucumber', '1, chopped'),
(LAST_INSERT_ID(), 'Tomatoes', '4, chopped'),
(LAST_INSERT_ID(), 'Red Onion', '1/2, sliced'),
(LAST_INSERT_ID(), 'Kalamata Olives', '1/2 cup'),
(LAST_INSERT_ID(), 'Feta Cheese', '1/2 cup, crumbled'),
(LAST_INSERT_ID(), 'Olive Oil', '3 tablespoons'),
(LAST_INSERT_ID(), 'Red Wine Vinegar', '1 tablespoon'),
(LAST_INSERT_ID(), 'Dried Oregano', '1 teaspoon'),
(LAST_INSERT_ID(), 'Salt', 'to taste'),
(LAST_INSERT_ID(), 'Black Pepper', 'to taste');
