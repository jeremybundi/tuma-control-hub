import { MoreVertical } from "lucide-react";

type Person = {
  name: string;
  account: string;
  avatar: string;
};

type TransactionProps = {
  sender: Person;
  recipient: Person;
  code: string;
  amount: string;
  type: string;
  time: string;
  status: "Successful" | "Failed";
};

const getStatusStyle = (status: string) => {
  return status === "Successful"
    ? "bg-green-100 text-green-600"
    : "bg-red-100 text-red-500";
};

export default function TransactionRow({
  sender,
  recipient,
  code,
  amount,
  type,
  time,
  status,
}: TransactionProps) {
  return (
    <tr className="border-b hover:bg-gray-50">
      {/* Sender */}
      <td className="px-4 py-3">
        <div className="flex flex-col whitespace-nowrap">
          <div className="font-semibold text-gray-900">{sender.name}</div>
          <div className="text-xs text-gray-500">{sender.account}</div>
        </div>
      </td>

      {/* Recipient */}
      <td className="px-4 py-3">
        <div className="flex flex-col whitespace-nowrap">
          <div className="font-semibold text-gray-900">{recipient.name}</div>
          <div className="text-xs text-gray-500">{recipient.account}</div>
        </div>
      </td>

      {/* Transaction Code */}
      <td className="px-4 py-3 font-normal text-sm">{code}</td>

      {/* Amount */}
      <td className="px-4 py-3 font-medium">£{amount}</td>

      {/* Type */}
      <td className="px-4 py-3 text-sm capitalize">
        {type.replace(/-/g, " ")}
      </td>

      {/* Time */}
      <td className="px-4 py-3 text-sm">{time}</td>

      {/* Status */}
      <td className="px-4 py-3">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusStyle(
            status
          )}`}
        >
          {status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3 text-gray-500">
        <button className="p-1 hover:bg-gray-100 rounded">
          <MoreVertical className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
