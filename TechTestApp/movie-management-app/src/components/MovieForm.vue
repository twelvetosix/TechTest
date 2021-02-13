<template>
    <b-modal id="formModal" hide-header="true" hide-footer="true" no-close-on-backdrop="true">
        <b-container fluid>
            <form @submit.prevent="submit">
                <div class="form-group mb-3">
                    <label for="nameInput" class="form-label">Name</label>
                    <input type="text" class="form-control" id="nameInput" v-model.trim="$v.movie.name.$model" />
                    <div v-if="submitted && !$v.movie.name.required" class="invalid-feedback">First Name is required</div>
                </div>
                <div class="form-group mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" rows="4" v-model.trim="$v.movie.description.$model" />
                </div>
                <div class="form-group mb-3">
                    <label for="releaseYearInput" class="form-label">Release Year</label>
                    <input type="text" class="form-control" id="releaseYearInput" v-model.trim="$v.movie.name.$model" />
                    <div v-if="submitted && (!$v.movie.releaseYear.minLength || $v.movie.releaseYear.maxLength)" class="invalid-feedback">Year must be 4 numeric characters</div>
                </div>
            </form>
            <div class="row">
                <div class="col">
                    <b-button variant="success" @click="submit()">Save</b-button>
                </div>
                <div class="col">
                    <b-button @click="cancel()">Cancel</b-button>
                </div>
                <div class="col">
                    <b-button variant="danger" @click="deleteMovie()">Delete</b-button>
                </div>
            </div>              
        </b-container>
    </b-modal>                    
</template>

<script>
    import { required, minLength, maxLength, numeric } from 'vuelidate/lib/validators'

    export default {
        name: 'formModal',
        data() {
            return { 
                movie: {
                    name: null,
                    description: null,
                    releaseYear: null,     
                },
                submitted: false,
            }
        },
        validations: {     
            movie: {
                name: {
                    required,
                },
                description: {

                },
                releaseYear: {
                    required,
                    minLength: minLength(4),
                    maxLength: maxLength(4),
                    numeric,
                }
            }
        },
        methods: {
            submit() {
                this.submitted = true;

                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
            }, 
            cancel() {
                this.$bvModal.hide('formModal')
            }
        }
    }
</script>