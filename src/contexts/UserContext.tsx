import { FC, useState, createContext } from 'react';
type UserContext = {
  userName: string;
  setUserName: (userName: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UserContext = createContext<UserContext>({} as UserContext);

export const UserProvider: FC = ({ children }) => {
  const [userName, setUserName] = useState('Yoonjae Park');

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};
