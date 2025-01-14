import PaymentPage from '@/components/PaymentPage'
import React from 'react'
import { notFound } from 'next/navigation'
import connectDb from '@/db/connectDb'
import User from '@/models/user'



const page = async ({ params }) => {
    await connectDb();
    
    const user = await User.findOne({ username: params.username });
    
    if (!user) {
        notFound();
        return;
    }
    
    return (
        <>
            <PaymentPage username={params.username} />
        </>
    );
}

export default page;


export async function generateMetadata({params}){
    return {
        title : `${params.username} - Get Me A Drink`
    }
}