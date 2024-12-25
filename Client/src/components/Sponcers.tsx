import ReviewCard from "./ReviewCard"


export const Sponcers: React.FC = () =>  {
  return (
    <section className="bg-gray-900">

<div className="max-w-7xl mx-auto flex flex-col justify-around ">
<p className="w-full m-4 text-center text-base font-semibold uppercase text-gray-500 tracking-wider">Our Hotel room brands</p>
<div className="flex overflow-hidden w-full group ">
    <div  className="flex space-x-16  animate-loop-scroll items-center my-4 group-hover:paused">
    <img className="h-[150px] w-[150px]" src="marriott.png" alt="hotel " ></img>
    <img  className="h-[150px] w-[150px]" src="hyaat.png" alt="hotel " ></img>
    <img  className="h-[80px] w-[100px]" src="oyo.png" alt="hotel " ></img>
    <img  className="h-[150px] w-[150px]" src="savana.png" alt="hotel " ></img>
    <img  className="h-[150px] w-[150px]" src="sheraton.png" alt="hotel " ></img>
    <img  className="h-[150px] w-[150px]" src="wyamdam.png" alt="hotel " ></img>
    <img aria-hidden = "true" className="h-[150px] w-[150px]" src="marriott.png" alt="hotel " ></img>
    <img aria-hidden = "true"  className="h-[150px] w-[150px]" src="hyaat.png" alt="hotel " ></img>
    <img aria-hidden = "true"  className="h-[80px] w-[100px]" src="oyo.png" alt="hotel " ></img>
    <img  aria-hidden = "true" className="h-[150px] w-[150px]" src="savana.png" alt="hotel " ></img>
    <img aria-hidden = "true"  className="h-[150px] w-[150px]" src="sheraton.png" alt="hotel " ></img>
    <img aria-hidden = "true" className="h-[150px] w-[150px]" src="wyamdam.png" alt="hotel " ></img>
    
    </div>
    
    

</div>
</div>
 
 {/*  --------------------reviews section ------- */}
    <div className="text-center mt-20 ">
      <div className="flex flex-col space-y-1 ">
      <p className="text-2xl md:text-5xl font-medium text-white font-title-font uppercase">They Trusted us</p>
      <p className="text-white text-xl p-2"> We are happy because <span className="text-4xl font-bold text-white">,</span>  We have happy customers </p>
      </div >
      <div className="grid grid-cols-12 mt-5">
     
      <ReviewCard name="Alice Miz" description="I found a great deal on a luxury hotel within minutes! The photos and reviews were super helpful. I'll definitely use this platform again for my future trips." url="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png" address="Chicago , US" />
  
      
      <ReviewCard name="Tony Stark" description="What an amazing experience! I loved how the system suggested hotels based on my preferences. The chat support was also very responsive" url="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" address="Amersterdam"/>
      
     
      <ReviewCard name="Khushal Jha" description="Overall, a good experience. Found a hotel I loved, but the loading time could be improved. Would still recommend it to friends." url="https://plus.unsplash.com/premium_photo-1691030254390-aa56b22e6a45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aW5kaWFuJTIwbWFufGVufDB8fDB8fHww" address="India , Kolkata"/>
     
     

      </div>
    </div>

</section>

  )
}


