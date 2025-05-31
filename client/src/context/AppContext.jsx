import { createContext, useEffect, useState } from 'react';
import { dummyCourses } from '../assets/assets';
import {useNavigate} from 'react-router-dom';
import humanizeDuration from 'humanize-duration'
import {useAuth, useUser} from "@clerk/clerk-react"

export const AppContext = createContext();


export const AppContextProvider =  (props) => {

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate() 
     
    const {getToken} = useAuth()
    const {user} = useUser()

    const [allCourses, setAllCourses] = useState([])
    const [isEducator, setIsEducator] = useState(true)
    const [enrolledCourses, SetEnrolledCourses] = useState([])

    //Fetch all Courses

    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses)
    }

    // Function to calculate avg rating of course
    const calculateRating = (course) => {
        if (course.courseRatings.length === 0){
            return 0;
        }
        let totalRating = 0
        course.courseRatings.forEach((rating) => {
            totalRating += rating.rating
        })
        return totalRating / course.courseRatings.length
    }

    // Function to calculate Course chapter time

    const calculateChapterTime = (chapter) => {
        let time = 0;

        chapter.chapterContent.map((lecture) => {
            return time += lecture.lectureDuration
        })
        return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})
    }

    // Function to Calculate the course Duration

    const CalculateCourseDuration = (course) => {
        let time = 0;
        course.courseContent.map((chapter) => {
            chapter.chapterContent.map((lecture) => {
                return time += lecture.lectureDuration
            })
        })
        return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})
    }

    // Function Calculate to No of Lectures in the Course

    const calculateNoOfLectures = (course) => {
        let totalLectures = 0;
        course.courseContent.forEach((chapter) => {
            if (Array.isArray(chapter.chapterContent)){
                totalLectures += chapter.chapterContent.length;
                return totalLectures
            }
        })
        return totalLectures;

    }

    // Fetch User Enrolled Courses

    const fetchUserEnrolledCourses = async () => {
        return SetEnrolledCourses(dummyCourses)
    }

    useEffect(() => {
        fetchAllCourses()
        fetchUserEnrolledCourses()
    }, [])
    
    const logToken = async () => {
        console.log(await getToken())
    }

    useEffect(() => {
        if(user){
            logToken()
        }
    }, [user]) 

    const value = {
        currency, allCourses, navigate, calculateRating, 
        isEducator, setIsEducator, calculateNoOfLectures,
        CalculateCourseDuration, calculateChapterTime, enrolledCourses
    }
    return (
        <AppContext.Provider value = {value}>
            {props.children}
        </AppContext.Provider>
    )
}