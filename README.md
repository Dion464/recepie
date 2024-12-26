# Recipe Food App

## Description

The Recipe Food App is a web application that allows users to explore and search for various recipes. It provides features like searching recipes, filtering by cuisine, and viewing detailed recipe pages. The app is built using Next.js, leveraging components for modularity and clean structure.

## Features

- **Search Bar:** Allows users to search for recipes based on keywords.
- **Cuisine Filter:** Users can filter recipes by cuisine type.
- **Recipe Card & List:** Displays a list of recipes, showing essential details like the title, image, and instructions.
- **Recipe Detail Page:** View detailed information for each recipe by clicking on a recipe card.
- **Favorites Page:** A section for saving favorite recipes (if implemented).
- **Responsive Design:** The app is designed to be fully responsive, adjusting seamlessly to various screen sizes.

## Folder Structure


src/app
├── about
│   └── page.js                     # About page of the app.
├── components
│   ├── couisinContex.js            # Context for managing selected cuisines.
│   ├── couisinFilter.js            # Component for filtering recipes by cuisine.
│   ├── featuredRecepies.js         # Featured recipe display component.
│   ├── footer.js                   # Footer component.
│   ├── header.js                   # Header component containing navigation.
│   ├── recepieCard.js              # Recipe card displaying individual recipes.
│   ├── recepieList.js              # Displays a list of recipes.
│   └── searchBar.js                # Search bar for recipe searching.
├── favorite
│   └── page.js                     # Page for displaying favorite recipes.
├── globals.css                     # Global CSS styles.
├── layout.js                       # Layout component for global page structure.
├── page.js                         # Main landing page displaying recipes and featured content.
├── recepie
│   └── [id]                        # Dynamic route for individual recipe detail pages.
├── store
│   └── useStore.js                 # Store for managing app-wide state.
└── styles                           # Folder for additional CSS or SCSS files.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/recipe-food-app.git
cd recipe-food-app
Install dependencies:

bash
Copy code
npm install
Set up environment variables: Create a .env.local file in the root directory and add the following:

env
Copy code
NEXT_PUBLIC_SPOONACULAR_API_KEY=your-api-key-here
Run the development server:

bash
Copy code
npm run dev
Visit http://localhost:3000 to see the app in action.

Technologies Used
Next.js: A React framework for server-side rendering and building full-stack applications.
React: JavaScript library for building user interfaces.
CSS: Used for styling with modular CSS files.
Spoonacular API: For fetching recipe data.
Axios: For making API requests to Spoonacular.
Tailwind CSS: For utility-first CSS styling (if applicable).
Contributing
Feel free to fork the repository, submit pull requests, or open issues if you'd like to contribute to the app. If you have any ideas for features or improvements, let me know!

License
This project is open-source and available under the MIT License.