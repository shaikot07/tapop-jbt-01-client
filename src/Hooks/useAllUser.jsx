import useAxiosPublic from './useAxiosPublic';
import { useQuery } from 'react-query';

const useAllUser = () => {
    // react-query 
    const axiosPublic = useAxiosPublic();

      const {data:allUsers=[], isPending:loading, refetch}= useQuery({
            queryKey:['users'],
            queryFn: async()=>{
                  const res= await axiosPublic.get('/users');
                  console.log(res.data);
                  return res.data;
            }
      })

      return [allUsers, loading,refetch]
};

export default useAllUser;
