import React from 'react';
import {Text, View} from 'react-native';
import {PetService} from '@service';

const EditScreen = ({navigation, ...props}) => {
  const id = navigation.state.params.id || null;

  const [pet, setPet] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const getPet = async () => {
    try {
      setLoading(true);
      const response = PetService.get(id);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    getPet();
  }, []);
  return (
    <View>
      <Text>Update PET</Text>
    </View>
  );
};

export default EditScreen;
