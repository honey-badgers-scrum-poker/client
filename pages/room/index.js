import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useAuthentication from "../../hooks/auth";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";

export default function Room() {
  useAuthentication();
  const [room, setRoom] = useState(null);
  const [roomName, setRoomName] = useState("");

  const { data: session } = useSession();

  const createRoom = async () => {
    if (roomName.trim() === "") {
      alert("Please enter a room name");
      return;
    }

    const room = await fetch("/api/room/createRoom", {
      method: "POST",
      body: JSON.stringify({ roomName, user: session.user }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    setRoom(room);
  };

  const copyRoomLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/room/${room.roomKey}`
    );
    toast.success("Copied to clipboard!", {
      icon: "👍",
    });
  };

  return (
    <div className="bg-gray-200 w-full min-h-screen flex flex-col justify-center">
      {room ? (
        <div className="bg-white w-4/5 sm:w-3/5 mx-auto p-4 rounded-lg mt-4">
          <h1 className="text-2xl font-bold text-center mb-4">Room Created</h1>
          <p className="text-center mb-4">
            Share this link with your friends to join the room
          </p>
          <div className="bg-gray-200 p-2 rounded-lg text-center">
            <span className="flex justify-between items-center relative">
              <span className="text-sm text-gray-500 overflow-x-auto">
                {`${window.location.origin}/room/${room.roomKey}`}
              </span>
              <span className="absolute right-0 bg-gray-200 p-2 rounded-3xl">
                <MdContentCopy
                  className="cursor-pointer hover:scale-110"
                  onClick={() => copyRoomLink()}
                />
              </span>
            </span>
          </div>
          <div className="flex justify-center mt-4">
            <Link href={`/room/${room.roomKey}`}>
              <a className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Go to Room
              </a>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white w-1/3 mx-auto p-4 rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-4">Create Room</h1>
          <input
            type="text"
            placeholder="Room Name"
            className="w-full border-2 border-gray-300 p-2 rounded-lg mb-4"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button
            className="w-full bg-blue-500 text-white p-2 rounded-lg"
            onClick={createRoom}
          >
            Create Room
          </button>
        </div>
      )}
    </div>
  );
}
