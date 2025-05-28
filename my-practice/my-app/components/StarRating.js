// To use react-bootstrap-icons, install it from: https://www.npmjs.com/package/react-bootstrap-icons
import { StarFill } from 'react-bootstrap-icons';
import { Star } from 'react-bootstrap-icons';

export default function StarRating({ rating }) {  // receives the rating value as a prop

  let ratingInt = +rating;  // convert rating to a number in case it's passed as a string

  return (
    <>
      {/* Render filled stars based on the rating value */}
      {[...Array(ratingInt)].map((_, i) => <StarFill key={i} />)}

      {/* Render empty stars to complete a total of 5 stars, which is why it's must 5 - ratingInt number */}
      {[...Array(5 - ratingInt)].map((_, i) => <Star key={i} />)}
    </>
  );
}