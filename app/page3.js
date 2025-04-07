import React from 'react';
import { View, StyleSheet, Platform, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

const VideoComponent = () => {
  if (Platform.OS === 'web') {
    return (
      <video
        src={require('../assets/videos/sharkeyevideo.mov')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        autoPlay
        muted
        playsInline
        controls
      />
    );
  }

  return (
    <WebView
      source={{ uri: require('../assets/videos/sharkeyevideo.mov') }}
      style={styles.video}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowsFullscreenVideo={true}
      mediaPlaybackRequiresUserAction={false}
      androidHardwareAccelerationDisabled={false}
      automaticallyAdjustContentInsets={true}
    />
  );
};

export default function Page3() {
  const title = " ";
  const description = (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.mainContent}>
        <View style={styles.contentRow}>
          {/* Left side container for Shark and Speech Bubble */}
          <View style={styles.leftContainer}>
            {/* Speech bubble positioned above the shark */}
            <View style={styles.speechBubbleContainer}>
              <Image
                source={require('../assets/images/page3bubble.png')}
                style={styles.speechBubbleImage}
                resizeMode="contain"
              />
            </View>
            {/* Shark below the speech bubble */}
            <View style={styles.sharkContainer}>
              <DumbShark />
            </View>
          </View>

          {/* Right side container for video */}
          <View style={styles.rightContainer}>
            <View style={styles.videoContainer}>
              <VideoComponent />
            </View>
          </View>
        </View>
      </View>

      {/* Footer with navigation buttons */}
      <View style={styles.footerContainer}>
        <Link href="/overview" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page4" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={3} title={title} description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  speechText: {
    fontSize: 70,
    fontWeight: 'bold',
    marginVertical: 4,
    textAlign: 'center',
    lineHeight: 70,
    color: 'black',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 10,
    position: 'relative',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 50,
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: 0,
    left: 350,
    zIndex: 2,
    width: 400,
  },
  speechBubbleImage: {
    width: '100%',
    height: 400,
  },
  sharkContainer: {
    marginTop: 200,
    zIndex: 1,
    marginLeft: -250,
    transform: [{ scale: 1.5 }],
  },
  videoContainer: {
    width: 600,
    height: 500,
    backgroundColor: '#E6EBEA',
    borderRadius: 30,
    overflow: 'hidden',
  },
  video: {
    flex: 1,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});