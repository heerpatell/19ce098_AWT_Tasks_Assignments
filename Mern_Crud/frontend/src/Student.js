import React,{useEffect,useState} from 'react'
import {Form,Table,Button} from 'react-bootstrap'
import axios from 'axios'
import './app.css'

function Student() {
    const [student,setStudent] = useState({sem:"",sname:"",sid:"",gender:""})
    const [studentDetail,setStudentDetail]= useState([])

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setStudent({...student,[name]:value});
    }

    const submitClicked = async (e) =>{
        e.preventDefault(); //prevents automatic reload
        console.log(student)

        const newStudent = {
        sem:student.sem,
        sname:student.sname,
        sid:student.sid
        }

        //create
        axios.post('http://localhost:5000/studnet/create',newStudent)
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
    const getStudents =()=>{
        axios.get("http://localhost:5000/studnet/get")
        .then((res)=>{
        setStudentDetail(res.data)
        // console.log(setStudentDetail)
        })
        .catch((e)=>{
        console.log("error",e)
        })
    }

    useEffect(() => {
        getStudents();
    },[]);

    //updating one of the Students
    const updateStudent =(id)=>{
        try{
        axios.put(`http://localhost:5000/studnet/update/${id}`)
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
    const delteStudent = (id) =>{
        try{
        axios.delete(`http://localhost:5000/studnet/delete/${id}`)
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
        <h4>Student Form</h4>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Id</Form.Label>
            <Form.Control type="number" placeholder="id" name="sid" value={student.sid} onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Enter Name</Form.Label>
            <Form.Control type="text" placeholder="name" name="sname" value={student.sname} onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Enter Semester</Form.Label>
            <Form.Control type="text" placeholder="Semester" name="sem" value={student.sem} onChange={handleChange}/>
        </Form.Group>
        
        <Button variant="primary" type="submit" onClick={submitClicked}> 
            Submit
        </Button>
        </Form>

        <br/>
        <hr/>

        <h4>Student Details</h4>

        {(studentDetail.length===0) && (<div>Oops! No Student details has arrived!</div>)}
    
        <Table striped bordered hover>
        <thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Semester</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {
        studentDetail.map((curElem)=>{
                return(
                <tr key={curElem.id}>
                    <td>{curElem.sid}</td>
                    <td>{curElem.sname}</td>
                    <td>{curElem.sem}</td>
                    <td><Button variant="primary" type="submit" onClick={()=>updateStudent(curElem._id)}> Edit</Button></td>
                    <td><Button variant="primary" type="submit" onClick={()=>delteStudent(curElem._id)}> Delete</Button></td>
                </tr>
                )
            })
        }
        </tbody>
        </Table>
        </>
    );
}

export default Student