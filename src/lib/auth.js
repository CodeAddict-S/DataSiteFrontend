import { defineStore } from 'pinia';
import { api } from '@/lib/api';
import { showToast } from '@/lib/utils';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        a11d: Boolean(localStorage.getItem('tokens'))
    }),
    actions: {
        async loginUser(phone_number, password) {
            /* verify user credentials */
            if (password.length < 8) {
                showToast('warning', 'Password is too weak', 'Password must be at least 6 characters long.')
                return false
            }

            const data = {
                'phone_number': phone_number,
                'password': password
            }
            let failed = false
            await api.post('token/', data).then(response => {
                localStorage.setItem('tokens', JSON.stringify(response.data))
                this.a11d = true
                showToast("success", t('success'))
                this.resetAuthHeaders()
            }).catch(() => {
                showToast("error", t('something_went_wrong'))
                failed = true
            })
            if (failed) {
                return false
            }
            return true
        },
        resetAuthHeaders() {
            const tokens = JSON.parse(localStorage.getItem('tokens'))
            api.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`
        }
    }
});