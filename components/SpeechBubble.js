import * as React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

const SpeechBubble = ({ width = 800, height = 800, scale = 1, children, ...props }) => {
  // Calculate dimensions based on scale
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  
  return (
    <View style={{ width: scaledWidth, height: scaledHeight }}>
      <Svg
        width={scaledWidth}
        height={scaledHeight}
        fill="#000"
        viewBox="0 0 71.015 71.015"
        {...props}
      >
        <Path d="m13.223 67.768.022-15.913L0 51.729V3.247h71.015v48.5H36.446zM4 47.766l13.25.125-.016 12.251 17.967-12.395h31.814v-40.5H4z" />
      </Svg>
      {children && (
        <View 
          style={{
            position: "absolute",
            top: "12%",
            left: "10%", 
            width: "80%",
            height: "60%",
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            padding: 5 * scale
          }}
        >
          {children}
        </View>
      )}
    </View>
  );
};

export default SpeechBubble;