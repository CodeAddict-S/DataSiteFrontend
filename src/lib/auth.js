import { defineStore } from 'pinia';
import { api } from '@/lib/api';
import { showToast } from '@/lib/utils';

export const useAuthStore = defineStore('auth', {
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
                showToast("success", "Signed in successfully", "you are now signed in")
                this.resetAuthHeaders()
            }).catch(() => {
                showToast("error", "Something went wrong", "please check whether the pin is correct")
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