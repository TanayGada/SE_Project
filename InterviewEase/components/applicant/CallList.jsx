"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import MeetingCard from './MeetingCard';

const CallList = ({ type }) => {
    const { user } = useUser();
    const router = useRouter();
    const [calls, setCalls] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [applicantDetails, setApplicantDetails] = useState(null); // To store applicant details

    useEffect(() => {
        const fetchApplicantAndInterviews = async () => {
            if (!user) return;

            try {
                setIsLoading(true);
                // Fetch applicant details using the current user's Clerk ID
                const applicantResponse = await fetch(`/api/users/applicant/${user.id}`);
                if (!applicantResponse.ok) throw new Error("Failed to fetch applicant details");

                const applicantData = await applicantResponse.json();
                setApplicantDetails(applicantData); // Set applicant details

                // Fetch interviews where applicantId equals current user's Clerk ID
                const interviewsResponse = await fetch(`/api/interviews/applicant/${user.id}`);
                if (!interviewsResponse.ok) throw new Error("Failed to fetch interviews");

                const interviewsData = await interviewsResponse.json();
                setCalls(interviewsData); // Set interviews data
            } catch (err) {
                setError(err.message || "Error fetching data");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchApplicantAndInterviews();
    }, [user]);

    const filteredCalls = useMemo(() => {
        const now = new Date();
        let filtered = calls.filter(interview => {
            const interviewDate = new Date(interview.interviewDateTime); // Ensure it's a Date object
            switch (type) {
                case 'upcoming':
                    return interviewDate > now; // Upcoming meetings
                case 'ended':
                    return interviewDate <= now; // Ended meetings
                case 'recordings':
                    return interview.callRecordings?.length > 0; // Meetings with recordings
                default:
                    return false;
            }
        });

        // Sort the filtered calls by interviewDateTime (ascending)
        if(type === 'upcoming'){
        return filtered.sort((a, b) => {
            const dateA = new Date(a.interviewDateTime);
            const dateB = new Date(b.interviewDateTime);
            return dateA - dateB; // Change to dateB - dateA for descending order
        });}
        else{
            return filtered.sort((a, b) => {
                const dateA = new Date(a.interviewDateTime);
                const dateB = new Date(b.interviewDateTime);
                return dateB - dateA; // Change to dateB - dateA for descending order
            });
        }
    }, [calls, type]);

    const noCallsMessage = {
        upcoming: 'No upcoming calls',
        ended: 'No ended calls',
        recordings: 'No call recordings',
    }[type] || 'No calls found';

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="grid grid-cols gap-5 xl:grid-cols-2">
            {filteredCalls.length > 0 ? ( // Use filteredCalls instead of calls
                filteredCalls.map((meeting) => (
                    <MeetingCard
                        key={meeting._id}
                        title={`Meeting with ${applicantDetails?.name || "Unknown"}`} // Use applicant name or default
                        date={new Date(meeting.interviewDateTime).toLocaleString()}
                        isPreviousMeeting={type === 'ended'}
                        handleClick={() => router.push(meeting.meetLink)}
                        link={meeting.meetLink}
                        // Adjust button texts based on the type
                        buttonText={
                            type === 'upcoming' 
                                ? 'Join Meeting' 
                                : 'Meet Link'
                        }
                        resumeLink={applicantDetails?.resumeLink} // Pass resumeLink prop
                    />
                ))
            ) : (
                <h1>{noCallsMessage}</h1>
            )}
        </div>
    );
}

export default CallList;