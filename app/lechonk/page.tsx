import Image from "next/image"

export default function Page()
{
  return (
    <div>
        <Image src="https://api-encuentratumascota.nijui.com/users/profile.webp" width="100" height="100" alt="Lechonk aesthetic"/>
      <h1 className="text-xl font-extrabold text-pink-300">Lechonk aesthetic</h1>
    </div>
  );
}