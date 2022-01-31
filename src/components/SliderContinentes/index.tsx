import Link from "next/link";
import { Box } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Slide } from "./Slide";

export function SliderContinentes() {
  return (
    <Box w="100%" maxW={960} h="100%" mx="auto" pb={8}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide>
          <Link href="/europe">
            <a>
              <Slide
                image="europe.jpg"
                title="Europa"
                subtitle="O continente mais antigo"
              />
            </a>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/northAmerica">
            <a>
              <Slide
                image="north-america.jpg"
                title="América do Norte"
                subtitle="A terra do tio Sam"
              />
            </a>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/southAmerica">
            <a>
              <Slide
                image="south-america.jpg"
                title="América do Sul"
                subtitle="O paríso tropical"
              />
            </a>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/africa">
            <a>
              <Slide
                image="africa.jpg"
                title="África"
                subtitle="A imensa diversidade de fauna e flora"
              />
            </a>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/asia">
            <a>
              <Slide
                image="asia.jpg"
                title="Ásia"
                subtitle="O continente mais populoso do mundo"
              />
            </a>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/oceania">
            <a>
              <Slide
                image="oceania.jpg"
                title="Ocenania"
                subtitle="O continente rodeado pelo mar"
              />
            </a>
          </Link>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}
