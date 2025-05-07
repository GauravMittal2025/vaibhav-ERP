import { useState } from 'react';
import { Save, Bell, Lock, User, Globe, Palette, Moon, Sun } from 'lucide-react';
import Button from '../../components/post-auth/ui/Button';
import Card from '../../components/post-auth/ui/omniCards/Card';

function Settings() {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    maintenance: true,
    inventory: false,
    system: true,
  });
  
  const [general, setGeneral] = useState({
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
  });
  
  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof notifications],
    }));
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your application preferences and configurations
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Theme Settings */}
        <Card className="lg:col-span-1">
          <Card.Header>
            <div className="flex items-center">
              <Palette className="w-5 h-5 mr-2 text-gray-500" />
              <h2 className="text-lg font-medium text-gray-900">Theme</h2>
            </div>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sun className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Light Mode</span>
                </div>
                <input
                  type="radio"
                  name="theme"
                  checked={theme === 'light'}
                  onChange={() => setTheme('light')}
                  className="form-radio text-blue-600"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Moon className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Dark Mode</span>
                </div>
                <input
                  type="radio"
                  name="theme"
                  checked={theme === 'dark'}
                  onChange={() => setTheme('dark')}
                  className="form-radio text-blue-600"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">System Default</span>
                </div>
                <input
                  type="radio"
                  name="theme"
                  checked={theme === 'system'}
                  onChange={() => setTheme('system')}
                  className="form-radio text-blue-600"
                />
              </div>
            </div>
          </Card.Body>
        </Card>
        
        {/* Notification Settings */}
        <Card className="lg:col-span-2">
          <Card.Header>
            <div className="flex items-center">
              <Bell className="w-5 h-5 mr-2 text-gray-500" />
              <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
            </div>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                  <p className="text-xs text-gray-500">Receive notifications via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={() => handleNotificationChange('email')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Push Notifications</p>
                  <p className="text-xs text-gray-500">Receive push notifications in browser</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={() => handleNotificationChange('push')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Maintenance Alerts</p>
                  <p className="text-xs text-gray-500">Get notified about maintenance tasks</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.maintenance}
                    onChange={() => handleNotificationChange('maintenance')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Inventory Updates</p>
                  <p className="text-xs text-gray-500">Get notified about inventory changes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.inventory}
                    onChange={() => handleNotificationChange('inventory')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">System Notifications</p>
                  <p className="text-xs text-gray-500">Get notified about system updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.system}
                    onChange={() => handleNotificationChange('system')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </Card.Body>
        </Card>
        
        {/* General Settings */}
        <Card className="lg:col-span-2">
          <Card.Header>
            <div className="flex items-center">
              <Globe className="w-5 h-5 mr-2 text-gray-500" />
              <h2 className="text-lg font-medium text-gray-900">General Settings</h2>
            </div>
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select 
                  className="form-input w-full"
                  value={general.language}
                  onChange={(e) => setGeneral(prev => ({ ...prev, language: e.target.value }))}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Zone
                </label>
                <select 
                  className="form-input w-full"
                  value={general.timezone}
                  onChange={(e) => setGeneral(prev => ({ ...prev, timezone: e.target.value }))}
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time</option>
                  <option value="CST">Central Time</option>
                  <option value="MST">Mountain Time</option>
                  <option value="PST">Pacific Time</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Format
                </label>
                <select 
                  className="form-input w-full"
                  value={general.dateFormat}
                  onChange={(e) => setGeneral(prev => ({ ...prev, dateFormat: e.target.value }))}
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select 
                  className="form-input w-full"
                  value={general.currency}
                  onChange={(e) => setGeneral(prev => ({ ...prev, currency: e.target.value }))}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                  <option value="CAD">CAD ($)</option>
                </select>
              </div>
            </div>
          </Card.Body>
        </Card>
        
        {/* Security Settings */}
        <Card className="lg:col-span-1">
          <Card.Header>
            <div className="flex items-center">
              <Lock className="w-5 h-5 mr-2 text-gray-500" />
              <h2 className="text-lg font-medium text-gray-900">Security</h2>
            </div>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              <Button 
                variant="outline" 
                size="sm" 
                fullWidth
                icon={<Lock size={16} />}
              >
                Change Password
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                fullWidth
                icon={<User size={16} />}
              >
                Two-Factor Authentication
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                fullWidth
                icon={<Globe size={16} />}
              >
                Active Sessions
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
      
      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <Button 
          variant="primary" 
          size="lg" 
          icon={<Save size={16} />}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default Settings;