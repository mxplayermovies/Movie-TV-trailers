import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export interface BackgroundMusicHandle {
  play: (videoId: string) => void;
  stop: () => void;
}

const BackgroundMusic = forwardRef<BackgroundMusicHandle>((props, ref) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentVideoIdRef = useRef<string | null>(null);

  useImperativeHandle(ref, () => ({
    play: (videoId: string) => {
      if (!videoId) return;
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScript = document.getElementsByTagName('script')[0];
        if (firstScript?.parentNode) {
          firstScript.parentNode.insertBefore(tag, firstScript);
        }
        window.onYouTubeIframeAPIReady = () => createPlayer(videoId);
      } else {
        createPlayer(videoId);
      }
    },
    stop: () => {
      if (playerRef.current?.stopVideo) {
        playerRef.current.stopVideo();
      }
    }
  }));

  const createPlayer = (videoId: string) => {
    if (!containerRef.current) return;
    if (playerRef.current) {
      if (currentVideoIdRef.current === videoId) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.loadVideoById(videoId);
        currentVideoIdRef.current = videoId;
      }
    } else {
      playerRef.current = new window.YT.Player(containerRef.current, {
        height: '0',
        width: '0',
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          loop: 0,
        },
        events: {
          onReady: (event: any) => event.target.playVideo(),
          onError: (e: any) => console.error('Background music error', e),
        },
      });
      currentVideoIdRef.current = videoId;
    }
  };

  return <div ref={containerRef} style={{ display: 'none' }} />;
});

BackgroundMusic.displayName = 'BackgroundMusic';

export default BackgroundMusic;