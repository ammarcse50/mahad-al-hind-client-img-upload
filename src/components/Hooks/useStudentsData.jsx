import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useStudentsData = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const { refetch, data: students = [] ,isLoading} = useQuery({
    queryKey: ["students", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/students?email=${user?.email}`);
      return res.data;
    },
  });



  return [students, refetch ,isLoading];
};

export default useStudentsData;