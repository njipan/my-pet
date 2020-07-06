import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Animal} from '@constant';
import {Colors, Mixins} from '@style';
import {
  Heading,
  TextInput,
  BoxButton,
  Icons,
  ButtonFluid,
  Dropdown,
} from '@component';

const PetFormFirst = ({
  type = 0,
  name,
  race,
  gender,
  weight,
  errorMessages = {},
  onTypePress = () => {},
  onNameChange = () => {},
  onRaceChange = () => {},
  onGenderChange = () => {},
  onWeightChange = () => {},
  ...props
}) => {
  return (
    <View style={{flex: 1}}>
      <Heading
        type="h4"
        text="Pilih Jenis Peliharaan"
        color={Colors.REGULAR}
        styleText={{fontFamily: 'sans-serif-light', marginBottom: 10}}
      />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'nowrap',
          marginBottom: 6,
        }}>
        <View style={{flex: 1, marginRight: 10}}>
          <BoxButton
            text="Kucing"
            color={null}
            styleRoot={{
              ...Mixins.padding(16, 0, 16, 0),
            }}
            icon={<Icons.CatIcon focus={type === Animal.CAT} />}
            focus={type == Animal.CAT}
            onPress={() => {
              onTypePress(Animal.CAT);
            }}
          />
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
          <BoxButton
            text="Anjing"
            color={null}
            styleRoot={{
              ...Mixins.padding(16, 0, 16, 0),
            }}
            icon={<Icons.DogIcon focus={type === Animal.DOG} />}
            focus={type == Animal.DOG}
            onPress={() => {
              onTypePress(Animal.DOG);
            }}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <TextInput
          label="Nama Hewan Peliharaan"
          onChangeText={onNameChange}
          error={errorMessages.name || false}
        />
        <TextInput
          label="Ras (Optional)"
          onChangeText={onRaceChange}
          error={errorMessages.race || false}
        />
        <Dropdown label="Jenis Kelamin" />
        <TextInput
          label="Berat Badan (Optional)"
          onChangeText={onWeightChange}
          error={errorMessages.weight || false}
        />
      </View>
    </View>
  );
};

const PetFormSecond = ({
  picture,
  birthDate,
  age,
  petType,
  bodyColor,
  eyeColor,
  microschipId,
  onPictureChange = () => {},
  onBirthDateChange = () => {},
  onAgeChange = () => {},
  onPetTypeChange = () => {},
  onBodyColorChange = () => {},
  onEyeColorChange = () => {},
  onMicroschipIdChange = () => {},
  errorMessages = {},
  ...props
}) => {
  return (
    <View style={{flex: 1}}>
      <Heading
        type="h4"
        text="Tambah Foto"
        color={Colors.REGULAR}
        styleText={{fontFamily: 'sans-serif-light', marginBottom: 10}}
      />
      <View
        style={{
          flex: 1,
        }}>
        <TextInput
          label="Tanggal Lahir"
          onChangeText={onBirthDateChange}
          error={errorMessages.birthDate || false}
        />
        <TextInput
          label="Usia"
          onChangeText={onAgeChange}
          error={errorMessages.age || false}
        />
        <TextInput
          label="Jenis Peliharaan"
          onChangeText={onPetTypeChange}
          error={errorMessages.petType || false}
        />
        <TextInput
          label="Warna Badan"
          onChangeText={onBodyColorChange}
          error={errorMessages.bodyColor || false}
        />
        <Dropdown
          label="Warna Mata"
          placeholder={{label: 'Warna Mata', value: null}}
          error={errorMessages.eyeColor || false}
          onValueChange={onEyeColorChange}
        />
        <TextInput
          label="Microschip ID"
          onChangeText={onMicroschipIdChange}
          error={errorMessages.microschipId || false}
        />
      </View>
    </View>
  );
};

const PetForm = ({name, ...props}) => {
  const [indexForm, setIndexForm] = React.useState(1);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.formWrapper}>
        {indexForm % 2 == 1 && <PetFormFirst {...props} />}
        {indexForm % 2 == 0 && <PetFormSecond {...props} />}
        <View style={{width: '100%', height: 28}} />
      </ScrollView>
      <View style={styles.navigator}>
        <Heading type="h5" text={`${indexForm} of 2`} color={Colors.REGULAR} />
        <View
          style={{
            position: 'absolute',
            top: 12,
            right: 20,
          }}>
          {indexForm != 2 && (
            <ButtonFluid
              text="Lanjut"
              onPress={() => setIndexForm(indexForm + 1)}
            />
          )}
          {indexForm == 2 && (
            <ButtonFluid text="Simpan" onPress={() => alert('SAVING')} />
          )}
        </View>
        <View
          style={{
            position: 'absolute',
            top: 12,
            left: 20,
          }}>
          {indexForm % 2 == 0 && (
            <ButtonFluid
              text="Kembali"
              backgroundColor="transparent"
              textColor={Colors.PRIMARY}
              styleText={{fontFamily: 'sans-serif-medium'}}
              onPress={() => setIndexForm(indexForm - 1)}
              underlayColor="#ffffff00"
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  formWrapper: {
    flex: 1,
    width: '100%',
    ...Mixins.padding(16),
  },
  navigator: {
    height: 78,
    backgroundColor: Colors.WHITE,
    width: '100%',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {PetFormFirst, PetFormSecond};
export default PetForm;
