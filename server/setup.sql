USE cookbooks;

CREATE TABLE recipe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(100),
    preparetime int,
    serves INT,
    difficulty VARCHAR(50),
    recipetype VARCHAR(50),
    category VARCHAR(50),
    instruction VARCHAR(500),
    owner VARCHAR(50)
);

CREATE TABLE ingredient (
    ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT,
    name VARCHAR(250) NOT NULL,
    amt VARCHAR(250),
    FOREIGN KEY (recipe_id) REFERENCES recipe(id) ON DELETE CASCADE
);


INSERT INTO recipe (name, description, preparetime, serves, difficulty, recipetype, category, instruction, owner)
VALUES 
('Mango Salsa', 'A refreshing and flavorful mango salsa recipe', 15, 4, 'Easy', 'veg', 'Appetizer', 
'Peel and dice ripe mangoes. Chop red onion, bell peppers, and cilantro. Combine all the chopped ingredients in a bowl. Squeeze fresh lime juice and add salt to taste. Mix well and refrigerate for at least 30 minutes before serving.', 'owner1'),
('Paneer Butter Masala', 'A rich and creamy paneer dish in a tomato-based gravy', 45, 4, 'Medium', 'veg', 'Main Course', 
'Fry paneer cubes until golden. Make a paste of tomatoes, cashews, and spices. Cook the paste in butter, add paneer, and simmer until the flavors meld. Garnish with cream and cilantro.', 'owner2'),
('Chana Masala', 'A popular North Indian chickpea curry', 40, 4, 'Medium', 'veg', 'Main Course', 
'Cook soaked chickpeas. Sauté onions, tomatoes, and spices. Add cooked chickpeas and simmer until the gravy thickens. Garnish with cilantro and serve with rice or bread.', 'owner3'),
('Aloo Gobi', 'A classic Indian dish made with potatoes and cauliflower', 30, 4, 'Easy', 'veg', 'Main Course', 
'Sauté onions, tomatoes, and spices. Add potatoes and cauliflower. Cook until tender. Garnish with cilantro and serve.', 'owner4'),
('Butter Chicken', 'A creamy and flavorful chicken dish', 60, 4, 'Medium', 'non-veg', 'Main Course', 
'Marinate chicken in yogurt, ginger-garlic paste, and spices. Cook marinated chicken until browned. In a pan, sauté onions, tomatoes, and spices. Blend into a smooth paste. Add butter and cream to the paste, then add the cooked chicken. Simmer until the chicken is tender and the flavors meld. Serve with naan or rice.', 'owner5'),
('Rice Kheer', 'Creamy and delicious rice pudding flavored with cardamom and nuts', 60, 4, 'Easy', 'veg', 'Dessert', 
'Wash and soak rice for 30 minutes. Boil milk and add soaked rice. Cook on low heat until rice is soft and milk thickens. Add sugar, cardamom, and saffron. Garnish with nuts. Serve chilled or warm.', 'owner6');

INSERT INTO ingredient (recipe_id, name, amt)
VALUES 
((SELECT id FROM recipe WHERE name = 'Mango Salsa'), 'Ripe-Mangoes', '2'),
((SELECT id FROM recipe WHERE name = 'Mango Salsa'), 'Red-Onion', '1/2 cup'),
((SELECT id FROM recipe WHERE name = 'Mango Salsa'), 'Bell-Peppers-(mixed-colors)', '1/2 cup'),
((SELECT id FROM recipe WHERE name = 'Mango Salsa'), 'Fresh-Cilantro', '1/4 cup'),
((SELECT id FROM recipe WHERE name = 'Mango Salsa'), 'Fresh-Lime-Juice', '2 tablespoons'),
((SELECT id FROM recipe WHERE name = 'Mango Salsa'), 'Salt', '1/2 teaspoon'),
((SELECT id FROM recipe WHERE name = 'Mango Salsa'), 'Jalapeno-(optional)', '1 small, finely chopped'),

