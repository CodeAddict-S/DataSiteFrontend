<template>
    <template v-if="elements">
        <header class="w-full flex gap-1 border mb-2 rounded-2xl p-4">
            <div class="relative">
                <MagnifyingGlassIcon class="absolute top-1/2 -translate-1/2 left-5 size-5 text-muted-foreground"/>
                <Input v-model="search" :placeholder="t('search')" class="pl-9 h-full w-72"/>
            </div>
            <Dialog>
                <DialogTrigger>
                    <Button class="h-auto aspect-square">
                        <PlusIcon class="size-5"/>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{{ t('add_element') }}</DialogTitle>
                        <DialogDescription>{{ t('fill_in_fields_below') }}</DialogDescription>
                    </DialogHeader>
                    <div class="flex flex-col gap-1">
                        <Input :placeholder="t('phone_number')" v-model="newRow.phone_number"/>
                        <Input :placeholder="t('fullname')" v-model="newRow.fullname"/>
                        <MultiSelectField :options="courses.map(c=>({label:c.name,value:c.id}))" v-model="newRow.courses" :placeholder="t('courses')"/>
                        <PasswordInput v-model="newRow.password"/>
                        <Textarea v-model="newRow.description" :placeholder="t('description')"/>
                        <div class="flex gap-2 items-center">
                            <Checkbox v-model="newRow.is_superuser"/>
                            <p>{{ t('is_admin') }}</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose tabindex="-1">
                            <Button variant="outline">{{ t('cancel') }}</Button>
                        </DialogClose>
                        <DialogClose tabindex="-1">
                            <Button @click="create">{{ t('continue') }}</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </header>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>№</TableHead>
                    <TableHead>{{ t('phone_number') }}</TableHead>
                    <TableHead>{{ t('fullname') }}</TableHead>
                    <TableHead>{{ t('courses') }}</TableHead>
                    <TableHead>{{ t('is_admin') }}</TableHead>
                    <TableHead>{{ t('join_date') }}</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="row, index in filteredElements">
                    <TableCell>{{ index+1 }}</TableCell>
                    <TableCell>
                        <Dialog>
                            <!-- copy the row -->
                            <DialogTrigger class="cursor-pointer" @click="rowToEdit=JSON.parse(JSON.stringify(row))">
                                {{ row.phone_number }}
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{{ rowToEdit.fullname }}</DialogTitle>
                                    <DialogDescription>{{ t('edit_fields_below') }}</DialogDescription>
                                </DialogHeader>
                                <div class="flex flex-col gap-1">
                                    <Input :placeholder="t('phone_number')" v-model="rowToEdit.phone_number"/>
                                    <Input :placeholder="t('fullname')" v-model="rowToEdit.fullname"/>
                                    <MultiSelectField :options="courses.map(c=>({label:c.name,value:c.id}))" v-model="rowToEdit.courses" :placeholder="t('courses')"/>
                                    <Textarea v-model="rowToEdit.description"/>
                                    <div class="flex gap-2 items-center">
                                        <Checkbox v-model="rowToEdit.is_superuser"/>
                                        <p>{{ t('is_admin') }}</p>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose tabindex="-1">
                                        <Button variant="outline">{{ t('cancel') }}</Button>
                                    </DialogClose>
                                    <DialogClose tabindex="-1">
                                        <Button @click="save">{{ t('continue') }}</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </TableCell>
                    <TableCell>{{ row.fullname }}</TableCell>
                    <TableCell>
                        <Popover>
                            <PopoverTrigger>
                                <div class="max-w-36 truncate">{{ joinArray(row.parsed_courses, (c) => c.name, ', ') }}</div>
                            </PopoverTrigger>
                            <PopoverContent>
                                {{ joinArray(row.parsed_courses, (c)=>c.name, ', ') }}
                            </PopoverContent>
                        </Popover>
                    </TableCell>
                    <TableCell>
                        <component :is="prettifyBool(row.is_superuser)"/>
                    </TableCell>
                    <TableCell>{{ ISOtoReadable(row.join_date) }}</TableCell>
                    <!-- Remove btn -->
                    <TableCell>
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button class="hover:bg-red-500/40 shadow-none text-foreground bg-transparent">
                                    <TrashIcon/>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>{{ t('alert_title') }}</AlertDialogTitle>
                                    <AlertDialogDescription>{{ t('alert_description') }}</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel tabindex="-1">{{ t('cancel') }}</AlertDialogCancel>
                                    <AlertDialogAction tabindex="-1" @click="delete_(row.id)">{{ t('continue') }}</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </template>
    <template v-else>
        <Skeleton class="w-full mb-2 h-32"></Skeleton>
        <Skeleton class="h-96 w-full"></Skeleton>
    </template>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import Table from '../ui/table/Table.vue';
