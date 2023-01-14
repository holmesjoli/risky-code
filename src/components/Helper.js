export function importImages() {

    // Modified from https://gist.github.com/shaquille-galimba/64f462f0b119945630427f9bedeceba7
    function importAll(r) {
      let images = {};
      r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
      return images
    }
  
    const images = importAll(require.context('../assets/images/laundry/svg', false, /\.(png|jpe?g|svg)$/));
  
    return images;
}

