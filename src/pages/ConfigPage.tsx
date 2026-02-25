import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ConfigSection {
  id: string;
  title: string;
  description: string;
  settings: ConfigSetting[];
}

interface ConfigSetting {
  id: string;
  label: string;
  description: string;
  type: 'toggle' | 'text' | 'number' | 'select';
  value: any;
  options?: { label: string; value: string }[];
}

export function ConfigPage() {
  const navigate = useNavigate();

  const [configs, setConfigs] = useState<ConfigSection[]>([
    {
      id: 'general',
      title: 'General Settings',
      description: 'Basic application configuration',
      settings: [
        {
          id: 'max_file_size',
          label: 'Max File Upload Size (MB)',
          description: 'Maximum file size for uploads',
          type: 'number',
          value: 10,
        }
      ],
    }
  ]);

  const handleSettingChange = (sectionId: string, settingId: string, newValue: any) => {
    setConfigs((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              settings: section.settings.map((setting) =>
                setting.id === settingId ? { ...setting, value: newValue } : setting
              ),
            }
          : section
      )
    );
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    alert('Configuration saved successfully!');
  };

  const renderSetting = (sectionId: string, setting: ConfigSetting) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <button
            onClick={() => handleSettingChange(sectionId, setting.id, !setting.value)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              setting.value ? 'bg-accent' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                setting.value ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        );

      case 'text':
        return (
          <input
            type="text"
            value={setting.value}
            onChange={(e) => handleSettingChange(sectionId, setting.id, e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
            id={`${sectionId}-${setting.id}`}
            name={setting.id}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={setting.value}
            onChange={(e) => handleSettingChange(sectionId, setting.id, parseInt(e.target.value))}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent w-32"
            id={`${sectionId}-${setting.id}`}
            name={setting.id}
          />
        );

      case 'select':
        return (
          <select
            value={setting.value}
            onChange={(e) => handleSettingChange(sectionId, setting.id, e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
            id={`${sectionId}-${setting.id}`}
            name={setting.id}
          >
            {setting.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600 dark:text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white font-rubik tracking-tight">
                  App Configuration
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  Manage application settings and preferences
                </p>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-accent text-chat-buttonText rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-95"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {configs.map((section) => (
            <div
              key={section.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white font-rubik mb-2">
                  {section.title}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{section.description}</p>
              </div>

              <div className="space-y-6">
                {section.settings.map((setting) => (
                  <div
                    key={setting.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-750 rounded-xl"
                  >
                    <div className="flex-1">
                      <label className="block font-bold text-gray-900 dark:text-white mb-1">
                        {setting.label}
                      </label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</p>
                    </div>
                    <div className="ml-6">{renderSetting(section.id, setting)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
