'use client';

import { IEditFormProvider } from '@/types';
import { useContext, useState, createContext } from 'react';

interface IContext extends IEditFormProvider {
  setEditForm: (key: keyof IEditFormProvider, value: IEditFormProvider[keyof IEditFormProvider]) => void;
}

export const defaultValues: IContext = {
  address: null,
  gender: 'MALE',
  phone: '',
  tutor_name: null,
  tutor_dni: null,
  tutor_phone: null,
  setEditForm: (key: keyof IEditFormProvider, value: IEditFormProvider[keyof IEditFormProvider]) => {}
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
      setEditForm: (key, value) => {
        changeValues(key, value);
      }
    }}>
      {children}
    </EditFormContext.Provider>
  )
}