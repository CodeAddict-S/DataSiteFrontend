<template>
    <div class="w-full px-[10px]">
        <Card class="max-w-[450px] mx-auto my-[50px]">
            <CardHeader>
                <CardTitle class="text-center text-[20px]">{{ t('login') }}</CardTitle>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="sign_in">
                    <h1 class="mt-[10px]">{{ t('phone_number') }}</h1>
                    <div class="relative h-[45px]">
                        <div class="h-[41px] top-[2px] w-[40px] absolute left-0 border-r-[1px] border-solid border-accent">
                            <PhoneIcon class="size-4 text-muted-foreground mx-auto relative top-1/2 translate-y-[-50%]"/>
                        </div>
                        <Input type="tel" v-model="phone_number" class="mt-[10px] h-full pl-[50px]" :placeholder="t('phone_number')" />
                    </div>

                    <h1 class="mt-[20px]">{{ t('password') }}</h1>
                    <div class="relative h-[45px]">
                        <div class="h-[41px] top-[2px] w-[40px] absolute left-0 border-r-[1px] border-solid border-accent">
                            <LockClosedIcon class="size-4 mx-auto text-muted-foreground relative top-1/2 translate-y-[-50%]"/>
                        </div>
                        <Input :type="password_visible ? 'text' : 'password'" v-model="password" class="mt-[10px] pl-[50px] pr-[20px] h-full py-[20px]" :placeholder="t('password')" />
                        <div @click="password_visible=!password_visible" class="h-[41px] top-[2px] cursor-pointer w-[40px] absolute right-0">
                            <EyeIcon v-if="!password_visible" class="w-[17px] opacity-40 mx-auto relative top-1/2 translate-y-[-50%]"/>
                            <EyeSlashIcon v-else class="w-[17px] opacity-40 mx-auto relative top-1/2 translate-y-[-50%]"/>
                        </div>
                    </div>

                    <Button type="submit" class="py-[20px] w-full mt-[30px] cursor-pointer" :disabled="waiting_for_response">{{ t('login') }}</Button>
                </form>
            </CardContent>
            <CardFooter>
                <CardDescription class="w-full">
                    <p class="text-center w-full">Default credentials: 123456789 / 123456789</p>
                </CardDescription>
            </cardFooter>
        </Card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/lib/auth' 
import { useI18n } from 'vue-i18n'
import { PhoneIcon } from 'lucide-vue-next'
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/vue/24/outline'
import { router } from '@/lib/router'
import { isJsonValid } from '@/lib/utils'

if(isJsonValid(localStorage.getItem('tokens'))){
    try {
        if(JSON.parse(localStorage.getItem('tokens'))['superuser']){
            router.push('/app')
        }
    } catch {}
}

const { t } = useI18n()

const phone_number = ref('')
const password = ref('')
const waiting_for_response = ref(false)
const password_visible = ref(false)

const auth = useAuthStore()

const reset = () => {
    phone_number.value = ''
    password.value = ''
}

const sign_in = () => {
    waiting_for_response.value = true
    auth.loginUser(phone_number.value, password.value).then((success)=>{
        if(success){
            reset()
            setTimeout(()=>{
                router.push('/')
            },500)
        }
        waiting_for_response.value = false
    })
}
</script>