# Bulk Edit Feature


## Description
I cloned the github repository of given swipe invoices app. I used react js for user interface, react-bootstrap package for styling and redux for store managment as all predefined initially in it. Utilizing the existing redux reducers like updateInvoice and getOneInvoice from custom hook.

One notable addition I made was the implementation of a feature allowing users to individually select or deselect invoices and send them to /bulkedit page to makeup for multiinvoices editing at once i.e bulk editing.

Upon clicking the 'bulk edit' button without selecting at least one invoice, the action does not trigger navigation and prompts a message advising the user to select invoices before proceeding further.

By leveraging the 'bulk edit' button, users can modify existing data collectively, while the 'go back' option permits them to retain the original data if desired.





## Setup and Instructions



### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build` - Deployment

Builds the app for production to the `build` folder.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.



