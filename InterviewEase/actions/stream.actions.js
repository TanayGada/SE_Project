"use server"

import { currentUser } from "@clerk/nextjs/server"
import { StreamClient } from "@stream-io/node-sdk"

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY   
const apiSecret = process.env.STREAM_SECRET_KEY

export const tokenProvider = async (req, res) => {
    const user = await currentUser()

    if(!user)   throw new Error('User is Not Logged In')
    if(!apiKey) throw new Error('Stream API Key not found');
    if(!apiSecret) throw new Error('Stream Secret Key not found');

    const streamClient = new StreamClient(apiKey, apiSecret)
    const validity = 3600
    const token = streamClient.generateUserToken({ user_id: user.id, validity_in_seconds: validity });
    return token
}