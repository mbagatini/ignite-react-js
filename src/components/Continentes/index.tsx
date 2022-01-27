import { Box } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import swiper, { Navigation, Pagination, Scrollbar } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Slide } from "./Slide";

export function Continentes() {
  return (
    <Box maxW={960} h="100%" mx="auto" pb={8}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <Slide
            image="europe.jpg"
            title="Europa"
            subtitle="O continente mais antigo"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image="north-america.jpg"
            title="América do Norte"
            subtitle="A terra do tio Sam"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image="south-america.jpg"
            title="América do Sul"
            subtitle="O paríso tropical"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image="africa.jpg"
            title="África"
            subtitle="A imensa diversidade de fauna e flora"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image="asia.jpg"
            title="Ásia"
            subtitle="O continente mais populoso do mundo"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image="oceania.jpg"
            title="Ocenania"
            subtitle="O continente rodeado pelo mar"
          />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}
