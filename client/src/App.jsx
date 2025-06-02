import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/student/Home'
import CoursesList from './pages/student/CoursesList'
import CourseDetails from './Pages/student/CourseDetails'
import MyEnrollments from './pages/Student/MyEnrollments'
import Player from './pages/student/Player'
import Loading from "./components/student/Loading"
import Educator from './pages/educator/Educator'
import Dashboard from './pages/educator/DashBoard'
import AddCourse from './pages/educator/AddCourse'
import MyCourses from './pages/educator/MyCourses'
import StudentEnrolled from './pages/educator/StudentsEnrolled'
import Navbar from './components/student/navbar'
import "quill/dist/quill.snow.css"
import {ToastContainer} from 'react-toastify'


const App = () => {

  const educator = useMatch('/educator/*')

  return (
    <div className='text-default min-h-screen bg-white'>
      <ToastContainer />
      {!educator && <Navbar />}
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path = "/course-list" element = {<CoursesList />}></Route>
        <Route path = "/course-list/:input" element = {<CoursesList />}></Route>
        <Route path = "/course/:id" element = {<CourseDetails />}></Route>
        <Route path = "/my-enrollments" element = {<MyEnrollments />}></Route>
        <Route path = "/player/:courseId" element = {<Player />}></Route>
        <Route path = "/loading/:path" element = {<Loading />}></Route>
        <Route path = "/educator" element = {<Educator />}>
          <Route path="/educator" element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentEnrolled />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App
