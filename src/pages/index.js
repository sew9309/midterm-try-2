'use-client'

const kanye_rest = `https://api.kanye.rest`;
const cat_api = `https://api.thecatapi.com/v1/images/search?`;
const api_key = `live_iek7IsMuSRB81vuE60RZE8o8rLOQI6ahePq8uAOUwOBoj9CIVeZJj1FPMSFcQ2Cd`

export async function getStaticProps() {

  // Get first API query
  const random_quote = await fetch(kanye_rest);
  const quotes = await random_quote.json();
  const quotesString = quotes.quote;
  
  const random_image = await fetch(cat_api, {
    headers: {
      'x-api-key': api_key,
    }
  });
  
  const images = await random_image.json();
  const imageUrls = images[0].url;
  
  // Pass the responses down as props
  return {
    props: {
      quotesString,
      imageUrls,
      images
    },
  };
}

// async function getRandomImage() {
//   const image = await cat_api.images.getRandomImage({
//     hasBreeds: true,
//   });
//   return image;
// }

export default function Home ({ quotesString, imageUrls, images, image }) {
  // console.log(quotes)
  // console.log(quotesString);
  // console.log(imageUrls);
  console.log(images);


  return (
    <main>
    <h1>Kats & Kanye</h1>
    { quotesString }
    <img id="kitty" src={imageUrls}></img>
    {image}
    </main>
  )

    if (!quotesString, imageUrls) return null;

    return (
        <main>
            <h1>Please work (this is null)</h1>
        </main>
    );
}
