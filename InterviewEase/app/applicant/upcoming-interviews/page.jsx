"use client";
import CallList from '@/components/applicant/CallList'
import React, { useEffect } from 'react'

const UpcomingInterview = () => {
  useEffect(() => {
  localStorage.setItem("isMeetingOwner", false);
  }
  , [])
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <CallList type="upcoming"  />
    </section>
  )
}

export default UpcomingInterview