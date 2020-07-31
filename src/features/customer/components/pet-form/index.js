import React from 'react';
import {View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {Animal} from '@constant';
import {Colors, Mixins} from '@style';
import {
  Heading,
  TextInput,
  BoxButton,
  Icons,
  ButtonFluid,
  Dropdown,
  PicturePicker,
} from '@component';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Sex} from '@constant';

const PetFormFirst = ({
  type = 0,
  name,
  breed,
  sex,
  weight,
  errorMessages = {},
  onTypeChange = () => {},
  onNameChange = () => {},
  onBreedChange = () => {},
  onSexChange = () => {},
  onWeightChange = () => {},
  ...props
}) => {
  const sexs = [
    {label: 'Pilih salah satu', value: ''},
    {label: Sex.translate(Sex.MALE), value: Sex.MALE},
    {label: Sex.translate(Sex.FEMALE), value: Sex.FEMALE},
  ];
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
              onTypeChange(Animal.CAT);
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
              onTypeChange(Animal.DOG);
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
          value={name || ''}
        />
        <TextInput
          label="Ras (Optional)"
          onChangeText={onBreedChange}
          error={errorMessages.breed || false}
          value={breed || ''}
        />
        <Dropdown
          label="Jenis Kelamin"
          data={sexs}
          value={sex}
          onValueChange={onSexChange}
          error={errorMessages.sex}
        />
        <TextInput
          keyboardType="numeric"
          label="Berat Badan (Optional)"
          onChangeText={onWeightChange}
          error={errorMessages.weight || false}
          value={`${weight || ''}` || ''}
        />
      </View>
    </View>
  );
};

const PetFormSecond = ({
  picture,
  dateOfBirth,
  age,
  petType,
  bodyColor,
  eyeColor,
  microschipId,
  onPictureChange = () => {},
  onDateOfBirthChange = () => {},
  onAgeChange = () => {},
  onPetTypeChange = () => {},
  onBodyColorChange = () => {},
  onEyeColorChange = () => {},
  onMicroschipIdChange = () => {},
  errorMessages = {},
  ...props
}) => {
  const [showDayOfBirth, setShowDayOfBirth] = React.useState(false);
  const eyes = [
    {label: 'Merah', value: 'red'},
    {label: 'Green', value: 'green'},
    {label: 'Biru', value: 'blue'},
  ];

  return (
    <View style={{flex: 1}}>
      <Heading
        type="h4"
        text="Tambah Foto"
        color={Colors.REGULAR}
        styleText={{fontFamily: 'sans-serif-light', marginBottom: 10}}
      />
      {showDayOfBirth && (
        <DateTimePicker
          testID="dateTimePicker"
          mode="date"
          value={new Date()}
          is24Hour={true}
          display="default"
          onChange={(e) => {
            setShowDayOfBirth(false);
            onDateOfBirthChange(e.nativeEvent.timestamp || null);
          }}
        />
      )}
      <PicturePicker
        title="Tambah Foto"
        description="(Maks 5MB)"
        onChange={onPictureChange}
        value={picture}
        loading={props.isPictureUploading}
      />
      <View
        style={{
          flex: 1,
        }}>
        <TouchableOpacity
          underlayColor="transparent"
          onPress={() => setShowDayOfBirth(true)}>
          <TextInput
            label="Tanggal Lahir"
            error={errorMessages.dateOfBirth || false}
            value={dateOfBirth}
            editable={false}
            changeBorder={false}
          />
        </TouchableOpacity>
        <TextInput label="Usia" editable={false} value={age} />
        <TextInput
          label="Warna Badan"
          onChangeText={onBodyColorChange}
          error={errorMessages.bodyColor || false}
          value={bodyColor}
        />
        <TextInput
          label="Warna Mata"
          onChangeText={onEyeColorChange}
          error={errorMessages.eyeColor || false}
          value={eyeColor}
        />

        <TextInput
          label="Microschip ID"
          onChangeText={onMicroschipIdChange}
          error={errorMessages.microschipId || false}
          value={microschipId}
        />
      </View>
    </View>
  );
};

const PetForm = ({
  data = {},
  step = 1,
  onNext = () => {},
  onPrevious = () => {},
  errorMessages = {},
  onSubmit = () => {},
  ...props
}) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.formWrapper}>
        {step % 2 == 1 && (
          <PetFormFirst {...props} errorMessages={errorMessages} {...data} />
        )}
        {step % 2 == 0 && (
          <PetFormSecond {...props} errorMessages={errorMessages} {...data} />
        )}
        <View style={{width: '100%', height: 28}} />
      </ScrollView>
      <View style={styles.navigator}>
        <Heading type="h5" text={`${step} of 2`} color={Colors.REGULAR} />
        <View
          style={{
            position: 'absolute',
            top: 12,
            right: 20,
          }}>
          {step != 2 && <ButtonFluid text="Lanjut" onPress={() => onNext()} />}
          {step == 2 && (
            <ButtonFluid text="Simpan" onPress={() => onSubmit()} />
          )}
        </View>
        <View
          style={{
            position: 'absolute',
            top: 12,
            left: 20,
          }}>
          {step % 2 == 0 && (
            <ButtonFluid
              text="Kembali"
              backgroundColor="transparent"
              textColor={Colors.PRIMARY}
              styleText={{fontFamily: 'sans-serif-medium'}}
              onPress={() => onPrevious()}
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
