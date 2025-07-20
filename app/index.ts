import { ClockImageInitializer } from './ClockImageInitializer';
import { ClockInitializer } from './ClockInitializer';

const clockManager = new ClockInitializer();
clockManager.initialize();

const clockImageManager = new ClockImageInitializer();
clockImageManager.initialize(clockManager.applyStyle);
