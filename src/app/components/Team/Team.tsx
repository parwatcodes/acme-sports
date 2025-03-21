"use client";

import Image from "next/image";
import { Team as ITeam } from "../../utils/interfaces";

import NFLIcon from '@/public/images/nfl-3d.png';

interface TeamProps {
  team: ITeam;
}

export default function Team(props: TeamProps) {
  const { team } = props;

  return (
    <div className="bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow max-w-[200px] mx-auto">
      <Image
        src={NFLIcon}
        alt={team.name}
        width={200}
        height={120}
        className="h-32 "
      />
      <div className="p-3">
        <h3 className="text-base font-bold text-gray-900 ">{team.name}</h3>
        <h3 className="mt-2 text-gray-600 text-sm ">
          Nickname: <span className="text-black">{team.nickname}</span>
        </h3>
        <p className="text-gray-600 mt-1 text-sm">
          Conference: <span className="text-black">{team.conference}</span>
        </p>
        <p className="text-gray-600 mt-1 text-sm">
          Division: <span className="text-black font-normal">{team.division}</span>
        </p>
      </div>
    </div>
  );
}
