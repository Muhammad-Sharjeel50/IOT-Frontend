import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import Swal from 'sweetalert2'

const UpdateUser = ({ user }) => {
   const [status, setStatus] = useState('')
   const endPoint = process.env.REACT_APP_BASE_URL
   const [profilePicture, setProfilePicture] = useState(null)
   const navigate = useNavigate()
   const [name, setName] = useState(user?.name)
   const [email, setEmail] = useState(user?.email)
   const [phone_number, setPhone_number] = useState(user?.phone_number);
   const [isModalOpen, setIsModalOpen] = useState(false);


   const handleNameChange = (e) => {
      e.preventDefault()
      setName(e.target.value)
   }
  

   const handleUpdate = async () => {
      if (name && !name.match(/^[a-zA-Z\s]+$/)) {

          Swal.fire({
			  icon: 'error',
			  title: 'Correct Name',
			  text: 'Name must be an Alphabet!',
			  showCloseButton: true,
			});
         return
      } else if (
         email && !email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
         )
      ) {
         Swal.fire({
            icon: 'error',
            title: 'Please Correct Email!',
            text: 'invalid email!',
            showCloseButton: true,
          });
         return
      } else if (
         phone_number && !phone_number.match(
            /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/
         )
      ) {
         Swal.fire({
            icon: 'error',
            title: 'Please Enter Correct phone!',
            text: 'invalid phone!',
            showCloseButton: true,
          });
  
         return
      }

      try {
         const updatedUser = {

            ...user,
            name: name,
            email: email,
            phone_number: phone_number,
         }
        
         let requestData = JSON.stringify(updatedUser)

         let config = {
            method: 'PUT',
            url: `http://${endPoint}:8000/core/user/${user.id}`,

            headers: {
               'Content-Type': 'application/json'
            }, 
            data: requestData,
         }

         axios
            .request(config)
            .then((response) => {
               if (response.status === 200) {
                  // console.log(JSON.stringify(response.data))
                  setStatus('Updated successfully')
                  Swal.fire({
                     icon: 'success',
                     title: status,
                     text: response.data.message,
                     showCloseButton: true,
                   }).then((result) => {
                     if (result.isConfirmed) {
                        user.is_Admin ? navigate('/home') : navigate('/dashboard')
                     }
                   });
            
               }
               else {
                 
                  Swal.fire({
                     icon: 'error',
                     title: 'Updated Failed',
                     text: response.error,
                     showCloseButton: true,
                  })
               }
            })
            .catch((error) => {

            })


      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Error updating user:',
            text:error,
            showCloseButton: true,
         })
        
      }
   }

   const handleProfilePictureClick = () => {
      const input = document.getElementById('profile-picture')
      if (input) {
         input.click()
      }
   }
   const handleConfirmUpdate = () => {
      user.is_Admin ? navigate('/home') : navigate('/dashboard')
    
      setIsModalOpen(false);
   };

   const handleProfilePictureChange = (selectedFile) => {
      if (selectedFile) {
   
         setProfilePicture(selectedFile);
        
       
      }
   }
   const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
         e.preventDefault();
			handleUpdate();
		}
	};
	const handleButtonClick = () => {
      handleUpdate();
    };

   return (
      <div className="flex flex-wrap justify-center bg-gray-200 py-4 w-full h-full items-center">
         <div className="mx-auto bg-white  h-full  py-4 px-10 rounded-xl flex flex-col flex-wrap">
            <div className="mx-auto pt-1 items-center w-full justify-center flex flex-col">
            
               <div
                  className=" text-center items-center w-full flex-col pb-2 flex justify-center"
                  onClick={handleProfilePictureClick}
               >
                  <input
                     type="file"
                     id="profile-picture"
                     accept="image/*"
                     onChange={(e) => handleProfilePictureChange(e.target.files[0])}
                     style={{ display: 'none' }}
                  />

                  {profilePicture ? (
                     <img
                        src={profilePicture}
                        alt="Profile"
                        className=" rounded-full h-full w-full cursor-pointer m-auto "
                     />
                     
                  ) : (
                     <div className="fas fa-user-circle rounded-full h-24 w-24 text-x1 cursor-pointer flex justify-center text-center scale-100 active:scale-90 focus:scale-90 mx-auto text-gray-200 active:text-gray-100"></div>
                  )}
                  <h2 className="text-lg text-center font-semibold text-blue-800 tracking-wide ">Update User </h2>
               </div>
            </div>

            <div className=" flex-col flex 
            ">
               <div className="w-8/12 flex text-lg  py-1 font-medium mx-auto my-auto">
                  <input
                     type="text"
                     defaultValue={name}
                     className="p-2 h-full w-full"
                     placeholder="name"
                     onChange={handleNameChange}
                     onKeyDown={handleKeyDown}

                  />
               </div>
               <div className="w-8/12 flex text-lg  py-1 font-medium mx-auto my-auto ">
                  <input
                     type="email"
                     defaultValue={email}
                     className="p-2 h-full w-full"
                     placeholder="email"
                     onChange={(e)=>setEmail(e.target.value)}
                     onKeyDown={handleKeyDown}
                  />
               </div>
               <div className="w-8/12 flex text-lg py-1 font-medium mx-auto  ">
                  <input
                     type="phoneno"
                     defaultValue={phone_number}
                     className="p-2 h-full w-full"
                     placeholder="phone_number"
                     onChange={(e)=> setPhone_number(e.target.value)}
                     onKeyDown={handleKeyDown}

                  />
               </div>
               <div className="w-full h-full flex px-10 py-2 my-auto">
                  <button
                     className="bg-sky-600 scale-100 active:scale-90 focus:scale-90 focus:bg-sky-500 text-white text-xl font-medium mx-auto "

                     onClick={handleButtonClick}
                  >
                     <p>
                        Update User
                     </p></button>
                  <ReactModal
                     isOpen={isModalOpen}
                     onRequestClose={() => setIsModalOpen(false)}
                     contentLabel="Confirmation-Modal"
                     className="modal"  // Add a custom class for styling
                     overlayClassName="overlay"  // Add a custom class for styling the overlay
                  >
                     <div>
                        <p>Update successful! Do you want to confirm the update?</p>
                        <button onClick={handleConfirmUpdate}>Confirm</button>
                        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                     </div>
                  </ReactModal>
               </div>

            </div>
         </div>
      </div>

   )
}

export default UpdateUser