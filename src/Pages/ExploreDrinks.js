import React from 'react';
import profileIcon from '../images/profileIcon.svg';

function ExploreDrinks() {
  return (
    <div>
      <header>
        <button type="button" src={ profileIcon }>
          <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
        </button>

        <h2 data-testid="page-title">Explore Drinks</h2>
      </header>
    </div>
  );
}
export default ExploreDrinks;
