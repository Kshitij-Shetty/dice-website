import { graphql } from 'gatsby';
import React from 'react';
import Award from '../components/award';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default function Awards({
  data: {
    allRdf: { edges },
  },
}) {
  return (
    <Layout>
      <SEO title="Projects" />
      <div className="content tile is-ancestor is-vertical">
        {edges.map(({ node }) => (
          <Award key={node.id} node={node} />
        ))}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    allRdf(
      filter: {
        data: {
          rdf_type: {
            elemMatch: { id: { eq: "https://schema.dice-research.org/Award" } }
          }
        }
      }
    ) {
      edges {
        node {
          id
          data {
            name
            url
            content
            year
            awardee {
              path
              data {
                name
              }
            }
          }
        }
      }
    }
  }
`;