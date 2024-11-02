"use client"
import { useGetCalls } from '@/hooks/useGetCalls';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react'
import MeetingCard from './MeetingCard';

const CallList = ({type}) => {
    const {endedCalls, upcomingCalls, callRecordings, isLoading} = useGetCalls();
    const router = useRouter()
    const [recordings, setRecordings] = useState([]);
    
    
    const getCalls = () =>{
        switch(type){
            case 'upcoming':
                return upcomingCalls;
            case 'ended':
                return endedCalls;
            case 'recordings':
                return callRecordings;
            default:
                return [];
        }
    }

    const getNoCallsMessage = () =>{
        switch(type){
            case 'upcoming':
                return 'No upcoming calls';
            case 'ended':
                return 'No ended calls';
            case 'recordings':
                return 'No call recordings';
            default:
                return [];
        }
    }

    // const calls = getCalls();
    // const noCallsMessage = getNoCallsMessage();

    const calls = [{
        title: "Tanay Pratap",
        date: "12th August, 2021",
        isPreviousMeeting: false,
        handleClick: () => router.push("/"),
        link: "https://www.google.com",
        buttonText: "Join Meeting",
    }];

  return (
    <div className="grid grid-cols gap-5 xl:grid-cols-2 ">
        
        {calls && calls.length >0 ? calls.map((meeting)=>(
            <MeetingCard 
            title={meeting.title}
            date={meeting.date}
            isPreviousMeeting={meeting.isPreviousMeeting}
            handleClick={meeting.handleClick}
            link={meeting.link}
            buttonText={meeting.buttonText}
            />)
        ):(
            <h1>{noCallsMessage}</h1>
        )}
    </div>
  )
}

export default CallList