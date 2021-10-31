import React from 'react'
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Home() {
    return (
    <>
    <h4>Choose Option</h4>
    
    <div className="d-grid gap-2">
      <Link excat to="/student">
      <Button variant="primary" size="lg">
        Student
      </Button>
      </Link>

      <Link excat to="/faculty">
      <Button variant="secondary" size="lg">
        Faculty
      </Button>
      </Link>
    </div>

    </>
    )
}

export default Home
