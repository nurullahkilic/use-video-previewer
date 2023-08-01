# Video Previewer for VOD Project

![Demo Gif](demo.gif)

The `use-video-previewer` is a custom hook designed to facilitate fast and efficient previsualization of video content in Video on Demand (VOD) projects similar to Netflix, Prime Video and Tabii. This hook provides an easy-to-use interface for fetching and displaying video previews for different video formats such as HLS, Dash, and mp4.

## Features
- Fetch and display video previews for various video formats (HLS, Dash, mp4, etc.).
- Effortless integration with React projects using custom hooks.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Available Hooks](#available-hooks)
- [License](#license)

## Installation

To use the custom React hook package in your project, you can install it via npm or yarn:

```bash
npm install use-video-previewer
```

or

```bash
yarn add use-video-previewer
```

## Usage

After installation, you can import and use the hooks in your React components:

```jsx
import React from 'react';
import { useVideoPreviewer } from "use-video-previewer";

function MyComponent() {
  const [PreviewComponent, videoElement] = useVideoPreviewer({
    isMuted: false,
    mediaUri: "https://dash.akamaized.net/dash264/TestCases/1c/qualcomm/2/MultiRate.mpd",
    debounce: 1200,
  });

  return (
    <>
      <div
        style={{
          width: "380px",
          height: "420px",
          background: "red",
          position: "relative",
          marginBottom:"20px"
        }}
      >
        {PreviewComponent}
      </div>

      <button onClick={() => videoElement?.play()}>Play</button>
      <button onClick={() => videoElement?.pause()}>Pause</button>
    </>
  );
}
```

Replace `useCustomHook` with the specific hook you want to use from the package.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this code as permitted by the license. See the [LICENSE](LICENSE) file for more details.