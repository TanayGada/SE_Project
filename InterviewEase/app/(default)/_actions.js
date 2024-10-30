'use server';
import { clerkClient } from "@clerk/nextjs/server";


export const setUserRole = async ({ userId, role }) => { 

  if (!userId || !role) {
    return { message: 'userId and role are required' };
  }

  try {
    console.log("userId before", userId);


    // Attempt to update the user role
    const res = (await clerkClient()).users.updateUserMetadata(userId,{
      publicMetadata: {
        UserRole: role,
      },  
    })
    
    if (!res) {
      throw new Error('Update user returned undefined');
    }

    // Prepare response
    const response = {
      id: res.id,
      publicMetadata: res.publicMetadata,
    };

    return { message: 'User role updated successfully', user: response };
  } catch (err) {
    return { message: 'Failed to update user role', error: err.message || 'Unknown error' };
  }
}