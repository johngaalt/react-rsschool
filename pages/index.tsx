import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-full">
      <Image src="/logo.svg" alt="star wars" className=" object-cover" />
    </div>
  );
}
