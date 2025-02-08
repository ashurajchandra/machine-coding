import ImageCarousel from '../modules/imageCarousel'
const images = [
    {
      id:1,
      src: 'https://picsum.photos/id/600/600/400',
      alt: 'Forest',
    },
    {
        id:2,
      src: 'https://picsum.photos/id/100/600/400',
      alt: 'Beach',
    },
    {
        id:3,
      src: 'https://picsum.photos/id/200/600/400',
      alt: 'Yak',
    },
    {
        id:4,
      src: 'https://picsum.photos/id/300/600/400',
      alt: 'Hay',
    },
    {
      id:5,
      src: 'https://picsum.photos/id/400/600/400',
      alt: 'Plants',
    },
    {
      id:6,
      src: 'https://picsum.photos/id/500/600/400',
      alt: 'Building',
    },
  ];
const MyImages = () =>{

    return(
        <ImageCarousel images={images}/>
    )
}

export default MyImages;