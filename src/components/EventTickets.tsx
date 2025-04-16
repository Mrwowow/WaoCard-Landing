import Image from "next/image";
const EventTickets = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-3xl font-bold text-center">
          Now your phone is your ticket to the{" "}
          <span className="text-red-500 font-bold">theme park</span>
        </h2>
        <p className="text-center">
          Carry everything you need to see a show or cheer on your favorite team.
          WaoCard Wallet will even surface your ticket on the day of the event, so
          you won&apos;t miss the opening act or first quarter.
        </p>
        <Image src="/images/phone-mockup.png" alt="Phone mockup with event ticket" width={300} height={500} />
      </div>
    </>
  );
};
export default EventTickets;