import { NextResponse } from "next/server";

import prisma from '@/libs/prismadb';
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(
  req: Request,
  { params }: {
    params: { userId: string }}
  ) {
    const { userId } = params;
    const currentUser = await getCurrentUser();
    
    if (! currentUser) {
      throw new Error('not logged in')
    }

    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid ID');
    }
  
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
  
    if (!user) {
      throw new Error('Invalid ID')
    }

    let updatedFollowingIds = [...(user.followingIds || [])]
    updatedFollowingIds.push(userId)

    /*
    updatedFollowingIds = updatedFollowingIds
    .filter((followingId) => followingId !== userId)
    */

    const updatedUser = await prisma.user.update({
      where :{
        id: currentUser.id
      },
      data: {
        followingIds: updatedFollowingIds
      }
    })
    
    NextResponse.json(updatedUser)
  }

export async function DELETE(
  req: Request,
  { params }: {
    params: { userId: string }}
    ) {
      console.log('hi')
      const { userId } = params;
  
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        throw new Error('not logged in')
      }
      if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid ID');
      }

    
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })
    
      if (!user) {
        throw new Error('Invalid ID')
      }
  
      let updatedFollowingIds = [...(user.followingIds || [])]
  
      updatedFollowingIds = updatedFollowingIds
      .filter((followingId) => followingId !== userId)
  
      const updatedUser = await prisma.user.update({
        where :{
          id: currentUser.id
        },
        data: {
          followingIds: updatedFollowingIds
        }
      })
      
      NextResponse.json(updatedUser)
    }