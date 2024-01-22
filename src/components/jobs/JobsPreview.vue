<template>
    <template v-if="jobsInfo">
        <Loader v-if="props.loading"/>
        <div v-else class="jobs-preview-content" id="jobsPreview">
            <h1 class="fw-bold">{{ jobsInfo.position }}</h1>
            <div class="list-info d-flex justify-content-start mt-3">
                <div class="d-flex">
                    <p class="list-info-item d-flex align-items-center me-3 mb-0 fw-bold"><span class="heroICons d-flex align-items-center me-1"><ClockIcon/></span> {{ jobsInfo.type }}</p>
                    <p class="list-info-item d-flex align-items-center me-3 mb-0 fw-bold"><span class="heroICons d-flex align-items-center me-1"><BriefcaseIcon/></span> {{ jobsInfo.department }}</p>
                </div>
                <p class="list-info-item d-flex align-self-end mb-0">{{ jobsInfo.posted }}</p>
            </div>
            <p class="mt-4">{{ jobsInfo.description }}</p>
            <div 
                v-for="duty in jobsInfo.duties" 
                :key="duty.desc" 
                class="jobs-list-info">
                <div v-html="duty.desc"></div>
            </div>

            <div
                v-if="!isSubmitted"
                @submit="onSubmit" 
                class="jobs-list-form">
                <h2 class="mb-3 fw-bold">Submit your application:</h2>
                <form class="needs-validation" @submit.prevent="onSubmit" novalidate>
                    <div class="row">
                        <div class="col-lg-6 col-12">
                            <label for="firstName" class="form-label mt-3">First Name</label>
                            <input type="text" class="form-control" id="firstName" placeholder="" aria-label="First name" required>
                            <div class="invalid-feedback">This field is required.</div>
                        </div>
                        <div class="col-lg-6 col-12">
                            <label for="lastName" class="form-label mt-3">Last Name</label>
                            <input type="text" class="form-control" id="lastName" placeholder="" aria-label="Last name" required>
                            <div class="invalid-feedback">This field is required.</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 col-12">
                            <label for="phoneNo" class="form-label mt-3">Phone Number</label>
                            <input type="tel" class="form-control" id="phoneNo" placeholder="ex. 0561234567" aria-label="Phone Number" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" required>
                            <div class="invalid-feedback">This field is required. </div>
                        </div>
                        <div class="col-lg-6 col-12">
                            <label for="emailAddress" class="form-label mt-3">Email Address</label>
                            <input type="email" class="form-control" id="emailAddress" placeholder="" aria-label="Email Address"  required>
                            <div class="invalid-feedback">This field is required.</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 col-12">
                            <label for="nationality" class="form-label mt-3">Nationality</label>
                            <select class="form-select" aria-label="Select Nationality" required>
                                <option selected disabled value="">Select</option>
                                <option v-for="country in countryList" :key="country.iso2" :value="country.iso2">{{ country.name }}</option>
                            </select>
                            <div class="invalid-feedback">This field is required.</div>
                        </div>
                        <div class="col-lg-6 col-12">
                            <label for="expectedSalary" class="form-label mt-3">Expected Salary</label>
                            <div class="input-group">
                                <select class="form-select" id="expectedSalary" aria-label="Expected Salary" required>
                                    <option selected disabled value="">Select</option>
                                    <option v-for="country in countryList" :key="country.iso2" :value="country.currency_code">{{ country.currency_code }}</option>
                                </select>
                                <input type="number" class="form-control" id="expectedSalaryInput" aria-label="Expected Salary" required>
                            </div>
                            <div class="invalid-feedback">This field is required.</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 col-12">
                            <label for="resume" class="form-label mt-3">Resume</label>
                            <input class="form-control" type="file" id="resume" required>
                            <div class="invalid-feedback">This field is required.</div>
                        </div>
                        <div class="col-lg-6 col-12">
                            <label for="photo" class="form-label mt-3">Photo (Optional)</label>
                            <input class="form-control" type="file" id="photo">
                            <div class="invalid-feedback">This field is required.</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="aboutYourself" class="form-label mt-3">Tell us more about yourself</label>
                            <textarea type="text" class="form-control" id="aboutYourself" rows="5" placeholder="" aria-label="About Yourself" required></textarea>
                            <div class="invalid-feedback">This field is required.</div>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col">
                            <button class="btn btn-primary btn-apply fw-bold" type="submit">Submit Your Application</button>
                        </div>
                    </div>
                </form>
            </div>

            <div 
                v-if="isSubmitted"
                class="jobs-list-done d-flex align-items-center justify-content-center">
                <h2 class="d-flex flex-column align-items-center cardjustify-content-center fw-bold"><span class="heroICons d-flex mb-2"><CheckCircleIcon /></span>Your application has been submitted successfully!</h2>
            </div>
        </div>
    </template>
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { ClockIcon } from "@heroicons/vue/24/outline";
import { BriefcaseIcon } from "@heroicons/vue/24/outline";
import { CheckCircleIcon } from "@heroicons/vue/16/solid";

import countries from "@/mocks/countries.json";
import Loader from "@/components/Loader.vue";

const props = defineProps([
    'selectedJob',
    'loading'
])

const jobsInfo = ref();
const countryList = ref(countries);
const isSubmitted = ref(false)

/**
 * Check Form validity
 */
const checkForm = () => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles
    const forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
}

/**
 * Scroll to top after job is selected
 */
const scrollToJobsPreview = () => {
    const el = document.getElementById('jobsPreview');
    if (el) {
        el.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
    }
}

/**
 * Reset Form after successful submit
 */
const resetForm = () => {
    // Reset the form fields to their initial state
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.prototype.slice.call(forms).forEach((form) => {
        form.classList.remove('was-validated');
        form.reset();
    });

    // Reset specific fields if needed
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('phoneNo').value = '';
    document.getElementById('emailAddress').value = '';
    document.getElementById('expectedSalaryInput').value = '';
    document.getElementById('aboutYourself').value = '';
};

/**
 * Submit Form
 */
const onSubmit = () => {
    // isSubmitted.value = true;
    // resetForm();

    // Fetch all the forms we want to apply custom Bootstrap validation styles
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and check validity
    Array.prototype.slice.call(forms).forEach((form) => {
        if (form.checkValidity()) {
            // Your form submission logic here
            // For now, just reset the form and set isSubmitted to true
            resetForm();
            isSubmitted.value = true;
        } else {
            // If form is not valid, add the was-validated class to show validation errors
            form.classList.add('was-validated');
        }
    });
}

watchEffect(() => {
    if (props.selectedJob) {
        jobsInfo.value = props.selectedJob;
        isSubmitted.value = false;
        scrollToJobsPreview();
    }
})

onMounted(() => {
    // checkForm();
})

</script>