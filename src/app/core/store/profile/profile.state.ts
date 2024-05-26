import { IProfile } from "../../models/profile/profile.model";

export interface ProfileState {
  profile: IProfile,
  error: string,
  isLoading: boolean;
}

export const inititalProfileState: ProfileState = {
  profile: {
    _id: '',
    email: '',
    full_name: '',
    gender: true,
    avatar: '',
    address: ''
  },
  error: '',
  isLoading: false
};
