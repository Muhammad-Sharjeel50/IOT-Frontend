// import React, { useState, useEffect, useMemo } from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { HiOutlineLockOpen } from "react-icons/hi";
// import { BiSolidLock } from "react-icons/bi";
// import ReactPaginate from "react-paginate";
// import axios from "axios";

// import { useNavigate } from "react-router-dom";
// import { IoMdKey } from "react-icons/io";

// const itemsPerPage = 10; // Number of items to display per page




// export default function Agentsms({ allUsers, filteredData, setUsers }) {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [expandedRowIndex, setExpandedRowIndex] = useState(null);
//   const [showOptions, setShowOptions] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);
//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://172.20.10.2:8000/core/user/");
//       setData(response.data.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   const toggleOptions = (index) => {
//     setExpandedRowIndex(index);
//     setShowOptions(true);

//     setTimeout(() => {
//       setShowOptions(false);
//       setExpandedRowIndex(null);
//     });
//   };

//   const handleDelete = async (user) => {
//     if (user.is_admin || !user.is_active) {
//       alert("you cannot delete ");
//     } else {
//       try {
//         let requestData = JSON.stringify({
//           email: user.email,
//           is_admin: user.is_admin,
//         });

//         let config = {
//           method: "delete",
//           url: "http://172.20.10.2:8000/core/user/",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           data: requestData,
//         };

