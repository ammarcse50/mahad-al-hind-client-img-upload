import Swal from "sweetalert2";
import useStudentsData from "../../components/Hooks/useStudentsData";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import useAuth from "../../components/Hooks/useAuth";

const Profile = () => {
  // const [students, setRecord] = useState([]);

  const { user } = useAuth()
 const [students,  refetch,isLoading] = useStudentsData()
 console.log(students)
 const axiosSecure = useAxiosSecure()

   
  // destructuring students of fetch data

  const id = students[0]?._id;
  const first_name = students[0]?.first_name;
  const last_name = students[0]?.last_name;
  const number = students[0]?.number;
  const gender = students[0]?.gender;
  const address = students[0]?.address;
  console.log(first_name);
  
  refetch()
  // submitting  updates

  const handleUpdate = (e) => {
    e.preventDefault();


    const form = e.target;
    const email = form.email.value;
    const first_name = form.first_name.value;
    const last_name = form.last_name.value;
    const number = form.number.value;
    const gender = form.gender.value;
    const address = form.address.value;

    const data = { email, first_name, last_name, number, gender, address };
    console.log(data); 

    axiosSecure.put(`/students/${id}`, data).then(() => {
      

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!"
      }).then((result) => {   
        if (result.modifiedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: "Your file has been updated.",
            icon: "success"
          });
        }
      });
    });
  };
  if(isLoading)
    {
      return    <span className="loading loading-spinner loading-xl">Loading.....</span>
    }
  return (
    <div className="min-h-screen p-10 space-y-4">
      <form onSubmit={handleUpdate} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            defaultValue={user?.email}
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            name="first_name"
            defaultValue={first_name}
            placeholder="name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            name="last_name"
            defaultValue={last_name}
            placeholder="name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="number"
            name="number"
            defaultValue={number}
            placeholder="number"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Gender</span>
          </label>
          <input
            type="text"
            name="gender"
            defaultValue={gender}
            placeholder="Gender"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <input
            type="text"
             name="address"
            defaultValue={address}
            placeholder="Address"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-orange-400">Update</button>
        </div>
      </form>

   
    </div>
  );
};

export default Profile;
