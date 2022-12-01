import { Button, Box } from '@chakra-ui/react';
import { useEffect, useMemo, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

function getImages(pageParam = null): Promise<any> {
  return api.get('/api/images', {
    params: {
      after: pageParam,
    },
  });
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    ({ pageParam }) => getImages(pageParam),
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: lastPage => lastPage.data.after ?? null,
    }
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    return data?.pages.map(v => v.data.data).flat();
  }, [data]);

  // INFINITE SCROLL
  const loaderRef = useRef(null);

  // handle what happens when user scrolls to Load More button
  const handleObserver = (entities: IntersectionObserverEntry[]): void => {
    const target = entities[0];

    if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    // initialize IntersectionObserver and attaching to Load More button
    const observer = new IntersectionObserver(handleObserver, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
  });

  // TODO RENDER LOADING SCREEN
  if (isLoading) {
    return <Loading />;
  }

  // TODO RENDER ERROR SCREEN
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
        {hasNextPage && (
          <Button mt={12} ref={loaderRef}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>

          // using just the button, without infinite scroll
          // <Button mt={12} onClick={() => fetchNextPage()}>
          //   {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          // </Button>
        )}
      </Box>
    </>
  );
}
