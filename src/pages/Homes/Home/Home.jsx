import useAllUser from "../../../Hooks/useAllUser";
import UserProfile from "../../User/UserProfile";



const Home = () => {
    const [allUsers] = useAllUser()
    console.log("home from all users", allUsers);

    return (
        <div>
            <h2 className="text-4xl text-red-600">Well Come To This Site</h2>

            <div className="h-[800px] max-w-6xl mx-auto bg-slate-500">
                <UserProfile userId={allUsers && allUsers.length > 0 ? allUsers[0]._id : null}></UserProfile>


            </div>

        </div>
    );
};

export default Home;