"use client"

export default function ResetButton (){


  const handleResetButton = async (e: React.FormEvent) => {
    e.preventDefault();

    
  };
    return(
        <div>
            <button onClick={handleResetButton} className="mt-8 font-bold text-lg bg-purple-700 text-white px-14 py-3 rounded-3xl cursor-pointer transition-colors hover:scale-[1.02]">Reset</button>
        </div>
    )
}