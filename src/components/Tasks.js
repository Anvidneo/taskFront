import React, { useState, useEffect } from 'react';
import jwt from 'jwt-decode';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Task from './Task';
import '../css/App.css';

const baseUrl = 'http://localhost:3001/tasks/user/';
const cookies = new Cookies();

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = cookies.get('token');
                const { iduser } = jwt(token);
                let url = baseUrl + iduser;

                const response = await axios.get(url, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });

                if (response.data.data) {
                    setTasks(response.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='ag-format-container'>
            <div className="ag-courses_box">
                {tasks.map((task, i) => {
                    let statusText = !task.status ? 'Completed' : 'Unfinished'
                    return (
                        <Task
                            key={i}
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            statusText={statusText}
                            status={task.status}
                            createdAt={task.createdAt}
                        ></Task>
                    )
                })}
            </div>
        </div>
    )
}

export default Tasks;
