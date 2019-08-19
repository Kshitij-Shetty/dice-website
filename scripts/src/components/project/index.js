import { Link } from 'gatsby';
import React from 'react';
import Image from '../image';

const Project = ({ project, renderType = true }) => (
  <div className="active-project">
    <div className="project-image">
      <Image
        filename={project.data.logo}
        alt={`${project.data.name} logo`}
        style={{ width: 200 }}
      />
    </div>
    <h2 className="title">{project.data.name}</h2>
    <div className="separator" />
    <Link to={project.path} className="link">
      Learn more
    </Link>
  </div>
);

export default Project;
