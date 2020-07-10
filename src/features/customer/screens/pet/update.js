import React from 'react';
import {Text, View} from 'react-native';

const UpdateScreen = ({navigation, ...props}) => {
  const id = navigation.state.params.id || null;

  const [pet, setPet] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    PetService.get(id)
      .then((response) => {
        setPet(response.data);
      })
      .catch((e) => {
        console.log(e.response.data);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <View>
      <Text>Update PET</Text>
    </View>
  );
};

export default UpdateScreen;
