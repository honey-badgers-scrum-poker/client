import { useEffect, useState } from "react";
import { db, database } from "../../firebase";
import { ref, set, onValue, off, update, push, child } from "firebase/database";
import useAuthentication from "../../hooks/auth";
import { useSession } from "next-auth/react";
import Modal from "react-modal";
import SideBar from "../../components/SideBar";
import MainArea from "../../components/MainArea";

export default function RoomId({ roomId }) {
  useAuthentication(roomId);
  const [roomData, setRoomData] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const { data: session } = useSession();
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    const roomRef = ref(database, `rooms/${roomId}`);
    onValue(roomRef, (snapshot) => {
      const roomData = snapshot.val();
      setRoomData(roomData);
      console.log('scket data', roomData)
    });

    return () => {
      off(roomRef);
    };
  }, []);


  // Yeni bir kullanıcı girince odaya ekleme

  useEffect(() => {
    if (roomData) {
      const res = roomData.users.find(
        (user) => user.user.uid === session.user.uid
      );
      if (!res) {
        const roomRef = ref(database, `rooms/${roomId}`);
        update(roomRef, {
          users: [
            ...roomData.users,
            {
              user: {
                ...session.user,
              },
              vote: 0,
            },
          ],
        });
      }
    }
  }, [roomData]);

  // Oy verince Vote değerinin değişmesi

  useEffect(() => {
    if (selectedCard) {
      const userRef = ref(database, `rooms/${roomId}`);
      update(userRef, {
        users: roomData.users.map((user) => {
          if (user.user.uid === session.user.uid) {
            return { ...user, vote: selectedCard };
          }
          return user;
        }),
      });
    }
  }, [selectedCard]);
  const roomRef = ref(database, `rooms/${roomId}`);

  const startVoting = () => {
    deleteVotes();
    update(roomRef, {
      isStartedVoting: true,
    });
  };

  const finishVoting = () => {
    setSelectedCard(null);
    update(roomRef, {
      isStartedVoting: false,
    });
  };

  const deleteVotes = () => {
    update(roomRef, {
      users: roomData.users.map((user) => {
        return { ...user, vote: 0 };
      }),
    });
  };

  if (!roomData) return <div>Loading...</div>;

  return (
    <div className="bg-gray-200 h-screen flex flex-row">
      <SideBar
        roomId={roomId}
        roomData={roomData}
        session={session}
        selectedCard={selectedCard}
      />

      {/* Oylama */}

      <MainArea
        roomId={roomId}
        roomData={roomData}
        session={session}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        startVoting={startVoting}
        finishVoting={finishVoting}
      />

      {/* Chat */}

      {/* <Modal isOpen={modalIsOpen} style={customStyles}>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-center">Hoş Geldiniz</h2>
          <span className="text-center">
            {session?.user.name} odaya katılmak için aşağıdaki butona tıkla.
          </span>
          <button
            className="bg-blue-500 text-white p-2 rounded-lg mt-4"
            onClick={() => joinRoom()}
          >
            Odaya Katıl
          </button>
        </div>
      </Modal> */}
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

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
