import dayjs from "dayjs";

export const definedSignals = [
  'Wind speed low start condition',
  'Yaw wind speed low yaw enable',
  'WTG system ok',
  'Pit ALU container level L warn',
];

export const definedWindfarms = [
  'ES-123874',
  'IT-872349',
  'EN-123830',
  'AU-123822',
];
export const definedDevices = [
  'device1',
  'device2',
  'device3',
  'device4',
  'device5',
];
export const definedResolutions = [
  'resolution1',
  'resolution2',
  'resolution3',
  'resolution4',
  'resolution5',
];

export type Subscription = {
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
  resolution: string;
  signals: string[];
  fromTo: {
    start: any;
    end: any;
  };
};

export const definedSubscriptions = [
  {
    windfarms: 'ES-1239809',
    signals: definedSignals[0],
    from: dayjs('02-22-2024').format('DD-MM-YYYY'),
    to: dayjs('03-22-2024').format('DD-MM-YYYY'),
    devices: 'asset1',
    resolution: 'resolution1',
  },
  {
    windfarms: 'ES-6578809',
    signals: definedSignals[1],
    from: dayjs('02-01-2024').format('DD-MM-YYYY'),
    to: dayjs('02-15-2024').format('DD-MM-YYYY'),
    devices: 'asset1',
    resolution: 'resolution1',
  },
  {
    windfarms: 'RU-1222209',
    signals: definedSignals[2],
    from: dayjs('02-11-2024').format('DD-MM-YYYY'),
    to: dayjs('02-23-2024').format('DD-MM-YYYY'),
    devices: 'asset1',
    resolution: 'resolution1',
  },
  {
    windfarms: 'EN-1111809',
    signals: definedSignals[3],
    from: dayjs('02-02-2024').format('DD-MM-YYYY'),
    to: dayjs('02-22-2024').format('DD-MM-YYYY'),
    devices: 'asset1',
    resolution: 'resolution1',
  },
]
