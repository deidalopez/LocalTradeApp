import React from "react";
import { View, Text } from 'react-native';

const ErrorMessage = ({ errorMessage }) => {
  return (
    <View>
      <Text
        className="font__bold font__p p__size"
        style={{
          color: "#fb2f2f",
          textAlign: "center",
        }}
      >
        {errorMessage}
      </Text>
    </View>
  );
};

export default ErrorMessage;