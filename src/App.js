import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";

function App() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function fetchApplications() {
      try{
        const getAllApplications = await axios.get('http://localhost:8080/applications')
        setApplications(getAllApplications.data);
      }catch (error){
        console.log(error)
      }
    }fetchApplications();
  }, []);

  return (
      <div className="App">
        <h1>Applications</h1>
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Candidate name</th>
            <th>Updated on</th>
            <th>Interview type</th>
            <th>Interviewer name</th>
          </tr>
          </thead>
          <tbody>
            {applications.map(application => (
              <tr key={application.id}>
                <td>{application.id}</td>
                <td>{application.applicationState}</td>
                <td>{application.candidate.firstName + " " + application.candidate.lastName}</td>
                <td>{application.updatedOn}</td>
                {application.interview != null ? (
                    <td>{application.interview.interviewType}</td>
                  ): (
                    <td>null</td>
                )}
                {application.interview != null ? (
                    <td>{application.interview.interviewerName}</td>
                ): (
                    <td>null</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}

export default App;