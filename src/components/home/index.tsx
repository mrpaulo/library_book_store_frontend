/**
 * Copyright (C) 2021 paulo.rodrigues
 * Profile: <https://github.com/mrpaulo>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
//Style
import '../../styles/global.css';

const HomePage: React.FC = () => {
  
  return (
    <>
      <div className="home-page">
      <h1>Welcome to Library Book Store</h1>
      <p>
        Our online bookstore offers a wide selection of books, including bestsellers, classics, and academic texts.
      </p>
      <ul>
        <li>Easy search and filtering of books by author, title, or category</li>
        <li>Book details page with summary, reviews, and related books</li>
        <li>User authentication and account management</li>       
      </ul>
      <p>
        Thank you for visiting my site. I hope you find the books you're looking for! 
      </p>
      <p>
        If you have any questions or suggestions, please feel free to contact me using the information provided on our website footer. And also thank you for your interisting on my project.
      </p>
    </div>
    </>)
}
export default HomePage;