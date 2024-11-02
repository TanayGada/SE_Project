import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongodb';
import Applicant from '@/models/Applicant';

export async function PATCH(request) {
    try {
      console.log(request);
        // Parse the form data from the request
        const data = await request.formData();
        const file = data.get('file');  // Ensure file field is named 'resume'
        console.log(data);
        console.log(file);


        if (!file) {
            return NextResponse.json({ error: 'Resume file is missing' }, { status: 400 });
        }

        // Prepare the form data for Pinata upload
        const formDataToSend = new FormData();
        formDataToSend.append('file', file);
        formDataToSend.append('pinataMetadata', JSON.stringify({ name: 'Resume' }));

        // Upload the file to Pinata
        const pinataResponse = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.PINATA_JWT}`
            },
            body: formDataToSend
        });

        // Handle Pinata upload errors
        if (!pinataResponse.ok) {
            const errorText = await pinataResponse.text();
            throw new Error(`Pinata API error: ${errorText}`);
        }

        const pinataResult = await pinataResponse.json();
        const { IpfsHash } = pinataResult;

        if (!IpfsHash) {
            throw new Error('IPFS Hash not found in Pinata response');
        }

        // Generate a persistent IPFS gateway link for the resume
        const resumeLink = `https://gateway.pinata.cloud/ipfs/${IpfsHash}`;

        // Connect to MongoDB and update the applicant's record
        await connectDb();
        const clerkId = data.get('clerkId');  // Ensure clerkId is passed in form data

        if (!clerkId) {
            return NextResponse.json({ error: 'Clerk ID is missing' }, { status: 400 });
        }

        // Find and update the applicant record with the new resume link
        const updatedApplicant = await Applicant.findOneAndUpdate(
            { clerkId },
            { resumeLink: resumeLink },
            { new: true }
        );

        if (!updatedApplicant) {
            return NextResponse.json({ error: 'Applicant not found' }, { status: 404 });
        }

        console.log('Applicant updated successfully:', updatedApplicant);
        return NextResponse.json({ message: 'Resume uploaded successfully', resumeLink }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message || 'Internal Server Error' }, { status: 500 });
    }
}