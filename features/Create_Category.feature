Feature: Create Category 
 
Scenario: create a new category 
Given the user "Felipe" is logged in 
And the categories "Para dormir", "Para o rolˆ", "Para ouvir no carro" exist 
And I am on the "Categorias" page 
When I select the option "Create category" 
And I fill in the category name with "Sad vibes" 
And I select the "confirm" option 
Then I remain on the "Categorias" page 
And the category "Sad Vibes" appears in the category list 
