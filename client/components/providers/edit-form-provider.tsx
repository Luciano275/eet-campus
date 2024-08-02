'use client';

import { EditUserActionType, IEditFormProvider } from '@/types';
import { useContext, useState, createContext } from 'react';

interface IContext extends IEditFormProvider {
  setEditForm: (key: keyof IEditFormProvider, value: IEditFormProvider[keyof IEditFormProvider]) => void;
  action: EditUserActionType
  setAction: (action: EditUserActionType) => void;
}

export const defaultValues: IContext = {
  address: null,
  gender: 'MALE',
  phone: '',
  tutor_name: null,
  tutor_dni: null,
  tutor_phone: null,
  birthday: null,
  action: {
    message: null,
    errors: {},
    success: null
  },
  setEditForm: (key: keyof IEditFormProvider, value: IEditFormProvider[keyof IEditFormProvider]) => {},
  setAction: (action: EditUserActionType) => {}
}

const EditFormContext = createContext<IContext>(defaultValues)

export const useEditFormProvider = () => useContext(EditFormContext);

export const EditFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<IContext['address']>(defaultValues.address);
  const [gender, setGender] = useState<IContext['gender']>(defaultValues.gender);
  const [phone, setPhone] = useState<IContext['phone']>(defaultValues.phone);
  const [tutor_name, setTutorName] = useState<IContext['tutor_name']>(defaultValues.tutor_name);
  const [tutor_dni, setTutorDni] = useState<IContext['tutor_dni']>(defaultValues.tutor_dni);
  const [tutor_phone, setTutorPhone] = useState<IContext['tutor_phone']>(defaultValues.tutor_phone);
  const [birthday, setBirthday] = useState<IContext['birthday']>(defaultValues.birthday);

  const [action, setAction] = useState<IContext['action']>(defaultValues.action);

  const changeValues = (key: keyof IEditFormProvider, value: IEditFormProvider[keyof IEditFormProvider]) => {
    switch (key) {
      case 'address':
        setAddress(value as string);
        break;

      case 'gender':
        setGender(value as IEditFormProvider['gender']);
        break;
      case 'phone':
        setPhone(value as string);
        break;
      case 'tutor_name':
        setTutorName(value as string);
        break;
      case 'tutor_dni':
        setTutorDni(value as IEditFormProvider['tutor_dni']);
        break;
      case 'tutor_phone':
        setTutorPhone(value as IEditFormProvider['tutor_phone']);
        break;

      case 'birthday':
        setBirthday(value as IEditFormProvider['birthday']);
        break;
    }
  }

  return (
    <EditFormContext.Provider value={{
      address,
      gender,
      phone,
      tutor_name,
      tutor_dni,
      tutor_phone,
      action,
      birthday,
      setEditForm: (key, value) => {
        changeValues(key, value);
      },
      setAction: (action) => {
        setAction(action);
      }
    }}>
      {children}
    </EditFormContext.Provider>
  )
}