import React, { useState } from "react";
import AttachmentImg from "../../assets/attachment.png";
import FileImage from "../../assets/SelectedFileImage.png";
import Microphone from "../../assets/microphone-2.svg";
import CloseMic from "../../assets/close_mic_icon.png";
import SendIcon from "../../assets/sendred.svg";
import GreenTicket from "../../assets/green_tick_icon.png";
import { Button, Input } from "@headlessui/react";

type ChatBotFooterProps = {
  bgColor: string
  onClick: () => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

const ChatBotFooter: React.FC<ChatBotFooterProps>  = ({bgColor, onClick, setMessage}) => {
  const [isAudioRec, seIsAudioRec] = useState(false);
  const [files, setFiles] = useState<File[] | null>(null);
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFiles(Array.from(files));
    }
  };
  const getFilePreview = (file: Blob | MediaSource) => {
    if (!file) {
      return null; // Return null if no file is provided
    }
    // 
    // Check if the file is an image
    if (file.type.startsWith("image/")) {
      return (
        <div className="relative w-48 h-32 shrink-0	border-2 border-blue-500">
          <img src={URL.createObjectURL(file)} className="w-48 h-32  object-cover" />
          <span
            className="absolute top-1 right-1 w-4 h-4 text-blue-500 bg-blue-100 text-xs  rounded-full flex items-center justify-center cursor-pointer font-bold " 
            onClick={() =>files && setFiles(files.filter((f) => f !== file))}
          >
           X
          </span>
        </div>
      );
    }
  
    // Handle non-image files (e.g., PDFs or other formats)
    return (
      <div className="relative w-48 h-32 shrink-0 flex flex-col items-start justify-center gap-2 border-2 border-blue-500">
        <img src={FileImage} className="w-24 h-16 object-contain" />
        <span className="text-sm w-48 truncate">{file.name}</span>
        <span
            className="absolute top-1 right-1 w-4 h-4 text-blue-500 bg-blue-100 text-xs  rounded-full flex items-center justify-center cursor-pointer font-bold " 
            onClick={() =>files && setFiles(files.filter((f) => f !== file))}
          >
           X
          </span>
      </div>
    );
  };
  
  return (
    <div className={`p-6 ${bgColor} shadow-2xl shadow-gray-950 shadow-[0_-10px_34px_gray-950] absolute bottom-0 left-0 right-0 rounded-es-3xl rounded-ee-3xl relative`}>
     {(files && files?.length > 0) && 
     <span className=" bg-blue-100 px-2 py-2 rounded-md  w-100   flex  gap-1 overflow-auto message-scrollbar">
      {files?.map(file=>getFilePreview(file))}
      </span>
      }
      <div className="grid grid-cols-[1fr_48px_48px] items-center justify-between relative gap-4 pt-2">
        <div className="relative w-full">
          <Input
            type="text"
            id="messageInput"
            placeholder="Write message"
            className="w-full h-[51px] pl-12 pr-4 py-2 rounded-full border border-gray-200 bg-white bg-opacity-10 text-white text-opacity-50 placeholder-white placeholder-opacity-50 focus:outline-none focus:ring focus:ring-blue-300"
            onChange={handleMessageChange}
          />
          <Input type="file" id="file-input-1" multiple className="absolute left-1 top-3 h-10 w-10 opacity-0 z-20"  onChange={handleSelectFiles} multiple />
          <label
            id="file-input-1"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <img src={AttachmentImg} alt="Attach File" className="h-5 w-5" />
          </label>
        </div>
        <Button className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg focus:ring focus:ring-blue-300">
          <img src={SendIcon} alt="Send" className="h-10 w-10" onClick={onClick}/>
        </Button>
        <div
          id="input-mic"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg cursor-pointer focus:ring focus:ring-blue-300"
          // onclick="startRecording()"
          onClick={() => seIsAudioRec(true)}
        >
          <img src={Microphone} alt="Mic" className="h-7 w-7" />
        </div>
{isAudioRec &&  <div
          id="audio-rec"
          className="flex absolute justify-between items-center w-full bg-blue-100 p-2 rounded-full top-[-60px] left-0 right-0 shadow-md"
        >
          <div id="close-rec" className="cursor-pointer">
            <img src={CloseMic} alt="Close" className="h-8 w-8 object-cover" onClick={() => seIsAudioRec(false)}/>
          </div>
          <div className="w-3/4 h-5 bg-gray-300 rounded-full overflow-hidden">
            <div
              id="voice-strength-fill"
              className="h-full bg-teal-400 w-0 transition-all duration-100"
            ></div>
          </div>
          <div id="stop-recording" className="cursor-pointer">
            <img
              src={GreenTicket}
              alt="Stop"
              className="h-8 w-8 object-cover"
            />
          </div>
        </div>}
      </div>
    </div>
  );
}

export default ChatBotFooter;
