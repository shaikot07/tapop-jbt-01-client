import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MyLoading from "../../../Component/MyLoading";
import { FaSignOutAlt, FaTasks, FaUser } from "react-icons/fa";


const NavBar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    // const [isTop, setIsTop] = useState(true)
    const profileRef = useRef(null);
    // const myProfile = user?.email
    const [user, setUser] = useState('shaikot')
    const loading = false
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        window.addEventListener('click', handleOutsideClick);
        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, []);



    // handle signout fuc
    const handleSignoutFunc = () => {
        // logOut().then(() => { console.log('signout'); setLoading(false); setUser(null) }).catch(e => { console.log(e.message); setLoading(false) })
    }
    const menu = <>
        <li> <Link className="rounded-none text-slate-50 font-bold border-b-0 hover:!text-[#A855F7] hover:border-[#A855F7] hover:border-b-2 transition duration-300 focus:!text-[#A855F7] " to={'/'}>Home</Link> </li>
        {

            user ? <>

                <li> <Link className="rounded-none text-slate-50 font-bold hover:!text-[#A855F7]  hover:border-[#A855F7] hover:border-b-2 transition duration-300 focus:!text-[#A855F7]" to={'/login'}>Log In</Link> </li>
                <li> <Link className="rounded-none text-slate-50 font-bold hover:!text-[#A855F7]  hover:border-[#A855F7] hover:border-b-2 transition duration-300 focus:!text-[#A855F7]" to={'/register'}>Sign up</Link> </li>

                {/* <li> <Link className="rounded-none text-slate-50 font-bold hover:!text-[#A855F7]  hover:border-[#A855F7] hover:border-b-2 transition duration-300" to={'/register'}>Sign up</Link> </li> */}
            </>
                : <>
                    <li> <Link className="rounded-none text-slate-50 font-bold hover:!text-[#A855F7]  hover:border-[#A855F7] hover:border-b-2 transition duration-300 focus:!text-[#A855F7]" to={'/my-task'}>My Team</Link> </li>
                    <li> <Link className="rounded-none text-slate-50 font-bold hover:!text-[#A855F7]  hover:border-[#A855F7] hover:border-b-2 transition duration-300 focus:!text-[#A855F7]" to={'/login'}>Log In</Link> </li>
                    <li> <Link className="rounded-none text-slate-50 font-bold hover:!text-[#A855F7]  hover:border-[#A855F7] hover:border-b-2 transition duration-300 focus:!text-[#A855F7]" to={'/register'}>Sign up</Link> </li>
                </>
        }



    </>
    return (

        <div className="navbar  bg-slate-900 text-slate-50 border-b border-slate-700 sticky top-0 w-full z-40 justify-between">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost bg-[#A855F7] lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#A855F7] hover:bg-[#0F172A] z-99 rounded-box w-52">
                        {menu}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl text-white">Job Task</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menu}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    loading ? <MyLoading className={'h-12 w-12'}></MyLoading> : user ?

                        <>
                            <figure className='relative w-16' onClick={() => setIsProfileOpen(!isProfileOpen)} ref={profileRef}>
                                <img src={user?.photoURL} title={user?.displayName} alt={user.displayName} className='h-12 w-12 block cursor-pointer rounded-full border-2 border-purple-500' />
                                <ul className={`absolute top-full p-3 bg-slate-900 text-slate-100 border-2 border-purple-500 w-40 rounded transition-all duration-500 origin-top ${!isProfileOpen ? 'opacity-0 invisible -right-10' : 'opacity-100 visible right-2'}`}>
                                    <Link to={'/my-profile'}>  <li className='flex gap-2 items-center py-2 cursor-pointer'> <FaUser></FaUser> My Profile</li></Link>
                                    <li className='flex gap-2 items-center py-2 cursor-pointer' onClick={handleSignoutFunc}> <FaSignOutAlt></FaSignOutAlt> Sign Out</li>
                                </ul>
                            </figure>
                        </>
                        : <Link to={'/login'}><button className='my-btn-one'>Log In</button></Link>
                }
            </div>
        </div>

    );
};

export default NavBar;