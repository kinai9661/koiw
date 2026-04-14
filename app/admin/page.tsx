'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface Stats {
  totalGenerations: number;
  totalUsers: number;
  totalApiCalls: number;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  is_active: boolean;
  weight: number;
  usage_count: number;
  created_at: string;
}

export default function AdminPage() {
  const t = useTranslations();
  const [stats, setStats] = useState<Stats | null>(null);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newKey, setNewKey] = useState({ name: '', key: '', weight: 1 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, keysRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/api-keys'),
      ]);

      const statsData = await statsRes.json();
      const keysData = await keysRes.json();

      if (statsData.success) setStats(statsData.data);
      if (keysData.success) setApiKeys(keysData.data);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddKey = async () => {
    try {
      const response = await fetch('/api/admin/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newKey),
      });

      if (response.ok) {
        setShowAddModal(false);
        setNewKey({ name: '', key: '', weight: 1 });
        fetchData();
      }
    } catch (error) {
      console.error('Failed to add API key:', error);
    }
  };

  const handleToggleKey = async (id: string, isActive: boolean) => {
    try {
      await fetch('/api/admin/api-keys', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_active: !isActive }),
      });
      fetchData();
    } catch (error) {
      console.error('Failed to toggle API key:', error);
    }
  };

  const handleDeleteKey = async (id: string) => {
    if (!confirm(t('admin.apiKeys.confirmDelete'))) return;

    try {
      await fetch(`/api/admin/api-keys?id=${id}`, {
        method: 'DELETE',
      });
      fetchData();
    } catch (error) {
      console.error('Failed to delete API key:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {t('admin.title')}
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-500 mb-2">
            {t('admin.stats.totalGenerations')}
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats?.totalGenerations || 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-500 mb-2">
            {t('admin.stats.totalUsers')}
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {stats?.totalUsers || 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-500 mb-2">
            {t('admin.stats.totalApiCalls')}
          </h3>
          <p className="text-3xl font-bold text-purple-600">
            {stats?.totalApiCalls || 0}
          </p>
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {t('admin.apiKeys.title')}
          </h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {t('admin.apiKeys.addKey')}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {t('admin.apiKeys.name')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {t('admin.apiKeys.key')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {t('admin.apiKeys.weight')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {t('admin.apiKeys.usageCount')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {t('admin.apiKeys.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {t('admin.apiKeys.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {apiKeys.map((key) => (
                <tr key={key.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {key.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                    {key.key.substring(0, 20)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {key.weight}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {key.usage_count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        key.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {key.is_active
                        ? t('admin.apiKeys.active')
                        : t('admin.apiKeys.inactive')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleToggleKey(key.id, key.is_active)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      {key.is_active ? '停用' : '啟用'}
                    </button>
                    <button
                      onClick={() => handleDeleteKey(key.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      {t('admin.apiKeys.delete')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {t('admin.apiKeys.addKey')}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('admin.apiKeys.name')}
                </label>
                <input
                  type="text"
                  value={newKey.name}
                  onChange={(e) => setNewKey({ ...newKey, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('admin.apiKeys.key')}
                </label>
                <input
                  type="text"
                  value={newKey.key}
                  onChange={(e) => setNewKey({ ...newKey, key: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('admin.apiKeys.weight')}
                </label>
                <input
                  type="number"
                  value={newKey.weight}
                  onChange={(e) =>
                    setNewKey({ ...newKey, weight: parseInt(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAddKey}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  {t('common.save')}
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  {t('common.cancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
