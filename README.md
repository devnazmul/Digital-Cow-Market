# cow-hut-backend-assignment-devnazmul

Live Link: https://digital-cow-hut-theta-ten.vercel.app/

## Application Routes:

### User

- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/id (Single GET) Include an id that is saved in your database
- api/v1/users/id (PATCH) Include an id that is saved in your database
- api/v1/users/id (DELETE) Include an id that is saved in your database

### Cows

- api/v1/cows (POST)
- api/v1/cows (GET)
- api/v1/cows/id (Single GET) Include an id that is saved in your database
- api/v1/cows/id (PATCH) Include an id that is saved in your database
- api/v1/cows/id (DELETE) Include an id that is saved in your database

### Pagination and Filtering routes of Cows

- api/v1/cows?pag=1&limit=10
- api/v1/cows?sortBy=price&sortOrder=asc
- api/v1/cows?minPrice=20000&maxPrice=70000
- api/v1/cows?location=Chattogram
- api/v1/cows?searchTerm=Cha
