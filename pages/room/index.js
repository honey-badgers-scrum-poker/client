import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Room() {
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

  return (
    <div>
      <h1>Room</h1>
      <b>Oda oluştur</b>
      <br />
      <input
        type="text"
        placeholder="Oda adı"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={createRoom}>Oluştur</button>
      <br />
      //Join a room
      <br />
      {room && <p>Room ID: {room.roomKey}</p>}
      {room && (
        <Link href={`/room/${room.roomKey}`}>
          <a>Join Room {room.roomKey}</a>
        </Link>
      )}
    </div>
  );
}
