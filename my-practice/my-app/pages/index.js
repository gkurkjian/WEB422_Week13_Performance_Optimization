import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';

// Third practice: Dynamically Importing Components
// import StarRating from '@/components/StarRating';  // in 3rd practice we don't need StarRating be included, bcz dynamically we'll integrate if the user uses
// Here we're including this procedure dynamically
import dynamic from 'next/dynamic';
const StarRating = dynamic(() => import('@/components/StarRating'), {
  loading: () => <>Loading...</>,
});

import useSWR from 'swr';
// import _ from 'lodash';

import styles from '@/styles/Home.module.css'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {

  const { data, error } = useSWR(`/api/movies`, fetcher);
  const [searchText, setSearchText] = useState("");
  const [filteredResults, setFilteredResults] = useState();
  const [accordionOpened, setAccordionOpened] = useState(false);  // included for 3rd practice

  // included for 3rd practice
  function accordionSelected(eventKey, e) {
  setTimeout(() => {
    console.log("Accordion opened")
    setAccordionOpened(true);
  }, 200); // allow for the accordion animation to complete
}

  //  function filterResults(data, searchText) {
  //   setFilteredResults(_.filter(data, movie => movie.title.toLowerCase().includes(searchText.toLowerCase())));
  // }

  // Second practice: Dynamically Importing Libraries.
  // We removed the lodash (import _ from 'lodash'); from the top to optimize performance.
  // Since lodash is only needed when the user interacts with the search bar,
  // we dynamically import it inside the filterResults() function instead of loading it with the initial page.
  // Practice reference: https://webprogrammingforappsandservices.sdds.ca/Performance-Optimizations/improving-optimizing-performance#dynamically-importing-libraries
  async function filterResults(data, searchText) {
  const _ = (await import('lodash')).default;
  setFilteredResults(
    _.filter(data, (movie) => movie.title.toLowerCase().includes(searchText.toLowerCase()))
  );
}

  useEffect(() => {
    if(data && searchText)
      filterResults(data, searchText);
    else if(data && searchText == "")
      setFilteredResults(data)
  }, [data, searchText])

  return (
    <>
      <Head>
        <title>Film Collection</title>
        <meta name="description" content="Personal Collection of Films" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className="mt-4">
        <Row>
          <Col>
            <Card bg="light">
              <Card.Body>
                <Col></Col>
                <h2>Film Collection</h2>
              </Card.Body>

              <Container>
                <Row>
                  <Col>
                    <input placeholder="search by Title" className='form-control' type="text" name="search" value={searchText} onChange={e => setSearchText(e.target.value)} />
                  </Col>
                </Row>
              </Container><br />
            </Card>

            {/* this is vanilla html version using <img> (Unoptimized) */}
            {/* <img src="theatre-bkrd.jpg" alt="theatre background" className={styles.headerImage} /> */}

            {/* 1. Use Next.js <Image> to serve optimized images */}
            <Image
              src="/theatre-bkrd.jpg"                         // Image must be in the /public folder
              alt="theatre background"                        // Alt text for accessibility and SEO
              className={styles.headerImage}                  // Apply custom styling from your CSS module
              sizes="100vw"                                   // Tells browser this image will span full viewport width
              width={800}                                     // Required: intrinsic width for layout and aspect ratio
              height={232}                                    // Required: intrinsic height
              priority                                        // Preload this image for faster LCP (first paint performance)
            />

 
            {/*2. Remote images are hosted outside your Next.js app (on external domains).
            To render them with <Image>, you must allow the domain in next.config.mjs
            For more info: https://webprogrammingforappsandservices.sdds.ca/Performance-Optimizations/improving-optimizing-performance#remote-images */}

            {/* <Image
              src="https://www.senecapolytechnic.ca/content/dam/projects/seneca/campus-photos/magna-hall_tile.jpg"
              alt='theater background'
              className={styles.headerImage}
              width={600}
              height={386}
            /> */}

            {/* included onSelect={accordionSelected} for 3rd practice */}
            <Accordion className="mt-4" onSelect={accordionSelected}>
              {filteredResults?.map(movie => (
                <Accordion.Item key={movie.id} eventKey={movie.id}>
                  <Accordion.Header><strong>{movie.title}</strong>&nbsp;- {movie.genre}</Accordion.Header>
                  <Accordion.Body>
                    {/* <strong>Rating:</strong> <StarRating rating={movie.rating} /><br /><br /> */}
                    {/* included for 3rd practice */}
                    <strong>Rating:</strong> {accordionOpened && <StarRating rating={movie.rating} />}<br /><br />
                    <strong>Plot Summary</strong><br />{movie.plot_summary}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </>
  )
}
