import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import styled from "styled-components/native";

// styled TouchableOpacity for each cell
const StyledCell = styled(TouchableOpacity)`
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  align-items: center;
  justify-content: center;
`;

// static mapping of values to image requires
const icons: Record<"X" | "O", any> = {
  X: require("../assets/X.png"),
  O: require("../assets/O.png"),
};

export const Cell: React.FC<{
  value: "X" | "O" | null;
  onPress: () => void;
}> = ({ value, onPress }) => (
  <StyledCell onPress={onPress}>
    {value && (
      <Image source={icons[value]} style={styles.icon} resizeMode="contain" />
    )}
  </StyledCell>
);

const styles = StyleSheet.create({
  icon: {
    width: 64,
    height: 64,
  },
});
