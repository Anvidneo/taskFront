import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import '../js/App';
import '../css/App.css';
import { useNavigate } from "react-router-dom";
import ReactSwitch from 'react-switch';
import axios from 'axios';
import Cookies from 'universal-cookie';

const Task = (props) => {
    const baseUrl = 'http://localhost:3001/tasks/changeStatus/';
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [checked, setChecked] = useState(true);
    const [checkedText, setCheckedText] = useState(true);

    useEffect(() => {
        setChecked(!props.status);
    }, [!props.status]);

    useEffect(() => {
        let statusText = !props.status ? 'Completed' : 'Unfinished'
        setCheckedText(statusText);
    }, [props.statusText]);

    function handleClick() {
        let id = props.id;
        navigate('../updateTask?id='+id);
    }

    const handleChange = async (val) => {
        setChecked(!val);
        let statusText = !val ? 'Completed' : 'Unfinished';
        setCheckedText(statusText);

        let token = cookies.get('token');
        const id = props.id;
        let url = baseUrl+id;
        await axios.put(url, {
            status: val,
        }, {
            headers: {
                Authorization: 'Bearer '+token
            }
        })
        .then(response => {
            if (response.data.error) {
                console.log(response.data.error);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="ag-courses_item">
            <div className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>
                <div className="ag-courses-item_title">
                    <div className="row">
                        <div className="col-9">{props.title}</div>
                        <div className="col-3 toggle-switch">
                            <ReactSwitch
                                checked={checked}
                                onChange={handleChange}
                                onColor="#44f76b"
                            />
                        </div>
                    </div>
                </div>
                <div className="ag-courses-item_description">
                    {props.description}
                </div>
                
                <div className="ag-courses-item_date-box">
                    Status: <span className="ag-courses-item_date"> {checkedText} </span>
                </div>
                <div className="ag-courses-item_date-box">
                    Created: <span className="ag-courses-item_date"> {props.createdAt} </span>
                </div> <br/>
                
                <Button className='task-button ag-courses-item_date-box' onClick={handleClick}>
                    Update
                </Button>
            </div>
        </div>
    );
};

export default Task;
