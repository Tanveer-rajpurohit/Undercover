'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { useState, useEffect } from 'react'

const GameGuide = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setShowContent(false);
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, [activeIndex])

  const guides = [
    {
      title: "Welcome!",
      content: "Undercover is a group game you can play online or offline, with friends or with strangers!",
      image: "https://images.squarespace-cdn.com/content/v1/6166cfc7f0f9c96fd146e6ca/1634419620624-PF3PO8HXZYXV9N2J36ST/undercover+party+game+meet+friends"
    },
    {
      title: "Civilians",
      content: "They all receive the same secret word. Their Goal is to unmask the Undercover & Mr. White.",
      image: "https://images.squarespace-cdn.com/content/v1/6166cfc7f0f9c96fd146e6ca/1634503933306-I4KDTGU2VDXKD9GK2QR1/undercover+game+civilians+role"
    },
    {
      title: "Undercover",
      content: "They receive a word slightly different from the Civilians. Their goal is to pretend to be a Civilian!",
      image: "https://images.squarespace-cdn.com/content/v1/6166cfc7f0f9c96fd146e6ca/1634503987177-FNP01OKKAEETWEU0VXU0/underover+role"
    },
    {
        title: "Mr. White",
     content: "They don't receive any word. Their goal is to act as if they had one, while trying to guess the Civilians word",
      image: "https://images.squarespace-cdn.com/content/v1/6166cfc7f0f9c96fd146e6ca/1634504010959-6RGC6MCE6AQ1Y7DLBVN3/undercover+game+mrwhite"
    }
  ]

  return (
    <div className="w-full h-full flex flex-col">
      <Swiper
        modules={[Pagination, EffectFade]}
        pagination={{ clickable: true }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        className="w-full h-full"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {guides.map((guide, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full flex flex-col">
              <div className="w-full h-[60%] py-6 px-8">
                <div className="w-full p-6">
                  <div className="w-full aspect-[4/3] scale-110 bg-white overflow-hidden shadow-lg">
                    <img
                      src={guide.image}
                      alt={guide.title}
                      width={600}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-[#3195e6b3] backdrop-blur-2xl w-full h-[40%] text-white py-6 px-8">
                <div className={`transition-opacity duration-500 ease-in-out ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                  <h2 className="text-xl font-semibold">{guide.title}</h2>
                  <p className="mt-6">{guide.content}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default GameGuide

