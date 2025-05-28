// Import static movie data from a local file lib/movieData.js
import getMovieData from "@/lib/movieData";

export default function handler(req, res) {
  // Destructure the HTTP method from the request object
  const { method } = req;

  switch (method) {
    case 'GET':
      // If it's a GET request, return movie data as JSON
      res.status(200).json(getMovieData());
      break;

    default:
      // If any other method is used (POST, PUT, DELETE), reject it
      res.setHeader('Allow', ['GET']);  // Tell the client only GET is allowed
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
