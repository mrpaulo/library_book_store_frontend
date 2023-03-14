import React from 'react';
//Style
import '../../styles/global.css';

const AboutPage: React.FC = () => {
  
  return (
    <>
      <div className="about-page">
      <h1>About Library Book Store</h1>
      <p>
        Library Book Store Frontend is a web application for a fictional library that allows users to browse and catalog books, view book details, and check out books for borrowing. This frontend application works in conjunction with a backend API that handles book data and user authentication.
      </p>
      <h2>Features</h2>
      <ul>
        <li>Browse books by category or search for books by title or author</li>
        <li>View book details, including title, author, publisher and description</li>
        <li>Catalog Author and Publisher information</li>
        <li>Using i18n, all app labels and information can be displayed in both English and Portuguese</li>
      </ul>
      <h2>Technologies</h2>
      <p>
        Library Book Store Frontend is built using the following technologies:
      </p>
      <ul>
        <li>React.js: A popular JavaScript library for building user interfaces</li>
        <li>Redux: A predictable state container for managing application state</li>
        <li>Typescript: An open-source programming language developed and maintained by Microsoft. It is a superset of JavaScript that adds optional static typing and other features to the language.</li>
        <li>Axios: A promise-based HTTP client for making API requests</li>
        <li>Bootstrap: A popular CSS framework for building responsive and mobile-first designs</li>
      </ul>
      <h2>Installation and Usage</h2>
      <p>
        To install and use Library Book Store Frontend, follow these steps:
      </p>
      <ol>
        <li>Clone the repository: <code>git clone https://github.com/mrpaulo/library_book_store_frontend.git</code></li>
        <li>Install dependencies: <code>npm install</code></li>
        <li>Start the application: <code>npm start</code></li>
        <li>Open the application in a web browser at <code>http://localhost:3000</code></li>
      </ol>
      <h2>Contributing</h2>
      <p>
        Contributions to Library Book Store Frontend are welcome! To contribute:
      </p>
      <ol>
        <li>Fork the repository</li>
        <li>Create a new branch: <code>git checkout -b my-feature-branch</code></li>
        <li>Make changes and commit them: <code>git commit -am 'Add some feature'</code></li>
        <li>Push the changes to your fork: <code>git push origin my-feature-branch</code></li>
        <li>Submit a pull request</li>
      </ol>
      <h2>Backend API</h2>
      <p>
        To check more about the backend API, also created by me, please read the README.md file on <a href="https://github.com/mrpaulo/library_book_store_backend" target="_blank" rel="noopener noreferrer" >github.com/mrpaulo/library_book_store_backend</a> 
      </p>
      <h2>Credits</h2>
      <p>
        Library Book Store Frontend was created by Paulo Rodrigues, a software engineer passionate about creating user-friendly and scalable applications.
      </p>
      <h2>License</h2>
      <p>
        Library Book Store Frontend is licensed under the MIT License. See <code>LICENSE</code> for more information.
      </p>
      <h2>Note</h2>
      <p>
      This is an ongoing project, so bugs, improvements, and new features are coming soon.
      </p>
    </div>
    </>)
}
export default AboutPage;