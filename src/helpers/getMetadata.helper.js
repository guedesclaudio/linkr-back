import urlMetadata from "url-metadata";

async function getMetadata(url) {
  try {
    const { title, image, description } = await urlMetadata(url);
    const metadata = { title, image, description };
    return metadata;
  } catch (error) {
    console.log(error);
  }
}

export { getMetadata };
