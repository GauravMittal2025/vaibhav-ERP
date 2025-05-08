import { ActivityLog } from '../types';

export const activityLogs: ActivityLog[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Admin',
    action: 'created',
    resource: 'role',
    resourceId: '5',
    timestamp: '2025-06-01T09:15:30Z',
  },
  {
    id: '2',
    userId: '1',
    userName: 'John Admin',
    action: 'updated',
    resource: 'user',
    resourceId: '3',
    timestamp: '2025-06-01T10:20:45Z',
  },
  {
    id: '3',
    userId: '2',
    userName: 'Sarah Manager',
    action: 'updated',
    resource: 'role',
    resourceId: '4',
    timestamp: '2025-05-31T14:30:15Z',
  },
  {
    id: '4',
    userId: '1',
    userName: 'John Admin',
    action: 'deleted',
    resource: 'user',
    resourceId: '7',
    timestamp: '2025-05-31T15:45:00Z',
  },
  {
    id: '5',
    userId: '2',
    userName: 'Sarah Manager',
    action: 'created',
    resource: 'user',
    resourceId: '8',
    timestamp: '2025-05-30T11:10:25Z',
  },
  {
    id: '6',
    userId: '1',
    userName: 'John Admin',
    action: 'updated',
    resource: 'role',
    resourceId: '3',
    timestamp: '2025-05-30T13:25:40Z',
  },
];

export const addActivityLog = (log: Omit<ActivityLog, 'id' | 'timestamp'>): ActivityLog => {
  const newLog = {
    ...log,
    id: `${activityLogs.length + 1}`,
    timestamp: new Date().toISOString(),
  };
  
  activityLogs.unshift(newLog); // Add to the beginning to show newest first
  return newLog;
};