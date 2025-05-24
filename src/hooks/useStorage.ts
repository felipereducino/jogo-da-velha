import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStorage = () => {
  const saveScore = async (score: object) => {
    await AsyncStorage.setItem("score", JSON.stringify(score));
  };
  const loadScore = async () => {
    const str = await AsyncStorage.getItem("score");
    return str ? JSON.parse(str) : { wins: 0, losses: 0 };
  };
  return { saveScore, loadScore };
};