//         axios
//           .request(config)
//           .then((response) => {
//             console.log(JSON.stringify(response.data));
//             if (response.status === 200) {
//               const updatedData = allUsers.filter((u) => u.email !== user.email);
//               setData(updatedData);
//               console.log(`Deleted user with id: ${user.email}`);
//             }
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       } catch (error) {
//         console.error("Error deleting user:", error);
//       }
//     }
//   };

//   const handlePasswordReset = async (user) => {
//     let email = user.email;

//     try {
//       const response = await axios.post(
//         "http://172.20.10.2:8000/core/password/reset/request/",

//         {
//           email,
//         }
//       );

//       if (response.status === 200) {
//         console.log("reset request ok");

//         alert("Password reset email sent. Please check your inbox.");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleNameChange = (value, index) => {
//     const newData = [...allUsers];
//     newData[index].name = value;
//     setUsers(newData);
//   };

//   const handleEmailChange = (value, index) => {
//     const newData = [...allUsers];
//     newData[index].email = value;
//     setUsers(newData);
//   };
//   const handlePhonenoChange = (value, index) => {
//     const newData = [...allUsers];
//     newData[index].phone_number = value;
//     setUsers(newData);
//   };
//   const handleClick = () => {
//     window.location.href = "./user"; // implementation details
//   };
//   // const handleUpdate = async (user) => {
//   //     try {
//   //         let requestData = JSON.stringify(user);

//   //         let config = {
//   //             method: 'PUT',
//   //             url: 'http://192.168.81.173:8000/core/user/',
//   //             headers: {
//   //                 'Content-Type': 'application/json'
//   //             },
//   //             data: requestData
//   //         };

//   //         axios.request(config)
//   //             .then((response) => {
//   //                 console.log(JSON.stringify(response.data));
//   //                 if (response.status === 200) {
//   //                     const updatedData = data.filter(u => u.email !== user.email);
//   //                     setData(updatedData);
//   //                     console.log(`update user with id: ${user.email}`);
//   //                 }
//   //             })
//   //             .catch((error) => {
//   //                 console.log(error);
//   //             });

//   //     } catch (error) {
//   //         console.error('Error deleting user:', error);
//   //     }
//   // };
//   const handleUpdate = (user) => {
//     console.log("first==", user);
//     if (user.is_active) navigate("/update", { state: { user } });
//   };
//   const onDepartmentChange = (user, value) => {
//     try {
//       const updatedUser = {
//         ...user,
//         // is_admin:user.is_admin ?false:true
//         role_or_permission: value,
//       };

//       let requestData = JSON.stringify(updatedUser);
//       let config = {
//         method: "PUT",
//         url: `http://172.20.10.2:8000/core/user/${user.id}/`,

//         headers: {
//           "Content-Type": "application/json",
//         },
//         data: requestData,
//       };

//       axios
//         .request(config)
//         .then((response) => {
//           console.log(JSON.stringify(response.data));
//           const temp = data.map((u) => {
//             return u.id === user.id ? updatedUser : u;
//           });
//           setData(temp);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } catch (error) {
//       console.error("Error updating user department:", error);
//     }
//   };
//   const handleLockToggle = (user) => {
//     console.log("first==", user);
//     try {
//       //             if(user.is_active){
//       //                 user.is_active ? true:false
//       //             }
//       // console.log("first,",user)
//       //             setActive(!user)
//       const updatedUser = {
//         ...user,
//         // is_admin:user.is_admin ?false:true
//         is_active: user.is_active ? false : true,
//       };

//       let requestData = JSON.stringify(updatedUser);

//       let config = {
//         method: "PUT",
//         url: `http://192.168.137.133:8000/core/user/${user.id}/`,

//         headers: {
//           "Content-Type": "application/json",
//         },
//         data: requestData,
//       };

//       axios
//         .request(config)
//         .then((response) => {
//           console.log(JSON.stringify(response.data));
//           const temp = data.map((u) => {
//             return u.id === user.id ? updatedUser : u;
//           });
//           setData(temp);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//       // Send update request to backend with updated user data
//       // const response = await axios.put(`http://192.168.81.173:8000/core/user/${user.id}`, updatedUser);
//       // console.log(response)

//       // Handle response and update user in parent component's state
//       // Redirect back to the main page after successful update
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   const handlePageChange = (selectedPage) => {
//     setCurrentPage(selectedPage.selected);
//   };

//   const pageCount = Math.ceil(data.length / itemsPerPage);
//   const activeAccounts = useMemo(() => {
//     return data.filter((account) => {
//       return account.is_active;
//     });
//   }, [data]);
//   const inActiveAccounts = useMemo(() => {
//     return data.filter((account) => {
//       return !account.is_active;
//     });
//   }, [data]);
//   return (
//     <div>
//       {/* <Header/>
//             <div>
//         <Sidebar/>
//       </div> */}
//       <div style={{ background: "#F4F4F5" }} className="min-h-full">
//         <div className="flex mr-32 justify-around ">
//           {/* ... Widgets ... */}
//           {/* <Widget
//           className="bg-white shadow-lg ml-10 mt-4 "
//           label="Total Accounts"
//           count={data.length}
//         />
//         <Widget
//           className="bg-white shadow-lg ml-10 mt-4"
//           label="Active Account"
//           count={activeAccounts.length}
//         />
//         <Widget
//           className="bg-white shadow-lg ml-10 mt-4"
//           label="Inactive Account"
//           count={inActiveAccounts.length}
//         /> */}
//         </div>
//         <div className="activeagent rounded-lg bg-white shadow-lg ml-10 mr-44 mt-8 m-auto justify-start p-4">
//           {/* <button type="button" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded ml-80' onClick={handleClick} >
//                     AddUser

//                 </button> */}

//           <h1 className="text-2xl font-bold">Web To SMS</h1>

//           <table className="table-auto text-left w-full mt-8 border-collapse h-52">
//             <thead className="bg-[#3E97CF] py-4 border">
//               <tr className="h-14 p-4 border">
//                 <th className="border border-#B9B9B9 pl-4">AgentAsigned</th>
//                 <th className="border pl-4">Customer</th>
//                 <th className="border pl-4">Conversation</th>

//                 <th className="border pl-4">Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data
//                 .slice(
//                   currentPage * itemsPerPage,
//                   (currentPage + 1) * itemsPerPage
//                 )
//                 .map((val, index) => (
//                   <React.Fragment key={index}>
//                     <tr className="border ">
//                       <td className="border pl-5 py-1">{val.agentasigned}</td>
//                       <td className="border pl-5 py-1">{val.customer}</td>
//                       <td className="border pl-5 py-1">{val.conversation}</td>
//                       <td className="border pl-5 py-1">{val.Details}</td>

//                       <td className="border pl-5 py-1">
//                         {/* <select
//                           value={val.role_or_permission}
//                           // onClick={() => toggleOptions(index)}
//                           onChange={(e) => {
//                             onDepartmentChange(val, e.target.value);
//                           }}
//                           onMouseLeave={() => setShowOptions(false)}
//                         >
//                           {departmentOptions.map((option, optionIndex) => (
//                             <option key={optionIndex} value={option}>
//                               {option}
//                             </option>
//                           ))}
//                         </select> */}
//                       </td>
//                       <td className=" pl-8 justify-center py-2 flex">
//                         {/* <Link to={`/update/${val}`} className='cursor-pointer'>
//                                             <FaEdit className='cursor-pointer' />
//                                         </Link> */}
//                         <IoMdKey
//                           className="mx-2 cursor-pointer"
//                           onClick={() => handlePasswordReset(val)}
//                         />
//                         <FaEdit
//                           onClick={() => handleUpdate(val)}
//                           className="cursor-pointer text-red-500"
//                         />
//                         {val.is_active ? (
//                           <HiOutlineLockOpen
//                             onClick={() => handleLockToggle(val)}
//                             className="cursor-pointer text-red-500"
//                           />
//                         ) : (
//                           <BiSolidLock
//                             onClick={() => handleLockToggle(val)}
//                             className="cursor-pointer"
//                           />
//                         )}
//                         <FaTrash
//                           onClick={() => handleDelete(val)}
//                           className="cursor-pointer mx-2"
//                         />
//                       </td>
//                     </tr>
//                     {expandedRowIndex === index && (
//                       <tr key={`${index}-edit`} className="border ">
//                         <td colSpan="2" className="border pl-5 py-1">
//                           <input
//                             type="text"
//                             value={val.name}
//                             onChange={(e) =>
//                               handleNameChange(e.target.value, index)
//                             }
//                           />
//                         </td>
//                         <td colSpan="2" className="border pl-5 py-1">
//                           <input
//                             type="text"
//                             value={val.loginTime}
//                             onChange={(e) =>
//                               handleEmailChange(e.target.value, index)
//                             }
//                           />
//                         </td>
//                         <td colSpan="2" className="border pl-5 py-1">
//                           <input
//                             type="text"
//                             value={val.logoutTime}
//                             onChange={(e) =>
//                               handlePhonenoChange(e.target.value, index)
//                             }
//                           />
//                         </td>
//                         <td className="pl-8 justify-center py-2 flex">
//                           <button
//                             onClick={() => handleUpdate(val.id, index)}
//                             className="bg-blue-500 text-white px-4 py-1 rounded"
//                           >
//                             Update
//                           </button>
//                           <button
//                             onClick={() => handleDelete(val.email)}
//                             className="bg-red-500 text-white px-4 py-1 rounded"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     )}
//                   </React.Fragment>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="flex justify-end w-5/6 mt-4">
//           <ReactPaginate
//             previousLabel={"<"}
//             nextLabel={">"}
//             pageCount={pageCount}
//             onPageChange={handlePageChange}
//             containerClassName={"pagination-container"}
//             previousLinkClassName={"previous-link"}
//             nextLinkClassName={"next-link"}
//             disabledClassName={"disabled"}
//             activeClassName={"active"}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
