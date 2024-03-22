import dayjs from 'dayjs';

export const definedSignals = [
  'Wind speed low start condition',
  'Yaw wind speed low yaw enable',
  'WTG system ok',
  'Pit ALU container level L warn',
];

export const definedWindfarms = [
  'ESWC123874',
  'ITWC872349',
  'ENWC123830',
  'AUWC123822',
];
export const definedDevices = [
  'ESWEA87234',
  'ESWEA32498',
  'ENWEA23491',
  'ITWEA12398',
  'AUWEA12478',
];
export const definedResolutions = [
  '10min',
  '1min',
  '1s',
  '100ms',
  '50ms',
  '40ms',
  '10ms',
];

export type Subscription = {
  id: number;
  windfarms: string;
  devices: string;
  resolution: string;
  signals: string;
  from: string;
  to: string;
};

export type SubscriptionFilter = {
  windfarms: string[];
  devices: string[];
  resolution: string[];
  signals: string[];
  fromTo: {
    start: any;
    end: any;
  };
};

export const definedSubscriptions = [
  {
    id: 0,
    windfarms: definedWindfarms[0],
    signals: definedSignals[0],
    from: dayjs('02-22-2024').format('DD-MM-YYYY'),
    to: dayjs('03-22-2024').format('DD-MM-YYYY'),
    devices: definedDevices[0],
    resolution: definedResolutions[2],
  },
  {
    id: 1,
    windfarms: definedWindfarms[1],
    signals: definedSignals[1],
    from: dayjs('02-01-2024').format('DD-MM-YYYY'),
    to: dayjs('02-15-2024').format('DD-MM-YYYY'),
    devices: definedDevices[0],
    resolution: definedResolutions[0],
  },
  {
    id: 2,
    windfarms: definedWindfarms[0],
    signals: definedSignals[2],
    from: dayjs('02-11-2024').format('DD-MM-YYYY'),
    to: dayjs('02-23-2024').format('DD-MM-YYYY'),
    devices: definedDevices[0],
    resolution: definedResolutions[1],
  },
  {
    id: 3,
    windfarms: definedWindfarms[2],
    signals: definedSignals[3],
    from: dayjs('02-02-2024').format('DD-MM-YYYY'),
    to: dayjs('02-22-2024').format('DD-MM-YYYY'),
    devices: definedDevices[3],
    resolution: definedResolutions[0],
  },
];
