import React,{useEffect,useState} from 'react'
import {Form,Table,Button} from 'react-bootstrap'
import axios from 'axios'
import './app.css'

function Faculty() {
    const [faculty,setFaculty] = useState({femail:"",fname:"",fid:""})
    const [facultyDetail,setFacultyDetail]= useState([])

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFaculty({...faculty,[name]:value});
    }

    const submitClicked = async (e) =>{
        e.preventDefault(); //prevents automatic reload
        console.log(faculty)

        const newFaculty = {
        femail:faculty.femail,
        fname:faculty.fname,
        fid:faculty.fid
        }

        //create
        axios.post('http://localhost:5000/faculty/create',newFaculty)
        .then(res=>{
        if(res.data.message==='Created succesfully'){
            alert(res.data.message)
        }
        if(res.data.error){
            alert(res.data.error)
        }
        })
        .catch((e)=>{
        console.log("error",e)
        })
    }

    //read student details
    const getFaculties =()=>{
        axios.get("http://localhost:5000/faculty/get")
        .then((res)=>{
        setFacultyDetail(res.data)
        // console.log(setStudentDetail)
        })
        .catch((e)=>{
        console.log("error",e)
        })
    }

    useEffect(() => {
        getFaculties();
    },[]);

    //updating one of the Students
    const updateFaculty =(id)=>{
        try{
        axios.put(`http://localhost:5000/faculty/update/${id}`)
        .then((res)=>{
        if(res.data.message==='User updated successfully'){
            alert(res.data.message)
        }else{
            alert("can't update user")
        }
        })
        }catch(e){
        console.log("error",e)
        }
    } 

    //deleting one of the students
    const delteFaculty = (id) =>{
        try{
        axios.delete(`http://localhost:5000/faculty/delete/${id}`)
        .then((res)=>{
            if(res.data.message==='User deleted successfully'){
            alert(res.data.message)
            }else{
            alert("can't delete user")
            }
        })
        }catch(e){
        console.log("error",e)
        }
    }

    return (
        <>
        <h4>Faculty Form</h4>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Id</Form.Label>
            <Form.Control type="number" placeholder="Id" name="fid" value={faculty.sid} onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Enter Name</Form.Label>
            <Form.Control type="text" placeholder="name" name="fname" value={faculty.sname} onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Enter email</Form.Label>
            <Form.Control type="text" placeholder="Email id" name="femail" value={faculty.semail} onChange={handleChange}/>
        </Form.Group>
        
        <Button variant="primary" type="submit" onClick={submitClicked}> 
            Submit
        </Button>
        </Form>

        <br/>
        <hr/>

        <h4>Faculty Details</h4>

        {(facultyDetail.length===0) && (<div>Oops! No Faculty details has arrived!</div>)}
    
        <Table striped bordered hover>
        <thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {
        facultyDetail.map((curElem)=>{
                return(
                <tr key={curElem.id}>
                    <td>{curElem.fid}</td>
                    <td>{curElem.fname}</td>
                    <td>{curElem.femail}</td>
                    <td><Button variant="primary" type="submit" onClick={()=>updateFaculty(curElem._id)}> Edit</Button></td>
                    <td><Button variant="primary" type="submit" onClick={()=>delteFaculty(curElem._id)}> Delete</Button></td>
                </tr>
                )
            })
        }
        </tbody>
        </Table>
        </>
    );
}

export default Faculty

