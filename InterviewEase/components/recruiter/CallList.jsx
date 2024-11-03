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
    const [applicants, setApplicants] = useState({}); // Store applicant details by clerkId

    useEffect(() => {
        const fetchInterviews = async () => {
            if (!user) return;

            try {
                setIsLoading(true);
                const response = await fetch(`/api/interviews/${user.id}`);
                if (!response.ok) throw new Error("Failed to fetch interviews");

                const data = await response.json();
                setCalls(data); // Set raw data initially
                
                // Fetch applicant details for all meetings at once
                const applicantsData = await fetchApplicants(data);
                
                setApplicants(applicantsData);
            } catch (err) {
                setError(err.message || "Error fetching interview data");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInterviews();
    }, [user]);

    const fetchApplicants = async (interviews) => {
        const applicantsData = {};
        
        for (const meeting of interviews) {
            try {
                const response = await fetch(`/api/users/applicant/${meeting.applicantClerkId}`);
                if (response.ok) {
                    const applicant = await response.json();
                    applicantsData[meeting.applicantClerkId] = applicant; // Store complete applicant data
                } else {
                    console.error(`Failed to fetch applicant for ${meeting.applicantClerkId}`);
                }
            } catch (error) {
                console.error("Error fetching applicant data:", error);
            }
        }
        
        return applicantsData;
    };

    const filteredCalls = useMemo(() => {
        const now = new Date();
        return calls.filter(interview => {
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
                        title={`Meeting with ${applicants[meeting.applicantClerkId]?.name || "Unknown"}`} // Use applicant name or default
                        date={new Date(meeting.interviewDateTime).toLocaleString()}
                        isPreviousMeeting={type === 'ended'}
                        handleClick={() => router.push(meeting.meetLink)}
                        link={meeting.meetLink}
                        buttonText={type === 'upcoming' ? 'Join Meeting' : 'View Recording'}
                        resumeLink={applicants[meeting.applicantClerkId]?.resumeLink} // Pass resumeLink prop
                    />
                ))
            ) : (
                <h1>{noCallsMessage}</h1>
            )}
        </div>
    );
}

export default CallList;