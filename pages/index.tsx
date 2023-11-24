import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-full">
      <Image
        src="/logo.svg"
        width={500}
        height={500}
        alt="star wars"
        className=" object-cover"
      />
    </div>
  );
}
