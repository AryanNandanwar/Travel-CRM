import React from "react";
import {
  CurrencyDollarIcon,
  ClipboardListIcon,
  UserAddIcon,
  CheckCircleIcon,
  BriefcaseIcon,
} from "@heroicons/react/solid";

const cardsData = [
  {
    title: "Today’s Orders",
    value: "11.00",
    icon: <ClipboardListIcon className="h-8 w-8" />,
    bgColor: "bg-red-200",
  },
  {
    title: "Yesterday’s Orders",
    value: "18.00",
    icon: <ClipboardListIcon className="h-8 w-8" />,
    bgColor: "bg-gray-300",
  },
  {
    title: "This Month’s Orders",
    value: "79.00",
    icon: <ClipboardListIcon className="h-8 w-8" />,
    bgColor: "bg-blue-400",
  },
  {
    title: "Active Tours",
    value: "34.00",
    icon: <BriefcaseIcon className="h-8 w-8" />,
    bgColor: "bg-green-300",
  },
  {
    title: "Active Leads",
    value: "31.00",
    icon: <UserAddIcon className="h-8 w-8" />,
    bgColor: "bg-yellow-300",
  },
  {
    title: "Successful Tours",
    value: "30.00",
    icon: <CheckCircleIcon className="h-8 w-8" />,
    bgColor: "bg-orange-300",
  },
];

function CardsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {cardsData.map((card, idx) => (
        <div
          key={idx}
          className={`flex items-center p-4 rounded shadow-sm text-white ${card.bgColor}`}
        >
          <div className="mr-4 text-white">{card.icon}</div>
          <div>
            <p className="font-semibold">{card.title}</p>
            <h2 className="text-xl font-bold">{card.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardsRow;
