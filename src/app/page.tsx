import { Suspense } from "react";

import MainScreen from "./components/MainScreen";

const getPlayerId = async (): Promise<string | undefined> => {
  try {
    // const result = await fetch("");
    return "tempPlayerId";
  } catch (err) {}
};

const Page = async () => {
  const playerId = await getPlayerId();

  console.log(playerId);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainScreen playerId={playerId} />
    </Suspense>
  );
};

export default Page;
