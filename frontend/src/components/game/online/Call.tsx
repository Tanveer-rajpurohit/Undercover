import { X } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import PlayGroundContext from "../../../context/PlayGround";

interface Player {
  userId: number;
  status: string;
  role: string;
  micStatus: string;
  name: string;
}

const Call: React.FC<{ closeCall: () => void }> = ({ closeCall }) => {
  const { game, currentUserId } = useContext(PlayGroundContext);

  const players: Player[] = JSON.parse(game?.players || "[]");
  const currentPlayer = players.find((p) => p.userId === currentUserId);
  const currentUserName = currentPlayer?.name || "Anonymous"; 
  const [roomCode, setRoomCode]= useState<string>("default_room")
  const meetingRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
    if(game){
        setRoomCode(game.roomCode);
    }
  },[game])

  const myMeeting = async () => {
    const appID = 1026506097;
    const serverSecret = "8d6ca3e3c8c69b3fc01c4ab2b446b635";

    // Correctly convert `currentUserId` to string
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomCode,
      currentUserId.toString(), // Call `.toString()` correctly
      currentUserName
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);

    zc.joinRoom({
      container: meetingRef.current, // Use the ref for the meeting container
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      showScreenSharingButton: true,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showTextChat: true,
      showUserList: true,
      layout: "Auto",
    });
  };

  useEffect(() => {
    myMeeting();
  }, []);

  return (
    <div className="fixed z-50 top-0 right-0 h-full w-1/2 bg-white shadow-lg flex flex-col transition-transform duration-300 ease-in-out">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-bold">Call</h2>
        <button
          className="text-gray-500 hover:text-gray-800"
          onClick={closeCall}
        >
          <X />
        </button>
      </div>

      
      <div ref={meetingRef} className="flex-1" />
    </div>
  );
};

export default Call;
