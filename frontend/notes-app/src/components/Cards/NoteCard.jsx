import React from 'react'
import {MdOutlinePushPin,MdCreate,MdDelete} from 'react-icons/md';
import moment from "moment";

const NoteCard = ({
    title, date, content, tags, isPinned, onEdit, onDelete, onPinNote,
}) => {
    return (
        <div className="rounded p-4 bg-Yellow border-2 border-spacing-7 border-purple-700 dark:border-slate-400  hover:shadow-xl dark:hover:shadow-md dark:hover:shadow-white transition-all ease-in-out ">
            <div className='flex items-center justify-between'>
                <div>
                    <h6 className="text-xl font-medium">{title}</h6>
                    <span className="text-xs text-slate-500 ">{moment(date).format('Do MMM YYYY')}</span>
                </div>

                <MdOutlinePushPin className={`icon-btn ${isPinned?'text-rose-800':'text-slate-400'}`} onClick={onPinNote} />
            </div>

            <p className="text-slate-600 mt-2">{content?.slice(0,60)}</p>
            {/* {content?.slice(0,60)}: This is a JavaScript expression. The ? is a optional chaining operator, which means it will only try to access slice method if content is not null or undefined. The slice(0,60) method is returning a new string that includes the first 60 characters of the content string. */}

            <div className="flex items-center justify-between mt-2 ">
                <div className="text-xs text-slate-500">{tags.map((item)=>`${" "}#${item}`)}</div>

                <div className="flex items-center gap-2">
                    <MdCreate className='icon-btn hover:text-green-600 text-slate-400' onClick={onEdit}/>
                    <MdDelete className='icon-btn hover:text-red-500 text-slate-400' onClick={onDelete}/>
                </div>
            </div>
        </div>
    )
}

export default NoteCard