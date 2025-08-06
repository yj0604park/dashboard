import { FC, useState, createContext } from 'react';
type ServerContext = {
  serverUrl: string;
  setServerUrl: (serverUrl: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ServerContext = createContext<ServerContext>({} as ServerContext);

export const ServerUrlProvider: FC = ({ children }) => {
  const [serverUrl, setServerUrl] = useState(
    `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:58000'}${process.env.REACT_APP_REST_ENDPOINT || '/money/'}`
  );

  return (
    <ServerContext.Provider value={{ serverUrl, setServerUrl }}>
      {children}
    </ServerContext.Provider>
  );
};
