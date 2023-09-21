import React, { useState } from "react";
import "./App.css";
import SampleTodoList from "./SampleTodoList";

const App = () => {
  // const todos = [
  //     {
  //         id:1,
  //         taskName:"Task 1",
  //         status:"assigned"
  //     },
  //     {
  //         id:2,
  //         taskName:"Task 2",
  //         status:"inProgress"
  //     },
  //     {
  //         id:3,
  //         taskName:"Task 3",
  //         status:"completed"
  //     },
  //     {
  //         id:4,
  //         taskName:"Task 1",
  //         status:"assigned"
  //     },
  //     {
  //         id:5,
  //         taskName:"Task 2",
  //         status:"inProgress"
  //     },
  //     {
  //         id:6,
  //         taskName:"Task 3",
  //         status:"completed"
  //     },
  // ]
  const [task, setTask] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    const item = {
      id: Math.floor(Math.random() * 1000),
      taskName: e.target[0].value,
      status: "assigned",
    };
    setTask([item, ...task]);
    setTodoList([item, ...task]);
  };

  const handleStatusChange = (elem) => {
    if (elem.status == "assigned") {
      elem.status = "inProgress";
    } else if (elem.status == "inProgress") {
      elem.status = "completed";
    }
    const filtered = task.filter((t) => t.id != elem.id);
    setTask([elem, ...filtered]);
    setTodoList([elem, ...filtered]);
  };
  const handleChange = (e) => {
    if (e.target.value == "all") {
      setTodoList(task);
    } else {
      console.log(e.target.value);
      const filterList = task.filter((todo) => todo.status == e.target.value);
      console.log(filterList);
      setTodoList(filterList);
    }
  };

  // const handleSearchTextChange = () => {

  //     todoList.filter((ele) => {
  //         return input.toLowerCase() === "" ? ele : ele.toLowerCase().includes(input);
  //     })
  // }

  console.log(task);
  return (
    <div className="container-fluid">
      <div>Todo App</div>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Todo"></input>
        <button type="submit">Add</button>
      </form>

      <input placeholder="search" onChange={(e) => setSearch(e.target.value)} />
      {/* <div>
            <input placeholder="search" onChange={(e)=>setSearchTerm(e.target.value)} />
             <button onClick={handleSearchTextChange}>Search</button>
            </div> */}
      <form>
        <label>
          <select onChange={handleChange}>
            <option value="all">Show All</option>
            <option value="assigned">Assigned</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </form>

      {/* <ul>
                {todoList.map((ele, index) => {
                    return (
                        <li key={index}>{ele.taskName} - {ele.status}</li>
                    )
                })}

                <h3>Assigned</h3>
                <ul>
                    {task.filter(f1 => f1.status == "assigned").map((ele, index) => {
                        return (
                            <li key={index}>{ele.taskName} - {ele.status} {ele.status != "completed" && <button onClick={() => handleStatusChange(ele)}> {ele.status == "assigned" ? "Work" : "Completed"}</button>}</li>
                        )
                    })}
                </ul>

                <h3>In Progress</h3>

                <ul>
                    {task.filter(fl => fl.status == "inProgress").map((ele, index) => {
                        return (
                            <li key={index}>{ele.taskName} - {ele.status} {ele.status != "completed" && <button onClick={() => handleStatusChange(ele)}> {ele.status == "assigned" ? "In Progress" : "Completed"}</button>}</li>
                        )
                    })}
                </ul>

                <h3>Completed</h3>
                <ul>
                    {task.filter(f1 => f1.status == "completed").map((ele, index) => {
                        return (
                            <li key={index}>{ele.taskName} - {ele.status} {ele.status != "completed" && <button onClick={() => handleStatusChange(ele)}> {ele.status == "assigned" ? "In Progress" : "Completed"}</button>}</li>
                        )
                    })}
                </ul>
            </ul> */}

      <div className="row">
        <div className="col-md-12">
          <h3>All Tasks</h3>
          <table>
            <tr>
              <th>Task Name</th>
              <th>Action</th>
            </tr>

            {todoList
              .filter((tl) => {
                return tl.taskName.toLowerCase().includes(search.toLowerCase());
              })
              .map((ele, index) => {
                return (
                  <tr key={index}>
                    <td>{ele.taskName} </td>
                    <td>{ele.status}</td>
                  </tr>
                );
              })}
          </table>
        </div>
        <div className="col-md-4">
          <h3>Assigned</h3>
          <table>
            <tr>
              <th>Task Name</th>
              <th>Action</th>
            </tr>
            {task
              .filter((f1) => f1.status == "assigned")
              .map((ele, index) => {
                return (
                  <tr key={index}>
                    <td>{ele.taskName} </td>
                    <td>
                      {ele.status != "completed" && (
                        <button onClick={() => handleStatusChange(ele)}>
                          {ele.status == "assigned" ? "Work" : "Completed"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
        <div className="col-md-4">
          <h3>In Progress/Not Completed</h3>
          <table>
            <tr>
              <th>Task Name</th>
              <th>Action</th>
            </tr>
            {task
              .filter((fl) => fl.status == "inProgress")
              .map((ele, index) => {
                return (
                  <tr key={index}>
                    <td>{ele.taskName} </td>
                    <td>
                      {ele.status != "completed" && (
                        <button onClick={() => handleStatusChange(ele)}>
                          {ele.status == "assigned"
                            ? "In Progress"
                            : "Completed"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
        <div className="col-md-4">
          <h3>Completed</h3>
          <table>
            <tr>
              <th>Task Name</th>
              {/* <th>Action</th> */}
            </tr>
            {task
              .filter((fl) => fl.status == "completed")
              .map((ele, index) => {
                return (
                  <tr key={index}>
                    <td>{ele.taskName} </td>
                    <td>
                      {ele.status != "completed" && (
                        <button onClick={() => handleStatusChange(ele)}>
                          {" "}
                          {ele.status == "assigned"
                            ? "In Progress"
                            : "Completed"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
