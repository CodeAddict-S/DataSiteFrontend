<template>
    <template v-if="objects">
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
                        <DialogTitle>{{ t('add_course') }}</DialogTitle>
                        <DialogDescription>{{ t('fill_in_fields_below') }}</DialogDescription>
                    </DialogHeader>
                    <div class="flex flex-col gap-1">
                        <Input :placeholder="t('name')" v-model="newRow.name"/>
                        <div class="flex items-center">
                            <TimePicker v-model="newRow.start_time"/>
                            <div class="w-5 bg-accent h-[1px]"></div>
                            <TimePicker v-model="newRow.end_time"/>
                        </div>
                        <NumberInput v-model="newRow.price" :placeholder="t('price')"/>
                        <Select v-model="newRow.starts_monday" class="w-full">
                            <SelectTrigger class="w-full">
                                <SelectValue class="w-full"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem :value="true">{{ t('monday_days') }}</SelectItem>
                                    <SelectItem :value="false">{{ t('tuesday_days') }}</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
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
                    <TableHead>{{ t('name') }}</TableHead>
                    <TableHead>{{ t('start_time') }}</TableHead>
                    <TableHead>{{ t('end_time') }}</TableHead>
                    <TableHead>{{ t('price') }}</TableHead>
                    <TableHead>{{ t('days_of_the_week') }}</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="row, index in filteredObjects">
                    <TableCell>{{ index+1 }}</TableCell>
                    <TableCell>
                        <Dialog>
                            <!-- copy the row -->
                            <DialogTrigger class="cursor-pointer" @click="rowToEdit=JSON.parse(JSON.stringify(row))">
                                {{ row.name }}
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{{ row.name }}</DialogTitle>
                                    <DialogDescription>{{ t('edit_fields_below') }}</DialogDescription>
                                </DialogHeader>
                                <div class="flex flex-col gap-1">
                                    <Input :placeholder="t('name')" v-model="rowToEdit.name"/>
                                    <div class="flex items-center">
                                        <TimePicker v-model="rowToEdit.start_time"/>
                                        <div class="w-5 bg-accent h-[1px]"></div>
                                        <TimePicker v-model="rowToEdit.end_time"/>
                                    </div>
                                    <NumberInput v-model="rowToEdit.price"/>
                                    <Select v-model="rowToEdit.starts_monday">
                                        <SelectTrigger class="w-full">
                                            <SelectValue class="w-full"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem :value="true">{{ t('monday_days') }}</SelectItem>
                                                <SelectItem :value="false">{{ t('tuesday_days') }}</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
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
                    <TableCell>{{ row.start_time.substring(0,5) }}</TableCell>
                    <TableCell>{{ row.end_time.substring(0,5) }}</TableCell>
                    <TableCell>{{ prettifyNum(row.price) }} so'm</TableCell>
                    <TableCell>{{ row.starts_monday ? t('monday_days') : t('tuesday_days') }}</TableCell>
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
import { ISOtoReadable, joinArray, prettifyBool, prettifyNum, showToast } from '@/lib/utils';
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
import PasswordInput from '../utils/PasswordInput.vue';
import Checkbox from '../ui/checkbox/Checkbox.vue';
import Skeleton from '../ui/skeleton/Skeleton.vue';
import TimePicker from '../utils/TimePicker.vue';
import NumberInput from '../utils/NumberInput.vue';
import Select from '../ui/select/Select.vue';
import SelectTrigger from '../ui/select/SelectTrigger.vue';
import SelectValue from '../ui/select/SelectValue.vue';
import SelectContent from '../ui/select/SelectContent.vue';
import SelectGroup from '../ui/select/SelectGroup.vue';
import SelectItem from '../ui/select/SelectItem.vue';

const { t } = useI18n()

const objects = ref(undefined)

const rowToEdit = ref(undefined)
const save = () => {
    api.patch(`courses/${rowToEdit.value.id}/`, rowToEdit.value).then(() => {
        showToast('success', t('success'))
        fetchRelated()
    })
}
const delete_ = (id) => {
    api.delete(`courses/${id}/`).then(() => {
        showToast('success', t('success'))
        fetchRelated()
    })
}
const newRow = ref({start_time: '00:00', end_time: '23:30', starts_monday: true})
const create = () => {
    api.post('courses/', newRow.value).then(() => {
        showToast('success', t('success'))
        fetchRelated()
    })
}

const search = ref('')
const filteredObjects = computed(() => {
    return objects.value.filter(s => s?.name.toLowerCase()?.match(search.value.toLowerCase()))
})

const fetchRelated = () => {
    api('courses/').then(res => {
        objects.value = res.data
    })
}

onMounted(fetchRelated)
</script>