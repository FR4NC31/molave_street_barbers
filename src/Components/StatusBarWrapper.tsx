import React from 'react';
import { StatusBar, StatusBarProps, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface StatusBarWrapperProps extends ViewProps {
  /**
   * Status bar style (default: 'dark-content')
   */
  barStyle?: StatusBarProps['barStyle'];
  /**
   * Background color for the status bar area (default: 'transparent')
   */
  backgroundColor?: string;
  /**
   * Whether to use SafeAreaView (default: true)
   */
  safeArea?: boolean;
  /**
   * Additional status bar props
   */
  statusBarProps?: Omit<StatusBarProps, 'barStyle' | 'backgroundColor'>;
}

/**
 * A wrapper component that provides consistent status bar handling
 * and safe area insets for all screens in the application.
 */
const StatusBarWrapper: React.FC<StatusBarWrapperProps> = ({
  barStyle = 'dark-content',
  backgroundColor = 'transparent',
  safeArea = true,
  statusBarProps,
  children,
  style,
  ...viewProps
}) => {
  const Container = safeArea ? SafeAreaView : View;

  return (
    <>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={backgroundColor}
        translucent={true}
        {...statusBarProps}
      />
      <Container
        style={[
          { flex: 1, backgroundColor },
          style,
        ]}
        {...viewProps}
      >
        {children}
      </Container>
    </>
  );
};

export default StatusBarWrapper;
