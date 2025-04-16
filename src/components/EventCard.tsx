import Image from "next/image";

interface Event {
  name: string;
  id: string;
  description: string;
  start_date: string;
  start_time: string;
  cover: string;
  url: string;
}

const EventCard = ({ event }: { event: Event }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-md shadow-md flex flex-col">
      <a href={event.url}>
        <Image
          src={event.cover}
          alt={event.name}
          width={300}
          height={200}
          className="rounded-md mb-2"
        />
        <h3 className="text-lg font-semibold">{event.name}</h3>
      </a>

      <p className="text-gray-600">{event.description.slice(0, 100)}...</p>
      <p className="text-gray-500 text-sm mt-2">Date: {event.start_date}</p>
      <p className="text-gray-500 text-sm">Time: {event.start_time}</p>
    </div>
  );
};

export default EventCard;