((SELECT id FROM recipe WHERE name = 'Paneer Butter Masala'), 'Paneer', '250 grams'),
((SELECT id FROM recipe WHERE name = 'Paneer Butter Masala'), 'Tomatoes', '2 cups, pureed'),
((SELECT id FROM recipe WHERE name = 'Paneer Butter Masala'), 'Cashews', '1/4 cup'),
((SELECT id FROM recipe WHERE name = 'Paneer Butter Masala'), 'Butter', '2 tablespoons'),
((SELECT id FROM recipe WHERE name = 'Paneer Butter Masala'), 'Cream', '1/4 cup'),
((SELECT id FROM recipe WHERE name = 'Paneer Butter Masala'), 'Spices', 'to taste'),

((SELECT id FROM recipe WHERE name = 'Chana Masala'), 'Chickpeas', '2 cups, soaked and cooked'),
((SELECT id FROM recipe WHERE name = 'Chana Masala'), 'Onions', '1 cup, chopped'),
((SELECT id FROM recipe WHERE name = 'Chana Masala'), 'Tomatoes', '1 cup, chopped'),
((SELECT id FROM recipe WHERE name = 'Chana Masala'), 'Spices', 'to taste'),
((SELECT id FROM recipe WHERE name = 'Chana Masala'), 'Cilantro', 'for garnish'),

((SELECT id FROM recipe WHERE name = 'Aloo Gobi'), 'Potatoes', '2 cups, diced'),
((SELECT id FROM recipe WHERE name = 'Aloo Gobi'), 'Cauliflower', '2 cups, florets'),
((SELECT id FROM recipe WHERE name = 'Aloo Gobi'), 'Onions', '1 cup, chopped'),
((SELECT id FROM recipe WHERE name = 'Aloo Gobi'), 'Tomatoes', '1 cup, chopped'),
((SELECT id FROM recipe WHERE name = 'Aloo Gobi'), 'Spices', 'to taste'),
((SELECT id FROM recipe WHERE name = 'Aloo Gobi'), 'Cilantro', 'for garnish'),

((SELECT id FROM recipe WHERE name = 'Butter Chicken'), 'Chicken', '500 grams'),
((SELECT id FROM recipe WHERE name = 'Butter Chicken'), 'Yogurt', '1/2 cup'),
((SELECT id FROM recipe WHERE name = 'Butter Chicken'), 'Ginger-Garlic-Paste', '2 tablespoons'),
((SELECT id FROM recipe WHERE name = 'Butter Chicken'), 'Spices', 'to taste'),
((SELECT id FROM recipe WHERE name = 'Butter Chicken'), 'Onions', '1 cup, chopped'),
((SELECT id FROM recipe WHERE name = 'Butter Chicken'), 'Tomatoes', '1 cup, chopped'),
((SELECT id FROM recipe WHERE name = 'Butter Chicken'), 'Butter', '2 tablespoons'),
((SELECT id FROM recipe WHERE name = 'Butter Chicken'), 'Cream', '1/4 cup'),

((SELECT id FROM recipe WHERE name = 'Rice Kheer'), 'Basmati-Rice', '1/4 cup'),
((SELECT id FROM recipe WHERE name = 'Rice Kheer'), 'Whole-Milk', '1 liter'),
((SELECT id FROM recipe WHERE name = 'Rice Kheer'), 'Sugar', '1/2 cup'),
((SELECT id FROM recipe WHERE name = 'Rice Kheer'), 'Cardamom-Powder', '1/2 teaspoon'),
((SELECT id FROM recipe WHERE name = 'Rice Kheer'), 'Saffron', 'a pinch'),
((SELECT id FROM recipe WHERE name = 'Rice Kheer'), 'Almonds', '2 tablespoons, sliced'),
((SELECT id FROM recipe WHERE name = 'Rice Kheer'), 'Cashews', '2 tablespoons, chopped'),
((SELECT id FROM recipe WHERE name = 'Rice Kheer'), 'Raisins', '2 tablespoons');
