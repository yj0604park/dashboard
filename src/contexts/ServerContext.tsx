import { FC, useState, createContext } from 'react';
type ServerContext = {
  serverUrl: string;
  setServerUrl: (serverUrl: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ServerContext = createContext<ServerContext>({} as ServerContext);

export const ServerUrlProvider: FC = ({ children }) => {
  const [serverUrl, setServerUrl] = useState(
    'http://192.168.50.13:58000/money/'
  );

  return (
    <ServerContext.Provider value={{ serverUrl, setServerUrl }}>
      {children}
    </ServerContext.Provider>
  );
};
