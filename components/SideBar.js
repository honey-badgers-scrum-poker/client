import { FaFlagCheckered } from "react-icons/fa";
import { BsHourglassTop } from "react-icons/bs";

export default function SideBar({ roomId, roomData, session }) {
  return (
    <div className="w-1/4 h-full">
      <div className="flex flex-col p-2">
        <h1 className="text-lg font-bold text-center bg-blue-200 rounded-2xl">
          Odadaki kişi sayısı: {roomData?.users.length}
        </h1>
        <div className="flex flex-col mt-2  bg-blue-200 rounded-2xl p-2">
          <h1 className="text-lg font-bold text-center border-b-2 border-gray-800">
            Kullanıcılar
          </h1>
          <ul className="max-w-md divide-y divide-gray-700">
            {roomData?.users.map((e) => (
              <li key={e.user.uid} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={e.user.image}
                      alt=""
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {e.user.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {e.user.email}
                    </p>
                  </div>
                  {roomData.isStartedVoting && (
                    <div className="pr-2">
                      {e?.vote ? (
                        <FaFlagCheckered className="text-green-500 w-6 h-6" />
                      ) : (
                        <BsHourglassTop className="animate-spin text-red-500  w-6 h-6" />
                      )}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
