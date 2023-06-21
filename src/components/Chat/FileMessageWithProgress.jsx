import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsFileImage } from "react-icons/bs";
import { uploadImage } from "../FileUploader/ImageUpload";
import alert from "../Notification/Alert";
import chatsRepository from "@/repositories/chatsRepository";
export function FileMessageWithProgress({
  socket,
  chatId,
  message,
  file,
  userId,
}) {
  const [progress, setProgress] = useState();
  const uploadFile = async () => {
    await uploadImage(
      file,
      async (url, success) => {
        if (success) {
          const newObj = {
            chatId,
            messageBody: {
              ...message,
              ...{
                attachment: url,
              },
            },
          };
          console.log(newObj.messageBody.attachment);
          try {
            const { result } = await chatsRepository.createMessage(newObj);
            socket.emit("send-message", userId, result);
          } catch (error) {
            alert.showErrorAlert(error);
          }
        }
      },
      setProgress
    );
  };
  useEffect(() => {
    if (file && message.attachment === "attachment") uploadFile();
  }, []);
  return (
    <div className="w-40">
      <BsFileImage className="inline w-8 h-8 justify-end" />
      <span className="block">{message?.message}</span>
      {progress < 100 && (
        <div className="relative h-2 bg-gray-300">
          <div
            className="absolute top-0 left-0 h-2 bg-green-500"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
}
