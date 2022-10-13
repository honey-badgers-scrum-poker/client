import { useEffect, useState } from "react";
import { db, database } from "../../firebase";
import { ref, set, onValue } from "firebase/database";

export default function RoomId({ roomId }) {
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    const roomRef = ref(database, `rooms/${roomId}`);
    onValue(roomRef, (snapshot) => {
      const roomData = snapshot.val();
      setRoomData(roomData);
    });
  }, []);

  return (
    <div>
      <h1>Room ID: {roomId}</h1>
      {roomData && (
        <code>
          <pre>{JSON.stringify(roomData, null, 2)}</pre>
        </code>
      )}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const roomId = context.params.roomId;

  return {
    props: {
      roomId,
    },
  };
};
