import React from "react"
// import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const IndexPage = (props) => {
  const listings = props.data.allMongodbSampleAirbnbListingsAndReviews.edges;

  return (
    <Layout>

      <h1>Places to Stay</h1>
      <div className="listings-container">
        {listings.map( listing => 
          <div className="listing">
            {/* <Link to={'/listing/' + listing.node.id}> */}
              <a href={listing.node.listing_url} target="_blank">
                <img
                  src={listing.node.images.picture_url}
                  alt={listing.node.name}
                />
                <p>{listing.node.name}</p>
              </a>
            {/* </Link> */}
          </div>
        )}
      </div>

    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query ListingsQuery{
    allMongodbSampleAirbnbListingsAndReviews(
      limit: 12
      filter: {
        room_type: {eq: "Entire home/apt"},
        review_scores: {review_scores_rating: {gte: 90}}
      }
    ) {
      edges {
        node {
          name
          id
          images {
            picture_url
          }
          listing_url
        }
      }
    }
  }
`