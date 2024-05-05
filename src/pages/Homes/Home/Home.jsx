import useAllUser from "../../../Hooks/useAllUser";
import UserProfile from "../../User/UserProfile";



const Home = () => {
    const [allUsers]=useAllUser()
    console.log("from all users",allUsers);

    return (
        <div>
            <h2 className="text-4xl text-red-600">this is a home pages</h2>

            <div className="h-[800px] w-full bg-slate-500">
                <UserProfile allUsers={allUsers._id}></UserProfile>
            </div>

        </div>
    );
};

export default Home;