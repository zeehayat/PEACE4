<!-- TAndDWorkViewModal.vue -->
<script setup>
import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';  // <-- was missing
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue'; // if you show files

const props = defineProps({
    show: { type: Boolean, default: false },
    // IMPORTANT: kebab-case in parent = camelCase here
    tAndDWork: { type: Object, default: null },
});

const emit = defineEmits(['close']);

const close = () => emit('close');
</script>

<template>
    <Modal :show="show" @close="close" :maxWidth="'3xl'" title="T&D Work Details">
        <div class="p-6" v-if="tAndDWork">
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold">
                        {{ tAndDWork.name || `T&D Work #${tAndDWork.id}` }}
                    </h3>
                    <PrimaryButton @click="close">Close</PrimaryButton>
                </div>

                <div class="text-sm text-gray-700">
                    <p><span class="font-medium">Date of Initiation:</span>
                        {{ tAndDWork.date_of_initiation ? new Date(tAndDWork.date_of_initiation).toLocaleDateString() : '—' }}
                    </p>
                    <p v-if="tAndDWork.ht_poles_quantity"><span class="font-medium">HT Poles:</span> {{ tAndDWork.ht_poles_quantity }}</p>
                    <p v-if="tAndDWork.lt_poles_quantity"><span class="font-medium">LT Poles:</span> {{ tAndDWork.lt_poles_quantity }}</p>

                    <div v-if="tAndDWork.step_up_transformers?.length">
                        <span class="font-medium">Step-Up Transformers:</span>
                        <ul class="list-disc ml-5">
                            <li v-for="(t, i) in tAndDWork.step_up_transformers" :key="'su-' + i">
                                {{ t.kva }} KVA × {{ t.qty }}
                            </li>
                        </ul>
                    </div>

                    <div v-if="tAndDWork.step_down_transformers?.length">
                        <span class="font-medium">Step-Down Transformers:</span>
                        <ul class="list-disc ml-5">
                            <li v-for="(t, i) in tAndDWork.step_down_transformers" :key="'sd-' + i">
                                {{ t.kva }} KVA × {{ t.qty }}
                            </li>
                        </ul>
                    </div>

                    <div v-if="tAndDWork.scope_of_work">
                        <span class="font-medium">Scope of Work:</span>
                        <div class="mt-1 whitespace-pre-line">{{ tAndDWork.scope_of_work }}</div>
                    </div>

                    <div v-if="(tAndDWork.attachments_frontend && tAndDWork.attachments_frontend.length) || (tAndDWork.attachments && tAndDWork.attachments.length)" class="mt-3">
                        <p class="font-medium">Attachments:</p>
                        <AttachmentViewer :attachments="tAndDWork.attachments_frontend || tAndDWork.attachments" />
                    </div>
                </div>
            </div>
        </div>
    </Modal>
</template>
