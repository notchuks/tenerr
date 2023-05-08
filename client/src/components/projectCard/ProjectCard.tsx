import React from 'react';
import { Link } from 'react-router-dom';
import "./ProjectCard.scss";

interface Project {
  id: number;
  img: string;
  pp: string;
  cat: string;
  username: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link to={"/"} className="link">
      <div className="projectCard">
        <img src={project.img} alt="" />
        <div className="info">
          <img src={project.pp} alt="" />
          <div className="texts">
            <h2>{project.cat}</h2>
            <span>{project.username}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;