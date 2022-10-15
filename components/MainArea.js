import cardData from "../helper/cardData";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function MainArea({
  roomId,
  roomData,
  selectedCard,
  setSelectedCard,
  startVoting,
  finishVoting,
}) {
  const { data: session } = useSession();
  const isAdmin = roomData.user.email === session.user.email;
  const [maddeName, setMaddeName] = useState("");


  return (
    <div className="w-2/4 h-full bg-slate-400 p-2">
      {roomData.isStartedVoting && (
        <div className="flex flex-wrap items-center justify-center h-1/2">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="flex items-center justify-center w-1/4 h-48 p-1"
            >
              <button
                className="w-3/4 h-3/4 rounded-xl cursor-pointer hover:scale-105 bg-white flex items-center justify-center disabled:scale-100 disabled:cursor-not-allowed"
                disabled={!roomData.isStartedVoting}
              >
                {card.value === selectedCard ? (
                  <BsFillPatchCheckFill className="text-green-500 text-4xl" />
                ) : (
                  <p
                    className="text-4xl w-full h-full flex items-center justify-center"
                    onClick={() => {
                      if (roomData.isStartedVoting) {
                        setSelectedCard(card.value);
                      }
                    }}
                  >
                    {card.value}
                  </p>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
      {roomData.isStartedVoting === false && (
        <ul className="flex flex-col items-center h-1/2">
          {roomData.users.map(({ user, vote }) => (
            <li
              key={user.uid}
              className="p-1 px-3 bg-blue-400 w-full rounded-xl"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user.image}
                    alt=""
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                </div>
                <div className="">
                  {vote === 0 ? (
                    <p className="text-lg font-bold bg-white flex justify-center items-center rounded-full w-8 h-8 text-center">
                      --
                    </p>
                  ) : (
                    <p className="text-lg font-bold bg-white flex justify-center items-center rounded-full w-8 h-8 text-center">
                      {vote}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isAdmin && (
        <div className="flex items-center justify-center h-1/2">
          {roomData.isStartedVoting ? (
            <button
              className=" w-40 h-10 rounded-xl cursor-pointer bg-blue-200 flex items-center justify-center disabled:cursor-not-allowed hover:backdrop-brightness-90"
              onClick={() => finishVoting()}
            >
              <p className="text-base w-full h-full flex items-center justify-center">
                Oylamayı Bitir
              </p>
            </button>
          ) : (
            <div className="flex flex-col">
              <input
                type="text"
                className="w-40 h-10 rounded-xl cursor-pointer bg-blue-200 flex items-center justify-center disabled:cursor-not-allowed hover:backdrop-brightness-90"
                placeholder="Madde Adı"
                value={maddeName}
                onChange={(e) => setMaddeName(e.target.value)}
              />
              <button
                className=" w-40 h-10 rounded-xl cursor-pointer bg-blue-200 flex items-center justify-center disabled:cursor-not-allowed hover:backdrop-brightness-90"
                disabled={roomData.isStartedVoting}
                onClick={() => {
                  startVoting(maddeName);
                }}
              >
                <p className="text-base w-full h-full flex items-center justify-center">
                  Oylamayı başlat
                </p>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
