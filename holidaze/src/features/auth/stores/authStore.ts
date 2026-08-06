import { User } from "../types/auth.types";

interface UserStore {
  name: string;
  email: string;
  venueManager: boolean;
  bio?: string;
  avatar?: {
    url: string;
    alt?: string;
  };
  banner?: {
    url: string;
    alt?: string;
  };
  accessToken: string;
}
 const useUserStore = create<UserStore>()(
    persist(
        logout()

        name:"user-storage",
        storage: createJSONStorage(()=> localStorage)
    )
 )