import { db, storage, app, database } from "../../../firebase";
// Realtime Database
import { ref, set, get } from "firebase/database";

export default async function handler(req, res) {
  const { roomName, user } = req.body;

  const roomRef = ref(database, "rooms");
  const roomSnapshot = await get(roomRef);
  const roomData = roomSnapshot.val();
  const roomKey = roomData
    ? Object.keys(roomData).length.toString() +
      Math.random().toString(36).substr(2, 9)
    : "1000";

  const roomDataRef = ref(database, `rooms/${roomKey}`);
  await set(roomDataRef, {
    roomName,
    user,
    createdAt: new Date().toISOString(),
    isStartedVoting: false,
    isFinishedVoting: false,
    users: [
      {
        user,
        vote : 0,
      },
    ],
  }).catch((error) => {
    res.status(500).json({ error: error.message });
  });

  res.status(200).json({
    message: "Room created successfully",
    roomKey,
  });
}