import TableHead from '../ui/table/TableHead.vue';
import TableHeader from '../ui/table/TableHeader.vue';
import TableRow from '../ui/table/TableRow.vue';
import TableBody from '../ui/table/TableBody.vue';
import TableCell from '../ui/table/TableCell.vue';
import { api } from '@/lib/api';
import { computed, onMounted, ref } from 'vue';
import { ISOtoReadable, joinArray, prettifyBool, showToast } from '@/lib/utils';
import Popover from '../ui/popover/Popover.vue';
import PopoverTrigger from '../ui/popover/PopoverTrigger.vue';
import PopoverContent from '../ui/popover/PopoverContent.vue';
import Input from '../ui/input/Input.vue';
import { MagnifyingGlassIcon, TrashIcon } from '@heroicons/vue/24/outline';
import Button from '../ui/button/Button.vue';
import AlertDialogFooter from '../ui/alert-dialog/AlertDialogFooter.vue';
import AlertDialogHeader from '../ui/alert-dialog/AlertDialogHeader.vue';
import AlertDialogTitle from '../ui/alert-dialog/AlertDialogTitle.vue';
import AlertDialogDescription from '../ui/alert-dialog/AlertDialogDescription.vue';
import AlertDialogContent from '../ui/alert-dialog/AlertDialogContent.vue';
import AlertDialogTrigger from '../ui/alert-dialog/AlertDialogTrigger.vue';
import { AlertDialog } from '../ui/alert-dialog';
import AlertDialogCancel from '../ui/alert-dialog/AlertDialogCancel.vue';
import AlertDialogAction from '../ui/alert-dialog/AlertDialogAction.vue';
import Dialog from '../ui/dialog/Dialog.vue';
import DialogTrigger from '../ui/dialog/DialogTrigger.vue';
import DialogContent from '../ui/dialog/DialogContent.vue';
import DialogHeader from '../ui/dialog/DialogHeader.vue';
import DialogTitle from '../ui/dialog/DialogTitle.vue';
import DialogDescription from '../ui/dialog/DialogDescription.vue';
import DialogFooter from '../ui/dialog/DialogFooter.vue';
import DialogClose from '../ui/dialog/DialogClose.vue';
import MultiSelectField from '../utils/MultiSelectField.vue';
import { PlusIcon } from '@heroicons/vue/24/solid';
import Textarea from '../ui/textarea/Textarea.vue';
import PasswordInput from '../utils/PasswordInput.vue';
import Checkbox from '../ui/checkbox/Checkbox.vue';
import Skeleton from '../ui/skeleton/Skeleton.vue';

const { t } = useI18n()

const elements = ref(undefined)
const courses = ref([])

const rowToEdit = ref(undefined)
const save = () => {
    api.patch(`elements/${rowToEdit.value.id}/`, rowToEdit.value).then(() => {
        showToast('success', t('success'))
        fetchRelated()
    })
}
const delete_ = (id) => {
    api.delete(`elements/${id}/`).then(() => {
        showToast('success', t('success'))
        fetchRelated()
    })
}
const newRow = ref({})
const create = () => {
    api.post('elements/', newRow.value).then(() => {
        showToast('success', t('success'))
        fetchRelated()
    })
}

const search = ref('')
const filteredElements = computed(() => {
    return elements.value.filter(s => s?.fullname.toLowerCase()?.match(search.value.toLowerCase()))
})

const fetchRelated = () => {
    api('elements/').then(res => {
        elements.value = res.data
    })
    api('courses/').then(res => courses.value = res.data)
}

onMounted(fetchRelated)
</script>