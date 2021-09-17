import React from "react";
import { StyleSheet, Image,ImageResizeMode,ImageSourcePropType } from "react-native";

export default function Index(props:ImageProps) {
  const { source,style, resizeMode, ...rest } = props;
  return (
    <Image
      source={source}
      style={StyleSheet.flatten([style && style])}      
      resizeMode={resizeMode}
      resizeMethod="resize"
      {...rest}
    />
  );
}


Index.defaultProps = {
  style: {},
  resizeMode: "cover",
};

interface ImageProps{
  style?: any;
  resizeMode?: ImageResizeMode;
  source: ImageSourcePropType;
}
