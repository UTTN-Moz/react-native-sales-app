import Text from "../Text";
import { BaseColor, useTheme } from "../../config";
import React from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function Button(props :ButtonProps) {
  const { colors } = useTheme();
  const {
    style,
    styleText,
    icon,
    outline,
    full,
    round,
    loading,
    children,
    ...rest
  } = props;

  return (
    <TouchableOpacity
      {...rest}
      style={StyleSheet.flatten([
        [styles.default, { backgroundColor: colors.primary }],
        outline && [
          styles.outline,
          {
            backgroundColor: colors.card,
            borderColor: colors.primary,
          },
        ],
        full && styles.full,
        round && styles.round,
        style,
      ])}
      activeOpacity={0.9}
    >
      {icon ? icon : null}
      <Text
        style={StyleSheet.flatten([
          styles.textDefault,
          outline && { color: colors.primary },
          styleText,
        ])}
        numberOfLines={1}
      >
        {children}
      </Text>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={outline ? colors.primary : BaseColor.whiteColor}
          style={{ paddingLeft: 5 }}
        />
      ) : null}
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  style: {},
  icon: null,
  outline: false,
  full: false,
  round: false,
  loading: false,
};

interface ButtonProps {
  style?: any;
  icon?: any;
  outline:boolean;
  full:boolean;
  round: boolean;
  loading: boolean;
  styleText:any;
  children: any;
}
