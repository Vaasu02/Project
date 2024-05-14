import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal';
import ToastMessage from '../../components/ToastMessage/ToastMessage'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import Addnoteimg from '../../assets/images/2.svg'
import NoDataimg from '../../assets/images/no-data-animate.svg'
const Home = () => {

  const [openaddeditmodal, setopenaddeditmodal] = useState({
    isShown: false,
    type: "add",
    data: null,
  })

  //toast msg
  const [showToastmsg, setshowToastmsg] = useState({
    isShown: false,
    msg: "",
    type: "add",
  })

  const showToastMessage = (message, type) => {
    setshowToastmsg({
      isShown: true,
      message,
      type,

    })

  }

  const handleCloseToast = () => {
    setshowToastmsg({
      isShown: false,
      message: "",

    })

  }

  const [allNotes, setAllnotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const[isSearch,setIsSearch]=useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setopenaddeditmodal({ isShown: true, data: noteDetails, type: "edit" });
  };

  //get user info
  const getUserinfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (err) {
      if (err.response.status === 401) {
        localStorage.clear();
        navigate("/login");

      }
    }
  };

  //get all notess
  const getALlnotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllnotes(response.data.notes);
      }
    } catch (err) {
      if (err.response.status === 401) {
        localStorage.clear();
        navigate("/login");

      }

    }
  }

  //deletenote
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      // console.log(response);
      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", 'delete');
        getALlnotes();
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        console.log("An unexcepted error occured.Please try again.")
      }
    }

  }

  //Search fora Note
  const onSearchNote=async(query)=>{
    try{
      const response=await axiosInstance.get("/search-notes",{
        params:{ query },
      });

      if(response.data && response.data.notes){
        setIsSearch(true);
        setAllnotes(response.data.notes);
      }
      
    }catch(err){
      console.log(err);
    }
  };

  //updateisPinned
  const updateIsPinned=async(noteData)=>{
    // console.log(noteData);
    const noteId=noteData._id;
        try{
            const response=await axiosInstance.put("/update-note-pinned/" + noteId,{
               "isPinned":!noteData.isPinned,
            })
            if(response.data && response.data.note){
                showToastMessage("Note Pinned Successfully");
                getALlnotes();
            }else{
              


            }
        }catch(err){
            console.log(err);
        }
  }

  const handleCLearSearch=()=>{
    setIsSearch(false);
    getALlnotes();
  
  }


  useEffect(() => {
    getALlnotes();
    getUserinfo();
    return () => { };
  }, [])

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleCLearSearch={handleCLearSearch}/>

      <div className="container mx-auto p-4">
        {allNotes.length > 0 ? (
          <div className='grid grid-cols-3 gap-4 mt-8 md:grid-cols-2 sm:grid-cols-1'>
            {allNotes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}

          </div>
        ) : (
        <EmptyCard imgSrc={isSearch?NoDataimg:Addnoteimg} message={isSearch?`Oops! No notes found matching your search.`:`Start creating your first note! Click the 'Add' buttton to jot down your thoughts, ideas, and reminders. Let's get Started!`} />
        )}
      </div>

      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10 sm:fixed sm:w-12 sm:h-12" onClick={() => {
        setopenaddeditmodal({ isShown: true, type: "add", data: null })
      }}>
        <MdAdd className='text-[32px] text-white' />
      </button>

      <Modal
        isOpen={openaddeditmodal.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.5)'
          },
        }}
        contentLabel="Add Edit Note Modal"
        className="w-2/5 lg:w-3/5 md:w-3/5 sm:w-4/5 sm:h-4/4 sm:mt-[85px] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"


      >
        <AddEditNotes
          type={openaddeditmodal.type}
          noteData={openaddeditmodal.data}
          onclose={() => {
            setopenaddeditmodal({ isShown: false, type: "add", data: null })
          }}
          getALlnotes={getALlnotes}
          showToastMessage={showToastMessage}

        />
      </Modal>

      <ToastMessage
        isShown={showToastmsg.isShown}
        message={showToastmsg.message}
        type={showToastmsg.type}
        onclose={handleCloseToast}
      />
    </>
  )
}

export default Home