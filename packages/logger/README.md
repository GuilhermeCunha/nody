
<center><h1>Nody Logger</h1></center>

## Description
All-in-one, production-ready logger

## How to install
```bash
// to install with yarn
yarn add @nody-org/logger

// to install with npm
npm install @nody-org/logger
```


## How to use

```typescript
import { Logger, ConsoleIntegration } from '@nody-org/logger'

// add your chosen integrations
logger.addIntegration(new ConsoleIntegration({
    level: 'debug',
}));

// this context is always added to the logs meta
logger.setContext({
    appName: '{{appName}}',
    sessionId: '{{sessionId}}'
});

logger.debug('==> your message', {
    anyKey: 'any-value',
});
```

Feel free to collaborate!