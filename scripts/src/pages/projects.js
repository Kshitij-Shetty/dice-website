import _ from 'lodash';
import React, { useMemo, useState } from 'react';
import Layout from '../components/layout';
import Project from '../components/project';
import SEO from '../components/seo';

export default function Projects({
  data: {
    allRdf: { edges },
  },
}) {
  const [search, setSearch] = useState('');

  const projectsByType = useMemo(
    () => _.groupBy(edges, p => p.node.data.rdf_type[0].data.name),
    [edges]
  );

  const handleSearch = e => setSearch(e.target.value);

  return (
    <Layout>
      <SEO title="Projects" />
      <div className="content">
        {/*<div style={{ padding: '0 20px 20px 20px' }}>
          <input
            className="input is-rounded"
            type="text"
            placeholder="Search for project.."
            onChange={handleSearch}
          />
        </div>*/}
        {Object.keys(projectsByType)
          .filter(type => {
            return (
              projectsByType[type].filter(project =>
                project.node.data.name
                  .toLowerCase()
                  .includes(search.toLowerCase())
              ).length > 0
            );
          })
          .map(type => (
            <div
              key={type}
              className="tile is-vertical"
              style={{ marginBottom: '3em' }}
            >
              <h1 style={{ marginBottom: '1em' }}>{type}</h1>
              <div className="columns is-multiline is-5 is-variable">
                {projectsByType[type]
                  .filter(project =>
                    project.node.data.name
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  )
                  .map(({ node }) => (
                    <div className="column is-one-third" key={node.path}>
                      <Project
                        key={node.path}
                        project={node}
                        renderType={false}
                      />
                    </div>
                  ))}
              </div>
            </div>
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
            elemMatch: {
              id: {
                in: [
                  "https://dice-research.org/FundedProject"
                  "https://dice-research.org/ProductionReadyProject"
                  "https://dice-research.org/IncubatorProject"
                  "https://dice-research.org/AlumniProject"
                ]
              }
            }
          }
        }
      }
    ) {
      edges {
        node {
          path
          data {
            rdf_type {
              data {
                name
              }
            }
            tagline
            status
            content
            endDate
            startDate
            name
            homepage
            logo
            sourceCode
          }
        }
      }
    }
  }
`;