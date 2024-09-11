import React from 'react'

function ShimmerCard(){
    return (
        <div className="shimmer-card-container"></div>
    );
}

function ShimmerLoading() {
    const loadCards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
      <div className="gallery">
        {loadCards.map(() => <ShimmerCard/>)}
      </div>
  )
}

export default ShimmerLoading;
