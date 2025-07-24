'use client';

import api from './api';

export async function getChecklistList() {
  try {
    const response = await api.get('/checklist'); // ganti path sesuai endpoint yang benar
    return response?.data?.data;
  } catch (error) {
    console.error('Gagal mengambil item list:', error);
    throw error;
  }
}

export async function createChecklist(name: string) {
  try {
    const response = await api.post('/checklist', { name });
    return response.data;
  } catch (error) {
    console.error('Gagal membuat item:', error);
    throw error;
  }
}

export async function deleteChecklist(id: string | number) {
  try {
    const response = await api.delete(`/checklist/${id}`);
    return response.data;
  } catch (error) {
    console.error('Gagal menghapus item:', error);
    throw error;
  }
}

export async function createChecklistItem(name: string, id: string | number) {
  try {
    const response = await api.post(`/checklist/${id}/item`, { itemName: name });
    return response.data;
  } catch (error) {
    console.error('Gagal membuat item:', error);
    throw error;
  }
}


export async function deleteChecklistItem(id: string | number, idItem: string | number) {
  try {
    const response = await api.delete(`/checklist/${id}/item/${idItem}`);
    return response.data;
  } catch (error) {
    console.error('Gagal menghapus item:', error);
    throw error;
  }
}