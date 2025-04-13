// import Link from 'next/link'
// import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Carousel, {type CarouselItem} from "./components/Carousel"
async function getCarouseItems(): Promise<CarouselItem[]>{
  return []
}
export default async function Home() {
  const carouselItems: CarouselItem[] = await getCarouseItems()
  return (
    <>
      <div className='min-h-screen bg-[#1F3B5B] text-white'>
        <main className='container mx-auto px-4 py-8'>
          <HeroSection/>
          <div className='mt-16'>
            <h2 className='text-2xl text-[#EACA91] font-semibold text-center mb-2'>Here Something That</h2>
            <h3 className='text-xl font-medium text-center mb-8'>Already Made</h3>
            <Carousel items={carouselItems}/>
         
          </div>
        </main>

        
      </div>
      
    </>
  );
}
