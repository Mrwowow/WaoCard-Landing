import EventCard from "@/components/EventCard";
import { getEvents, Event, getAccessToken } from "@/utils/api";

export default function EventsPage({ events }: { events: Event[] }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Explore our events</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const tokenResponse = await getAccessToken()
  const accessToken = tokenResponse.access_token;
  const apiResponse = await getEvents(accessToken);
  const events = apiResponse.map((event) => ({
    id: event.id,
    name: event.name,
    description: event.description,
    start_date: event.start_date,
    start_time: event.start_time,
    cover: event.cover,
    url: event.url,
  }));
  return { props: { events }, revalidate: 10 };
};
