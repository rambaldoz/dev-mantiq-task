<template>
    <div class="container">
        <div class="row">
            <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
                <div class="jobs-preview-header-m d-lg-none d-block">
                    <h1 class="fw-bold">Let's get started</h1>
                    <p>Choose the current open position you want to apply.</p>
                </div>
                <div class="jobs-lists">
                    <div 
                        v-for="job in jobs"
                        :key="job.id"
                        :class="activeJobClass(job)"
                        @click="activeJob(job)"
                        class="jobs-lists-list mb-4 p-4">
                        <h2 class="fw-bold">{{ job.position }}</h2>
                        <p class="my-3">{{ job.description }}</p>
                        <div class="list-info d-flex justify-content-between mt-4">
                            <div class="d-flex flex-column flex-sm-row">
                                <p class="list-info-item d-flex align-items-center me-3 mb-0 fw-bold"><span class="heroICons d-flex align-items-center me-1"><ClockIcon/></span> {{ job.type }}</p>
                                <p class="list-info-item d-flex align-items-center mb-0 fw-bold"><span class="heroICons d-flex align-items-center me-1"><BriefcaseIcon/></span> {{ job.department }}</p>
                            </div>
                            <p class="list-info-item d-flex align-self-end mb-0">{{ job.posted }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xxl-8 col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
                <div v-if="!selectedJob" class="jobs-preview-header d-lg-block d-none">
                    <h1 class="fw-bold">Let's get started</h1>
                    <p>Choose the current open position you want to apply.</p>
                </div>
                <div v-else>
                    <JobsPreview :selectedJob="selectedJob" :loading="loading"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed, watchEffect } from "vue";
import { ClockIcon } from "@heroicons/vue/24/outline";
import { BriefcaseIcon } from "@heroicons/vue/24/outline";

import JobsPreview from './JobsPreview.vue';
import jobslist from '@/mocks/jobslist.json';

import Loader from "@/components/Loader.vue";

const selectedJob = ref(null);
const jobs = ref(jobslist);
const loading = ref(false) 

const activeJob = async (job) => {
    loading.value = true // show loader
    selectedJob.value = job
    await new Promise(resolve => setTimeout(resolve, 1000)) // mock API delay
    loading.value = false // hide loader
}

/**
 * @returns {Object}
 */
const activeJobClass = computed(() => {
    return job => {
        return {
            'active': selectedJob.value === job
        }
    }
})

</script>