# Material UI - Vite.js example

## Run locally

- Create a .env file and copy the following line 
```VITE_SERVER_URL='http://localhost:3002'```
- In Terminal, start the dev server 
```npm run dev```

## Features

- User can Sign-up, Sign-in
- Proper error messages during Sign-in and Sign-up are shown to the user
- User will remain signed-in, as authentication status is saved in the browser's local storage
- Select Light/Dark Theme, save theme setting locally, select theme setting based on user's settings
- Create, Edit, Delete, Copy to Clipboard and View Todos

## Wanted to Add

- User can categorize todos by setting tags associated with each one
- User can filter todos based on text or tags
- Live link hosted on Vercel (due to the change of the backend project structure, it doesn't work now)

## Highlights

- Firebase for authentication
- Mongodb for saving todos
- Recoil for state management
- MUI for good looking accessible UI

## Tried but failed

- Tried to switch from Recoil based state management to React-Query. Due to 
the lack of proper code structuring, things became hard to migrate, 
eventually left it unfinished. Though the code was almost ready, 
needed to move some hooks out of the functions to the top of the functional 
components, but axios kept throwing some error. Then I abandoned it. 
- Switched from Fetch API to Axios for easier error throwing. It worked, until I 
added Tanstack (AKA) React-Query

## Lessons learned

- Need to focus more on learning and writing
modular, scalable and maintainable code 

