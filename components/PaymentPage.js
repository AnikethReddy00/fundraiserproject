"use client"
import React, { useEffect } from 'react'
import Script from 'next/script'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { notFound } from "next/navigation"


const PaymentPage = ({ username }) => {
    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setCurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true ") {

            toast('Payment done ✅', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        router.push(`/${username}`)
    }, [])


    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async (params) => {
        let u = await fetchuser(username)
        setCurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }
    

    const pay = async (amount) => {


        //Get the order id
        let a = await initiate(amount, username, paymentform)

        let order_Id = a.id

        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Buy Me a Drink", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": order_Id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "http://localhost:3000/api/razorpay",
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>


            <div className="images relative">
                <img className='w-full object-cover' src={currentUser.coverpic} alt="" />
                <div className="profile-pic absolute -bottom-11 right-[47%] rounded-full">
                    <img className='  border-white  border-2 rounded-full ' src={currentUser.profilepic} height={100} width={100} alt="" />
                </div>
            </div>
            <div className=" flex flex-col gap-3 justify-center items-center my-14 ">
                <div className='font-bold text-2xl '>
                    @{username}
                </div>
                <div className='text-slate-300'>
                    Lets help {username} to get a Drink
                </div>
                <div className='text-gray-400'>
                    {payments.length} Payments recieved. Help {currentUser.name} to raise funds for a Drink
                </div>

            </div>
            <div className="payment flex gap-3 mx-28 mb-44 h-[40vh]">
                <div className="supporters w-1/2 bg-slate-900 rounded-lg px-7  overflow-y-scroll">
                    <h2 className='font-bold text-2xl mt-10 mb-4'>Top-10 Supporters</h2>
                    <ul className='mx-5 flex flex-col gap-1'>
                        {payments.length == 0 && <li>No payments Recieved</li>}
                        {payments.map = ((p, i) => {

                            <li className=' my-2 flex items-center gap-2'>
                                <img src="/avatar.gif" alt="user image" className='bg-white rounded-full w-6 h-6' /> {p.name} donated <span className='font-bold'>{p.amount}.
                                </span> with a message :   {p.message}
                            </li>
                        })}

                    </ul>
                </div>
                <div className="makepayment w-1/2 bg-slate-900 rounded-lg px-7">
                    <h2 className=' text-2xl font-bold mt-10 mb-4'>Make a Payment</h2>
                    <div className='flex flex-col gap-2'>
                        <input onChange={handleChange} value={paymentform.name} type="text" className='w-full p-3 rounded-lg bg-slate-800 ' name="name" id="" placeholder='Enter Name' />
                        <input onChange={handleChange} value={paymentform.message} type="text" className='w-full p-3 rounded-lg bg-slate-800 ' name="message" id="" placeholder='Enter Messaage' />
                        <input onChange={handleChange} value={paymentform.amount} type='number' className='w-full p-3 rounded-lg bg-slate-800 ' name="amount" id="" placeholder='Enter Amount' />

                    </div>
                    <div className='text-center mt-3'>
                        <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 disabled:bg-slate-400 disabled:from-cyan-200" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}>
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 font-bold">Checkout With Razorpay
                            </span>
                        </button>
                    </div>
                    <div className='flex gap-2 mt-5'>
                        <button className='bg-slate-500 p-3 rounded-lg' onClick={() => pay(1000)}>Pay 10</button>
                        <button className='bg-slate-500 p-3 rounded-lg' onClick={() => pay(2000)}>Pay 20</button>
                        <button className='bg-slate-500 p-3 rounded-lg' onClick={() => pay(3000)}>Pay 30</button>
                        <button className='bg-slate-500 p-3 rounded-lg' onClick={() => pay(4000)}>Pay 40</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
