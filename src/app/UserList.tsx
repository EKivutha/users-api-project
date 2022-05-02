import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  retrieveUsers,
  findUserByTitle,
  retrieveUser
} from "../actions/users";
import User from "./userModal";


const UsersList = () => {
  const [currentUser, setcurrentUser] = useState<User | null>(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const users = useSelector((state:any) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(retrieveUsers());
  }, [dispatch]);
  const onChangeSearchTitle = (e:any )=> {
    const searchTitle = e.target.value;
    console.log("Search title", searchTitle)
    setSearchTitle(searchTitle);
  };
  const refreshData = () => {
    setcurrentUser(null);
    setCurrentIndex(-1);
  };
  const setActiveTutorial = (user:any, index:any) => {
    setcurrentUser(user);
    setCurrentIndex(index);
  };

  const findByTitle = () => {
    refreshData();
    dispatch<any>(findUserByTitle(searchTitle));
  };
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Tutorials List</h4>
        <ul className="list-group">
          {users &&
            users.map((user:any, index:any) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(user, index)}
                key={index}
              >
                {user.name}
              </li>
            ))}
        </ul>
        <button
          className="m-3 btn btn-sm btn-danger"
        //   onClick={removeAllTutorials}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentUser ? (
          <div>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentUser.name}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentUser.username}
            </div>
            
            <Link
              to={"/tutorials/" + currentUser.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )} 
      </div>
    </div>
  );
};
export default UsersList;