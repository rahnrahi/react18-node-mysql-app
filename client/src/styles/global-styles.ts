import { createGlobalStyle } from 'styled-components';
import { StyleConstants } from './StyleConstants';
/* istanbul ignore next */
export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    padding-top: ${StyleConstants.NAV_BAR_HEIGHT};
  }

  body.fontLoaded {
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  
  p,
  label {
    line-height: 1.5em;
  }

  input, select, button {
    font-family: inherit;
    font-size: inherit;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  :root {
    --shadow-style: 0 4px 8px rgba(15, 117, 174, 0.2),
    0 8px 16px rgba(15, 117, 174, 0.2);
  --omrs-color-ink-lowest-contrast: rgba(47, 60, 85, 0.18);
  --omrs-color-ink-low-contrast: rgba(60, 60, 67, 0.3);
  --omrs-color-ink-medium-contrast: rgba(19, 19, 21, 0.6);
  --omrs-color-interaction: #1e4bd1;
  --omrs-color-interaction-minus-two: rgba(73, 133, 224, 0.12);
  --omrs-color-danger: #b50706;
  --omrs-color-bg-low-contrast: #eff1f2;
  --omrs-color-ink-high-contrast: #121212;
  --omrs-color-bg-high-contrast: #ffffff;
  --base-color: #0f75ae;
  --app-bg-color: #88d2fc;
  --app-text-color: #5a5a5a;
  --container-color: #fafbfc;
  --button-color: lighten($colorCanvasInverted, 10%);
  --button-text-color: var(--app-text-color);
  }

`;
