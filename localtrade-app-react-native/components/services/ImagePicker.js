import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';


// BOILERPLATE, havent tested out yet

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      // setImage(result.uri);
      if (!result.cancelled) {
        const imagePath = result.uri;
        const imageExt = result.uri.split('.').pop();
        const imageMime = `image/${imageExt}`;
        let picture = await fetch(imagePath);
        picture = await picture.blob();
        const imageData = new File([picture], `photo.${imageExt}`);
        await fetch(MY_SIGNED_URL, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': imageMime
          },
        });
      }
    }
  };


  //how could we save this image to the S3 database? 


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

//this is the format returned
// {
// "cancelled": false,
//   "height": 1611,
//     "width": 2148,
//       "uri": "file:///data/user/0/host.exp.exponent/cache/cropped1814158652.jpg"
// }


// import { ImagePicker } from 'expo';
// import mime from 'mime-types';
// import { Storage } from 'aws-amplify';


// const imageName = image.uri.replace(/^.*[\\\/]/, '');
// const fileType = mime.lookup(image.uri);
// const access = { level: "public", contentType: fileType, };
// fetch(image.uri).then(response => {
//   response.blob()
//     .then(blob => {
//       Storage.put(`${username}/${imageName}`, blob, access)
//         .then(succ => console.log(succ))
//         .catch(err => console.log(err));
//     });
// });