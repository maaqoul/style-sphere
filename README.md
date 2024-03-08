# Style Sphere Project Overview

## Link For Live Demo

[Style Sphere - Live Demo](https://maaqoul.github.io/style-sphere)

## Project Structure

- **Product Listing Component**: This component displays a grid of products fetched from the backend. It uses Angular Material UI components and Tailwind CSS for styling. The products are fetched using RxJS observables from the ProductService.

- **Product Card Component**: A reusable component used within the Product Listing component to display individual product cards.

- **Cart Sidebar Component**: This component displays the contents of the user's shopping cart. It features the ability to add and remove items, with a dynamic item count displayed in the cart icon.

- **Product Details Component**: This component provides detailed information about a selected product, including its image, price, and description. It is displayed in a popup modal when a product card is clicked.

- **Search Functionality**: Implemented a search feature allowing users to search for products by title or description.

## Testing

- **Product Listing Component**: Thoroughly tested to ensure proper functionality. Due to time constraints, other components have not been extensively tested.

## Deployment

The application has been successfully deployed to GitHub Pages and is accessible [here](https://maaqoul.github.io/style-sphere).
