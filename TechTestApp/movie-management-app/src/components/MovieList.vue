<template>
    <div>
        <div>
            <b-table v-show="!modalShow" :items="movies" :fields="fields" table-variant="dark" caption-top>
                <template #table-caption>
                    <b-button type="button" class="btn btn-primary float-right" @click="modalShow =! modalShow"><font-awesome-icon icon="plus" />Add</b-button>
                </template>
                <template #cell(actions)=" row">
                    <button type="button" class="rowButton"><font-awesome-icon icon="edit" :style="{ color: 'white' }" @click="editSelected(row.item)" /></button>
                    <button type="button" class="rowButton"><font-awesome-icon icon="copy" :style="{ color: 'white' }" @click="copySelected(row.item)" /></button>
                    <button type="button" class="rowButton"><font-awesome-icon icon="trash-alt" :style="{ color: 'red' }" @click="confirmDelete(row.item)" /></button>
                </template>                
            </b-table>
        </div>

        <!-- MODAL -->
        <b-modal id="formModal" v-model="modalShow" :hide-header="true" :hide-footer="true" :no-close-on-backdrop="true">
            <b-container fluid>
                {{$v.movie.name}}
                <form @submit.prevent="submit">
                    <div class="form-group mb-3">
                        <label for="nameInput" class="form-label">Name</label>
                        <input type="text" class="form-control" id="nameInput" v-model.trim="$v.movie.name.$model" :class="errorStatus($v.movie.name)" />
                        <div class="error" v-if="submitted && !$v.movie.name.required">Name is required</div>
                        <div class="error" v-if="submitted && !$v.movie.name.maxLength">Name cannot be longer than 50 characters </div>
                    </div>
                    <div class="form-group mb-3">
                        <label for="description" class="form-label">Description</label>
                        <textarea class="form-control" rows="4" v-model.trim="$v.movie.description.$model" :class="errorStatus($v.movie.description)"/>
                        <div class="error" v-if="submitted && !$v.movie.description.maxLength">Description cannot be longer than 500 characters</div>
                    </div>
                    <div class="form-group mb-3">
                        <label for="releaseYearInput" class="form-label">Release Year</label>
                        <input type="text" class="form-control" id="releaseYearInput" v-model.trim="$v.movie.releaseYear.$model" :class="errorStatus($v.movie.releaseYear)" />
                        <div class="error" v-if="submitted && !$v.movie.releaseYear.required">Release year is required</div>
                        <div class="error" v-if="submitted && ((!$v.movie.releaseYear.minLength || !$v.movie.releaseYear.maxLength) || !$v.movie.releaseYear.numeric)">Year must be 4 numeric characters</div>
                    </div>
                </form>
                <div class="row">
                    <div class="col">
                        <b-button variant="success" @click="submit()">Save</b-button>
                    </div>
                    <div class="col">
                        <b-button @click="cancel()">Cancel</b-button>
                    </div>
                    <div class="col" v-show="editing">
                        <b-button variant="danger" @click="deleteMovie()">Delete</b-button>
                    </div>
                </div>
            </b-container>
        </b-modal>
    </div>
</template>

<script>
    import { required, minLength, maxLength, numeric } from 'vuelidate/lib/validators'

    export default {
        name: 'movieList', 
        data() {
            return {
                fields: [
                    {
                        key: 'name',
                        sortable: true
                    },
                    {
                        key: 'description',
                        sortable: true
                    },
                    {
                        key: 'releaseYear',
                        label: 'Release Year',
                        sortable: true,
                    },
                    {
                        key: 'actions',
                        sortable: false,
                    }
                ],
                movie: {
                    name: null,
                    description: null,
                    releaseYear: null,
                },
                editing: false,
                submitted: false,
                modalShow: false,
            }
            
        },
        computed: { 
            movies() {
                return this.$store.getters.allMovies;
            },
        },
        validations: {
            movie: {
                name: {
                    required,
                    maxLength: maxLength(50)
                },
                description: {
                    maxLength: maxLength(500)
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
            errorStatus(validation) {
                return {                    
                    errorBorder: (this.submitted && validation.$error)
                }
            },
            submit() {
                this.submitted = true;
                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
                else {
                    var toAdd = Object.assign({}, this.movie);
                    //var movie = Object.assign({}, this.movie);
                    if (this.editing) {
                        this.$store.dispatch('updateMovie', { payload: toAdd });
                    }
                    else {
                        this.$store.dispatch('addMovie', { payload: toAdd });
                    }
                    this.modalShow = false;
                    this.editing = false;
                }
            },
            editSelected(movie) {
                this.movie = Object.assign({},movie);
                this.editing = true;
                this.modalShow = true;                                     
            },
            copySelected(movie) {
                this.movie = Object.assign({}, movie);
                this.editing = false;
                this.modalShow = true;    
            },
            confirmDelete(movie) {
                this.movie = movie;
                this.$bvModal.msgBoxConfirm('Are you sure you want to delete ' + movie.name + '?')
                    .then(value => {
                        if (value) {
                            this.$store.dispatch('deleteMovie', { payload: movie });
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            cancel() {
                this.modalShow = false;
                this.editing = false;
                this.movie = null;
                this.submitted = false;
            }
            
        },     

        // Fetches posts when the component is created.
        mounted() {
            this.$store.dispatch('getAllMovies');
        },

    }
</script>
<style>
    .rowButton{
        margin-left:3%;
        margin-right:3%;
        border-color: transparent;
        background-color:transparent;
    }
    .fa-plus{
        margin-left:3%;
        color:white;
    }
    .error {
        color: red;
    }
    .errorBorder {
        border: 1px solid red !important;
    }
    
</style>


