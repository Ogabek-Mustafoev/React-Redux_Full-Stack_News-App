import React from "react";

export default function NewsListItem({ name, description, category, onDelete }) {
  let elementClassName;
  switch (category) {
    case "Hot News":
      elementClassName = "bg-danger";
      break;
    case "Sport News":
      elementClassName = "bg-primary";
      break;
    case "World News":
      elementClassName = "bg-success";
      break;
    default:
      elementClassName = "bg-info";
      break;
  }

  return (
    <li className={`card flex-row shadow-lg text-white bg-gradient ${elementClassName}`}>
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-text">{description}</p>
      </div>
      <img style={{ objectFit: 'cover' }} className="img-fluid w-25 d-inline" src='https://images.unsplash.com/photo-1585007600263-71228e40c8d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' alt={name} />
      <span className="position-absolute top-0 r-100 translate-middle badge border rounded-pill bg-light">
        <button onClick={onDelete} type="button" className="btn-close" aria-label="Close" ></button>
      </span>
    </li>
  );
}
