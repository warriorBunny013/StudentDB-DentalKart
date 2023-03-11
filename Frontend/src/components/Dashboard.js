/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect,useRef} from 'react';
import { CSVLink } from "react-csv";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import './dashboard.css';
import ExportIcon from './Icon.png';
import EachStudent from './eachStudent';
// import '.../Backend/index.js'


const Dashboard = () => {
    const [name, setName] = useState('');
    // eslint-disable-next-line
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    // eslint-disable-next-line
    const [users, setUsers] = useState([]);
    const [students, setStudents] = useState([]);
 
    const history = useHistory();

   

    useEffect(() => {
        refreshToken();
        getUsers();
        getStudents();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history.push("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getUsers = async () => {
        const response = await axiosJWT.get('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }
    const getStudents= async () => {
        const response = await axiosJWT.get('http://localhost:5000/dashboard', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setStudents(response.data);
    }
// <h1>Welcome Back: {name}</h1>
/**/
const headers = [
    { label: "Rollno", key: "rollno" },
    { label: "Name", key: "name" },
    { label: "Address", key: "address" },
    { label: "Institute", key: "institute" },
    { label: "Course", key: "course" },
    
  ];
  
  const [file, setFile] = useState(null);
  console.log(file)
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('/upload', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
    return <div className="dashboard">
            <h1>Welcome Back: {name}</h1>
              <div className='header'>
                <div className='titleHeader'>
                    <h1>Students</h1>
                    <p>List of all Students in Database.</p>
                </div>
                <div className='buttonHeader'>
                    {/* <input type="file" name="Import Students" accept=".csv" className='import'/> */}
                    {/* <form action="/import-csv" method="post" encType="multipart/form-data">
                        <div className="mb-3">
                            <input
                            type="file"
                            className="form-control"
                            name="import-csv"
                            accept="csv"
                            />
                        </div>
                        <div className="d-grid">
                            <input type="submit" className="btn btn-dark" value="Store File" />
                        </div>
                    </form> */}
                    {/* <form className="import" onSubmit={handleSubmit}>
                        <input type="file"  accept="csv" onChange={handleFileChange} />
                        <button type='submit'>Upload</button>
                    </form> */}
                    <CSVLink data={students} headers={headers}>
                        <button className='export'>
                            <img className='exportLogo' src={ExportIcon} alt="export logo"/>
                            <span className='exportText'>Export as CSV</span>
                        </button>
                    </CSVLink>
                    
                    
                </div>
                </div>
                <div className='table-container'>
                   <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Roll No</th>
                            <th>Address</th>
                            <th>Institute</th>
                            <th>Course</th>
                        </tr>
                    </thead>
                 {/* <EachStudent/> */}
                 <tbody>
                    {students.map((student, index) => (
                        <tr key={index+1}>
                            <td>{student.rollno}</td>
                            <td>{student.name}</td>
                            <td>{student.address}</td>
                            <td>{student.institute}</td>
                            <td>{student.course}</td>
                        </tr>
                    ))}

                </tbody> 
                 
                   </table>
                </div>
             </div>
}

export default Dashboard
